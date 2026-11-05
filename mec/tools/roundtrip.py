import sys, os, difflib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapmodel import read_map, write_map
root = sys.argv[1]; ok = 0; bad = []
for n in sorted(os.listdir(root)):
    p = os.path.join(root, n, n + ".map")
    orig = open(p, "rb").read()
    new = write_map(read_map(p))
    if new == orig: ok += 1
    else: bad.append((n, orig, new))
print("identical:", ok, "different:", len(bad))
for n, o, w in bad[:3]:
    a = o.decode("utf-16").splitlines(); b = w.decode("utf-16").splitlines()
    d = list(difflib.unified_diff(a, b, lineterm="", n=1))
    print("==", n, len(d)); print("\n".join(d[:30]))
