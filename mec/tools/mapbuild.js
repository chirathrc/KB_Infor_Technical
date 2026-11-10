#!/usr/bin/env node
/**
 * Compile a mapping spec (JSON) into an importable IEC Mapper unit:
 *   <Name>.map + hashed XSDs + mapping.properties, zipped as <Name>.zap.
 * Applies every rule verified in mec/guides/01-zap-and-map-file-format.md.
 *
 * Usage:
 *   node mapbuild.js <spec.json> <out_dir> [--catalog <mi_catalog_full.json.gz>]
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');

// CRC32 table
const crcTable = new Int32Array(256);
for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
}

function getCrc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return ((crc ^ (-1)) >>> 0).toString(16);
}

function jhash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return h;
}

function readXmlFile(filePath) {
    const raw = fs.readFileSync(filePath);
    let str;
    if (raw[0] === 0xFE && raw[1] === 0xFF) {
        str = raw.swap16().toString('utf16le');
    } else if (raw[0] === 0xFF && raw[1] === 0xFE) {
        str = raw.toString('utf16le');
    } else if (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) {
        str = raw.slice(3).toString('utf8');
    } else {
        str = raw.toString('utf8');
    }
    return str;
}

function parseXml(xmlStr) {
    xmlStr = xmlStr.replace(/<!--[\s\S]*?-->/g, '').replace(/<\?xml[\s\S]*?\?>/g, '').trim();
    let pos = 0;
    
    function parseElement() {
        while (pos < xmlStr.length && /\s/.test(xmlStr[pos])) pos++;
        if (pos >= xmlStr.length) return null;
        if (xmlStr.startsWith('</', pos)) return null;

        const tagStart = xmlStr.indexOf('<', pos);
        if (tagStart === -1) return null;
        if (xmlStr.slice(tagStart, tagStart + 2) === '</') return null;

        const tagEnd = xmlStr.indexOf('>', tagStart);
        if (tagEnd === -1) return null;
        
        const isSelfClosing = xmlStr[tagEnd - 1] === '/';
        const tagContent = xmlStr.slice(tagStart + 1, isSelfClosing ? tagEnd - 1 : tagEnd).trim();
        
        const spaceIdx = tagContent.search(/\s/);
        const fullTag = spaceIdx === -1 ? tagContent : tagContent.slice(0, spaceIdx);
        const tag = fullTag.split(':').pop();
        
        const attrs = {};
        const attrStr = spaceIdx === -1 ? '' : tagContent.slice(spaceIdx);
        const attrRegex = /([a-zA-Z0-9_:-]+)\s*=\s*"([^"]*)"/g;
        let match;
        while ((match = attrRegex.exec(attrStr)) !== null) {
            attrs[match[1].split(':').pop()] = match[2];
        }
        
        pos = tagEnd + 1;
        const children = [];
        if (!isSelfClosing) {
            while (pos < xmlStr.length) {
                while (pos < xmlStr.length && /\s/.test(xmlStr[pos])) pos++;
                if (xmlStr.startsWith('</', pos)) {
                    const closeEnd = xmlStr.indexOf('>', pos);
                    pos = closeEnd + 1;
                    break;
                }
                const child = parseElement();
                if (child) children.push(child);
                else pos++;
            }
        }
        return { tag, attrs, children };
    }
    
    return parseElement();
}

class Schema {
    constructor(filePath) {
        this.elements = {};
        this.types = {};
        this.groups = {};
        this.agroups = {};
        this.targetNamespace = '';
        this.files = [];
        this._load(path.resolve(filePath), new Set());
    }

    _load(filePath, seen) {
        if (seen.has(filePath) || !fs.existsSync(filePath)) return;
        seen.add(filePath);
        this.files.push(filePath);
        const xml = readXmlFile(filePath);
        const root = parseXml(xml);
        if (!root) return;
        if (!this.targetNamespace && root.attrs.targetNamespace) {
            this.targetNamespace = root.attrs.targetNamespace;
        }
        for (const ch of root.children) {
            const name = ch.attrs.name;
            if (ch.tag === 'element' && name) this.elements[name] = ch;
            else if ((ch.tag === 'complexType' || ch.tag === 'simpleType') && name) this.types[name] = ch;
            else if (ch.tag === 'group' && name) this.groups[name] = ch;
            else if (ch.tag === 'attributeGroup' && name) this.agroups[name] = ch;
            else if (['include', 'import', 'redefine'].includes(ch.tag) && ch.attrs.schemaLocation) {
                const childPath = path.join(path.dirname(filePath), ch.attrs.schemaLocation);
                this._load(childPath, seen);
            }
        }
    }

    _deref(el) {
        if (el.attrs.ref) {
            const localRef = el.attrs.ref.split(':').pop();
            return this.elements[localRef] || el;
        }
        return el;
    }

    typeOf(el) {
        el = this._deref(el);
        const t = el.attrs.type;
        if (t) {
            const localType = t.split(':').pop();
            return [localType, this.types[localType] || null];
        }
        const ct = el.children.find(c => c.tag === 'complexType' || c.tag === 'simpleType');
        return ['?', ct || null];
    }

    _walk(node, elems, attrs, depth = 0) {
        if (!node || depth > 40) return;
        for (const ch of node.children) {
            if (ch.tag === 'element') {
                const d = this._deref(ch);
                const n = d.attrs.name || ch.attrs.ref.split(':').pop();
                elems.push([n, ch]);
            } else if (['sequence', 'choice', 'all'].includes(ch.tag)) {
                this._walk(ch, elems, attrs, depth + 1);
            } else if (ch.tag === 'group' && ch.attrs.ref) {
                const g = this.groups[ch.attrs.ref.split(':').pop()];
                this._walk(g, elems, attrs, depth + 1);
            } else if (['complexContent', 'simpleContent'].includes(ch.tag)) {
                this._walk(ch, elems, attrs, depth + 1);
            } else if (['extension', 'restriction'].includes(ch.tag)) {
                const baseName = ch.attrs.base ? ch.attrs.base.split(':').pop() : null;
                const base = baseName ? this.types[baseName] : null;
                if (base && base.tag === 'complexType') {
                    this._walk(base, elems, attrs, depth + 1);
                }
                this._walk(ch, elems, attrs, depth + 1);
            } else if (ch.tag === 'attribute') {
                const n = ch.attrs.name || (ch.attrs.ref ? ch.attrs.ref.split(':').pop() : '');
                attrs.push([n, ch]);
            } else if (ch.tag === 'attributeGroup' && ch.attrs.ref) {
                const ag = this.agroups[ch.attrs.ref.split(':').pop()];
                this._walk(ag, elems, attrs, depth + 1);
            } else if (ch.tag === 'any') {
                elems.push(['WILDCARD', ch]);
            }
        }
    }

    children(el) {
        const [tname, tnode] = this.typeOf(el);
        const elems = [];
        const attrs = [];
        this._walk(tnode, elems, attrs);
        return [elems, attrs];
    }

    resolve(pathStr) {
        const m = pathStr.match(/^(\/[^\[]*)(?:\[@([^\]]+)\])?$/);
        if (!m) return [false, '?', [], `bad path syntax ${pathStr}`];
        const steps = m[1].split('/').filter(Boolean);
        const attr = m[2];
        if (!steps.length || !this.elements[steps[0]]) {
            return [false, '?', [], `root '${steps[0]}' not a global element`];
        }
        let el = this.elements[steps[0]];
        const key = [0];
        for (let i = 1; i < steps.length; i++) {
            const s = steps[i];
            const [elems] = this.children(el);
            let idx = elems.findIndex(([n]) => n === s);
            if (idx === -1 && elems.some(([n]) => n === 'WILDCARD')) {
                const widx = elems.findIndex(([n]) => n === 'WILDCARD');
                el = this.elements[s] || elems[widx][1];
                key.push(widx);
                continue;
            }
            if (idx === -1) {
                const avail = elems.slice(0, 25).map(([n]) => n).join(', ');
                return [false, '?', key, `'${s}' not under ${steps.slice(0, i).join('/')} (has: ${avail})`];
            }
            el = elems[idx][1];
            key.push(idx);
        }
        if (attr) {
            const [, attrs] = this.children(el);
            const idx = attrs.findIndex(([n]) => n === attr);
            if (idx === -1) {
                return [false, '?', key, `attribute @${attr} not found (has: ${attrs.map(([n]) => n).join(', ')})`];
            }
            const a = attrs[idx][1];
            const t = a.attrs.type ? a.attrs.type.split(':').pop() : '?';
            return [true, t, [...key, -1, idx], ''];
        }
        const [tname] = this.typeOf(el);
        return [true, tname, key, ''];
    }

    isRepeating(pathStr) {
        const steps = pathStr.split('[')[0].split('/').filter(Boolean);
        if (!steps.length || !this.elements[steps[0]]) return false;
        let el = this.elements[steps[0]];
        for (let i = 1; i < steps.length; i++) {
            const [elems] = this.children(el);
            const hit = elems.find(([n]) => n === steps[i]);
            if (!hit) return false;
            el = hit[1];
        }
        const mo = el.attrs.maxOccurs || (this._deref(el).attrs.maxOccurs);
        return mo === 'unbounded' || (mo && parseInt(mo, 10) > 1);
    }
}

function toUtf16BE(str) {
    const buf = Buffer.alloc(2 + str.length * 2);
    buf[0] = 0xFE;
    buf[1] = 0xFF;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        buf[2 + i * 2] = (code >> 8) & 0xFF;
        buf[3 + i * 2] = code & 0xFF;
    }
    return buf;
}

function toUtf16Text(filePath) {
    const raw = fs.readFileSync(filePath);
    let txt;
    if (raw[0] === 0xFE && raw[1] === 0xFF) {
        txt = raw.swap16().toString('utf16le');
    } else if (raw[0] === 0xFF && raw[1] === 0xFE) {
        txt = raw.toString('utf16le');
    } else if (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) {
        txt = raw.slice(3).toString('utf8');
    } else {
        txt = raw.toString('utf8');
    }
    txt = txt.replace(/(<\?xml[^>]*encoding=")[^"]*(")/, '$1UTF-16$2');
    return txt;
}

function writeSchemas(spec, baseDir, outDir) {
    const done = {};
    function emit(filePath) {
        const absPath = path.resolve(filePath);
        if (done[absPath]) return done[absPath];
        let txt = toUtf16Text(absPath);
        const schemaLocMatches = [...txt.matchAll(/schemaLocation="([^"]+)"/g)];
        for (const m of schemaLocMatches) {
            const loc = m[1];
            const childPath = path.join(path.dirname(absPath), loc);
            if (fs.existsSync(childPath)) {
                const emittedName = emit(childPath);
                txt = txt.replace(`schemaLocation="${loc}"`, `schemaLocation="${emittedName}"`);
            }
        }
        const data = toUtf16BE(txt);
        const stem = path.basename(absPath, path.extname(absPath)).replace(/_[0-9a-f]{5,8}$/, '');
        const hash = getCrc32(data);
        const name = `${stem}_${hash}.xsd`;
        fs.writeFileSync(path.join(outDir, name), data);
        done[absPath] = name;
        return name;
    }

    for (const side of ['schema_in', 'schema_out']) {
        const sc = spec[side];
        if (sc) {
            sc._file = emit(path.join(baseDir, sc.xsd));
        }
    }
}

function mapperDesc(label, length, typ, mandatory = false) {
    const t = typ === 'N' ? 'Numeric' : 'Alpha';
    return `${label}, size is ${length}, type is ${t}` + (mandatory ? '(mandatory)' : '');
}

const SECTION_ORDER = [
    'MappingMeta', 'Format', 'SequenceList', 'Loops', 'Functions', 'Parameters', 'Implementations',
    'Constants', 'Variables', 'SchemaIn', 'SchemaOut', 'Links', 'Properties', 'Namespaces', 'Replacements'
];

const FIELDS = {
    Sequence: [['Number', null], ['ID_S', 'IDREF'], ['Type', null]],
    Loop: [['Name', null], ['Condition', null], ['Description', null], ['ID_L', 'ID']],
    Function: [['IsResuable', null], ['PATH', null], ['Name', null], ['Type', null], ['Description', null], ['ID_F', 'ID']],
    Parameter: [['Position', null], ['Name', null], ['Type', null], ['Description', null], ['DataType', null],
                ['Mandatory', null], ['ID_F', 'IDREF'], ['ID_P', 'ID']],
    Constant: [['Name', null], ['Value', null], ['Type', null], ['Description', null], ['ID_F', 'ID']],
    Variable: [['Name', null], ['InitialValue', null], ['Type', null], ['Description', null], ['ID_V', 'ID']],
    RecordIn: [['PATH', null], ['ID_M', 'ID'], ['Type', null], ['FormattedPath', null]],
    RecordOut: [['PATH', null], ['ID_M', 'ID'], ['Type', null]],
    Link: [['InFrom', 'IDREF'], ['OutTo', 'IDREF'], ['SequenceIn', null], ['SequenceOut', null], ['Type', null]],
    Property: [['Type', null], ['ID_1', null], ['ID_2', null], ['Name', null], ['Value', null]],
    Namespace: [['ID_N', 'ID'], ['URI', null], ['Prefix', null], ['Schema', null]],
    Replacement: [['ID_R', 'ID'], ['Path', null], ['Sequence', null], ['Mandatory', null], ['Repetitive', null], ['ID_N', 'IDREF']]
};

const META_FIELDS = ['ID', 'File', 'Name', 'Standard', 'Namespace', 'Version', 'Description', 'Layout', 'ChangeDate'];
const SCHEMA_META_FIELDS = ['ID', 'File', 'Name', 'Namespace', 'Category', 'Version'];
const CONTAINERS = {
    SequenceList: 'Sequence', Loops: 'Loop', Functions: 'Function', Parameters: 'Parameter',
    Constants: 'Constant', Variables: 'Variable', Links: 'Link', Properties: 'Property',
    Namespaces: 'Namespace', Replacements: 'Replacement'
};

function escapeXml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function writeMap(model) {
    const out = ['<?xml version="1.0" encoding="UTF-16" standalone="yes"?>', '<DatabaseData>'];
    const I = '    ';

    function leaf(level, tag, val) {
        if (val === null || val === undefined || val === '') {
            out.push(`${I.repeat(level)}<${tag}></${tag}>`);
        } else {
            out.push(`${I.repeat(level)}<${tag}>${escapeXml(String(val))}</${tag}>`);
        }
    }

    function rows(level, item, rowlist, fields) {
        for (const row of rowlist) {
            out.push(`${I.repeat(level)}<${item}>`);
            const present = row._present || fields.map(f => f[0]);
            const fmap = Object.fromEntries(fields);
            for (const f of present) {
                const attr = fmap[f];
                if (attr) {
                    out.push(`${I.repeat(level + 1)}<${f} ${attr}="${escapeXml(String(row[f] || ''))}"/>`);
                } else {
                    leaf(level + 1, f, row[f]);
                }
            }
            out.push(`${I.repeat(level)}</${item}>`);
        }
    }

    for (const sec of model._sections || SECTION_ORDER) {
        if (sec === 'MappingMeta') {
            const mm = model.MappingMeta;
            out.push(`${I}<MappingMeta>`);
            for (const k of mm._order || [...META_FIELDS, 'SchemaIn', 'SchemaOut']) {
                if (k === 'SchemaIn' || k === 'SchemaOut') {
                    out.push(`${I.repeat(2)}<${k}>`);
                    for (const f of SCHEMA_META_FIELDS) {
                        leaf(3, f, mm[k][f]);
                    }
                    out.push(`${I.repeat(2)}</${k}>`);
                } else {
                    leaf(2, k, mm[k]);
                }
            }
            out.push(`${I}</MappingMeta>`);
        } else if (sec === 'Format') {
            leaf(1, 'Format', model.Format);
        } else if (sec === 'Implementations') {
            const impls = model.Implementations || [];
            if (!impls.length) {
                out.push(`${I}<Implementations/>`);
                continue;
            }
            out.push(`${I}<Implementations>`);
            for (const im of impls) {
                out.push(`${I.repeat(2)}<Implementation>`);
                out.push(`${I.repeat(3)}<Language IDREF="${im.IDREF}">${im.Language || 'Java'}</Language>`);
                if (im.Code !== null && im.Code !== undefined) {
                    out.push(`${I.repeat(3)}<![CDATA[${im.Code}]]>`);
                }
                out.push(`${I.repeat(2)}</Implementation>`);
            }
            out.push(`${I}</Implementations>`);
        } else if (sec === 'SchemaIn' || sec === 'SchemaOut') {
            const recs = model[sec] || [];
            if (!recs.length) {
                out.push(`${I}<${sec}/>`);
                continue;
            }
            out.push(`${I}<${sec}>`);
            rows(2, 'Record', recs, FIELDS[sec === 'SchemaIn' ? 'RecordIn' : 'RecordOut']);
            out.push(`${I}</${sec}>`);
        } else if (CONTAINERS[sec]) {
            const rl = model[sec] || [];
            if (!rl.length) {
                out.push(`${I}<${sec}/>`);
                continue;
            }
            out.push(`${I}<${sec}>`);
            rows(2, CONTAINERS[sec], rl, FIELDS[CONTAINERS[sec]]);
            out.push(`${I}</${sec}>`);
        }
    }
    out.push('</DatabaseData>');
    const text = out.join('\n') + '\n';
    return toUtf16BE(text);
}

class Builder {
    constructor(spec, baseDir, catalog) {
        this.spec = spec;
        this.base = baseDir;
        this.cat = catalog;
        this.warn = [];
        this.errors = [];
        this.seq = [];
        this.funcs = [];
        this.loops = [];
        this.params = [];
        this.links = [];
        this.in_recs = {};
        this.out_recs = {};
        this.byname = {};
        this.n = { F: 0, L: 0, I: 0, O: 0 };
        this.schemas = {};
        this.pending_in = [];
        this.pending_out = [];
        this.pending_ml = [];
        this.pending_lm = [];
        this.pending_assign = [];
    }

    loadSchema(side) {
        const sc = this.spec[side];
        if (!sc) return null;
        const p = path.join(this.base, sc.xsd);
        const s = new Schema(p);
        this.schemas[side] = s;
        const root = sc.root || Object.keys(s.elements)[0];
        if (!s.elements[root]) {
            throw new Error(`${side}: root element '${root}' not in ${sc.xsd}`);
        }
        sc.root = root;
        return s;
    }

    rec(ref) {
        const isSideIn = ref.startsWith('IN:');
        const side = isSideIn ? 'in' : 'out';
        const p = isSideIn ? ref.slice(3) : ref.slice(4);
        const recs = isSideIn ? this.in_recs : this.out_recs;
        if (recs[p]) return ['REC', side, p];
        const sch = this.schemas[isSideIn ? 'schema_in' : 'schema_out'];
        if (!sch) throw new Error(`${ref}: no schema declared`);
        const [ok, typ, key, msg] = sch.resolve(p);
        if (!ok) this.errors.push(`schema path ${ref}: ${msg}`);
        recs[p] = { id: null, type: typ, key };
        return ['REC', side, p];
    }

    addSeq(ident, typ) {
        const num = this.seq.length + 1;
        this.seq.push([num, ident, typ]);
        return num;
    }

    newFunc(item, ftype, name, fpath) {
        this.n.F++;
        const fid = `FID${this.n.F}`;
        const num = this.addSeq(fid, 'F');
        const code = Array.isArray(item.code) ? item.code.join('\n') : (item.code || '');
        const f = {
            fid, num, type: ftype, name, path: fpath,
            desc: item.desc || (['UV', 'UB'].includes(ftype) ? 'Please describe me' : ''),
            reusable: Boolean(item.reusable),
            code,
            in: [], out: [], item
        };
        this.funcs.push(f);
        this.byname[name] = f;
        if (item.id) this.byname[item.id] = f;
        return f;
    }

    addParam(f, io, name, desc = 'Please describe me', dtype = 'String', mand = false) {
        this.n[io]++;
        const pid = `${io === 'I' ? 'IID' : 'OID'}${this.n[io]}`;
        const list = io === 'I' ? f.in : f.out;
        const p = { pid, func: f, io, name, pos: list.length, desc, dtype, mand };
        list.push(p);
        this.params.push(p);
        return p;
    }

    walk(items, depth = 0) {
        for (const it of items) {
            if (it.loop) this.doLoop(it, depth);
            else if (it.java || it.bool) this.doJava(it);
            else if (it.api) this.doApi(it);
            else if (it.settings) this.doSettings(it);
            else if (it.assign) this.doAssign(it);
            else throw new Error(`unknown sequence item: ${JSON.stringify(it).slice(0, 120)}`);
        }
    }

    doJava(it) {
        const ftype = it.bool ? 'UB' : (it.kind || 'UV');
        const name = it.bool || it.java;
        const f = this.newFunc(it, ftype, name, '/implementations');
        const types = it.types || {};
        for (const [pn, src] of Object.entries(it.in || {})) {
            const p = this.addParam(f, 'I', pn, (it.pdesc || {})[pn] || 'Please describe me', types[pn] || 'String');
            const arr = Array.isArray(src) ? src : (src ? [src] : []);
            for (const s of arr) this.pending_in.push([p, s]);
        }
        for (const [pn, dsts] of Object.entries(it.out || {})) {
            const p = this.addParam(f, 'O', pn, (it.pdesc || {})[pn] || 'Please describe me', types[pn] || 'String');
            const arr = Array.isArray(dsts) ? dsts : (dsts ? [dsts] : []);
            for (const d of arr) this.pending_out.push([p, d]);
        }
    }

    doApi(it) {
        const key = it.api;
        const mode = (it.mode || 'AVM').toUpperCase();
        const [prog, trn] = key.split('/');
        const p = this.cat.programs[prog];
        let t = p && p.transactions[trn];
        if (it.fields) {
            const fx = it.fields;
            t = {
                desc: '', list: mode.startsWith('AR'), list_basis: 'spec',
                in: fx.in.map(f => [f.name, f.label || f.name, f.length || 10, Boolean(f.mandatory), f.type || 'A', 'spec']),
                out: fx.out.map(f => [f.name, f.label || f.name, f.length || 10, f.type || 'A']),
                raw_desc: {
                    ...Object.fromEntries(fx.in.filter(f => f.desc).map(f => ['I' + f.name, f.desc])),
                    ...Object.fromEntries(fx.out.filter(f => f.desc).map(f => ['O' + f.name, f.desc]))
                }
            };
        }
        if (!t) throw new Error(`API ${key} not in MI catalog`);
        const f = this.newFunc(it, mode, it.name || trn, `/${prog}/${trn}`);
        const pin = {};
        const raw = t.raw_desc || {};
        for (const [n, lab, ln, mand, typ] of t.in) {
            pin[n] = this.addParam(f, 'I', n, raw['I' + n] || mapperDesc(lab, ln, typ, mand), 'String', mand);
        }
        const pout = {};
        for (const [n, lab, ln, typ] of t.out) {
            pout[n] = this.addParam(f, 'O', n, raw['O' + n] || mapperDesc(lab, ln, typ), 'String', false);
        }
        for (const [fn, src] of Object.entries(it.in || {})) {
            if (!pin[fn]) {
                this.errors.push(`${key}: input field ${fn} does not exist`);
                continue;
            }
            const arr = Array.isArray(src) ? src : [src];
            for (const s of arr) this.pending_in.push([pin[fn], s]);
        }
        for (const [fn, dsts] of Object.entries(it.out || {})) {
            if (!pout[fn]) {
                this.errors.push(`${key}: output field ${fn} does not exist`);
                continue;
            }
            const arr = Array.isArray(dsts) ? dsts : [dsts];
            for (const d of arr) this.pending_out.push([pout[fn], d]);
        }
    }

    doSettings(it) {
        const f = this.newFunc(it, 'AS', it.name || 'M3 Settings', '/implementations');
        f.desc = '';
        for (const [pn, d] of [['Company', 'M3 Company'], ['Division', 'M3 Division']]) {
            const p = this.addParam(f, 'I', pn, d);
            const src = it.settings[pn];
            const arr = Array.isArray(src) ? src : (src ? [src] : []);
            for (const s of arr) this.pending_in.push([p, s]);
        }
    }

    doAssign(it) {
        const f = this.newFunc(it, 'ASN', it.name || 'Assign', '/Assign');
        f.desc = '';
        this.pending_assign.push([f, it.assign.from, it.assign.to]);
    }

    doLoop(it, depth) {
        this.n.L++;
        const lid = `LID${this.n.L}`;
        const cond = (it.cond || 'WT').toUpperCase();
        const lp = { lid, name: it.loop, cond, desc: it.desc || 'Please describe me' };
        this.loops.push(lp);
        lp.num = this.addSeq(lid, 'LB');
        const body = it.body || [];
        const ctl = it.ctl;
        const firstIndex = this.funcs.length;
        this.walk(body, depth + 1);
        this.addSeq(lid, 'LE');
        if (ctl) {
            this.pending_ml.push([lp, ctl]);
        } else {
            const f = this.funcs[firstIndex];
            this.links.push({ src: f.fid, dst: lid, type: 'FL', sin: f.num, sout: lp.num });
        }
        for (const e of it.emits || []) {
            this.pending_lm.push([lp, e]);
        }
    }

    srcIdent(s, ctx) {
        if (s.startsWith('IN:')) return ['M', this.rec(s), -1];
        if (s.startsWith('$')) {
            const v = this.vars[s.slice(1)];
            if (!v) throw new Error(`${ctx}: unknown variable ${s}`);
            return ['V', v.id, -1];
        }
        if (s.startsWith('#')) {
            const c = this.consts[s.slice(1)];
            if (!c) throw new Error(`${ctx}: unknown constant ${s}`);
            return ['K', c.id, -1];
        }
        if (s.includes('.')) {
            const lastDot = s.lastIndexOf('.');
            const fn = s.slice(0, lastDot);
            const pn = s.slice(lastDot + 1);
            const f = this.byname[fn];
            if (!f) throw new Error(`${ctx}: unknown function ${fn}`);
            const p = f.out.find(x => x.name === pn);
            if (!p) throw new Error(`${ctx}: ${fn} has no output param ${pn}`);
            return ['P', p.pid, f.num];
        }
        throw new Error(`${ctx}: cannot parse source '${s}'`);
    }

    finish() {
        for (const [p, s] of this.pending_in) {
            const [kind, ident, sin] = this.srcIdent(s, `${p.func.name}.${p.name}`);
            this.links.push({ src: ident, dst: p.pid, type: kind + 'P', sin, sout: p.func.num });
        }
        for (const [p, d] of this.pending_out) {
            if (d.startsWith('OUT:')) {
                this.links.push({ src: p.pid, dst: this.rec(d), type: 'PM', sin: p.func.num, sout: -1 });
            } else if (d.startsWith('$')) {
                const v = this.vars[d.slice(1)];
                if (!v) throw new Error(`${p.func.name}.${p.name}: unknown variable ${d}`);
                this.links.push({ src: p.pid, dst: v.id, type: 'PV', sin: p.func.num, sout: -1 });
            } else {
                throw new Error(`${p.func.name}.${p.name} -> ${d}: target must be OUT:/ or $var`);
            }
        }
        for (const [lp, ctl] of this.pending_ml) {
            this.links.push({ src: this.rec(ctl), dst: lp.lid, type: 'ML', sin: -1, sout: lp.num });
        }
        for (const [lp, e] of this.pending_lm) {
            this.links.push({ src: lp.lid, dst: this.rec(e), type: 'LM', sin: lp.num, sout: -1 });
        }
        for (const [f, a, b] of this.pending_assign) {
            this.links.push({ src: this.rec(a), dst: f.fid, type: 'MF', sin: -1, sout: f.num });
            this.links.push({ src: f.fid, dst: this.rec(b), type: 'FM', sin: f.num, sout: -1 });
        }
        for (const [side, paths] of Object.entries(this.spec.extra_records || {})) {
            for (const p of paths) this.rec((side === 'in' ? 'IN:' : 'OUT:') + p);
        }

        // Schema records: root + referenced, sorted by document order
        for (const [side, recs, pre] of [['schema_in', this.in_recs, 'MID'], ['schema_out', this.out_recs, 'MOD']]) {
            const sc = this.spec[side];
            if (!sc) continue;
            const root = '/' + sc.root;
            if (!recs[root]) {
                const [ok, typ, key] = this.schemas[side].resolve(root);
                recs[root] = { id: null, type: typ, key };
            }
            const sortedPaths = Object.keys(recs).sort((a, b) => {
                const keyA = recs[a].key || [];
                const keyB = recs[b].key || [];
                const len = Math.max(keyA.length, keyB.length);
                for (let k = 0; k < len; k++) {
                    const va = keyA[k] !== undefined ? keyA[k] : -999;
                    const vb = keyB[k] !== undefined ? keyB[k] : -999;
                    if (va !== vb) return va - vb;
                }
                return a.localeCompare(b);
            });
            for (let i = 0; i < sortedPaths.length; i++) {
                recs[sortedPaths[i]].id = `${pre}${i + 1}`;
            }
        }

        // Resolve link endpoints
        for (const l of this.links) {
            for (const end of ['src', 'dst']) {
                const v = l[end];
                if (Array.isArray(v) && v[0] === 'REC') {
                    l[end] = (v[1] === 'in' ? this.in_recs : this.out_recs)[v[2]].id;
                }
            }
        }
    }

    build() {
        const sp = this.spec;
        this.loadSchema('schema_in');
        this.loadSchema('schema_out');
        this.consts = Object.fromEntries((sp.constants || []).map((c, i) => [c.name, { ...c, id: `CID${i + 1}` }]));
        this.vars = Object.fromEntries((sp.variables || []).map((v, i) => [v.name, { ...v, id: `VID${i + 1}` }]));
        this.walk(sp.sequence);
        this.finish();
        if (this.errors.length) {
            throw new Error('Spec errors:\n  ' + this.errors.join('\n  '));
        }
        return this.model();
    }

    model() {
        const sp = this.spec;
        const schemaMeta = (side) => {
            const sc = sp[side];
            if (!sc) return { ID: '-1', File: '', Name: '', Namespace: '', Category: 'NULL', Version: '0.0' };
            const targetNs = this.schemas[side].targetNamespace || '';
            return {
                ID: '-1',
                File: sc._file,
                Name: sc.name || sc.root,
                Namespace: targetNs,
                Category: sc.category || (targetNs.startsWith('http://schema.infor.com/InforOAGIS') ? 'BOD' : 'Other'),
                Version: sc.version || '1.0'
            };
        };

        const m = {
            _sections: ['MappingMeta', 'Format', 'SequenceList', 'Loops', 'Functions', 'Parameters', 'Implementations',
                        'Constants', 'Variables', 'SchemaIn', 'SchemaOut', 'Links'],
            MappingMeta: {
                ID: String(sp.db_id || -1),
                File: sp.name + '.map',
                Name: sp.name,
                Standard: 'false',
                Namespace: sp.namespace || 'Test',
                Version: sp.version || '1.0',
                Description: sp.description || '',
                Layout: '(Layout, 20, 60, 20)',
                ChangeDate: String(Date.now()),
                SchemaIn: schemaMeta('schema_in'),
                SchemaOut: schemaMeta('schema_out'),
                _order: ['ID', 'File', 'Name', 'Standard', 'Namespace', 'Version', 'Description', 'Layout', 'ChangeDate', 'SchemaIn', 'SchemaOut']
            },
            Format: '2.7',
            SequenceList: this.seq.map(([n, i, t]) => ({ Number: String(n), ID_S: i, Type: t })),
            Loops: this.loops.map(l => ({ Name: l.name, Condition: l.cond, Description: l.desc, ID_L: l.lid })),
            Functions: this.funcs.map(f => ({
                IsResuable: f.reusable ? 'true' : 'false',
                PATH: f.path,
                Name: f.name,
                Type: f.type,
                Description: f.desc,
                ID_F: f.fid
            })),
            Parameters: [],
            Implementations: this.funcs.map(f => ({
                IDREF: f.fid,
                Language: 'Java',
                Code: ['UV', 'UB'].includes(f.type) ? f.code : ''
            })),
            Constants: Object.values(this.consts).map(c => ({
                Name: c.name, Value: c.value, Type: c.type || 'String', Description: c.desc || '', ID_F: c.id
            })),
            Variables: Object.values(this.vars).map(v => ({
                Name: v.name,
                InitialValue: v.init !== undefined ? v.init : (v.type === 'String' ? '""' : '0'),
                Type: v.type || 'String',
                Description: v.desc || 'Please describe me',
                ID_V: v.id
            }))
        };

        for (const f of this.funcs) {
            for (const p of [...f.in, ...f.out]) {
                m.Parameters.push({
                    Position: String(p.pos),
                    Name: p.name,
                    Type: p.io,
                    Description: p.desc,
                    DataType: p.dtype,
                    Mandatory: p.mand ? 'true' : 'false',
                    ID_F: f.fid,
                    ID_P: p.pid
                });
            }
        }

        const ns = this.schemas.schema_in ? this.schemas.schema_in.targetNamespace : '';
        const pre = ns ? `H${Math.abs(jhash(ns))}:` : '';
        const fpath = (p) => {
            if (!pre) return p;
            const [el, attr] = p.split('[@');
            const formatted = el.split('/').map(s => s ? pre + s : '').join('/');
            return formatted + (attr ? '[@' + attr : '');
        };

        m.SchemaIn = Object.entries(this.in_recs)
            .sort((a, b) => parseInt(a[1].id.slice(3)) - parseInt(b[1].id.slice(3)))
            .map(([p, r]) => ({ PATH: p, ID_M: r.id, Type: r.type, FormattedPath: fpath(p) }));

        m.SchemaOut = Object.entries(this.out_recs)
            .sort((a, b) => parseInt(a[1].id.slice(3)) - parseInt(b[1].id.slice(3)))
            .map(([p, r]) => ({ PATH: p, ID_M: r.id, Type: r.type, _present: ['PATH', 'ID_M', 'Type'] }));

        m.Links = this.links.map(l => ({
            InFrom: l.src,
            OutTo: l.dst,
            SequenceIn: String(l.sin),
            SequenceOut: String(l.sout),
            Type: l.type
        }));

        if (sp.properties) {
            m._sections.push('Properties');
            m.Properties = sp.properties.map(p => ({
                Type: p.type || 'CP',
                ID_1: p.id1 || '',
                ID_2: p.id2 || '',
                Name: p.name,
                Value: String(p.value || '')
            }));
        }

        return m;
    }
}

function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node mapbuild.js <spec.json> <out_dir> [--catalog <cat.json.gz>]");
        process.exit(1);
    }
    const specPath = path.resolve(args[0]);
    const outDir = path.resolve(args[1]);
    const catIdx = args.indexOf('--catalog');
    const catPath = catIdx !== -1 ? path.resolve(args[catIdx + 1]) : path.resolve(__dirname, '..', 'mi-reference', 'mi_catalog_full.json.gz');

    console.log(`Loading catalog from ${catPath}...`);
    const cat = JSON.parse(zlib.gunzipSync(fs.readFileSync(catPath)));

    console.log(`Loading spec from ${specPath}...`);
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    const baseDir = path.dirname(specPath);

    const unitDir = path.join(outDir, spec.name);
    if (fs.existsSync(unitDir)) {
        fs.rmSync(unitDir, { recursive: true, force: true });
    }
    fs.mkdirSync(unitDir, { recursive: true });

    console.log(`Writing hashed schemas to ${unitDir}...`);
    writeSchemas(spec, baseDir, unitDir);

    console.log('Building map model...');
    const builder = new Builder(spec, baseDir, cat);
    const model = builder.build();

    console.log(`Writing map file ${spec.name}.map...`);
    const mapBytes = writeMap(model);
    fs.writeFileSync(path.join(unitDir, spec.name + '.map'), mapBytes);

    console.log('Writing mapping.properties...');
    const sin = spec.schema_in;
    const sout = spec.schema_out;
    const props = [
        '#Mapping properties',
        '#' + new Date().toUTCString(),
        'mapping.db.id=-1',
        'mapping.db.location=n/a(imported from mapping unit)',
        `mapping.input.element=${sin ? sin.root : 'n/a'}`,
        `mapping.input.exist=${sin ? 'true' : 'false'}`,
        'mapping.input.max.depth=-1',
        `mapping.output.element=${sout ? sout.root : 'n/a'}`,
        `mapping.output.exist=${sout ? 'true' : 'false'}`,
        'mapping.output.max.depth=-1'
    ];
    fs.writeFileSync(path.join(unitDir, 'mapping.properties'), props.join('\n') + '\n', 'utf8');

    const tempZipPath = path.join(outDir, spec.name + '.zip');
    const zapPath = path.join(outDir, spec.name + '.zap');
    if (fs.existsSync(tempZipPath)) fs.unlinkSync(tempZipPath);
    if (fs.existsSync(zapPath)) fs.unlinkSync(zapPath);

    console.log(`Compressing into ${zapPath}...`);
    execSync(`powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${unitDir}\\*' -DestinationPath '${tempZipPath}' -Force; Move-Item -Path '${tempZipPath}' -Destination '${zapPath}' -Force"`);

    console.log(`BUILD SUCCESS! Created ${zapPath}`);
    console.log(`Stats: funcs=${builder.funcs.length} loops=${builder.loops.length} params=${builder.params.length} links=${builder.links.length} recs in/out=${Object.keys(builder.in_recs).length}/${Object.keys(builder.out_recs).length}`);
}

if (require.main === module) {
    main();
}
