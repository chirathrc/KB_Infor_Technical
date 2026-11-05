# 01 — `.zap` / `.map` file format (reverse-engineered, round-trip verified)

Derived from 80 Cloud (M3 CE) mappings exported from the Business Document Mapper. A parse → re-serialise
round trip of all 80 `.map` files with `tools/mapmodel.py` reproduces every file **byte for byte**, so this spec
is complete enough to *generate* importable mappings.

---

## 1. The `.zap` container

A `.zap` is a plain ZIP (deflate, flat — no folders) exported from the Mapper ("mapping unit"):

```
M3FTD_GC_WB_ID_DO_Mapping_Receiving_Custom.zap
├── M3FTD_GC_WB_ID_DO_Mapping_Receiving_Custom.map   ← the mapping (XML, UTF-16)
├── MappingInputSchema_df34260.xsd                   ← input document schema
├── WB_DO_OUT_Schema_383ce7da.xsd                    ← output document schema
└── mapping.properties                               ← import hints
```

- BOD mappings carry the whole schema set: `BODs-<Verb><Noun>_<h>.xsd`, `Nouns-<Noun>_<h>.xsd`,
  `Resources-Meta_<h>.xsd` (+ `BODs-ConfirmBOD`, `Nouns-BOD` for error-acknowledge maps). Standard Infor BODs
  may also carry `Resources-Components-*` files.
- **Schema file name** = `<SchemaName>_<hash>.xsd`, where `<hash>` = lower-case hex **CRC32 of the schema file's
  raw bytes** at import time (verified on 211/233 files; the rest are schemas whose `xs:include` lines were
  rewritten after hashing). Leading zeros are dropped (`_df34260`, `_159bdcb`).
- `xs:include schemaLocation="..."` inside BOD schemas point at the **hashed** names of their siblings
  (e.g. `Nouns-StockCountUpload_e3231570.xsd`). When generating, hash the leaf schemas first, then rewrite the
  includes of the parents, then hash the parents.
- Schemas are UTF-16 BE with BOM as exported, declaring `encoding="UTF-16"` (232/233). Whether the Mapper
  imports UTF-8 schema files is untested — generate UTF-16 BE + BOM to be safe.
- Spaces are allowed in schema names (`Formula Message In_f019407f.xsd`, `MappingSampleSchema - Copy_...xsd`)
  but avoid them in new work.

### `mapping.properties`

```properties
#Mapping properties
#Thu Oct 01 12:25:49 IST 2026
mapping.db.id=-1
mapping.db.location=n/a(imported from mapping unit)
mapping.input.element=ConfirmBOD              # root element of the input schema
mapping.input.exist=true
mapping.input.max.depth=-1
mapping.output.element=AcknowledgeStockCountUpload   # root of output; "n/a" when there is no output
mapping.output.exist=true                      # false when no output document
mapping.output.max.depth=-1
```

Inbound `Sync` BODs that only call M3 APIs (e.g. `M3BOD_ReceiveDelivery_Sync_In_2_15_0`) and the MBM
re-detector have **no output schema**: `mapping.output.element=n/a`, `<SchemaOut/>` empty, and
`MappingMeta/SchemaOut` has `Category` = `NULL`.

---

## 2. `.map` encoding and layout

| Aspect | Value |
|---|---|
| Encoding | **UTF-16 big-endian with BOM** (`FE FF`) |
| Declaration | `<?xml version="1.0" encoding="UTF-16" standalone="yes"?>` |
| Line endings | LF (`\n`) |
| Indentation | 4 spaces per level; Java inside CDATA keeps the developer's tabs |
| Root | `<DatabaseData>` |
| Escaping | only `&amp; &lt; &gt;` in text; quotes are written raw (`<Value>"30"</Value>`) |
| Empty text | `<Namespace></Namespace>` (open+close), empty sections self-close: `<Constants/>` |
| `Format` | always `2.7` |

### Section order (fixed)

```
MappingMeta, Format, SequenceList, Loops, Functions, Parameters, Implementations,
Constants, Variables, SchemaIn, SchemaOut, Links, [Properties], [Namespaces, Replacements]
```
`Properties` appears only when the map defines properties; `Namespaces`+`Replacements` only when a BOD
`UserArea` wildcard is used.

---

## 3. Sections

### 3.1 `MappingMeta`

