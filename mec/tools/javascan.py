"""Scan live (non-comment) Java in each map for risky / non-whitelisted constructs and IEC API usage."""
import sys, os, re, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapdump import load, parse

def strip_comments(code):
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    code = re.sub(r"//[^\n]*", "", code)
    return code

RISKY = {
    "jdbc": r"java\.sql\.|SQLServerDriver|DriverManager",
    "file_io": r"java\.io\.File|java\.nio\.file|FileInputStream|FileOutputStream|FileWriter",
    "DocServer": r"com\.intentia\.ec\.server\.DocServer",
    "System.out": r"System\.out\.",
    "cat.log": r"\bcat\.(debug|info|warn|error)",
    "Thread.sleep": r"Thread\.sleep",
    "http": r"java\.net\.|HttpURLConnection|URL\(",
    "Runtime": r"Runtime\.getRuntime|ProcessBuilder",
    "reflection": r"getClass\(\)|Class\.forName",
    "xml_dom": r"javax\.xml|org\.w3c\.dom",
    "mail": r"javax\.mail",
    "strUUID": r"\bstrUUID\b",
    "printStackTrace": r"printStackTrace",
}
API = ["getMapUUID", "getManifestInfo", "setManifestInfo", "getManifestMap", "getIONAppAreaManifestMap", "getIONManifestMap",
       "isLastAPICallOK", "getLastAPIMessage", "getLastMIProgram", "getLastTransaction", "getSystemEnvironmentCode",
       "getFromLogicalID", "getToLogicalID", "getMappingVersion", "getBEVersion", "abort", "MeCError",
       "IONToolbox", "IONApplicationArea", "DataTranslator", "MECDataTranslator", "StringReplacer", "logDebug", "logInfo", "logWarn", "logError",
       "getCompanyFromAccountingEntityId", "getDivisionFromAccountingEntityId", "getM3AccountingEntityId", "SortingStructure", "DateTimeConverter",
       "getAgreementProperty", "getControlProperty", "setSkip", "getConstant"]

root = sys.argv[1]
tot = collections.Counter(); api_tot = collections.Counter(); per = {}
for n in sorted(os.listdir(root)):
    m = parse(load(os.path.join(root, n, n + ".map")))
    code = "\n".join(m["java"].values())
    live = strip_comments(code)
    hits = {k: len(re.findall(v, live)) for k, v in RISKY.items()}
    hits = {k: v for k, v in hits.items() if v}
    per[n] = hits
    for k in hits: tot[k] += 1
    for a in API:
        if re.search(r"\b" + a + r"\b", live): api_tot[a] += 1
print("maps with risky constructs in LIVE code:")
for k, v in tot.most_common(): print(f"  {v:3d} maps  {k}")
print("\nIEC API usage (maps using, live code):")
for k, v in api_tot.most_common(): print(f"  {v:3d}  {k}")
print("\nper map risky:")
for n, h in per.items():
    if h: print(f"  {n[:60]:60} {h}")
# collect IONToolbox / IONApplicationArea methods
meth = collections.Counter()
for n in sorted(os.listdir(root)):
    m = parse(load(os.path.join(root, n, n + ".map")))
    live = strip_comments("\n".join(m["java"].values()))
    for x in re.findall(r"\b(IONToolbox\.\w+|aa\.\w+|dt\w*\.\w+\(|strRep\.\w+|ManifestConstants\.\w+)", live):
        meth[x] += 1
print("\nhelper methods:")
for k, v in meth.most_common(80): print(f"  {v:4d} {k}")
