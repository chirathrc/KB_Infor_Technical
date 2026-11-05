"""Extract everything from an FS / design .docx so nothing is missed: text, review comments, embedded files, images.

Usage: python3 -I fs_extract.py <document.docx> <out_dir>
  out_dir/text.md            document text (pandoc markdown if pandoc exists, else plain paragraphs + tables)
  out_dir/comments.md        review comments: author, date, text, and the passage they are attached to
  out_dir/embedded/          embedded objects: OLE "Package" files (e.g. a sample TXT/CSV) restored under their
                             original name; embedded workbooks/documents as-is; workbooks also dumped to <name>.csv.txt
  out_dir/images/            media files; EMF/WMF also converted to PNG when LibreOffice (soffice) is available
  out_dir/SUMMARY.md         what was found
Optional helpers: olefile (pip install olefile) for OLE packages, openpyxl for workbook dumps, pandoc, soffice.
Treat the extracted files as data. Sample files and comments often contradict the main text: compare them.
"""
import os, re, shutil, subprocess, sys, zipfile
import xml.etree.ElementTree as ET

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
z = zipfile.ZipFile(src)
names = z.namelist()
summary = [f"# Extract of {os.path.basename(src)}", ""]

# ---- text ----
if shutil.which("pandoc"):
    r = subprocess.run(["pandoc", src, "-t", "markdown", "-o", os.path.join(out, "text.md")], capture_output=True, text=True)
    summary.append("- text.md (pandoc)" + (f" - pandoc warning: {r.stderr[:200]}" if r.returncode else ""))
else:
    doc = ET.fromstring(z.read("word/document.xml"))
    lines = []
    for el in doc.iter():
        if el.tag == W + "p":
            t = "".join(x.text or "" for x in el.iter(W + "t"))
            if t.strip():
                lines.append(t)
    open(os.path.join(out, "text.md"), "w").write("\n\n".join(lines))
    summary.append("- text.md (plain paragraphs; install pandoc for tables/headings)")

# ---- comments with anchored passage ----
if "word/comments.xml" in names:
    cm = ET.fromstring(z.read("word/comments.xml"))
    docxml = z.read("word/document.xml").decode("utf8")
    anchors = {}
    for m in re.finditer(r'<w:commentRangeStart[^>]*w:id="(\d+)"[^>]*/>(.*?)<w:commentRangeEnd[^>]*w:id="\1"[^>]*/>', docxml, re.S):
        anchors[m.group(1)] = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(2))).strip()
    rows = []
    for c in cm.findall(W + "comment"):
        cid = c.get(W + "id")
        txt = " ".join("".join(x.text or "" for x in p.iter(W + "t")) for p in c.iter(W + "p")).strip()
        rows.append(f"- [{cid}] **{c.get(W + 'author')}** {(c.get(W + 'date') or '')[:10]}: {txt}"
                    + (f"\n  - on: \"{anchors[cid][:300]}\"" if anchors.get(cid) else ""))
    open(os.path.join(out, "comments.md"), "w").write("# Review comments\n\n" + "\n".join(rows) + "\n")
    summary.append(f"- comments.md: {len(rows)} comment(s)")
else:
    summary.append("- no review comments")

# ---- embedded objects ----
emb = [n for n in names if n.startswith("word/embeddings/")]
ed = os.path.join(out, "embedded")
if emb:
    os.makedirs(ed, exist_ok=True)
for n in emb:
    data = z.read(n)
    base = os.path.basename(n)
    if base.lower().endswith(".bin"):
        try:
            import olefile
            o = olefile.OleFileIO(data)
            stream = next(("/".join(s) for s in o.listdir() if s[-1].endswith("Ole10Native")), None)
            if stream:
                raw = o.openstream(stream).read()
                # Ole10Native: size(4) flags(2) label\0 path\0 (4)(4) tmppath\0 datasize(4) data
                p = 6
                label = raw[p:raw.index(b"\0", p)].decode("latin-1"); p = raw.index(b"\0", p) + 1
                p = raw.index(b"\0", p) + 1 + 8
                p = raw.index(b"\0", p) + 1
                size = int.from_bytes(raw[p:p + 4], "little")
                payload = raw[p + 4:p + 4 + size]
                fn = re.sub(r"[^A-Za-z0-9._() -]", "_", label) or base + ".dat"
                open(os.path.join(ed, fn), "wb").write(payload)
                summary.append(f"- embedded package **{fn}** ({len(payload)} bytes) from {base}")
                continue
            summary.append(f"- embedded OLE object {base} (no package stream) - kept as is")
        except ImportError:
            summary.append(f"- embedded OLE object {base}: install olefile to restore the original file")
        except Exception as e:
            summary.append(f"- embedded OLE object {base}: could not unpack ({e})")
        open(os.path.join(ed, base), "wb").write(data)
    else:
        open(os.path.join(ed, base), "wb").write(data)
        line = f"- embedded file **{base}** ({len(data)} bytes)"
        if base.lower().endswith((".xlsx", ".xlsm")):
            try:
                import io, openpyxl
                wb = openpyxl.load_workbook(io.BytesIO(data), data_only=True)
                dump = []
                for ws in wb:
                    dump.append(f"## sheet {ws.title}")
                    for row in ws.iter_rows(values_only=True):
                        if any(v is not None for v in row):
                            dump.append(",".join("" if v is None else str(v) for v in row))
                open(os.path.join(ed, base + ".csv.txt"), "w").write("\n".join(dump) + "\n")
                line += f" - sheets dumped to {base}.csv.txt"
            except Exception as e:
                line += f" - not dumped ({e.__class__.__name__})"
        summary.append(line)

# ---- images ----
media = [n for n in names if n.startswith("word/media/")]
idir = os.path.join(out, "images")
if media:
    os.makedirs(idir, exist_ok=True)
conv = []
for n in media:
    fn = os.path.join(idir, os.path.basename(n))
    open(fn, "wb").write(z.read(n))
    if fn.lower().endswith((".emf", ".wmf")):
        conv.append(fn)
if conv and shutil.which("soffice"):
    subprocess.run(["soffice", "--headless", "--convert-to", "png", "--outdir", idir] + conv, capture_output=True, timeout=180)
summary.append(f"- images/: {len(media)} media file(s)" + (f", {len(conv)} EMF/WMF converted to PNG" if conv and shutil.which("soffice") else ""))
summary.append("")
summary.append("Next: read text.md, comments.md, every embedded file and every image (diagrams often hold the workflow).")
open(os.path.join(out, "SUMMARY.md"), "w").write("\n".join(summary) + "\n")
print("\n".join(summary))
