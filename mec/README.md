# MEC (Infor Mapping / Enterprise Connector) Knowledge Base

Subject-wise knowledge for building and reviewing MEC mappings (`.zap`/`.map` format, M3 BODs, FTD file integrations). Imported from IEC_Mapping_KB v0.3. Repository: https://github.com/chirathrc/KB_Infor_Technical

## Structure
| Folder | Subject |
|---|---|
| `guides/` | 00-09: ZAP/map format, building blocks, mapping families, Java and manifest API, standard snippets, M3 API patterns, MI reference, spec and generator, sample inventory |
| `mi-reference/` | MI catalog (`mi_catalog.json`, full `.json.gz`), program and module indexes |
| `examples/` | End-to-end examples with XSDs, `spec.json` and sample XML (item-details-event, item-info, load-in, wb-outbound-1) |
| `tools/` | Python tooling (map build/dump/model/stats, spec generation, MI lookup, Java checks, round-trip) |
| `samples/` | 80 production `.zap` mappings grouped by subject (below) |

## Samples by subject
| Folder | Content |
|---|---|
| `samples/bank-payments-hsbc-scb/` | HSBC and SCB payment outbound (ID/MY/SG/VN/CN), acknowledgements, EHub payment confirmation |
| `samples/weighbridge-wb/` | Weighbridge (WB) PO receiving, DO mapping, outbound 1/2 for CN/ID/VN/base |
| `samples/bestmix-feed-formula/` | BestMix formula/premix recipes, BM forecast/ingredient/price, PDS clean-up |
| `samples/einvoice-ehub/` | E-Invoice BODs and EHub invoice to M3 |
| `samples/eam-item-master/` | EAM Item Master process/acknowledge BODs |
| `samples/inventory-and-stock/` | Inventory adjustment, stock count, receive delivery, shipment, requisition BODs |
| `samples/purchasing-and-workflow/` | Purchase order, requisition WF, credit limit approval WF, supplier invoice, positive RO |
| `samples/gl-discount-upload/` | GL and credit-note discount uploads |

## Suggested reading order
1. `guides/01-zap-and-map-file-format.md`
2. `guides/02-building-blocks-and-design-patterns.md`
3. `guides/03-mapping-families-and-templates.md`
4. `guides/05-standard-snippets.md` and `guides/06-m3-api-usage-patterns.md`
5. Matching sample in `samples/<subject>/`
