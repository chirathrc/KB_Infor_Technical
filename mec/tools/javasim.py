"""Generate a runnable Java simulation of a mapping spec: every Java function becomes a method, MI results are
simulated, and a Driver.java skeleton lists the calls in mapping order (loops, ifs, API steps) for you to complete.

Usage: python3 -I javasim.py <spec.json> <work_dir> [--run]
  writes <work_dir>/MapSim.java   class MapSim extends MapBase: one method per UV/UB function (inputs = String params,
                                  outputs captured in outs.put("Func.param", value)), map variables as fields
         <work_dir>/MapBase.java  simulated MEC API: apiOK/apiMsg (isLastAPICallOK/getLastAPIMessage), manifest map,
                                  aborted (abort reason), log, slept (sleep total), IONToolbox/ManifestConstants stubs
         <work_dir>/Driver.java   skeleton: one call per function in sequence order, API steps as comments with their
                                  outputs, links to variables applied (m.var = m.outs.get(...)); edit into scenarios
  --run  compiles all three and runs Driver (javac/java required)

Scenario tips: set m.manifest.put("com:fileName", …) / ("agr:<CP>", …) before Init; before each check function
that follows an AVI/ARI call set m.apiOK / m.apiMsg; call list-loop body functions once per simulated row with
that row's field values; run the real sample file and every error path; keep the output with the delivery.
"""
import json, os, re, subprocess, sys

spec = json.load(open(sys.argv[1]))
d = sys.argv[2]
os.makedirs(d, exist_ok=True)

BASE = r'''
import java.util.*;
class MeCError extends RuntimeException { MeCError(String s) { super(s); } MeCError(String s, Throwable t) { super(s, t); } }
class IONToolbox {
  static String rightTrim(String s) { return s == null ? null : s.replaceAll("\\s+$", ""); }
  static boolean isEmpty(String s) { return s == null || s.trim().isEmpty(); }
  static String formatCompany(String s) { return s == null ? "" : s.trim(); }
  static String formatDivision(String s) { return s == null ? "" : s.trim(); }
  static String getAccountingEntityId(String c, String d) { return c + "_" + (d == null ? "" : d); }
  static String normalizeXMLDateTime(String s) { return s; }
  static String createSyncActionCode(String s) { return "D".equals(s) ? "Delete" : "C".equals(s) ? "Add" : "Replace"; }
  static String createProcessActionCode(String s) { return "Change"; }
}
class DataTranslator {
  DataTranslator(Map<String, String> m, String a, String b, String c, String d, String e) {}
  String toMessage(String a, String b, String c, String d, String e, String f, String g) { return c; }
}
class ManifestConstants {
  static final String MAP_ION_BOD_TYPE = "map:ionBODType", MAP_ION_ACCOUNTING_ENTITY = "map:ionAccountingEntity",
    MAP_ION_TO_LOGICAL_ID = "map:ionToLogicalId", MAP_ION_DOCUMENT_ID = "map:ionDocumentId", MAP_ION_TENANT_ID = "map:ionTenantId",
    COM_FILENAME = "com:fileName", MAP_ION_CUSTOM = "map:ionCustom:", MAP_PARTNER = "map:partner", MAP_ION_DOCUMENT_NAME = "map:ionDocumentName";
}
abstract class MapBase {
  Map<String, String> manifest = new HashMap<String, String>();
  Map<String, String> outs = new LinkedHashMap<String, String>();
  List<String> log = new ArrayList<String>();
  boolean apiOK = true; String apiMsg = ""; String aborted = null; long slept = 0;
  void logDebug(String s) {} void logInfo(String s) { log.add("INFO " + s); } void logWarn(String s) { log.add("WARN " + s); }
  void logError(String s) { log.add("ERROR " + s); }
  void abort() { aborted = "abort()"; } void abort(String s) { aborted = s; }
  void sleep(long ms) { slept += ms; }
  boolean isLastAPICallOK() { return apiOK; } String getLastAPIMessage() { return apiMsg; }
  String getLastMIProgram() { return ""; } String getLastTransaction() { return ""; }
  String getManifestInfo(String k) { return manifest.get(k); } void setManifestInfo(String k, String v) { manifest.put(k, v); }
  Map<String, String> getManifestMap() { return manifest; }
  String getSystemEnvironmentCode() { return "Test"; } String getFromLogicalID() { return "lid://infor.m3.m3"; }
  String getMappingVersion() { return "1.0"; } String getBEVersion() { return "16.0"; } String getMapUUID() { return "00000000-0000-0000-0000-000000000000"; }
}
'''


def walk(items):
    for it in items:
        if "loop" in it:
            yield from walk(it["body"])
        else:
            yield it


# ---------- Map.java ----------
body = []
for v in spec.get("variables", []):
    t = v.get("type", "String")
    body.append(f"  {t} {v['name']} = {v.get('init', chr(34) * 2 if t == 'String' else '0')};")
for c in spec.get("constants", []):
    body.append(f"  final String {c['name']} = {c['value']};")
