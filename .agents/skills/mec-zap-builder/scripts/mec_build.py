#!/usr/bin/env python3
"""mec_build.py - one safe entry point for the KB_Infor_Technical MEC toolchain (cross-platform, stdlib only).

Why this exists: the KB tools look for the MI catalog in mec/mi/ but the repo ships mec/mi-reference/, and several
tools need different flags. This wrapper finds the repo root + catalog itself, runs the right tool with the right
arguments, and ends with ONE clear PASS/FAIL line so a model cannot mistake a crash for success.

Usage (run from anywhere; use `python` on Windows, `python3` on Linux/macOS):
  mec_build.py doctor
  mec_build.py api search <words...> [--single|--list] [--verb Get|Lst|Add|Upd]   # find MI APIs
  mec_build.py api show <PGM/Transaction>                                        # all fields, * = mandatory
  mec_build.py api program <PGM>                                                 # all transactions of a program
  mec_build.py api field <FIELD> [--given A,B] [--single]                        # who returns a field
  mec_build.py fromsample <sample.zap> <workdir>                                 # sample -> editable spec.json
  mec_build.py build <spec.json> [--out DIR]                                     # compile + verify (the main command)
  mec_build.py sim <spec.json> [--out DIR]                                       # generate Java simulator (javasim)
  mec_build.py dump <file.zap|file.map> [--java]                                 # readable pseudocode of a map
Set KB_ROOT=<path to KB_Infor_Technical clone> if the script is not inside the clone.
"""
import os, sys, subprocess, shutil, zipfile, glob, re

HERE = os.path.dirname(os.path.abspath(__file__))
GENERIC_XSD_SRC = ("examples", "item-details-event")   # relative to <root>/mec
GENERIC_XSDS = ("EventData_MT.xsd", "Resources-Meta.xsd")


def find_root():
    env = os.environ.get("KB_ROOT")
    cands = [env] if env else []
    for start in (HERE, os.getcwd()):
        p = start
        for _ in range(8):
            cands.append(p)
            p = os.path.dirname(p)
    for c in cands:
        if c and os.path.isfile(os.path.join(c, "mec", "tools", "mapbuild.py")):
            return os.path.abspath(c)
    return None


def find_catalog(root):
    for rel in (("mec", "mi", "mi_catalog_full.json.gz"), ("mec", "mi-reference", "mi_catalog_full.json.gz")):
        p = os.path.join(root, *rel)
        if os.path.isfile(p):
            return p
    return None


def die(msg, code=2):
    print("RESULT: FAIL - " + msg)
    sys.exit(code)


def run(root, tool, args, env_extra=None, show=True):
    env = dict(os.environ)
    env["MI_CATALOG"] = find_catalog(root) or ""
    env["PYTHONIOENCODING"] = "utf-8"
    if env_extra:
        env.update(env_extra)
    cmd = [sys.executable, "-I", os.path.join(root, "mec", "tools", tool)] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", env=env, cwd=root)
    out = (r.stdout or "") + (r.stderr or "")
    if show and out.strip():
        print(out.rstrip())
    return r.returncode, out


def cmd_doctor(root):
    ok = True
    print("python      :", sys.version.split()[0], "(need >= 3.8)")
    ok &= sys.version_info >= (3, 8)
    print("KB root     :", root or "NOT FOUND (set KB_ROOT or run inside the clone)")
    if not root:
        die("KB root not found")
    cat = find_catalog(root)
    print("MI catalog  :", cat or "NOT FOUND")
    ok &= bool(cat)
    for t in ("mapbuild.py", "verify_rules.py", "mapdump.py", "mi_lookup.py", "javacheck.py", "javasim.py", "map2spec.py"):
        has = os.path.isfile(os.path.join(root, "mec", "tools", t))
        print("tool %-16s: %s" % (t, "ok" if has else "MISSING"))
        ok &= has
    for g in GENERIC_XSDS:
        has = os.path.isfile(os.path.join(root, "mec", *GENERIC_XSD_SRC, g))
        print("generic xsd %-18s: %s" % (g, "ok" if has else "MISSING"))
        ok &= has
    jc = shutil.which("javac")
    print("javac       :", jc or "not installed (Java compile check will be SKIPPED; install a JDK 11+ to enable it)")
    rc, out = run(root, "mi_lookup.py", ["show", "CRS610MI/GetBasicData"], show=False)
    good = (rc == 0 and "CUNO" in out)
    print("catalog read:", "ok" if good else "FAILED\n" + out[-400:])
    ok &= good
    print("RESULT: %s" % ("PASS - toolchain ready" if ok else "FAIL - fix the items above first"))
    sys.exit(0 if ok else 1)


def stage_generic_xsds(root, spec_dir):
    src = os.path.join(root, "mec", *GENERIC_XSD_SRC)
    for g in GENERIC_XSDS:
        dst = os.path.join(spec_dir, g)
        if not os.path.isfile(dst) and os.path.isfile(os.path.join(src, g)):
            shutil.copy2(os.path.join(src, g), dst)
            print("staged generic schema:", g)


