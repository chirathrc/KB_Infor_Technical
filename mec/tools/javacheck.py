"""Compile every Java function of a mapping spec against stubs of the MEC mapping API (syntax, types, names).

Usage: python3 -I javacheck.py <spec.json> [<work_dir>]      -> prints "JAVA OK - n functions compiled" or javac errors
The stubs cover the API surface documented in 04; a "cannot find symbol" on an MEC class/method usually means the
code uses something outside that surface (check the whitelist) - or a stub to add here.
Needs a JDK (javac)."""
import json, os, subprocess, sys, tempfile

spec = json.load(open(sys.argv[1]))
STUBS = r'''
class MeCError extends RuntimeException { MeCError(String s) { super(s); } MeCError(String s, Throwable t) { super(s, t); } }
class IONToolbox {
  static String rightTrim(String s) { return s; }
  static boolean isEmpty(String s) { return s == null || s.isEmpty(); }
  static String formatCompany(String s) { return s; }
  static String formatDivision(String s) { return s; }
  static String getAccountingEntityId(String c, String d) { return c + "_" + (d == null ? "" : d); }
  static String normalizeXMLDateTime(String s) { return s; }
  static String createSyncActionCode(String s) { return "Replace"; }
  static String createProcessActionCode(String s) { return "Change"; }
}
class MECDataTranslator { MECDataTranslator(java.util.Map<String, String> m, String a, String b, String c, String d, String e, String f, String g, char h) {}
  String toMessage(String a, String b, String c, String d, String e, String f, String g) { return ""; } }
class IONApplicationArea { IONApplicationArea(java.util.Map<String, String> m, String id) {} void putValue(String k, String v) {} String getValue(String k) { return ""; } }
class DataTranslator {
  DataTranslator(java.util.Map<String, String> m, String a, String b, String c, String d, String e) {}
  String toMessage(String a, String b, String c, String d, String e, String f, String g) { return ""; }
}
class ManifestConstants {
  static final String MAP_ION_BOD_TYPE = "map:ionBODType", MAP_ION_ACCOUNTING_ENTITY = "map:ionAccountingEntity",
    MAP_ION_TO_LOGICAL_ID = "map:ionToLogicalId", MAP_ION_DOCUMENT_ID = "map:ionDocumentId", MAP_ION_TENANT_ID = "map:ionTenantId",
    COM_FILENAME = "com:fileName", MAP_ION_CUSTOM = "map:ionCustom:", MAP_PARTNER = "map:partner", MAP_M3BE_VERSION = "map:m3beVersion",
    MAP_ION_DOCUMENT_NAME = "map:ionDocumentName", CMN_TENANTID = "cmn:tenantId";
}
abstract class MapBase {
  void logDebug(String s) {} void logInfo(String s) {} void logWarn(String s) {} void logError(String s) {}
  void abort() {} void abort(String s) {} void sleep(long ms) {}
  boolean isLastAPICallOK() { return true; } String getLastAPIMessage() { return ""; } String getLastMIProgram() { return ""; } String getLastTransaction() { return ""; }
  String getManifestInfo(String k) { return null; } void setManifestInfo(String k, String v) {}
  java.util.Map<String, String> getManifestMap() { return null; } java.util.Map<String, String> getIONAppAreaManifestMap() { return null; }
  void logError(String s, Throwable t) {} void logDiag(String s) {}
  String getSystemEnvironmentCode() { return ""; } String getFromLogicalID() { return ""; } String getMappingVersion() { return ""; }
  String getBEVersion() { return ""; } String getMapUUID() { return ""; }
}
'''


def walk(items):
    for it in items:
        if "loop" in it:
            yield from walk(it["body"])
        else:
            yield it


body = []
for v in spec.get("variables", []):
    t = v.get("type", "String")
    init = v.get("init", '""' if t == "String" else "0")
    body.append(f"  {t} {v['name']} = {init};")
for c in spec.get("constants", []):
    body.append(f"  final String {c['name']} = {c['value']};")
n = 0
for it in walk(spec["sequence"]):
    kind = "java" if "java" in it else "bool" if "bool" in it else None
    if not kind:
        continue
    n += 1
    types = it.get("types", {})
    ins = ", ".join(f"{types.get(p, 'String')} {p}" for p in (it.get("in") or {}))
    outs = "".join(f"    {types.get(p, 'String')} {p} = null;\n" for p in (it.get("out") or {}))
    code = it["code"] if isinstance(it["code"], str) else "\n".join(it["code"])
    ret = "void" if kind == "java" else "boolean"
    body.append(f"  {ret} f{n}_{it.get(kind)}({ins}) {{\n{outs}{code}\n  }}")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapbuild import scanner_hits, _strip_comments
_rej = []
for line in body:
    for msg in scanner_hits(_strip_comments(line)):
        _rej.append(f"{line.strip().split('(')[0][:60]}: {msg}")
for r_ in _rej:
    print("REJECTED BY PUBLISH SCANNER:", r_)
src = STUBS + "public class MapCheck extends MapBase {\n" + "\n".join(body) + "\n}\n"
d = sys.argv[2] if len(sys.argv) > 2 else tempfile.mkdtemp()
os.makedirs(d, exist_ok=True)
open(os.path.join(d, "MapCheck.java"), "w").write(src)
r = subprocess.run(["javac", "-Xlint:all", "-d", d, os.path.join(d, "MapCheck.java")], capture_output=True, text=True)
print("\n".join(l for l in (r.stdout + r.stderr).splitlines() if not l.startswith("Picked up JAVA_TOOL_OPTIONS")))
print(("JAVA OK" if r.returncode == 0 and not _rej else "JAVA FAILED"), f"- {n} functions compiled"
      + (f", {len(_rej)} scanner rejection(s)" if _rej else ""))
