# Workspace Rules: Infor M3 Technical Knowledge Base

## Knowledge Base Reference Rule
- **Always refer to this Knowledge Base as the GitHub repository:**
  - Base URL: `https://github.com/chirathrc/KB_Infor_Technical`
  - Scripts: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/scripts`
  - MI Swagger APIs: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/mi-swagger`
  - Typings: `https://github.com/chirathrc/KB_Infor_Technical/blob/main/api-reference/h5.script.d.ts`
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