```xml
<MappingMeta>
    <ID>995</ID>                                  <!-- Mapper DB id (any int on import; -1 = new) -->
    <File>M3FTD_..._Custom.map</File>
    <Name>M3FTD_..._Custom</Name>                 <!-- = file stem; BOD naming rules apply -->
    <Standard>false</Standard>                    <!-- true only for untouched Infor standard maps -->
    <Namespace>Test</Namespace>                   <!-- Mapper "namespace"/folder: seen Test, M3 BOD, FBM, M3BOD -->
    <Version>1.4</Version>                        <!-- free text: 1.0, 2.1.0, 16.0.0.100 -->
    <Description>A new mapping</Description>
    <Layout>(Layout, 20, 60, 20)</Layout>         <!-- editor pane split; always this value -->
    <ChangeDate>1773811904725</ChangeDate>        <!-- epoch milliseconds -->
    <SchemaIn>
        <ID>-1</ID>
        <File>MappingSampleSchema_65ff7bdb.xsd</File>
        <Name>MappingSampleSchema</Name>
        <Namespace></Namespace>                   <!-- target namespace URI, e.g. http://schema.infor.com/InforOAGIS/2 -->
        <Category>Other</Category>                <!-- Other | BOD | NULL (no schema) -->
        <Version>1.0</Version>
    </SchemaIn>
    <SchemaOut> ...same fields... </SchemaOut>
</MappingMeta>
```

### 3.2 `SequenceList` — execution order

