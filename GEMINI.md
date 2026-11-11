# Workspace Rules: Infor M3 Technical Knowledge Base

## Knowledge Base Reference Rule
- **Always refer to this Knowledge Base as the GitHub repository:**
  - Base URL: `https://github.com/chirathrc/KB_Infor_Technical`
  - Scripts: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts`
  - MI Swagger APIs: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/m3-api/mi-swagger`
  - Typings: `https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/sdk-reference/h5.script.d.ts`
  - Index: `https://github.com/chirathrc/KB_Infor_Technical/blob/main/KB_INDEX.json`
- **Never expose or quote local machine paths (e.g. `D:\...`) in user responses, code references, or training guidance.** Always use the GitHub repository URL paths instead.

## H5 Scripting Guidelines
- Follow the `h5script-master` skill at `.agents/skills/h5script-master/SKILL.md`.
- Ensure class name strictly equals the filename (without extension).
- Enforce the standardized Fortude JSDoc header with Author, Created on, Summary, and Version Log.
- Enforce the async `e.cancel` gate-and-replay pattern in `Requesting`.
- Always inspect response bodies for `ServerReturnedNOK` and `errorMessage` on `executeRequestV2`.
- Compile every script to `.js` using `tsc` so both `.ts` and `.js` are delivered.


## MEC Knowledge
- MEC mappings, guides and samples: https://github.com/chirathrc/KB_Infor_Technical/tree/main/mec
- MEC Cloud migration master reference: https://github.com/chirathrc/KB_Infor_Technical/blob/main/mec/guides/10-cloud-migration-master-reference.md (skill: `mec-cloud-migration` at `.agents/skills/mec-cloud-migration/SKILL.md`)

## MEC / ZAP Rules (always on)
- To create, change or repair any MEC mapping (.zap/.map), activate the skill `mec-zap-builder` (`.agents/skills/mec-zap-builder/SKILL.md`).
- NEVER write, edit, base64-encode or paste the contents of a .map/.zap. Write `spec.json` + XSDs and compile with
  `python .agents/skills/mec-zap-builder/scripts/mec_build.py build <spec.json>`; deliver only a file whose last line is `RESULT: PASS`.
- NEVER call `mec/tools/*.py` directly (catalog path mismatch `mec/mi` vs `mec/mi-reference`); use `mec_build.py`.
- Look up every M3 API and field with `mec_build.py api show/search/program`; never invent names.
- State what was NOT verified (Mapper import/Generate/Publish, live event) in every delivery.