names = {}
for it in walk(spec["sequence"]):
    k = "java" if "java" in it else "bool" if "bool" in it else None
    if not k:
        continue
    n = it[k]
    names[n] = names.get(n, 0) + 1
    mname = n if names[n] == 1 else f"{n}_{names[n]}"
    it["_m"] = mname
    types = it.get("types", {})
    ins = ", ".join(f"{types.get(p, 'String')} {p}" for p in (it.get("in") or {}))
    outs = list((it.get("out") or {}))
    code = it["code"] if isinstance(it["code"], str) else "\n".join(it["code"])
    if k == "java":
        body.append(f"  void {mname}({ins}) {{\n" + "".join(f"    {types.get(p, 'String')} {p} = null;\n" for p in outs) + code + "\n"
                    + "".join(f"    outs.put(\"{n}.{p}\", String.valueOf({p}));\n" for p in outs) + "  }")
    else:
        body.append(f"  boolean {mname}({ins}) {{\n{code}\n  }}")
open(os.path.join(d, "MapBase.java"), "w").write(BASE)
open(os.path.join(d, "MapSim.java"), "w").write("import java.util.*;\nclass MapSim extends MapBase {\n" + "\n".join(body) + "\n}\n")


# ---------- Driver.java skeleton ----------
def arg(src):
    if src is None:
        return "null"
    if isinstance(src, list):
        src = src[0]
    if src.startswith("$"):
        return "m." + src[1:]
    if src.startswith("#"):
        return "m." + src[1:]
    if src.startswith("IN:"):
        return f"\"\" /* {src} */"
    return f"m.outs.get(\"{src}\") /* function/API output */"


def emit(items, ind, out):
    for it in items:
        p = "    " * ind
        if "loop" in it:
            ctl = it.get("ctl")
            first = it["body"][0] if it["body"] else {}
            out.append(f"{p}// {it.get('cond', 'WT')} {it['loop']}" + (f"  emits {it['emits']}" if it.get("emits") else ""))
            if ctl:
                out.append(f"{p}for (String[] row : new String[0][] /* rows of {ctl} */) {{")
                emit(it["body"], ind + 1, out)
            elif "bool" in first:
                kw = "if" if it.get("cond") == "IT" else "while"
                out.append(f"{p}{kw} (m.{first['_m']}({', '.join(arg(s) for s in (first.get('in') or {}).values())})) {{")
                emit(it["body"][1:], ind + 1, out)
            else:
                out.append(f"{p}for (int r = 0; r < 0 /* simulated rows of {first.get('api', '?')} */; r++) {{  // set m.apiOK per row")
                emit(it["body"], ind + 1, out)
            out.append(f"{p}}}")
        elif "api" in it:
            o = ", ".join(it.get("out") or {}) or "-"
            out.append(f"{p}// API {it['api']} [{it.get('mode', 'AVM')}] in: {', '.join(f'{k}={v}' for k, v in (it.get('in') or {}).items())}")
            out.append(f"{p}m.apiOK = true; m.apiMsg = \"\";   // simulate the result; outputs used later: {o}")
        elif "settings" in it:
            out.append(f"{p}// M3 Settings {it['settings']}")
        elif "assign" in it:
            out.append(f"{p}// Assign {it['assign']}")
        else:
            k = "java" if "java" in it else "bool"
            a = ", ".join(arg(s) for s in (it.get("in") or {}).values())
            out.append(f"{p}m.{it['_m']}({a});")
            for prm, tgts in (it.get("out") or {}).items():
                for t in tgts:
                    if t.startswith("$"):
                        out.append(f"{p}m.{t[1:]} = m.outs.get(\"{it[k]}.{prm}\");")


lines = []
emit(spec["sequence"], 2, lines)
drv = ("import java.util.*;\npublic class Driver {\n  public static void main(String[] a) {\n    MapSim m = new MapSim();\n"
       "    // m.manifest.put(\"com:fileName\", \"…\"); m.manifest.put(\"agr:<ControlProperty>\", \"…\");\n"
       "    try {\n"
       + "\n".join(lines) + "\n    } catch (MeCError e) {\n      System.out.println(\"MeCError (message failed): \" + e.getMessage());\n"
       "    } catch (RuntimeException e) {\n      System.out.println(\"Runtime exception: \" + e);\n    }\n    System.out.println(\"outs: \" + m.outs);\n    System.out.println(\"aborted: \" + m.aborted + \"  log: \" + m.log);\n  }\n}\n")
open(os.path.join(d, "Driver.java"), "w").write(drv)
print(f"wrote {d}/MapSim.java ({len([b for b in body if '(' in b])} functions), MapBase.java, Driver.java")

if "--run" in sys.argv:
    files = [os.path.join(d, f) for f in ("MapBase.java", "MapSim.java", "Driver.java")]
    r = subprocess.run(["javac", "-nowarn", "-d", d] + files, capture_output=True, text=True)
    err = "\n".join(l for l in r.stderr.splitlines() if not l.startswith("Picked up JAVA_TOOL_OPTIONS"))
    if r.returncode:
        print(err); sys.exit(1)
    r = subprocess.run(["java", "-cp", d, "Driver"], capture_output=True, text=True)
    print(r.stdout + "\n".join(l for l in r.stderr.splitlines() if not l.startswith("Picked up JAVA_TOOL_OPTIONS")))