```xml
<Sequence><Number>4</Number><ID_S IDREF="LID1"/><Type>LB</Type></Sequence>
```
- `Number` runs 1..N, contiguous. `Type`: `F` = function, `LB` = loop/if **begin**, `LE` = loop/if **end**
  (`LE` repeats the loop's IDREF). Nesting = LB…LE bracketing.
- Every function appears exactly once; every loop appears twice (LB, LE).

### 3.3 `Loops` — loops *and* if-blocks

```xml
<Loop><Name>DeliveryLoop</Name><Condition>WT</Condition><Description>Please describe me</Description><ID_L ID="LID1"/></Loop>
```

| Condition | Meaning | Controlled by (link into the loop) | Seen |
|---|---|---|---|
| `WT` | **Loop while true** | `ML` from a repeating input element; `FL` from a repeating M3 API (`AR*`) or a Boolean function (`UB`) | 613 |
| `WF` | **Loop while false** — Boolean returns `true` to stop | `FL` from `UB` | 20 |
| `IT` | **If** (execute block once when true) | `FL` from `UB` (712) or from a single M3 API `AVI` (run block if the call was OK) (4) | 716 |

Rules observed without exception: the controlling `UB` / `AR*` function is the **first** element inside its
loop; every loop has exactly one controller; loops nest freely (max depth in the samples: 13).
For `IT` blocks controlled by an `AVI` API the block presumably runs only when the call was OK (inferred from
usage, 4 cases — prefer a `UB` that tests `isLastAPICallOK()` in generated maps).

### 3.4 `Functions`

```xml
<Function>
    <IsResuable>false</IsResuable>      <!-- sic (Mapper typo); true only on 11 template UV functions
                                             (SetOutboxHeaderData ×8, SetHeader, SetSync, SetPurchaseOrderID)
                                             in standard-derived BOD maps — i.e. copied from the repository -->
    <PATH>/implementations</PATH>       <!-- user fns: /implementations; API: /<MIprogram>/<transaction>; Assign: /Assign -->
    <Name>GetDeliveryNo</Name>
    <Type>UB</Type>
    <Description>Please describe me</Description>
    <ID_F ID="FID4"/>
</Function>
```

| Type | Palette item | PATH | Notes |
|---|---|---|---|
| `UV` | Java (void) — "UVJ" | `/implementations` | inputs → outputs via Java |
| `UB` | Boolean — "UBJ" | `/implementations` | Java must `return true/false`; drives a loop/if when linked `FL`; may also have output params |
| `ASN` | Assign | `/Assign` | input element → output element copy, `MF`/`FM` links, no params |
| `AS` | M3 Settings | `/implementations` | params `Company` (pos 0), `Division` (pos 1); names `M3 Settings`, `M3 Settings_1`… |
| `AVM` | M3 API, single, **Exit map on NOK** | `/PPS200MI/GetHead` | |
| `AVL` | M3 API, single, **Exit loop on NOK** | | only inside loops |
| `AVI` | M3 API, single, **Ignore NOK** | | check `isLastAPICallOK()` after it |
| `ARM` / `ARL` / `ARI` | M3 API, **repeating** (list), same three error modes | | always the first element of the `WT` loop it controls |

Function order in `<Functions>` = execution order, and `FIDn` is numbered in execution order (FID1 = first
function in the sequence). Names need not be unique (the same API often appears several times).

### 3.5 `Parameters`

```xml
<Parameter>
    <Position>1</Position>                     <!-- 0-based, per function and direction -->
    <Name>DLIX</Name>
    <Type>I</Type>                             <!-- I = input, O = output -->
    <Description>Delivery number, size is 11, type is Numeric(mandatory)</Description>
    <DataType>String</DataType>                <!-- String in 99.9 %; int/double/long/java.util.List also used -->
    <Mandatory>true</Mandatory>
    <ID_F IDREF="FID6"/>                       <!-- owning function -->
    <ID_P ID="IID8"/>                          <!-- IIDn for inputs, OIDn for outputs, numbered across the map -->
</Parameter>
```
- **M3 API functions carry the complete MI field list** of the transaction (all inputs and all outputs, in MI
  metadata order) even if only a few are linked. Description format:
  `"<label>, size is <len>, type is <Alpha|Numeric>"` + `"(mandatory)"` for mandatory inputs.
  → see `mi_catalog.json` for 269 harvested transactions.
- User functions: names conventionally `i…` / `o…`, `Description` "Please describe me".

### 3.6 `Implementations`

```xml
<Implementation>
    <Language IDREF="FID2">Java</Language>
    <![CDATA[o_PrimaryKey = (i_PrimaryKey != null) ? i_PrimaryKey.trim() : "" ;
		...]]>
</Implementation>
```
- **One per function, including API / M3 Settings / Assign** (empty `<![CDATA[]]>`).
- Order is not significant (the Mapper writes hash order); generate in FID order.
- Inside the Java, parameters and variables are referenced by name; inputs are local `String`s (may be
  reassigned), outputs are assigned. `UB` bodies end with `return <boolean>;`.

### 3.7 `Constants`

```xml
<Constant>
    <Name>MSTD</Name>
    <Value>"IBAN"</Value>                     <!-- a Java expression: "\"IBAN\"", IONToolbox.ACTION_CODE_REJECTED -->
    <Type>String</Type>
    <Description>Message standard, size is 10, type is Alpha</Description>
    <ID_F ID="CID1"/>                          <!-- note: element is ID_F, id prefix CID -->
</Constant>
```
Linked to API/function inputs with `KP` links.

### 3.8 `Variables` (map-global fields)

```xml
<Variable><Name>g_Company</Name><InitialValue>""</InitialValue><Type>String</Type><Description>...</Description><ID_V ID="VID7"/></Variable>
```
- `InitialValue` is a Java initialiser: `""`, `0`, `true`, `null`, `"1"`, `new java.util.HashMap<String, String>()`,
  `getMapUUID()`, `this`.
- Types seen: `String` (5016), `int`, `boolean`/`Boolean`, `double`, `float`, `long`, `java.util.List<String[]>`,
  `java.util.Iterator<String[]>`, `java.util.Map<String,String>`, `java.util.ArrayList`, `DataTranslator`,
  `MECDataTranslator`, `StringReplacer`, `java.text.DecimalFormat`, `SortingStructure`,
  `com.infor.ecutil.util.DateTimeConverter`.
- Variables are visible in **every** function's Java (they are fields of the generated class); links
  `PV`/`VP` additionally wire them to params.

### 3.9 `SchemaIn` / `SchemaOut` — referenced document nodes

```xml
<Record>
    <PATH>/ProcessStockCountUpload/ApplicationArea/Sender/LogicalID[@schemeVersionID]</PATH>
    <ID_M ID="MID3"/>                                   <!-- MIDn input, MODn output -->
    <Type>xs:normalizedString</Type>                    <!-- XSD type name; "?" for anonymous complex types -->
    <FormattedPath>/H1125903345:ProcessStockCountUpload/H1125903345:ApplicationArea/...[@schemeVersionID]</FormattedPath>
</Record>
```
- Contains the **document root + every node that a link touches** — nothing else (except BOD wildcard
  placeholders `…/UserArea/Property`, `…/UserAreaMeta/Property`).
- Paths are slash paths from the root; attributes as `[@name]`; no namespace prefixes in `PATH`.
- `FormattedPath` exists only on **input** records: for a namespaced schema every step gets the prefix
  `H<abs(Java String.hashCode(namespaceURI))>:` — e.g. `http://schema.infor.com/InforOAGIS/2` → `H1125903345`,
  `urn:iso:std:iso:20022:tech:xsd:pain.002.001.03` → `H56479793`. Attributes are not prefixed. No namespace →
  `FormattedPath` = `PATH`.

### 3.10 `Links` — the data-flow graph

```xml
<Link><InFrom IDREF="MID5"/><OutTo IDREF="IID5"/><SequenceIn>-1</SequenceIn><SequenceOut>5</SequenceOut><Type>MP</Type></Link>
```
`Type` = two letters, *source kind* + *target kind*:
`M` = schema record, `F` = function, `P` = parameter, `V` = variable, `K` = constant, `L` = loop.

| Type | From → To | Meaning | Count |
|---|---|---|---|
| `MP` | input record → input param | read input document | 844 |
| `PM` | output param → output record | write output document | 2035 |
| `PV` | output param → variable | store | 4655 |
| `VP` | variable → input param | load | 9251 |
| `PP` | output param → input param | direct wire between functions | 366 |
| `KP` | constant → input param | | 493 |
| `ML` | repeating input record → loop | loop once per occurrence | 165 |
| `FL` | function (UB / AR* / AVI) → loop | loop/if controller | 1184 |
| `LM` | loop → output record | **create one output element per iteration** (or once for an `IT` block) | 151 |
| `MF` / `FM` | record → Assign / Assign → record | Assign function | 2 / 2 |

- `SequenceIn` = sequence `Number` of the **source** function/loop (param → its function); `-1` when the
  source is a record, variable or constant.
- `SequenceOut` = sequence `Number` of the **target** function/loop; `-1` when the target is a record or
  variable. Verified for all 19,148 links.
- A param may receive several links (rare; seen `CONST` + `$var` into one API input).
- In every sample, a repeating output element (and an optional output block emitted by an `IT`) is created
  through an `LM` link from the enclosing loop. Treat `LM` as required whenever the output must repeat.

### 3.11 `Properties`

```xml
<Property><Type>CP</Type><ID_1></ID_1><ID_2></ID_2><Name>Company</Name><Value>100</Value></Property>
```

| Type | Meaning | Read at runtime |
|---|---|---|
| `CP` | **Control property** (agreement-level parameter, default value set in the map; overridable per agreement in Partner Admin / *Agreement Control Properties*) | `getManifestInfo("agr:<Name>")` |
| `SO` | Schema option — `Schema Location` (xsi:schemaLocation written to BOD output) | — |
| `CO` | **Check Order** settings (inbound `Sync` BODs): `Order Default Namespace`, `Order Default Namespace Prefix`, `Order Include Noun`, `Order PKs Count`, `Order PKs Xpath0..n`, `Order PKs No Attribute Existing0..n`, `Order VID Xpath`, `Order VID No Attribute Existing` | — |

### 3.12 `Namespaces` / `Replacements` (BOD UserArea wildcard)

```xml
<Namespaces><Namespace><ID_N ID="NOD1"/><URI>http://schema.infor.com/InforOAGIS/2</URI><Prefix></Prefix>
    <Schema>Nouns-EAMItemMaster_8f3fb4a3.xsd</Schema></Namespace></Namespaces>
<Replacements><Replacement><ID_R ID="ROD1"/>
    <Path>/AcknowledgeEAMItemMaster/DataArea/EAMItemMaster/ItemMasterHeader/UserArea/WILDCARD/Property</Path>
    <Sequence>0</Sequence><Mandatory>0</Mandatory><Repetitive>1</Repetitive><ID_N IDREF="NOD1"/></Replacement></Replacements>
```
Declares which concrete element replaces an `xs:any` wildcard; the replaced path is then usable as
`.../UserArea/Property` records.

---

## 4. ID conventions (all contiguous from 1)

| Prefix | Object | Numbering |
|---|---|---|
| `FID` | function | execution order |
| `LID` | loop / if | order of `LB` in the sequence |
| `IID` / `OID` | input / output parameter | increasing across the map; `<Parameters>` is grouped by function in FID order |
| `CID` | constant | creation order (written mostly in ID order) |
| `VID` | variable | creation order; `<Variables>` is written in hash order (62/80 maps) — order is not significant |
| `MID` / `MOD` | input / output schema record | increasing, in written order |
| `NOD` / `ROD` | namespace / replacement | increasing |

For generation: emit everything in ID order — the Mapper resolves all references by ID.

---

## 5. Minimal complete example (annotated)

`M3FTD_GC_WB_CN_WBOutbound_1_V1_Custom` (9 functions) reads delivery numbers from a custom XML, checks each
in M3 via `MDBREADMI/GetMHDISH00`, and returns an OK/not-found message:

```
#1  [ASN] Assign            IN:/WBOutbound_1/LineRecord  → OUT:/WBOutbound_1_Out/Items     (MF/FM)
#2  [UV ] DataConversion    IN PrimaryKey, TransactionType → $g_PrimaryKey ; Java splits "MILL:KEY", reads agr:Company
#3  [AS ] M3 Settings       Company ← $g_Company
#4  LOOP[WT] DeliveryLoop   ctl = IN:/…/M3DeliveryNumbers/M3DeliveryNumber (ML)
#5    [UB ] GetDeliveryNo   IN M3DeliveryNumber → oDLIX (PV $oDLIX, PP → #7, #9)
#6    IF[IT] SkipNullValuesLoop  ctl = #7 (FL)
#7      [UB ] CheckIsNullDLIX   return !iDLIX.isEmpty()
#8      [AVI] MDBREADMI/GetMHDISH00   INOU←$INOU(="1"), DLIX←$oDLIX
#9      [UV ] CheckDeliveryStatus     if(!isLastAPICallOK()) collect DLIX into g_Message
#10   END ; #11 END
#12 [UV ] SetOutputData     → OUT ItemNo, ItemName, Message
#13 [UV ] OutputFileNameSetter  setManifestInfo("map:FileName"…), MAP_ION_TO_LOGICAL_ID, MAP_PARTNER, MAP_ION_DOCUMENT_ID
Properties: CP Company = 100
```
Use `tools/mapdump.py <file.map>` to print any mapping in this form.

## 6. Schema `Category` and the custom-BOD naming rule (confirmed on a real Mapper import)

`MappingMeta/SchemaIn|SchemaOut/Category` is `BOD`, `Other` or `NULL`. If **any** schema of a map has category
`BOD`, the Mapper validates the map as a *custom BOD mapping* and requires the name
`<Prefix>_<Noun>_<Verb>_[Error_]<In|Out>_<Suffix>`. Otherwise validation fails with **"BOD Mapping Name ERROR –
Invalid Mapping Name for a Custom BOD mapping"**.

All sample maps with a BOD-category schema follow that pattern. Maps with other names that still read or write
a BOD-shaped document (InforOAGIS namespace, ApplicationArea) use category **`Other`**: for example, the bank
status file maps (file in → custom Sync BOD out). Their BOD type is set with `MAP_ION_BOD_TYPE` in the map or by
the agreement.

Rule: use `BOD` only when the map name follows the BOD pattern; otherwise use `Other`. `mapbuild.py` enforces this.

## 7. Schema rules from real publish failures

These come from failures seen in Cloud projects. `mapbuild.py` / `verify_rules.py` check the ones marked ✓.

| Rule | Symptom when broken | Check |
|---|---|---|
| A namespaced XSD uses `elementFormDefault="qualified"`, and no element sets `form="unqualified"` | `FormattedPath` prefixes and links break without an error | ✓ warning |
| A BOD root element is `<Verb><Noun>` written together (`ProcessStockAdjustment`). The manifest value `ionBODType` uses the dotted form (`Acknowledge.StockAdjustment`) | A `.` or `_` in the root stops MEC XPath matching: shows as an NPE on the first `ApplicationArea` read (e.g. LogicalID) | ✓ error on `.` |
| In `BODs-Process<Noun>` the noun under `DataArea` has `maxOccurs="1"`; in `BODs-Acknowledge<Noun>` it is `unbounded` | — | design |
| `Resources-Meta`, `BODs-ConfirmBOD` and `Nouns-BOD` are generic: copy them verbatim from a sample | — | design |
| Numeric XSD types inside repeating groups are reported to trigger "too many passes (>100) cyclic dependencies" at publish. 12 of the 80 published samples have them and work, so it is a risk, not a rule. If the error appears, make code-like fields (barcodes, warehouse, location) `xs:string`. Do not force real quantities to string in flat schemas | publish error | ✓ warning |
| Flag fields written into a BOD (e.g. an error flag) are strings, not `xs:boolean` (BOD base types are normalized strings) | schema mismatch | design |
| Exactly one UTF-16BE BOM: a file starts `fe ff 00 3c`. A doubled BOM (`fe ff fe ff`, e.g. after decoding with `utf-8` instead of `utf-8-sig` and re-encoding) gives "Failed to load mapping model" / `mecModel is null` | Mapper cannot open the map | ✓ `verify_rules` (also parses every XSD) |

Field-level records and links: `mapbuild.py` computes `FormattedPath` deterministically (the `H<hash>:` prefix is
fixed per namespace URI, §3.9), so generated maps need no Mapper-side rewiring. After an XSD is **re-imported in the
Mapper**, however, the affected links break and must be redrawn there (delete the stale links first).