def cmd_build(root, spec, out):
    spec = os.path.abspath(spec)
    if not os.path.isfile(spec):
        die("spec not found: " + spec)
    out = os.path.abspath(out or os.path.join(os.path.dirname(spec), "out"))
    cat = find_catalog(root)
    if not cat:
        die("MI catalog not found under mec/mi or mec/mi-reference")
    stage_generic_xsds(root, os.path.dirname(spec))
    problems = []
    print("== 1/4 mapbuild (spec -> .zap)")
    rc, o = run(root, "mapbuild.py", [spec, out, "--catalog", cat])
    if rc != 0 or "wrote" not in o:
        die("mapbuild failed - fix the errors above in spec.json / XSDs and rebuild. Do NOT hand-write the map.")
    m = re.search(r"wrote (.+\.zap)", o)
    zap = os.path.abspath(m.group(1).strip()) if m else None
    warns = [l for l in o.splitlines() if re.search(r"warn", l, re.I)]
    if warns:
        problems.append("%d compiler warning(s) - resolve or justify each" % len(warns))
    if not zap or not os.path.isfile(zap):
        die("mapbuild reported success but no .zap was found")
    print("== 2/4 independent file check")
    with zipfile.ZipFile(zap) as z:
        names = z.namelist()
        maps = [n for n in names if n.endswith(".map")]
        if len(maps) != 1:
            die("zap must contain exactly one .map, found %d" % len(maps))
        head = z.read(maps[0])[:4]
        if head != b"\xfe\xff\x00<":
            die("map is not UTF-16BE with a single BOM (starts %r)" % head)
        xsds = [n for n in names if n.endswith(".xsd")]
        print("zip ok: %d files, map is UTF-16BE single BOM, %d schema file(s)" % (len(names), len(xsds)))
    print("== 3/4 verify_rules (format rules)")
    rc, o = run(root, "verify_rules.py", [out], show=False)
    fails = [l for l in o.splitlines() if l.startswith("FAIL") and "expected to fail" not in l]
    vr = [l for l in o.splitlines() if l.startswith(("PASS", "FAIL"))]
    print("\n".join(vr[:40]))
    if rc != 0 and not fails:
        fails = ["verify_rules exited with code %d" % rc]
    if fails:
        problems.append("verify_rules FAIL: " + "; ".join(f[:90] for f in fails))
    print("== 4/4 Java compile check (javacheck)")
    if shutil.which("javac"):
        rc, o = run(root, "javacheck.py", [spec, os.path.join(out, "_javacheck")], show=False)
        if "JAVA OK" in o:
            print([l for l in o.splitlines() if "JAVA OK" in l][0])
        else:
            print("\n".join(o.strip().splitlines()[-20:]))
        if "JAVA OK" not in o:
            problems.append("Java does not compile - see messages above")
    else:
        print("SKIPPED: javac not installed. Java in the map is UNCHECKED; say so in your final answer.")
    name = os.path.splitext(os.path.basename(zap))[0]
    mp = os.path.join(out, name, name + ".map")
    if os.path.isfile(mp):
        rc, o = run(root, "mapdump.py", [mp, "--no-java"], show=False)
        dump = os.path.join(out, name + ".dump.txt")
        open(dump, "w", encoding="utf-8").write(o)
        print("map pseudocode written to:", dump, "(review it; do not paste it all in chat)")
    if problems:
        print("RESULT: FAIL - " + " | ".join(problems))
        sys.exit(1)
    print("RESULT: PASS - zap=%s (%d bytes). Not yet imported into the Mapper: say so." % (zap, os.path.getsize(zap)))


def main():
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help", "help"):
        print(__doc__)
        sys.exit(0)
    root = find_root()
    c = a[0]
    if c == "doctor":
        cmd_doctor(root)
    if not root:
        die("KB root not found. Run inside the KB_Infor_Technical clone or set KB_ROOT.")
    if c == "api":
        if len(a) < 2:
            die("usage: api search|show|program|field ...")
        rc, _ = run(root, "mi_lookup.py", a[1:])
        sys.exit(rc)
    if c == "fromsample":
        if len(a) < 3:
            die("usage: fromsample <sample.zap> <workdir>")
        rc, _ = run(root, "map2spec.py", [a[1], a[2], "--catalog-api"])
        sys.exit(rc)
    if c == "build":
        if len(a) < 2:
            die("usage: build <spec.json> [--out DIR]")
        out = a[a.index("--out") + 1] if "--out" in a else None
        cmd_build(root, a[1], out)
        return
    if c == "sim":
        if len(a) < 2:
            die("usage: sim <spec.json> [--out DIR]")
        out = a[a.index("--out") + 1] if "--out" in a else os.path.join(os.path.dirname(os.path.abspath(a[1])), "sim")
        rc, _ = run(root, "javasim.py", [os.path.abspath(a[1]), out])
        sys.exit(rc)
    if c == "dump":
        if len(a) < 2:
            die("usage: dump <file.zap|file.map> [--java]")
        target = a[1]
        if target.endswith(".zap"):
            tmp = os.path.join(os.path.dirname(os.path.abspath(target)), "_dump_" + os.path.basename(target)[:-4])
            os.makedirs(tmp, exist_ok=True)
            with zipfile.ZipFile(target) as z:
                z.extractall(tmp)
            target = glob.glob(os.path.join(tmp, "*.map"))[0]
        rc, _ = run(root, "mapdump.py", [target] + ([] if "--java" in a else ["--no-java"]))
        sys.exit(rc)
    die("unknown command: " + c)


if __name__ == "__main__":
    main()
