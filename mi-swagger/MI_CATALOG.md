# Infor M3 MI API Swagger Catalog

This catalog indexes all **1311 Infor M3 Machine Interface (MI) APIs** available in the `mi-swagger/` directory.
AI agents and developers can search this table to find the appropriate MI program, transaction names, and corresponding Swagger JSON definitions.

## Quick Search Table

| Program | Description | Transactions Count | Sample Transactions | Swagger File |
| :--- | :--- | :--- | :--- | :--- |
| **`AAS320MI`** | Claim/Liability Reports | 12 | `GetClaimHead, LstClaimDet, LstClaimLin, FpwVersion, GetCurrentUser...` | [`AAS320MI.json`](mi-swagger/AAS320MI.json) |
| **`AAS330MI`** | Electronic bank report interface | 9 | `FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel, GetMIBuild...` | [`AAS330MI.json`](mi-swagger/AAS330MI.json) |
| **`AAS333MI`** | Electronic Bank Report Transactions | 10 | `LstBasicData, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AAS333MI.json`](mi-swagger/AAS333MI.json) |
| **`AAS350MI`** | Api : General Ledger Information | 11 | `LstVoucherHeads, LstVoucherLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AAS350MI.json`](mi-swagger/AAS350MI.json) |
| **`AAS390MI`** | Online Invoicing Transaction | 15 | `Add, Dlt, Get, Lst, UpdInvStatus...` | [`AAS390MI.json`](mi-swagger/AAS390MI.json) |
| **`AAS640MI`** | Api : Electronic chart of account | 12 | `DelHeader, GetHeader, UpdStatus, FpwVersion, GetCurrentUser...` | [`AAS640MI.json`](mi-swagger/AAS640MI.json) |
| **`AAS910MI`** | Electronic Bank Reporting Reason Codes | 13 | `AddBasicData, DltBasicData, GetBasicData, UpdBasicData, FpwVersion...` | [`AAS910MI.json`](mi-swagger/AAS910MI.json) |
| **`ABS100MI`** | Bank statement | 21 | `AddStatmtAdditi, AddStatmtDetail, AddStatmtHead, AddStatmtLine, GetBankIdent...` | [`ABS100MI.json`](mi-swagger/ABS100MI.json) |
| **`ABS180MI`** | Bank statement reconciliation header | 22 | `Add, AddLngTxt, AutoReconcile, Dlt, Get...` | [`ABS180MI.json`](mi-swagger/ABS180MI.json) |
| **`ABS181MI`** | Bank stmn reconc line interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`ABS181MI.json`](mi-swagger/ABS181MI.json) |
| **`ABS182MI`** | Bank statement reconc, reconciled transaction interface | 12 | `Get, LstReconcLines, ReverseReconc, FpwVersion, GetCurrentUser...` | [`ABS182MI.json`](mi-swagger/ABS182MI.json) |
| **`ABS185MI`** | Bnk stmn recon, not reconciled trans interface | 17 | `Get, GetSelectionId, LstBnkStmnLines, LstGenLedger, ReconcBySelId...` | [`ABS185MI.json`](mi-swagger/ABS185MI.json) |
| **`ABS960MI`** | Bank stmnt reconc tp interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`ABS960MI.json`](mi-swagger/ABS960MI.json) |
| **`ABS965MI`** | Reconciliation search seq interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`ABS965MI.json`](mi-swagger/ABS965MI.json) |
| **`AEMAPIMI`** | AEM telematics standard for equipment data | 29 | `AddEquip, AddFault, AddLoc, AddMeterReading, AddSwitch...` | [`AEMAPIMI.json`](mi-swagger/AEMAPIMI.json) |
| **`AGS100MI`** | Financial Agreement | 13 | `AddFinAgr, DltFinAgr, GetFinAgr, LstFinAgr, FpwVersion...` | [`AGS100MI.json`](mi-swagger/AGS100MI.json) |
| **`AGS101MI`** | Financial Agreement Line | 13 | `DltAgrLin, GetAgrLin, LstAgrLin, addAgrLin, FpwVersion...` | [`AGS101MI.json`](mi-swagger/AGS101MI.json) |
| **`AGS130MI`** | Financial Agreement Connected Invoice | 11 | `GetFinAgrConInv, LstFinAgrConInv, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AGS130MI.json`](mi-swagger/AGS130MI.json) |
| **`AGS140MI`** | Financial Agreement Budget and Actuals per Period | 11 | `GetFinAgrBudAct, LstFinAgrBudAct, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AGS140MI.json`](mi-swagger/AGS140MI.json) |
| **`AHS100MI`** | Ad-hoc Report Group | 16 | `AddReportGroup, DelReportGroup, ExportConfig, GetReportGroup, ImportRepGroup...` | [`AHS100MI.json`](mi-swagger/AHS100MI.json) |
| **`AHS110MI`** | Ad-hoc Report Version | 15 | `AddReport, DelReport, GetReport, LstReport, UpdAppMes...` | [`AHS110MI.json`](mi-swagger/AHS110MI.json) |
| **`AHS150MI`** | Run Ad-hoc Report | 10 | `Submit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AHS150MI.json`](mi-swagger/AHS150MI.json) |
| **`AHS200MI`** | Ad-hoc Report Version by User | 10 | `LstByUser, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AHS200MI.json`](mi-swagger/AHS200MI.json) |
| **`AMS100MI`** | Archiving Toolbox interface | 23 | `GenerateStd, LstArchiveProgr, LstArchiveViews, LstCurrentRuns, LstErrorLog...` | [`AMS100MI.json`](mi-swagger/AMS100MI.json) |
| **`APAT13MI`** | Supplier payment interface in market Austria | 20 | `DeleteProposal, GetHead, GetHeadAddress, GetInvLine, GetInvLineTxt...` | [`APAT13MI.json`](mi-swagger/APAT13MI.json) |
| **`APBR30MI`** | Get and list payment proposal information | 15 | `GetHead, GetHeadAddress, LstInvByPayDate, LstInvByPayDoc, LstInvByPayee...` | [`APBR30MI.json`](mi-swagger/APBR30MI.json) |
| **`APBR50MI`** | Add an invoice batch head | 10 | `AddHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR50MI.json`](mi-swagger/APBR50MI.json) |
| **`APBR51MI`** | Add an invoice batch line | 10 | `AddLine, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR51MI.json`](mi-swagger/APBR51MI.json) |
| **`APBR53MI`** | Validate batch invoice | 10 | `ValidateInvoice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR53MI.json`](mi-swagger/APBR53MI.json) |
| **`APCH01MI`** | Supports UTC for selected transactions using the UTCM field | 13 | `AddExtension, DltExtension, GetExtention, UpdExtension, FpwVersion...` | [`APCH01MI.json`](mi-swagger/APCH01MI.json) |
| **`APS015MI`** | Bank Fee Type | 15 | `AddBankFee, CpyBankFee, DltBankFee, GetBankFee, LstBankFee...` | [`APS015MI.json`](mi-swagger/APS015MI.json) |
| **`APS020MI`** | AP Accounting options | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS020MI.json`](mi-swagger/APS020MI.json) |
| **`APS025MI`** | Activity code | 14 | `Add, Delete, Get, List, Update...` | [`APS025MI.json`](mi-swagger/APS025MI.json) |
| **`APS026MI`** | Official service code | 14 | `Add, Delete, Get, List, Update...` | [`APS026MI.json`](mi-swagger/APS026MI.json) |
| **`APS050MI`** | Supplier invoice interface | 24 | `AcceptInv, AddBatchAddInfo, AddBatchHead, AddBatchLine, GetAddInfo...` | [`APS050MI.json`](mi-swagger/APS050MI.json) |
| **`APS051MI`** | Batch invoice control interface | 11 | `ControlAll, ControlInvoice, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`APS051MI.json`](mi-swagger/APS051MI.json) |
| **`APS092MI`** | Selection of Payment Details | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS092MI.json`](mi-swagger/APS092MI.json) |
| **`APS106MI`** | Supplier Payment Request | 12 | `GetPaymentReq, LstReqByPayee, LstReqByRefNo, FpwVersion, GetCurrentUser...` | [`APS106MI.json`](mi-swagger/APS106MI.json) |
| **`APS110MI`** | Recode and Approve Supplier Invoices | 12 | `ApproveInvoice, CancelInvoice, ChgAuthorizer, FpwVersion, GetCurrentUser...` | [`APS110MI.json`](mi-swagger/APS110MI.json) |
| **`APS130MI`** | Supplier Payment Proposal | 28 | `CreateConfChk, CreateProposal, DeleteProposal, GetHead, GetHead2...` | [`APS130MI.json`](mi-swagger/APS130MI.json) |
| **`APS190MI`** | Supplier Payment - Report Bank Confirmation | 15 | `AddCharge, AddHead, GetHead, LstHeadByBank, LstPaymentRef...` | [`APS190MI.json`](mi-swagger/APS190MI.json) |
| **`APS200MI`** | Supplier invoice | 21 | `AddInvoiceLog, GetCashDiscInfo, GetInvImagePath, GetInvTotBOD, GetInvTotInfo...` | [`APS200MI.json`](mi-swagger/APS200MI.json) |
| **`APS201MI`** | Update of Single Invoice Details | 10 | `UpdInvDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APS201MI.json`](mi-swagger/APS201MI.json) |
| **`APS250MI`** | Add additional information to an invoice | 10 | `AddInvInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APS250MI.json`](mi-swagger/APS250MI.json) |
| **`APS251MI`** | Additional information category | 16 | `AddInfoCat, DltInfoCat, GetInfo, GetInvInfo, LstInfo...` | [`APS251MI.json`](mi-swagger/APS251MI.json) |
| **`APS260MI`** | Supplier Invoice Header Display | 14 | `Get, Lst, LstByInvAdmin, LstWithFilters, SearchInvHeader...` | [`APS260MI.json`](mi-swagger/APS260MI.json) |
| **`APS305MI`** | Due date check proposal | 14 | `Confirm, Create, Dlt, Get, Lst...` | [`APS305MI.json`](mi-swagger/APS305MI.json) |
| **`APS306MI`** | Due date check proposal detail | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`APS306MI.json`](mi-swagger/APS306MI.json) |
| **`APS330MI`** | Outgoing payment proposal | 22 | `ApproveProposal, ConfirmProposal, CreateProposal, DeleteProposal, GetHead...` | [`APS330MI.json`](mi-swagger/APS330MI.json) |
| **`APS331MI`** | Outgoing payment proposal | 18 | `DeleteInvoice, GetInvoice, HoldInvoice, LstInvoice, ReleaseInvoice...` | [`APS331MI.json`](mi-swagger/APS331MI.json) |
| **`APS360MI`** | Supplier Invoice. Match GR Line | 12 | `LstHeadChgTrans, LstInvLnChgTran, LstInvLnTrans, FpwVersion, GetCurrentUser...` | [`APS360MI.json`](mi-swagger/APS360MI.json) |
| **`APS370MI`** | Reconcile received goods/not invoiced | 16 | `InvCmplPO, InvCmplRcpt, LstRecByPO, RecalcStatus, RvrsInvCmplPO...` | [`APS370MI.json`](mi-swagger/APS370MI.json) |
| **`APS390MI`** | Credit requeat transaction | 11 | `GetCrdReqRef, LstByCrdReqRef, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`APS390MI.json`](mi-swagger/APS390MI.json) |
| **`APS430MI`** | Supplier withheld tax reporting | 17 | `GetTaxHead, GetTaxTotSer, GetTaxTotStaSer, GetTaxTotSupSer, LstTaxArLine...` | [`APS430MI.json`](mi-swagger/APS430MI.json) |
| **`APS440MI`** | Supplier statement | 12 | `AddStmntHead, AddStmntLine, AddStmntPayee, FpwVersion, GetCurrentUser...` | [`APS440MI.json`](mi-swagger/APS440MI.json) |
| **`APS450MI`** | Supplier Invoice Batch APL | 36 | `AcceptInvoice, Acknowledge, AddAddInfo, AddHead, AddHeadRecode...` | [`APS450MI.json`](mi-swagger/APS450MI.json) |
| **`APS455MI`** | Supplier Invoice Batch Validation | 13 | `ConfrmByBatchNo, ConfrmBySelect, ValidByBatchNo, ValidBySelect, FpwVersion...` | [`APS455MI.json`](mi-swagger/APS455MI.json) |
| **`APS485MI`** | Create credit self-billing | 12 | `CrtCreditInv, CrtCreditPOLine, CrtCreditRcpt, FpwVersion, GetCurrentUser...` | [`APS485MI.json`](mi-swagger/APS485MI.json) |
| **`APS630MI`** | Supplier payment proposal | 18 | `ApproveProposal, ChangeBank, ChgPmtMethod, DeleteProposal, Get...` | [`APS630MI.json`](mi-swagger/APS630MI.json) |
| **`APS631MI`** | Supplier payment proposal | 16 | `Dlt, Get, Lst, Upd, UpdPaymentMtd...` | [`APS631MI.json`](mi-swagger/APS631MI.json) |
| **`APS635MI`** | Supplier payment proposal | 13 | `ConfirmProposal, CreateProposal, PrelimProposal, PrintProposal, FpwVersion...` | [`APS635MI.json`](mi-swagger/APS635MI.json) |
| **`APS905MI`** | Accounts payable interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS905MI.json`](mi-swagger/APS905MI.json) |
| **`APS925MI`** | Supplier self-billing invoice settings | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS925MI.json`](mi-swagger/APS925MI.json) |
| **`ARBR01MI`** | COUNTRY:Bank remittance proposal interface | 13 | `GetHead, GetPayerInfo, LstPayerInfo, LstRemByPayer, FpwVersion...` | [`ARBR01MI.json`](mi-swagger/ARBR01MI.json) |
| **`ARBR75MI`** | Batch payment types for Brazil | 11 | `GetBasicData, GetBatchPaymTyp, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARBR75MI.json`](mi-swagger/ARBR75MI.json) |
| **`ARPT01MI`** | Payment receipt digital signature | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`ARPT01MI.json`](mi-swagger/ARPT01MI.json) |
| **`ARS008MI`** | Interest rule | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS008MI.json`](mi-swagger/ARS008MI.json) |
| **`ARS015MI`** | Bank fee type | 15 | `AddBankFee, CpyBankFee, DltBankFee, GetBankFee, LstBankFee...` | [`ARS015MI.json`](mi-swagger/ARS015MI.json) |
| **`ARS020MI`** | AR Accounting options | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS020MI.json`](mi-swagger/ARS020MI.json) |
| **`ARS040MI`** | Batch payments | 13 | `AddBatchCharge, AddBatchHead, AddBatchLine, ControlBatch, FpwVersion...` | [`ARS040MI.json`](mi-swagger/ARS040MI.json) |
| **`ARS092MI`** | Cash Register ID | 15 | `AddCashRegistID, CpyCashRegistID, DltCashRegistID, GetCashRegistID, LstCashRegistID...` | [`ARS092MI.json`](mi-swagger/ARS092MI.json) |
| **`ARS120MI`** | Manual customer invoices | 14 | `GetHeadText, GetInvHead, LstInvLines, LstSalesTaxInfo, LstTxExmpTxtVAT...` | [`ARS120MI.json`](mi-swagger/ARS120MI.json) |
| **`ARS125MI`** | Debit notes | 10 | `UpdateDebitNote, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`ARS125MI.json`](mi-swagger/ARS125MI.json) |
| **`ARS200MI`** | Customer invoice information | 17 | `GetCashDiscInfo, GetInvTotInfo, GetInvoice, GetUniqueKey, LstInvByDivi...` | [`ARS200MI.json`](mi-swagger/ARS200MI.json) |
| **`ARS201MI`** | Update customer invoice | 11 | `UpdCustInv, UpdPmtReminStop, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARS201MI.json`](mi-swagger/ARS201MI.json) |
| **`ARS251MI`** | Accounts receivable additional information | 16 | `AddCustomsDecNo, AddInfoCat, DltInfoCat, LstExtraInfo, LstInfo...` | [`ARS251MI.json`](mi-swagger/ARS251MI.json) |
| **`ARS300MI`** | Bank remittance proposals | 23 | `DeleteProposal, GetHead, GetHead2, GetHeadAddress, GetPayerInfo...` | [`ARS300MI.json`](mi-swagger/ARS300MI.json) |
| **`ARS355MI`** | Bank remittance - Reconcile payments per due date | 15 | `CreateProposal, DeleteProposal, GetBankConfNo, Recalculate, ReconProposal...` | [`ARS355MI.json`](mi-swagger/ARS355MI.json) |
| **`ARS356MI`** | Bank remittance - Update details | 13 | `Delete, Hold, List, Release, FpwVersion...` | [`ARS356MI.json`](mi-swagger/ARS356MI.json) |
| **`ARS400MI`** | Payment Receipt | 13 | `GetPaymentRcpt, LstPaymentRcpt, PrintCopy, RestartInteJob, FpwVersion...` | [`ARS400MI.json`](mi-swagger/ARS400MI.json) |
| **`ARS401MI`** | Payment Receipt Document | 13 | `GetPmtRcptDoc, LstPmtRcptDoc, SelDocByCashReg, UpdPmtRcptDoc, FpwVersion...` | [`ARS401MI.json`](mi-swagger/ARS401MI.json) |
| **`ARS402MI`** | Payment receipt lines | 11 | `GetPmtRcptLine, LstPmtRcptLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARS402MI.json`](mi-swagger/ARS402MI.json) |
| **`ARS410MI`** | Manages payment remittance header | 15 | `Dlt, Get, LockProposal, Lst, LstTotPerPmtDt...` | [`ARS410MI.json`](mi-swagger/ARS410MI.json) |
| **`ARS411MI`** | Manage payment remittance details | 16 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS411MI.json`](mi-swagger/ARS411MI.json) |
| **`ARS412MI`** | Manage payment remittance invoices | 16 | `AddInvoice, Dlt, ExcludeRecord, Get, IncludeRecord...` | [`ARS412MI.json`](mi-swagger/ARS412MI.json) |
| **`ARS413MI`** | Manages remittance payment information | 12 | `CrtPaymentInfo, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS413MI.json`](mi-swagger/ARS413MI.json) |
| **`ARS415MI`** | Manages payment remittance | 16 | `Confirm, CreateProposal, PrintPmtAdvice, PrintProposal, Reconcile...` | [`ARS415MI.json`](mi-swagger/ARS415MI.json) |
| **`ARS425MI`** | Withheld tax AR management | 15 | `Add, AddCertNbr, Dlt, Get, Lst...` | [`ARS425MI.json`](mi-swagger/ARS425MI.json) |
| **`ARS450MI`** | Direct debiting agreements | 14 | `AddDirDebAgr, DelDirDebAgr, GetBasicData, LstAgrByCustNo, UpdAgr...` | [`ARS450MI.json`](mi-swagger/ARS450MI.json) |
| **`ARS460MI`** | Direct debiting agreements transfer | 14 | `GetAgByCustomer, GetCustomerHead, GetHead, GetHeadAdress, LstAgByCustomer...` | [`ARS460MI.json`](mi-swagger/ARS460MI.json) |
| **`ARS630MI`** | Doubful accounts proposal | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS630MI.json`](mi-swagger/ARS630MI.json) |
| **`ARS631MI`** | Doubtful accounts details | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS631MI.json`](mi-swagger/ARS631MI.json) |
| **`ARS632MI`** | Doubtful accounts  invoice | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS632MI.json`](mi-swagger/ARS632MI.json) |
| **`ARS635MI`** | Doubtful accounts allowance | 13 | `Confirm, CreateProposal, PrintProposal, ResetPropStatus, FpwVersion...` | [`ARS635MI.json`](mi-swagger/ARS635MI.json) |
| **`ARS640MI`** | Manages statement of account header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS640MI.json`](mi-swagger/ARS640MI.json) |
| **`ARS641MI`** | Manage statement of account details | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS641MI.json`](mi-swagger/ARS641MI.json) |
| **`ARS642MI`** | Manage statement of account invoice | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS642MI.json`](mi-swagger/ARS642MI.json) |
| **`ARS645MI`** | Manages statement of account | 13 | `Confirm, CreateProposal, PrintProposal, PrintStatement, FpwVersion...` | [`ARS645MI.json`](mi-swagger/ARS645MI.json) |
| **`ARS650MI`** | Manages payment reminder header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS650MI.json`](mi-swagger/ARS650MI.json) |
| **`ARS651MI`** | Manage payment reminder details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS651MI.json`](mi-swagger/ARS651MI.json) |
| **`ARS652MI`** | Manage payment reminder invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS652MI.json`](mi-swagger/ARS652MI.json) |
| **`ARS655MI`** | Manages payment reminders. | 13 | `Confirm, CreateProposal, PrintProposal, PrintReminder, FpwVersion...` | [`ARS655MI.json`](mi-swagger/ARS655MI.json) |
| **`ARS660MI`** | Manages interest invoice header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS660MI.json`](mi-swagger/ARS660MI.json) |
| **`ARS661MI`** | Manages interest invoice details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS661MI.json`](mi-swagger/ARS661MI.json) |
| **`ARS662MI`** | Manages interest invoice invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS662MI.json`](mi-swagger/ARS662MI.json) |
| **`ARS665MI`** | Manages interest invoices. | 13 | `Confirm, CreateProposal, PrintIntInvoice, PrintProposal, FpwVersion...` | [`ARS665MI.json`](mi-swagger/ARS665MI.json) |
| **`ARS670MI`** | Manages collection header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS670MI.json`](mi-swagger/ARS670MI.json) |
| **`ARS671MI`** | Manages collection details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS671MI.json`](mi-swagger/ARS671MI.json) |
| **`ARS672MI`** | Manages collection invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS672MI.json`](mi-swagger/ARS672MI.json) |
| **`ARS675MI`** | Manages collection. | 13 | `Confirm, CreateProposal, PrintCollection, PrintProposal, FpwVersion...` | [`ARS675MI.json`](mi-swagger/ARS675MI.json) |
| **`ARS905MI`** | Accounts receivable interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS905MI.json`](mi-swagger/ARS905MI.json) |
| **`ATS010MI`** | Attribute | 21 | `AddAttrLang, AddAttribute, DelAttrLang, DelAttribute, GetAttrLang...` | [`ATS010MI.json`](mi-swagger/ATS010MI.json) |
| **`ATS014MI`** | Display Group Interface | 15 | `AddDisplayGroup, DelDisplayGroup, GetDisplayGroup, LstDisplayGroup, LstDspByDesc...` | [`ATS014MI.json`](mi-swagger/ATS014MI.json) |
| **`ATS020MI`** | Attribute Values Matrix | 17 | `AddAttrMatrix, AddAttrValue, DelAttrMatrix, DelAttrValue, LstAttrMatrix...` | [`ATS020MI.json`](mi-swagger/ATS020MI.json) |
| **`ATS030MI`** | Default Attribute Values | 15 | `AddDefaultVal, AddPriority, DelDefaultVal, GetDefaultVal, LstDefaultVal...` | [`ATS030MI.json`](mi-swagger/ATS030MI.json) |
| **`ATS040MI`** | Attribute Dependent Values | 18 | `AddAttrDepID, AddAttrDepObj, AddAttrDepVal, AddPriority, DelAttrDepID...` | [`ATS040MI.json`](mi-swagger/ATS040MI.json) |
| **`ATS050MI`** | Attribute Model | 21 | `AddAttrModel, AddAttribute, DelAttrModel, DelAttribute, GetAttrModel...` | [`ATS050MI.json`](mi-swagger/ATS050MI.json) |
| **`ATS061MI`** | Default Information Group | 14 | `AddDefInfGrp, DltDefInfGrp, GetDefInfGrp, LstDefInfGrp, UpdDefInfGrp...` | [`ATS061MI.json`](mi-swagger/ATS061MI.json) |
| **`ATS070MI`** | Attribute table interface | 16 | `AddAttrTable, AddLngTxt, CpyAttrTable, DltAttrTable, GetAttrTable...` | [`ATS070MI.json`](mi-swagger/ATS070MI.json) |
| **`ATS071MI`** | Attrbute model selection interface | 14 | `AddAttrModel, DltAttrModel, GetAttrModel, LstAttrModel, UpdAttrModel...` | [`ATS071MI.json`](mi-swagger/ATS071MI.json) |
| **`ATS101MI`** | Attribute Information Interface | 29 | `AddAttr, CalcOrderAttrb, CalcSettlement, CalcStockAttrb, DltAttr...` | [`ATS101MI.json`](mi-swagger/ATS101MI.json) |
| **`ATS103MI`** | Condition report interface | 20 | `Add, AddReport, AddReportSerial, Cpy, Dlt...` | [`ATS103MI.json`](mi-swagger/ATS103MI.json) |
| **`ATS104MI`** | Specification report interface | 20 | `Add, AddReport, AddReportSerial, Cpy, Dlt...` | [`ATS104MI.json`](mi-swagger/ATS104MI.json) |
| **`ATS105MI`** | Condition report interface | 15 | `Add, Dlt, Get, Lst, LstQuoteLine...` | [`ATS105MI.json`](mi-swagger/ATS105MI.json) |
| **`ATS200MI`** | Additional Information Interface | 13 | `AddAddInf, CopyAddInf, DltAddInf, LstAddInfo, FpwVersion...` | [`ATS200MI.json`](mi-swagger/ATS200MI.json) |
| **`AUTCHKMI`** | Check authority | 13 | `ChkAutTblRcd, ChkAuthority, SelFncRolePerm, SelRolePerm, FpwVersion...` | [`AUTCHKMI.json`](mi-swagger/AUTCHKMI.json) |
| **`BODCSSMI`** | Business Object Documents | 10 | `LstBillToParty, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`BODCSSMI.json`](mi-swagger/BODCSSMI.json) |
| **`BOOKMKMI`** | Bookmark metadata interface | 16 | `Exists, GetParByInfoCat, GetParByPgm, GetParByTable, LstExtraParams...` | [`BOOKMKMI.json`](mi-swagger/BOOKMKMI.json) |
| **`BROWSEMI`** | Browse functionality for clients | 17 | `GetBrowseParms, GetParameters, LstBrowseParms, LstBrowseVals, LstParameters...` | [`BROWSEMI.json`](mi-swagger/BROWSEMI.json) |
| **`BUS100MI`** | Budget Definition | 26 | `AddBudgetHeader, AddBudgetLines, AddBudgetLnPer, DelBudgetHeader, DelBudgetLines...` | [`BUS100MI.json`](mi-swagger/BUS100MI.json) |
| **`CAS025MI`** | API Settings - Inventory Valuation | 16 | `AddInvValuation, CpyInvValuation, DltInvValuation, GetInvValuation, LstInvValuation...` | [`CAS025MI.json`](mi-swagger/CAS025MI.json) |
| **`CAS030MI`** | API Settings - WIP Valuation | 15 | `AddWIPValuation, CpyWIPValuation, DltWIPValuation, GetWIPValuation, LstWIPValuation...` | [`CAS030MI.json`](mi-swagger/CAS030MI.json) |
| **`CAS310MI`** | Release / Hold Order costing | 13 | `LstByProduct, LstBySchedule, RelHoldOrdrCost, RelHoldSchedNo, FpwVersion...` | [`CAS310MI.json`](mi-swagger/CAS310MI.json) |
| **`CAS393MI`** | Analytic Accounting Model / Balance | 12 | `AddAccBalance, DelActValues, DelBudgValues, FpwVersion, GetCurrentUser...` | [`CAS393MI.json`](mi-swagger/CAS393MI.json) |
| **`CBS001MI`** | Api: Capable object | 13 | `Cpy, Del, Get, Lst, FpwVersion...` | [`CBS001MI.json`](mi-swagger/CBS001MI.json) |
| **`CBS002MI`** | Api: Capability | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS002MI.json`](mi-swagger/CBS002MI.json) |
| **`CBS003MI`** | Api: Capability range | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS003MI.json`](mi-swagger/CBS003MI.json) |
| **`CBS004MI`** | Api: Capability definition | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS004MI.json`](mi-swagger/CBS004MI.json) |
| **`CBS005MI`** | Api: Capability type | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS005MI.json`](mi-swagger/CBS005MI.json) |
| **`CBS006MI`** | Api: Capability level | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS006MI.json`](mi-swagger/CBS006MI.json) |
| **`CBS007MI`** | Api: Capability history | 14 | `Add, Chg, Del, Get, Lst...` | [`CBS007MI.json`](mi-swagger/CBS007MI.json) |
| **`CBS010MI`** | Api: Role definition | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS010MI.json`](mi-swagger/CBS010MI.json) |
| **`CBS011MI`** | Api: Role/employee | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS011MI.json`](mi-swagger/CBS011MI.json) |
| **`CBS012MI`** | Capacity connect to role | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CBS012MI.json`](mi-swagger/CBS012MI.json) |
| **`CCHKVOMI`** | Retrieve voucher number interface | 10 | `GetNumber, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CCHKVOMI.json`](mi-swagger/CCHKVOMI.json) |
| **`CEVENTMI`** | Eventstore | 17 | `ActArchived, Add, Archive, Del, DelArchive...` | [`CEVENTMI.json`](mi-swagger/CEVENTMI.json) |
| **`CLAIMSMI`** | API interface Maint Claims | 52 | `AddClaimHead, AddClaimSpec, AddClaimVer, ApproveReqAmt, ApproveTotalAmt...` | [`CLAIMSMI.json`](mi-swagger/CLAIMSMI.json) |
| **`CMBR01MI`** | Custom Declaration Info Header | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMBR01MI.json`](mi-swagger/CMBR01MI.json) |
| **`CMBR02MI`** | Custom Declaration Info Lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMBR02MI.json`](mi-swagger/CMBR02MI.json) |
| **`CMS001MI`** | Planning Node Distribution Relation | 10 | `LstRelations, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CMS001MI.json`](mi-swagger/CMS001MI.json) |
| **`CMS003MI`** | Company Business Type interface | 15 | `AddBusinessType, CpyBusinessType, DltBusinessType, GetBusinessType, LstBusinessType...` | [`CMS003MI.json`](mi-swagger/CMS003MI.json) |
| **`CMS004MI`** | Manages the XML variant per printer file | 15 | `AddLngTxtOVNM, DltLngTxtOVNM, GetXmlVariant, LstPrtfVariants, LstXmlVariants...` | [`CMS004MI.json`](mi-swagger/CMS004MI.json) |
| **`CMS005MI`** | List and printer programs configuration and metadata | 18 | `GenStandard, GetInfoCategory, LstFieldInfo, LstInfoCategory, LstSortOrdInfo...` | [`CMS005MI.json`](mi-swagger/CMS005MI.json) |
| **`CMS006MI`** | Manages the XML Structure per Printerfile | 17 | `AddXmlStructure, DltXmlArchAttr, DltXmlStructure, GetXmlStructure, LstPrtfStructs...` | [`CMS006MI.json`](mi-swagger/CMS006MI.json) |
| **`CMS007MI`** | Manages in defining the XML Sections | 23 | `AddCustSection, AddCustSubtotal, AddCustTxtBlock, AddLngTxtOVNM, AddXmlSection...` | [`CMS007MI.json`](mi-swagger/CMS007MI.json) |
| **`CMS008MI`** | Manages XML Sections Table | 15 | `AddFields, AddSectionTable, DltSectionTable, GetSectionTable, LstSectionTable...` | [`CMS008MI.json`](mi-swagger/CMS008MI.json) |
| **`CMS009MI`** | Manages in defining the XML Elements | 24 | `AddLngTxtOVNM, AddLngTxtTX40, AddRowSection, AddXmlAttribute, AddXmlElement...` | [`CMS009MI.json`](mi-swagger/CMS009MI.json) |
| **`CMS010MI`** | Information Browser Category | 19 | `ActivateInfoCat, AddInfoCat, AddStdVrtFld, CheckSortOption, ChgInfoCat...` | [`CMS010MI.json`](mi-swagger/CMS010MI.json) |
| **`CMS011MI`** | Information Browser Category - Related Tables | 15 | `AddFields, AddRelatedTable, DelRelatedTable, GetRelatedTable, LstRelatedTable...` | [`CMS011MI.json`](mi-swagger/CMS011MI.json) |
| **`CMS012MI`** | Information Browser Category - Virtul Fields | 23 | `AddCalcVal, AddCurrConv, AddDate, AddDescription, AddExtendedCalc...` | [`CMS012MI.json`](mi-swagger/CMS012MI.json) |
| **`CMS013MI`** | Information browser category related option management | 14 | `Add, AddLngTxt, Dlt, Get, Upd...` | [`CMS013MI.json`](mi-swagger/CMS013MI.json) |
| **`CMS015MI`** | Manages the custom Information Browser - MI | 18 | `AddCustomMI, DltCustomMI, DltMIRepository, GetCustomMI, ImportCustomMI...` | [`CMS015MI.json`](mi-swagger/CMS015MI.json) |
| **`CMS018MI`** | Manages the XML Custom Subtotals Sections | 14 | `AddCustSubtotal, DltCustSubtotal, GetCustSubtotal, LstCustSubtotal, UpdCustSubtotal...` | [`CMS018MI.json`](mi-swagger/CMS018MI.json) |
| **`CMS020MI`** | Planning Node | 10 | `LstPlanningNode, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CMS020MI.json`](mi-swagger/CMS020MI.json) |
| **`CMS025MI`** | Manages in defining the Report Layout | 18 | `AddLngTxtTX40, AddLngTxtWTTX, AddReportLayout, DltLngTxtTX40, DltLngTxtWTTX...` | [`CMS025MI.json`](mi-swagger/CMS025MI.json) |
| **`CMS030MI`** | Key search | 14 | `AddKeySearch, DelKeySearch, GetKeySearch, LstKeySearch, UpdKeySearch...` | [`CMS030MI.json`](mi-swagger/CMS030MI.json) |
| **`CMS033MI`** | Custom Text Section Interface | 15 | `AddCustTextSec, CpyCustTextSec, DltCustTextSec, GetCustTextSec, LstCustTextSec...` | [`CMS033MI.json`](mi-swagger/CMS033MI.json) |
| **`CMS034MI`** | Key Group Interface | 17 | `AddKeyGroup, AddLngTxt, CpyKeyGroup, DltKeyGroup, DltLngTxt...` | [`CMS034MI.json`](mi-swagger/CMS034MI.json) |
| **`CMS035MI`** | Search Tags | 13 | `Add, Chg, Del, List, FpwVersion...` | [`CMS035MI.json`](mi-swagger/CMS035MI.json) |
| **`CMS036MI`** | Text Identity Interface | 22 | `AddLngTxtFRTX, AddLngTxtTX40, AddText, AddTextIdentity, CpyTextIdentity...` | [`CMS036MI.json`](mi-swagger/CMS036MI.json) |
| **`CMS038MI`** | XML Custom Text Key Field Interface | 14 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS038MI.json`](mi-swagger/CMS038MI.json) |
| **`CMS045MI`** | Event based subscriptions/alerts | 22 | `AddAlertRule, AddFieldKey, AddSubscription, DelAlertRule, DelSubscription...` | [`CMS045MI.json`](mi-swagger/CMS045MI.json) |
| **`CMS048MI`** | Event log fields | 14 | `AddField, DltField, GetField, LstFields, UpdField...` | [`CMS048MI.json`](mi-swagger/CMS048MI.json) |
| **`CMS050MI`** | Action Log | 19 | `CloseAction, CreateHeader, CreateLine, DeleteHeader, DeleteLine...` | [`CMS050MI.json`](mi-swagger/CMS050MI.json) |
| **`CMS055MI`** | Customer. Connect Contact | 13 | `AddConnection, DeleteConnect, LstByCustomer, LstConnection, FpwVersion...` | [`CMS055MI.json`](mi-swagger/CMS055MI.json) |
| **`CMS071MI`** | Start Day Interval Rules | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CMS071MI.json`](mi-swagger/CMS071MI.json) |
| **`CMS072MI`** | Start Day Interval Rule Details Interface | 13 | `AddDateRule, DltDateRule, GetDateRule, LstDateRules, FpwVersion...` | [`CMS072MI.json`](mi-swagger/CMS072MI.json) |
| **`CMS075MI`** | Manages the Search Tables and Fields. | 17 | `AddSearchFld, CpySearchFld, DltSearchFld, GenStd, GetSearchFld...` | [`CMS075MI.json`](mi-swagger/CMS075MI.json) |
| **`CMS076MI`** | Manages the Action for the data fields | 16 | `AddAction, CpyAction, DltAction, GenStd, GetAction...` | [`CMS076MI.json`](mi-swagger/CMS076MI.json) |
| **`CMS080MI`** | Manages the Customer Extension Field Attributes | 14 | `AddCustExtMetad, DltCustExtMetad, GetCustExtMetad, LstCustExtMetad, UpdCustExtMetad...` | [`CMS080MI.json`](mi-swagger/CMS080MI.json) |
| **`CMS081MI`** | Manages Customer extension Field Attributes in CUGEVM table | 14 | `AddCustExtVaMap, DltCustExtVaMap, GetCustExtVaMap, LstCustExtVaMap, UpdCustExtVaMap...` | [`CMS081MI.json`](mi-swagger/CMS081MI.json) |
| **`CMS082MI`** | Manges the User-Defined Fields Interface | 16 | `AddField, AddLngTxt, DltField, GenerateEntries, GetField...` | [`CMS082MI.json`](mi-swagger/CMS082MI.json) |
| **`CMS083MI`** | Manages User-Defined Fields Value Map in CUDFLV table | 15 | `AddLngTxt, AddValue, DltValue, GetValue, LstValues...` | [`CMS083MI.json`](mi-swagger/CMS083MI.json) |
| **`CMS085MI`** | Formating Rule Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS085MI.json`](mi-swagger/CMS085MI.json) |
| **`CMS086MI`** | Field Formatting Rules Interface | 13 | `Add, Cpy, Dlt, Lst, FpwVersion...` | [`CMS086MI.json`](mi-swagger/CMS086MI.json) |
| **`CMS095MI`** | NLP Translation Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS095MI.json`](mi-swagger/CMS095MI.json) |
| **`CMS096MI`** | Manages Mapping of text for Natural Language Processing | 17 | `Add, Cpy, Dlt, Get, GetNLPText...` | [`CMS096MI.json`](mi-swagger/CMS096MI.json) |
| **`CMS100MI`** | Custom list designer MI | 169 | `Lst3PLAdjust, Lst3PLOpenCO, Lst3PLOpenDO, Lst3PLOpenPO, Lst3PLStLoad...` | [`CMS100MI.json`](mi-swagger/CMS100MI.json) |
| **`CMS103MI`** | Finance Reason Code | 14 | `AddFinReason, DltFinReason, GetFinReason, LstFinReason, UpdFinReason...` | [`CMS103MI.json`](mi-swagger/CMS103MI.json) |
| **`CMS105MI`** | Manages the Advanced Selection | 14 | `AddAdvSelection, DelAdvSelection, GetAdvSelection, LstAdvSelection, UpdAdvSelection...` | [`CMS105MI.json`](mi-swagger/CMS105MI.json) |
| **`CMS124MI`** | Tariff code group management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS124MI.json`](mi-swagger/CMS124MI.json) |
| **`CMS126MI`** | Tariff code object selection management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS126MI.json`](mi-swagger/CMS126MI.json) |
| **`CMS127MI`** | Tariff code object control management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS127MI.json`](mi-swagger/CMS127MI.json) |
| **`CMS128MI`** | Tariff code management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS128MI.json`](mi-swagger/CMS128MI.json) |
| **`CMS129MI`** | Tariff code country text management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS129MI.json`](mi-swagger/CMS129MI.json) |
| **`CMS130MI`** | Import declaration info header | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS130MI.json`](mi-swagger/CMS130MI.json) |
| **`CMS131MI`** | Import declaration info lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS131MI.json`](mi-swagger/CMS131MI.json) |
| **`CMS133MI`** | Manage delivery connected to import declaration | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS133MI.json`](mi-swagger/CMS133MI.json) |
| **`CMS135MI`** | Import declaration transaction history | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CMS135MI.json`](mi-swagger/CMS135MI.json) |
| **`CMS137MI`** | Import declaration transaction summary | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CMS137MI.json`](mi-swagger/CMS137MI.json) |
| **`CMS200MI`** | ICustomer channel | 20 | `Add, AddCusActivity, AddCusChannelID, Del, DelCusActivity...` | [`CMS200MI.json`](mi-swagger/CMS200MI.json) |
| **`CMS210MI`** | Manages the GDPR Data Subject Run in CDPRUN table | 33 | `AddRun, AddRunLn, AddSrData, CpyRun, CpyRunLn...` | [`CMS210MI.json`](mi-swagger/CMS210MI.json) |
| **`CMS212MI`** | Manages the GDPR Search Result in CDPRSH table | 17 | `DltResAct, DltSrRes, GetResAct, GetSrRes, LstResActByID...` | [`CMS212MI.json`](mi-swagger/CMS212MI.json) |
| **`CMS220MI`** | Manages the GDPR Anonymous Key Data in CDPKEY table | 12 | `GetAnymsKey, LstByAnymsKey, LstByText, FpwVersion, GetCurrentUser...` | [`CMS220MI.json`](mi-swagger/CMS220MI.json) |
| **`CMS235MI`** | Tax regime interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS235MI.json`](mi-swagger/CMS235MI.json) |
| **`CMS236MI`** | Tax calculation code number | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS236MI.json`](mi-swagger/CMS236MI.json) |
| **`CMS239MI`** | External withholding tax code management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS239MI.json`](mi-swagger/CMS239MI.json) |
| **`CMS240MI`** | CSYTAB Export Interface | 13 | `AddCSYTAB, AddLngTxt, ChkSysConf, DltCSYTAB, FpwVersion...` | [`CMS240MI.json`](mi-swagger/CMS240MI.json) |
| **`CMS250MI`** | User Location Interface | 13 | `CheckIn, GetCurrUserLoc, GetUserLocation, LstUserLocation, FpwVersion...` | [`CMS250MI.json`](mi-swagger/CMS250MI.json) |
| **`CMS300MI`** | Event log | 14 | `Get, Lst, LstField, LstKey, Upd...` | [`CMS300MI.json`](mi-swagger/CMS300MI.json) |
| **`CMS325MI`** | Event management | 13 | `DltApiCalls, DltDupLogs, LstApiCalls, LstDupLogs, FpwVersion...` | [`CMS325MI.json`](mi-swagger/CMS325MI.json) |
| **`CMS350MI`** | Event log subscriber | 14 | `AddPartner, DltPartner, GetPartner, LstPartners, UpdPartner...` | [`CMS350MI.json`](mi-swagger/CMS350MI.json) |
| **`CMS430MI`** | Manage Records for the Record Locking Functionality | 17 | `AddRecordLock, DltMultiRecLock, DltRecordLock, GetRecordLock, LstRecordLock...` | [`CMS430MI.json`](mi-swagger/CMS430MI.json) |
| **`CMS432MI`** | Manage Reason Codes for the Record Locking Functionality | 15 | `AddReasonCode, CpyReasonCode, DltReasonCode, GetReasonCode, LstReasonCode...` | [`CMS432MI.json`](mi-swagger/CMS432MI.json) |
| **`CMS460MI`** | Interest Rate ID interface | 15 | `AddIrti, CpyIrti, DltIrti, GetIRTI, LstIrti...` | [`CMS460MI.json`](mi-swagger/CMS460MI.json) |
| **`CMS461MI`** | Interest Rate ID interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS461MI.json`](mi-swagger/CMS461MI.json) |
| **`CMS470MI`** | Manages the Custom Fields | 14 | `AddCustomField, DltCustomField, GetCustomField, LstCustomField, UpdCustomField...` | [`CMS470MI.json`](mi-swagger/CMS470MI.json) |
| **`CMS471MI`** | Manages the Custom Field Group | 14 | `AddCustFieldGrp, DltCustFieldGrp, GetCustFieldGrp, LstCustFieldGrp, UpdCustFieldGrp...` | [`CMS471MI.json`](mi-swagger/CMS471MI.json) |
| **`CMS472MI`** | Manages the link of Custom Field in the Custom Field Group | 14 | `AddCustPerGrp, DltCustPerGrp, GetCustPerGrp, LstCustPerGrp, UpdCustPerGrp...` | [`CMS472MI.json`](mi-swagger/CMS472MI.json) |
| **`CMS473MI`** | Manages the link of Custom Field Group to Items | 14 | `AddConnection, DltConnection, GetConnection, LstConnection, UpdConnection...` | [`CMS473MI.json`](mi-swagger/CMS473MI.json) |
| **`CMS474MI`** | User Defined Fields | 30 | `AddCompInfo, AddEqInfo, AddPosInfo, AddUdefContent, DltCompInfo...` | [`CMS474MI.json`](mi-swagger/CMS474MI.json) |
| **`CMS520MI`** | E-invoice Settings | 14 | `AddSettings, DltSettings, GetSettings, LstSettings, UpdSettings...` | [`CMS520MI.json`](mi-swagger/CMS520MI.json) |
| **`CMS525MI`** | E-invoice Additional Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS525MI.json`](mi-swagger/CMS525MI.json) |
| **`CMS526MI`** | BO Entry E-invoice Additional Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS526MI.json`](mi-swagger/CMS526MI.json) |
| **`CMS530MI`** | Data field name interface | 15 | `AddDfna, CpyDfna, DltDfna, GetDfna, LstDfna...` | [`CMS530MI.json`](mi-swagger/CMS530MI.json) |
| **`CMS535MI`** | SchemeID interface | 15 | `AddSchemeID, CpySchemeID, DltSchemeID, GetSchemeID, LstSchemeID...` | [`CMS535MI.json`](mi-swagger/CMS535MI.json) |
| **`CMS540MI`** | E-invoice interface | 15 | `AddEivf, CpyEivf, DltEivf, GetEivf, LstEivf...` | [`CMS540MI.json`](mi-swagger/CMS540MI.json) |
| **`CMS550MI`** | Customer invoice number approval | 13 | `Get, LstAINO, LstCINO, UpdAppdInvNo, FpwVersion...` | [`CMS550MI.json`](mi-swagger/CMS550MI.json) |
| **`CMS560MI`** | Supplier E-invoice header | 16 | `AcptHead, AddHead, DltHead, GetHead, LstHead...` | [`CMS560MI.json`](mi-swagger/CMS560MI.json) |
| **`CMS561MI`** | Supplier E-invoice government information | 14 | `AddGovInfo, DltGovInfo, GetGovInfo, LstGovInfo, UpdGovInfo...` | [`CMS561MI.json`](mi-swagger/CMS561MI.json) |
| **`CMS615MI`** | Api: Supplier customer reference | 15 | `AddSupCustRef, DelSupCustRef, GetSupCustRef, LstByCustomer, LstBySupCustRef...` | [`CMS615MI.json`](mi-swagger/CMS615MI.json) |
| **`CMS616MI`** | Customer reference type | 13 | `AddSupRefType, DelSupRefType, GetSupRefType, LstSupRefType, FpwVersion...` | [`CMS616MI.json`](mi-swagger/CMS616MI.json) |
| **`CMS700MI`** | Settings - Output Management | 13 | `Add, Del, Get, Upd, FpwVersion...` | [`CMS700MI.json`](mi-swagger/CMS700MI.json) |
| **`CMS710MI`** | Authorization Selections | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS710MI.json`](mi-swagger/CMS710MI.json) |
| **`CMS711MI`** | Authorization Priorities object field | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS711MI.json`](mi-swagger/CMS711MI.json) |
| **`CMS715MI`** | Approval flow general managment | 18 | `Add, Cpy, Dlt, Get, LstPerApprType...` | [`CMS715MI.json`](mi-swagger/CMS715MI.json) |
| **`CMS716MI`** | Approval route management | 15 | `Add, Cpy, Dlt, Get, LstPosFilter...` | [`CMS716MI.json`](mi-swagger/CMS716MI.json) |
| **`CMS717MI`** | Approval route grp management | 15 | `Add, Cpy, Dlt, Get, LstPosFilter...` | [`CMS717MI.json`](mi-swagger/CMS717MI.json) |
| **`CMS718MI`** | Authorized users management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS718MI.json`](mi-swagger/CMS718MI.json) |
| **`CMS719MI`** | Authorized user route groups | 17 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS719MI.json`](mi-swagger/CMS719MI.json) |
| **`CMS720MI`** | Approval code management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS720MI.json`](mi-swagger/CMS720MI.json) |
| **`CMS721MI`** | Approval code route groups | 17 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS721MI.json`](mi-swagger/CMS721MI.json) |
| **`CMS730MI`** | Profile Management | 15 | `AddProfile, CpyProfile, DltProfile, GetProfile, LstProfile...` | [`CMS730MI.json`](mi-swagger/CMS730MI.json) |
| **`CMS740MI`** | Approval Actions - Per user | 18 | `ApproveInvoice, CancelInvoice, ChangeRole, Get, Lst...` | [`CMS740MI.json`](mi-swagger/CMS740MI.json) |
| **`CMS741MI`** | Approval Actions - Per invoice | 17 | `AddTask, ChangeRole, Generate, Get, Lst...` | [`CMS741MI.json`](mi-swagger/CMS741MI.json) |
| **`CMS742MI`** | Approval Actions - Authorization | 16 | `ApproveAllLines, ApproveLine, Get, Lst, LstUserPerInv...` | [`CMS742MI.json`](mi-swagger/CMS742MI.json) |
| **`CMS798MI`** | APS Policy | 17 | `AddAPSPolicy, AddAPSPolicySel, DelAPSPolicy, DelAPSPolicySel, GetAPSPolicy...` | [`CMS798MI.json`](mi-swagger/CMS798MI.json) |
| **`CMS880MI`** | Business Message Data Translation | 15 | `AddMsgMapDet, DltMsgMapDet, GetMsgMapDet, LstMsgMapDet, UpdMsgMapDet...` | [`CMS880MI.json`](mi-swagger/CMS880MI.json) |
| **`CMS950MI`** | Db Update Manager | 17 | `DltProgram, GenPrograms, GetProgram, LstPrograms, RunAllPrograms...` | [`CMS950MI.json`](mi-swagger/CMS950MI.json) |
| **`CMS965MI`** | System Update Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CMS965MI.json`](mi-swagger/CMS965MI.json) |
| **`CMS970MI`** | Manages Feature Updates on Header Level | 13 | `Add, Get, GetGeneralInfo, Lst, FpwVersion...` | [`CMS970MI.json`](mi-swagger/CMS970MI.json) |
| **`CMS975MI`** | Manages Feature Updates on Line Levels | 20 | `DnAdoptions, Get, GetAdoption, GetKBURL, IsActive...` | [`CMS975MI.json`](mi-swagger/CMS975MI.json) |
| **`CODEXPMI`** | Generic API to interact with Configuration Items | 17 | `ExportConfItem, ExprtCnfItmCSV, ExprtCnfItmTag, GetConfigItem, GetIRN...` | [`CODEXPMI.json`](mi-swagger/CODEXPMI.json) |
| **`COS024MI`** | Labor sell rate interface | 15 | `Add, Delete, Get, List, LstByPriority...` | [`COS024MI.json`](mi-swagger/COS024MI.json) |
| **`COS100MI`** | Maintenance customer order interface | 33 | `Add, AddClaimMCO, AddHead, AddLine, ApproveMCOLine...` | [`COS100MI.json`](mi-swagger/COS100MI.json) |
| **`COS102MI`** | Advance Invoice | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`COS102MI.json`](mi-swagger/COS102MI.json) |
| **`COS115MI`** | Maintenance Quotation Information | 23 | `AccRelConQtn, AcceptQuotation, AddQuotation, AmendQuotation, ConvrtFixdPrice...` | [`COS115MI.json`](mi-swagger/COS115MI.json) |
| **`COS117MI`** | Split Payer MCO  interface | 14 | `Dlt, Get, GetItmCost, Lst, Upd...` | [`COS117MI.json`](mi-swagger/COS117MI.json) |
| **`COS119MI`** | Maintenance customer order. Connect Contact | 13 | `AddConnection, DeleteConnect, LstByOrder, LstConnection, FpwVersion...` | [`COS119MI.json`](mi-swagger/COS119MI.json) |
| **`COS120MI`** | Maintenance customer order stop | 12 | `GetMCOStop, LstMCOStop, UpdMCOStop, FpwVersion, GetCurrentUser...` | [`COS120MI.json`](mi-swagger/COS120MI.json) |
| **`COS150MI`** | Api; MCO Miscellaneous cost | 22 | `Add, Approve, Delete, DeleteByMSEQ, Get...` | [`COS150MI.json`](mi-swagger/COS150MI.json) |
| **`COS155MI`** | Manage MCO Miscellaneous cost | 19 | `Add, Approve, Confirm, Delete, Get...` | [`COS155MI.json`](mi-swagger/COS155MI.json) |
| **`COS160MI`** | Miscellaneous type | 15 | `Add, Copy, Delete, Get, List...` | [`COS160MI.json`](mi-swagger/COS160MI.json) |
| **`COS170MI`** | Maint CO Invoice Specification Interface | 19 | `AddInvoiceLine, CopySplit, DltInvoiceLine, Get, Lst...` | [`COS170MI.json`](mi-swagger/COS170MI.json) |
| **`COS180MI`** | Invoice select | 12 | `CreateInvoice, InvoiceProp, PrintQuotation, FpwVersion, GetCurrentUser...` | [`COS180MI.json`](mi-swagger/COS180MI.json) |
| **`COS275MI`** | Batch Order. Maintenance Customer Order | 14 | `AddBatchHead, AddBatchLine, AddText, Confirm, SndBatchLine...` | [`COS275MI.json`](mi-swagger/COS275MI.json) |
| **`COS340MI`** | MCOChangeItemSerialNumber Interface | 15 | `ChgMCOCustAgr, ChgMCOItemLot, ChgMCOLot, ChgWOItemLot, ChgWOLot...` | [`COS340MI.json`](mi-swagger/COS340MI.json) |
| **`COS350MI`** | Maint CO Invoices | 19 | `GetDelLine, GetInvHead, GetInvLine, LstDelLine, LstInvHead...` | [`COS350MI.json`](mi-swagger/COS350MI.json) |
| **`COS403MI`** | Agreement Site | 15 | `AddAgrSite, DltAgrSite, GetAgrSite, LstAgrSite, Search...` | [`COS403MI.json`](mi-swagger/COS403MI.json) |
| **`COS406MI`** | Agreement type interface | 14 | `AddAgrType, DltAgrType, GetAgrType, LstAgrType, UpdAgrType...` | [`COS406MI.json`](mi-swagger/COS406MI.json) |
| **`COS410MI`** | Maintenance agreement interface | 37 | `AddAgrCharges, AddAgrLines, AddAgrLinesMtrl, AddAgrObjects, AddAgreement...` | [`COS410MI.json`](mi-swagger/COS410MI.json) |
| **`COS413MI`** | Maint Agrmnt: Model Individual | 15 | `AddAgrModel, DltAgrModel, GetAgrModel, LstAgrModel, SearchAgrModel...` | [`COS413MI.json`](mi-swagger/COS413MI.json) |
| **`COS421MI`** | Contents of agreement | 14 | `Add, Del, Get, Lst, Upd...` | [`COS421MI.json`](mi-swagger/COS421MI.json) |
| **`COS427MI`** | Maint. Agreement invoice split | 14 | `Add, Dlt, Get, Lst, Upd...` | [`COS427MI.json`](mi-swagger/COS427MI.json) |
| **`COS429MI`** | Add contact person to Maint. Agreement | 13 | `AddContact, DelContact, GetContact, LstContact, FpwVersion...` | [`COS429MI.json`](mi-swagger/COS429MI.json) |
| **`COS433MI`** | Agreement Site Equipment | 15 | `AddAgrSiteEq, DltAgrSiteEq, GetAgrSiteEq, LstAgrSiteEq, Search...` | [`COS433MI.json`](mi-swagger/COS433MI.json) |
| **`COS435MI`** | List Agreements - select | 10 | `PrintMaintAgr, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS435MI.json`](mi-swagger/COS435MI.json) |
| **`COS438MI`** | Maintenance agreement line discount management | 15 | `AddDiscount, CpyDiscount, DltDiscount, GetDiscount, LstDiscounts...` | [`COS438MI.json`](mi-swagger/COS438MI.json) |
| **`COS439MI`** | Agreement profitability summary | 10 | `LstAgrProftblt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS439MI.json`](mi-swagger/COS439MI.json) |
| **`COS470MI`** | Content | 19 | `AddContDetails, AddContentType, DelContDetails, DelContentType, GetContDetails...` | [`COS470MI.json`](mi-swagger/COS470MI.json) |
| **`COS605MI`** | Order Confirmation | 10 | `PrintConfirm, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS605MI.json`](mi-swagger/COS605MI.json) |
| **`CPS100MI`** | Load and capacity | 11 | `SelDetailedLoad, SelTotalLoad, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CPS100MI.json`](mi-swagger/CPS100MI.json) |
| **`CPS170MI`** | Person Capacity | 10 | `Lst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CPS170MI.json`](mi-swagger/CPS170MI.json) |
| **`CPWAPPMI`** | CPW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`CPWAPPMI.json`](mi-swagger/CPWAPPMI.json) |
| **`CRAR03MI`** | Manage country specific customer information for Argentina | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRAR03MI.json`](mi-swagger/CRAR03MI.json) |
| **`CRBR04MI`** | Manage extra information of items | 15 | `AddItem, CpyItem, DltItem, GetItem, LstItems...` | [`CRBR04MI.json`](mi-swagger/CRBR04MI.json) |
| **`CRBR11MI`** | Basic customer data information for Brazil | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRBR11MI.json`](mi-swagger/CRBR11MI.json) |
| **`CRBR55MI`** | BR Facility | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRBR55MI.json`](mi-swagger/CRBR55MI.json) |
| **`CRBR60MI`** | From To Federation Unit interface | 15 | `AddFromToFU, CpyFromToFU, DltFromToFU, GetFromToFU, LstFromToFU...` | [`CRBR60MI.json`](mi-swagger/CRBR60MI.json) |
| **`CRCCINMI`** | Credit Card Interface | 20 | `AddAuth, AddCCRefNo, AddCapture, AddCredit, AddPaymentRef...` | [`CRCCINMI.json`](mi-swagger/CRCCINMI.json) |
| **`CRIT10MI`** | COUNTRY: Customer ITA-information | 14 | `Add, Dlt, GetBasicData, LstByNumber, Upd...` | [`CRIT10MI.json`](mi-swagger/CRIT10MI.json) |
| **`CRIT24MI`** | Supplier ITA Information | 15 | `Add, Dlt, GetAddress, GetBasicData, LstByNumber...` | [`CRIT24MI.json`](mi-swagger/CRIT24MI.json) |
| **`CRJP01MI`** | Manage country specific customer information for Japan | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRJP01MI.json`](mi-swagger/CRJP01MI.json) |
| **`CRPT03MI`** | Manage country specific customer information for Portugal | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRPT03MI.json`](mi-swagger/CRPT03MI.json) |
| **`CRRU01MI`** | Manages the Russia Dvision Master | 15 | `AddDivisionRU, ChgDivisionRU, CpyDivisionRU, DelDivisionRU, GetDivisionRU...` | [`CRRU01MI.json`](mi-swagger/CRRU01MI.json) |
| **`CRRU02MI`** | RU Customer Master | 15 | `AddCustomerRU, ChgCustomerRU, CpyCustomerRU, DelCustomerRU, GetCustomerRU...` | [`CRRU02MI.json`](mi-swagger/CRRU02MI.json) |
| **`CRRU03MI`** | RU Supplier Master | 15 | `AddSupplierRU, ChgSupplierRU, CpySupplierRU, DelSupplierRU, GetSupplierRU...` | [`CRRU03MI.json`](mi-swagger/CRRU03MI.json) |
| **`CRRU04MI`** | Banks for Russia | 15 | `AddBankRU, ChgBankRU, CpyBankRU, DelBankRU, GetBankRU...` | [`CRRU04MI.json`](mi-swagger/CRRU04MI.json) |
| **`CRRU05MI`** | RU Unit of Measure Master | 15 | `AddUOMRU, ChgUOMRU, CpyUOMRU, DelUOMRU, GetUOMRU...` | [`CRRU05MI.json`](mi-swagger/CRRU05MI.json) |
| **`CRRU06MI`** | RU Currency Master | 15 | `AddCurrencyRU, ChgCurrencyRU, CpyCurrencyRU, DelCurrencyRU, GetCurrencyRU...` | [`CRRU06MI.json`](mi-swagger/CRRU06MI.json) |
| **`CRRU20MI`** | Document head for Russia | 14 | `AddRUDoc, ChgRUDoc, GetRUDocRecGrp, GetRUDocUnique, LstRUDocRecGrp...` | [`CRRU20MI.json`](mi-swagger/CRRU20MI.json) |
| **`CRRU21MI`** | Document lines for Russia | 15 | `AddRUDoc, ChgRUDoc, GetRUDocRecGrp, GetRUDocUnique, LstRUDocItem...` | [`CRRU21MI.json`](mi-swagger/CRRU21MI.json) |
| **`CRS004MI`** | User Group | 14 | `Add, Delete, Get, List, Update...` | [`CRS004MI.json`](mi-swagger/CRS004MI.json) |
| **`CRS006MI`** | ObjectAccessGroup | 14 | `Add, Delete, Get, List, Update...` | [`CRS006MI.json`](mi-swagger/CRS006MI.json) |
| **`CRS007MI`** | AccessGroupEntries | 13 | `Add, Delete, Get, List, FpwVersion...` | [`CRS007MI.json`](mi-swagger/CRS007MI.json) |
| **`CRS008MI`** | Facility interface | 13 | `AddFacility, ChgFacility, Get, ListFacility, FpwVersion...` | [`CRS008MI.json`](mi-swagger/CRS008MI.json) |
| **`CRS014MI`** | Program Start Values Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS014MI.json`](mi-swagger/CRS014MI.json) |
| **`CRS020MI`** | Panel version interface | 20 | `AddLngTxt, DelLngTxt, DelPanelVersion, GetFldColParm, ImportView...` | [`CRS020MI.json`](mi-swagger/CRS020MI.json) |
| **`CRS021MI`** | Manages the Sorting Option | 19 | `ActSrtOpt, AddSrtOpt, CheckSrtOpt, CheckTable, CrtStdSrtOpt...` | [`CRS021MI.json`](mi-swagger/CRS021MI.json) |
| **`CRS022MI`** | Sorting order interface | 19 | `AddLngTxt, AddSortOrder, AddStdPersView, ChgSortOrder, CpySortOrder...` | [`CRS022MI.json`](mi-swagger/CRS022MI.json) |
| **`CRS025MI`** | Item Group interface | 15 | `AddItemGroup, AddLngTxt, DelItemGroup, GetItemGroup, LstItemGroup...` | [`CRS025MI.json`](mi-swagger/CRS025MI.json) |
| **`CRS030MI`** | VAT Code | 11 | `GetBasicData, LstVat, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS030MI.json`](mi-swagger/CRS030MI.json) |
| **`CRS035MI`** | Product Group interface | 14 | `AddProductGroup, DelProductGroup, GetProductGroup, LstProductGroup, UpdProductGroup...` | [`CRS035MI.json`](mi-swagger/CRS035MI.json) |
| **`CRS036MI`** | Business area | 13 | `AddBusinessArea, AddLngTxt, LstBusinessArea, UpdBusinessArea, FpwVersion...` | [`CRS036MI.json`](mi-swagger/CRS036MI.json) |
| **`CRS040MI`** | Manages Item type | 16 | `AddItmType, AddLngTxt, CpyItmType, DltItmType, GetItmType...` | [`CRS040MI.json`](mi-swagger/CRS040MI.json) |
| **`CRS041MI`** | Manages the Additional Country Code | 14 | `AddAddCountry, DltAddCountry, GetAddCountry, LstAddCountry, UpdAddCountry...` | [`CRS041MI.json`](mi-swagger/CRS041MI.json) |
| **`CRS042MI`** | County ID interface | 14 | `AddCountyID, DltCountyID, GetCountyID, LstCountyID, UpdCountyID...` | [`CRS042MI.json`](mi-swagger/CRS042MI.json) |
| **`CRS044MI`** | Postal codes interface | 13 | `AddPostalCode, DelPostalCode, LstCityByCode, LstPostalCodes, FpwVersion...` | [`CRS044MI.json`](mi-swagger/CRS044MI.json) |
| **`CRS045MI`** | Country interface | 13 | `GetBasicData, LstByCode, LstCountry, LstCountryArea, FpwVersion...` | [`CRS045MI.json`](mi-swagger/CRS045MI.json) |
| **`CRS046MI`** | State / Area code interface | 10 | `LstAreaCodes, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS046MI.json`](mi-swagger/CRS046MI.json) |
| **`CRS050MI`** | Unit of Measure | 14 | `Add, Delete, Get, List, Update...` | [`CRS050MI.json`](mi-swagger/CRS050MI.json) |
| **`CRS051MI`** | Unit of Measure conversion table | 14 | `Add, Delete, Get, List, Update...` | [`CRS051MI.json`](mi-swagger/CRS051MI.json) |
| **`CRS052MI`** | Unit of Measure Languages | 14 | `Add, Delete, Get, List, Update...` | [`CRS052MI.json`](mi-swagger/CRS052MI.json) |
| **`CRS055MI`** | Currency Exchange Rates | 16 | `AddRate, AddRate2, GetBasicData, LstRatesPerType, LstRtPerPeriod...` | [`CRS055MI.json`](mi-swagger/CRS055MI.json) |
| **`CRS060MI`** | Purchase Price Text Interface | 14 | `Add, Delete, Get, List, Update...` | [`CRS060MI.json`](mi-swagger/CRS060MI.json) |
| **`CRS061MI`** | Rail station interface | 14 | `AddRailStation, DltRailStation, GetRailStation, LstRailStation, UpdRailStation...` | [`CRS061MI.json`](mi-swagger/CRS061MI.json) |
| **`CRS063MI`** | Supplier service code | 14 | `Add, Delete, Get, List, Update...` | [`CRS063MI.json`](mi-swagger/CRS063MI.json) |
| **`CRS064MI`** | Customer service code | 14 | `Add, Delete, Get, List, Update...` | [`CRS064MI.json`](mi-swagger/CRS064MI.json) |
| **`CRS065MI`** | Delivery Term interface | 14 | `AddDelyTerm, DelDelyTerm, GetDelyTerm, LstDelyTerm, UpdDelyTerm...` | [`CRS065MI.json`](mi-swagger/CRS065MI.json) |
| **`CRS070MI`** | Delivery Method interface | 14 | `AddDelyMethod, DelDelyMethod, GetDelyMethod, LstDelyMethod, UpdDelyMethod...` | [`CRS070MI.json`](mi-swagger/CRS070MI.json) |
| **`CRS075MI`** | Payment term | 14 | `Add, Delete, Get, List, Update...` | [`CRS075MI.json`](mi-swagger/CRS075MI.json) |
| **`CRS078MI`** | Payment Type | 10 | `GetBasicData, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS078MI.json`](mi-swagger/CRS078MI.json) |
| **`CRS080MI`** | Department | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS080MI.json`](mi-swagger/CRS080MI.json) |
| **`CRS096MI`** | Milestone Chain interface | 20 | `AddMilestnLine, AddMilestoneChn, DelMilestoneChn, DelMilestoneLn, GetMilestoneChn...` | [`CRS096MI.json`](mi-swagger/CRS096MI.json) |
| **`CRS099MI`** | Product Line Interface | 14 | `AddProductLine, DltProductLine, GetProductLine, LstProductLine, UpdProductLine...` | [`CRS099MI.json`](mi-swagger/CRS099MI.json) |
| **`CRS100MI`** | Salesperson | 13 | `Add, Delete, Get, List, FpwVersion...` | [`CRS100MI.json`](mi-swagger/CRS100MI.json) |
| **`CRS105MI`** | Assortment | 24 | `AddAssmCust, AddAssmHead, AddAssmItem, DltAssmCust, DltAssmHead...` | [`CRS105MI.json`](mi-swagger/CRS105MI.json) |
| **`CRS109MI`** | Field Group Interface | 12 | `DelField, LstFieldGroup, UpdField, FpwVersion, GetCurrentUser...` | [`CRS109MI.json`](mi-swagger/CRS109MI.json) |
| **`CRS111MI`** | E-mail address repository interface | 19 | `Add, Change, Delete, Get, List...` | [`CRS111MI.json`](mi-swagger/CRS111MI.json) |
| **`CRS114MI`** | Order Line Salespersons Interface | 12 | `Add, Delete, List, FpwVersion, GetCurrentUser...` | [`CRS114MI.json`](mi-swagger/CRS114MI.json) |
| **`CRS118MI`** | Manages the Email Group in CEMAGH table | 16 | `AddEmailGroup, AddLngTxt, CpyEmailGroup, DltEmailGroup, GetEmailGroup...` | [`CRS118MI.json`](mi-swagger/CRS118MI.json) |
| **`CRS119MI`** | Manages the Email Address for an Email Group in CEMAGL table | 14 | `AddEmailGrpAddr, CpyEmailGrpAddr, DltEmailGrpAddr, GetEmailGrpAddr, LstEmailGrpAddr...` | [`CRS119MI.json`](mi-swagger/CRS119MI.json) |
| **`CRS121MI`** | Inventory Segment | 14 | `AddInventorySeg, DltInventorySeg, GetInventorySeg, LstInventorySeg, UpdInventorySeg...` | [`CRS121MI.json`](mi-swagger/CRS121MI.json) |
| **`CRS122MI`** | Trade agreement class id interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CRS122MI.json`](mi-swagger/CRS122MI.json) |
| **`CRS128MI`** | Customs Statistics Number | 14 | `AddBasicData, DltBasicData, GetBasicData, LstByNumber, UpdBasicData...` | [`CRS128MI.json`](mi-swagger/CRS128MI.json) |
| **`CRS137MI`** | Geographical Code - Jurisdiction | 15 | `AddGeoCode, DltGeoCode, GetByJurisdict, GetGeoCode, LstGeoCodes...` | [`CRS137MI.json`](mi-swagger/CRS137MI.json) |
| **`CRS138MI`** | Geographical Code - Tax rate | 15 | `AddTaxRate, DltTaxRate, GetTaxCodeType, GetTaxRate, LstTaxRates...` | [`CRS138MI.json`](mi-swagger/CRS138MI.json) |
| **`CRS140MI`** | District interface | 10 | `LstDistrict, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS140MI.json`](mi-swagger/CRS140MI.json) |
| **`CRS165MI`** | Manages the Number Series | 10 | `RtvNextNumber, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS165MI.json`](mi-swagger/CRS165MI.json) |
| **`CRS169MI`** | Acceptance Group Interface | 14 | `AddAcceptGroup, DelAcceptGroup, GetAcceptGroup, LstAcceptGroup, UpdAcceptGroup...` | [`CRS169MI.json`](mi-swagger/CRS169MI.json) |
| **`CRS175MI`** | Cross application basic data interface | 21 | `GetGeneralCode, GetGeneralParm, GetItemFreeFlds, GetSetTradeStat, LstCodesByLng...` | [`CRS175MI.json`](mi-swagger/CRS175MI.json) |
| **`CRS180MI`** | Convert Amount in Words | 11 | `GetAmtInWords, GetCurrPerLng, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS180MI.json`](mi-swagger/CRS180MI.json) |
| **`CRS181MI`** | User-defined field 1 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS181MI.json`](mi-swagger/CRS181MI.json) |
| **`CRS183MI`** | User-defined field 3 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS183MI.json`](mi-swagger/CRS183MI.json) |
| **`CRS184MI`** | User-defined field 4 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS184MI.json`](mi-swagger/CRS184MI.json) |
| **`CRS185MI`** | User-defined field 5 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS185MI.json`](mi-swagger/CRS185MI.json) |
| **`CRS200MI`** | GST Order Types | 10 | `LstOrderType, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS200MI.json`](mi-swagger/CRS200MI.json) |
| **`CRS207MI`** | List API for fashion matrix | 13 | `LstStyleDetByCO, LstStyleDetByDO, LstStyleDetByMO, LstStyleDetByPO, FpwVersion...` | [`CRS207MI.json`](mi-swagger/CRS207MI.json) |
| **`CRS212MI`** | Item Danger Class Interface | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CRS212MI.json`](mi-swagger/CRS212MI.json) |
| **`CRS213MI`** | Hazardous material management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS213MI.json`](mi-swagger/CRS213MI.json) |
| **`CRS214MI`** | Supplementary info management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS214MI.json`](mi-swagger/CRS214MI.json) |
| **`CRS220MI`** | Reason category | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`CRS220MI.json`](mi-swagger/CRS220MI.json) |
| **`CRS221MI`** | Reason codes per reason category | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CRS221MI.json`](mi-swagger/CRS221MI.json) |
| **`CRS222MI`** | Reason category per function | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS222MI.json`](mi-swagger/CRS222MI.json) |
| **`CRS230MI`** | Technical documents | 34 | `Add, AddDocActivity, AddDocEff1, AddDocEff2, AddDocEff3...` | [`CRS230MI.json`](mi-swagger/CRS230MI.json) |
| **`CRS235MI`** | Internal address interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS235MI.json`](mi-swagger/CRS235MI.json) |
| **`CRS247MI`** | Standard Numbering-Functional Area | 14 | `AddFunctionArea, DelFunctionArea, GetFunctionArea, LstFunctionArea, UpdFunctionArea...` | [`CRS247MI.json`](mi-swagger/CRS247MI.json) |
| **`CRS275MI`** | Order line charges | 20 | `AddLineChrgHead, AddLineChrgRate, DltLineChrgHead, DltLineChrgRate, GetLineChrgHead...` | [`CRS275MI.json`](mi-swagger/CRS275MI.json) |
| **`CRS278MI`** | Line charge models | 12 | `LstChrgModels, LstKeyLineChrg, LstLineChrgMod, FpwVersion, GetCurrentUser...` | [`CRS278MI.json`](mi-swagger/CRS278MI.json) |
| **`CRS290MI`** | Manages the Printer on which the document should be printed | 16 | `AddPrinter, DltPrinter, GetPrinter, LstPrinters, LstPrtByGrp...` | [`CRS290MI.json`](mi-swagger/CRS290MI.json) |
| **`CRS295MI`** | Manages the Replacement of Printer in CSYDEC table | 14 | `AddReplPrt, DltReplPrt, GetReplPrt, LstReplPrt, UpdReplPrt...` | [`CRS295MI.json`](mi-swagger/CRS295MI.json) |
| **`CRS300MI`** | Ship-via address | 11 | `GetShipVia, LstShipVia, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS300MI.json`](mi-swagger/CRS300MI.json) |
| **`CRS316MI`** | Credit group interface | 12 | `AddPayerToCrGrp, DltPayerFrCrGrp, LstPayersInCrGr, FpwVersion, GetCurrentUser...` | [`CRS316MI.json`](mi-swagger/CRS316MI.json) |
| **`CRS317MI`** | Stopped orders interface | 10 | `StoppedOrders, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS317MI.json`](mi-swagger/CRS317MI.json) |
| **`CRS335MI`** | Control object | 14 | `AddCtrlObj, DltCtrlObj, GetCtrlObj, LstCtrlObj, UpdCtrlObj...` | [`CRS335MI.json`](mi-swagger/CRS335MI.json) |
| **`CRS388MI`** | Object value translations | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS388MI.json`](mi-swagger/CRS388MI.json) |
| **`CRS395MI`** | Accounting Rules | 16 | `AddExceptionPri, CrtStdAccRules, DltAccRule, DltRmvAccRules, GetAccRule...` | [`CRS395MI.json`](mi-swagger/CRS395MI.json) |
| **`CRS396MI`** | Accounting Exceptions | 13 | `AddExceptionVal, DltExceptionVal, GetExceptionVal, LstExceptionVal, FpwVersion...` | [`CRS396MI.json`](mi-swagger/CRS396MI.json) |
| **`CRS399MI`** | Simulate Accounting String | 11 | `GetCA60910, GetOI2Evnts, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS399MI.json`](mi-swagger/CRS399MI.json) |
| **`CRS407MI`** | FAM function connect to order type | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS407MI.json`](mi-swagger/CRS407MI.json) |
| **`CRS420MI`** | Application messages interface | 33 | `Add, AddExtRefInfo, AddFreeText, Complete, Delete...` | [`CRS420MI.json`](mi-swagger/CRS420MI.json) |
| **`CRS434MI`** | Credit card intercface settings | 19 | `Add3rdPartyId, ClearAuthToken, ClearProxyPwd, ClearPwd, Dlt3rdPartyId...` | [`CRS434MI.json`](mi-swagger/CRS434MI.json) |
| **`CRS438MI`** | Latest User Interface Server | 14 | `Add, Delete, Get, List, Update...` | [`CRS438MI.json`](mi-swagger/CRS438MI.json) |
| **`CRS515MI`** | Work schedule basic data interface | 11 | `SelModelLines, SelPatternLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS515MI.json`](mi-swagger/CRS515MI.json) |
| **`CRS526MI`** | Change of Calendar | 10 | `UpdEmpCalendar, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS526MI.json`](mi-swagger/CRS526MI.json) |
| **`CRS530MI`** | Employee basic data interface | 30 | `AddAddress, AddEmplExp, AddEmployee, ChgAddress, DelEmployee...` | [`CRS530MI.json`](mi-swagger/CRS530MI.json) |
| **`CRS545MI`** | User Connect Authority | 14 | `AddUsrAuthority, DltUsrAuthority, GetUsrAuthority, LstUsrAuthority, UpdUsrAuthority...` | [`CRS545MI.json`](mi-swagger/CRS545MI.json) |
| **`CRS610MI`** | Customer interface | 46 | `Add, AddAddress, AddCheckAddress, AddText, CheckPIN...` | [`CRS610MI.json`](mi-swagger/CRS610MI.json) |
| **`CRS612MI`** | Api: Customer cards | 14 | `AddCustCard, DelCustCard, GetCustCard, LstCustCard, UpdCustCard...` | [`CRS612MI.json`](mi-swagger/CRS612MI.json) |
| **`CRS618MI`** | Contact Person | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS618MI.json`](mi-swagger/CRS618MI.json) |
| **`CRS620MI`** | Supplier Interface | 31 | `AddAddress, AddSupplier, AddSupplierRef, CopyTemplate, DelAddress...` | [`CRS620MI.json`](mi-swagger/CRS620MI.json) |
| **`CRS621MI`** | Contact Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS621MI.json`](mi-swagger/CRS621MI.json) |
| **`CRS628MI`** | Supplier Tax Number | 15 | `AddSupTaxNo, CpySupTaxNo, DelSupTaxNo, GetSupTaxNo, LstSupTaxNo...` | [`CRS628MI.json`](mi-swagger/CRS628MI.json) |
| **`CRS630MI`** | Accounting Identity | 27 | `AddAccountID, AddAccountIDACR, AddAccountIDLng, CpyAccountID, CpyAccountIDACR...` | [`CRS630MI.json`](mi-swagger/CRS630MI.json) |
| **`CRS633MI`** | Account groups interface | 15 | `AddAccGroup, CpyAccGroup, DltAccGroup, GetAccGroup, LstAccGroups...` | [`CRS633MI.json`](mi-swagger/CRS633MI.json) |
| **`CRS634MI`** | Reconciliation rule | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS634MI.json`](mi-swagger/CRS634MI.json) |
| **`CRS638MI`** | Account Identity Authorization | 15 | `AddAcctgDimAuth, CpyAcctgDimAuth, DltAcctgDimAuth, GetAcctgDimAuth, LstAcctgDimAuth...` | [`CRS638MI.json`](mi-swagger/CRS638MI.json) |
| **`CRS645MI`** | Accounting Structures | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS645MI.json`](mi-swagger/CRS645MI.json) |
| **`CRS646MI`** | Accounting Structure Lines | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS646MI.json`](mi-swagger/CRS646MI.json) |
| **`CRS650MI`** | Authorized User | 14 | `Add, Del, GetBasicData, LstByCode, Upd...` | [`CRS650MI.json`](mi-swagger/CRS650MI.json) |
| **`CRS668MI`** | Flexible Service Code Date Limits Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS668MI.json`](mi-swagger/CRS668MI.json) |
| **`CRS682MI`** | Insurance ID | 14 | `Add, Delete, Get, Lst, Upd...` | [`CRS682MI.json`](mi-swagger/CRS682MI.json) |
| **`CRS683MI`** | Wrk: Customer Insurance by Product Group | 14 | `Add, Delete, Get, List, Update...` | [`CRS683MI.json`](mi-swagger/CRS683MI.json) |
| **`CRS685MI`** | Manage item owner | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS685MI.json`](mi-swagger/CRS685MI.json) |
| **`CRS686MI`** | Manage connection between owner and identity | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS686MI.json`](mi-swagger/CRS686MI.json) |
| **`CRS690MI`** | Banks | 18 | `AddBank, DelByNumber, DelBySwiftCode, GetBasicData, LstByCountry...` | [`CRS690MI.json`](mi-swagger/CRS690MI.json) |
| **`CRS691MI`** | Bank Branches | 17 | `AddBankBranch, DelByNumber, GetBasicData, LstByCountry, LstByNumber...` | [`CRS691MI.json`](mi-swagger/CRS691MI.json) |
| **`CRS692MI`** | Bank Accounts | 26 | `AddBankAccount, AddBankAccount2, ChgBankAccount2, ChgBasicData, DelBankAccount...` | [`CRS692MI.json`](mi-swagger/CRS692MI.json) |
| **`CRS693MI`** | Bank Account Additional Values | 12 | `GetBasicData, LstByAccHolder, LstByValueType, FpwVersion, GetCurrentUser...` | [`CRS693MI.json`](mi-swagger/CRS693MI.json) |
| **`CRS740MI`** | Trade agreement settings interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS740MI.json`](mi-swagger/CRS740MI.json) |
| **`CRS750MI`** | General Ledger Settings | 10 | `GetGLSettings, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS750MI.json`](mi-swagger/CRS750MI.json) |
| **`CRS780MI`** | purchase parameters management | 15 | `AddPurchSetting, CpyPurchSetting, DltPurchSetting, GetPurchSetting, LstPurchSetting...` | [`CRS780MI.json`](mi-swagger/CRS780MI.json) |
| **`CRS795MI`** | Integration settings interface | 14 | `CrtStandard, Dlt, Get, Lst, Upd...` | [`CRS795MI.json`](mi-swagger/CRS795MI.json) |
| **`CRS798MI`** | APS Policy | 14 | `Add, Delete, Get, List, Update...` | [`CRS798MI.json`](mi-swagger/CRS798MI.json) |
| **`CRS830MI`** | Language Handling interface | 11 | `GetLngTxt, LstLngTxt, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS830MI.json`](mi-swagger/CRS830MI.json) |
| **`CRS881MI`** | Business Message Data Translation Interface | 24 | `AddTranslData, AddTranslation, DelDeletedTrans, DelTranslData, DelTranslation...` | [`CRS881MI.json`](mi-swagger/CRS881MI.json) |
| **`CRS885MI`** | Partner repository | 11 | `AddPartnerRepo, DelPartnerRepo, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS885MI.json`](mi-swagger/CRS885MI.json) |
| **`CRS886MI`** | Partner alias interface | 16 | `AddPtrAlias, CnvPtr, CnvPtrAlias, CnvPtrAliasQual, CnvPtrQual...` | [`CRS886MI.json`](mi-swagger/CRS886MI.json) |
| **`CRS900MI`** | System Calendar | 16 | `ActSysCalDates, AddWorkingDays, CreateDays, GetSysCalDate, LstSysCalendar...` | [`CRS900MI.json`](mi-swagger/CRS900MI.json) |
| **`CRS910MI`** | System Periods | 14 | `CpyToDivision, GenPeriods, GetYear, Select, UpdPeriod...` | [`CRS910MI.json`](mi-swagger/CRS910MI.json) |
| **`CRS912MI`** | Season | 14 | `AddSeason, DelSeason, GetSeason, LstSeason, UpdSeason...` | [`CRS912MI.json`](mi-swagger/CRS912MI.json) |
| **`CRS913MI`** | Classification per Season Interface | 14 | `AddClassif, DltClassif, GetClassif, LstClassif, UpdClassif...` | [`CRS913MI.json`](mi-swagger/CRS913MI.json) |
| **`CRS945MI`** | Manages the media control object connected to the Document | 14 | `AddPartnerRef, DltPartnerRef, GetPartnerRef, LstPartnerRef, UpdPartnerRef...` | [`CRS945MI.json`](mi-swagger/CRS945MI.json) |
| **`CRS949MI`** | Manages the media control object connected to a Media | 26 | `AddPartnerArch, AddPartnerEmail, AddPartnerEvent, AddPartnerFax, AddPartnerFile...` | [`CRS949MI.json`](mi-swagger/CRS949MI.json) |
| **`CRS950MI`** | Handle predefined texts | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS950MI.json`](mi-swagger/CRS950MI.json) |
| **`CRS980MI`** | Text blocks interface | 19 | `AddTxtBlockHead, AddTxtBlockLine, DltTxtBlockLins, GetTextID, ImportText...` | [`CRS980MI.json`](mi-swagger/CRS980MI.json) |
| **`CRS990MI`** | Generic Browse | 17 | `Get, GetBrowse, GetHeading, InitBrowse, InitBrowseWHead...` | [`CRS990MI.json`](mi-swagger/CRS990MI.json) |
| **`CRS995MI`** | System Application Monitor | 11 | `GetMonitor, LstMonitors, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS995MI.json`](mi-swagger/CRS995MI.json) |
| **`CRS998MI`** | Manages System Diagnostic in CSYDIA table | 15 | `Dlt, GenStd, Get, Lst, Run...` | [`CRS998MI.json`](mi-swagger/CRS998MI.json) |
| **`CRSPCIMI`** | EQM configurator API | 38 | `DltAttrLine, DltAttrModel, GetAttrInfo, GetAttrLine, GetForcedSeq...` | [`CRSPCIMI.json`](mi-swagger/CRSPCIMI.json) |
| **`CRTVSUMI`** | Retrieves supplier number from an alternative search key | 11 | `GetSupplier, LstSuppliers, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRTVSUMI.json`](mi-swagger/CRTVSUMI.json) |
| **`CSS006MI`** | Machine/Engine pricing API | 39 | `AddN, AddP, AddR, AddS, AddT...` | [`CSS006MI.json`](mi-swagger/CSS006MI.json) |
| **`CSS100MI`** | Api: External orderline Information | 11 | `UpdExtInf, UpdExtInfOrder, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSS100MI.json`](mi-swagger/CSS100MI.json) |
| **`CSS105MI`** | Api: External invoice Information | 11 | `LstExtInvInf, UpdStatus, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSS105MI.json`](mi-swagger/CSS105MI.json) |
| **`CSS200MI`** | Api:GetDealerCode | 10 | `GetDealerCode, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CSS200MI.json`](mi-swagger/CSS200MI.json) |
| **`CSS204MI`** | Api: SCORE Reporting | 16 | `AddGrief, AddScore, DelScore, GetCatScore, GetSCOREREP...` | [`CSS204MI.json`](mi-swagger/CSS204MI.json) |
| **`CSS300MI`** | PoU Sales Order Interface | 13 | `Delete, LstLineSupply, LstOrdLine, LstSalesOrd, FpwVersion...` | [`CSS300MI.json`](mi-swagger/CSS300MI.json) |
| **`CSS720MI`** | Api: Sup Related Process.Connect Ref Type | 12 | `AddRefType, DltRefType, LstByProcess, FpwVersion, GetCurrentUser...` | [`CSS720MI.json`](mi-swagger/CSS720MI.json) |
| **`CSSEITMI`** | Api: External Temporary order information | 11 | `LstExtTempInf, UpdExtTempInf, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSSEITMI.json`](mi-swagger/CSSEITMI.json) |
| **`CSSEIXMI`** | Api: External Supplier Information Temporary orders | 10 | `UpdExtInfSts15, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CSSEIXMI.json`](mi-swagger/CSSEIXMI.json) |
| **`CTS040MI`** | Supply Model Information | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`CTS040MI.json`](mi-swagger/CTS040MI.json) |
| **`CTS095MI`** | ATP Safety stock protection | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CTS095MI.json`](mi-swagger/CTS095MI.json) |
| **`CUGEXTMI`** | Customer generic extension tables | 15 | `AddFieldKey, AddFieldMap, AddFieldSub, LstFieldKey, LstFieldMap...` | [`CUGEXTMI.json`](mi-swagger/CUGEXTMI.json) |
| **`CUSEXTMI`** | Customer generic extension table | 39 | `AddAlphaKPI, AddFieldAttr, AddFieldVM, AddFieldValue, AddNumericKPI...` | [`CUSEXTMI.json`](mi-swagger/CUSEXTMI.json) |
| **`DPS001MI`** | Distribution relation interface | 11 | `LstNodeRelation, LstRelation, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`DPS001MI.json`](mi-swagger/DPS001MI.json) |
| **`DPS170MI`** | Planned distribution orders interface | 25 | `ClrInboxDOP, CrtPlannedDO, DelPlannedDO, GetDistDays, GetDistRel...` | [`DPS170MI.json`](mi-swagger/DPS170MI.json) |
| **`DPS910MI`** | Recreate Distribution Level | 10 | `CalcItmWhsDOLvl, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`DPS910MI.json`](mi-swagger/DPS910MI.json) |
| **`DRS005MI`** | Route interface | 15 | `AddRoute, DltRoute, GetRoute, LstRoute, SelRoute...` | [`DRS005MI.json`](mi-swagger/DRS005MI.json) |
| **`DRS006MI`** | Route Departure Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS006MI.json`](mi-swagger/DRS006MI.json) |
| **`DRS007MI`** | Exceptions in route departures | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS007MI.json`](mi-swagger/DRS007MI.json) |
| **`DRS008MI`** | Predefined departure calendar management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS008MI.json`](mi-swagger/DRS008MI.json) |
| **`DRS011MI`** | Route selection table interface | 15 | `Add, Dlt, Get, Lst, RtvRouteDep...` | [`DRS011MI.json`](mi-swagger/DRS011MI.json) |
| **`DRS013MI`** | Transportation equipment interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS013MI.json`](mi-swagger/DRS013MI.json) |
| **`DRS015MI`** | Transportation equipment type interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS015MI.json`](mi-swagger/DRS015MI.json) |
| **`DRS016MI`** | Loading platform Interface | 14 | `Add, Del, Get, LstLoadPlat, Upd...` | [`DRS016MI.json`](mi-swagger/DRS016MI.json) |
| **`DRS018MI`** | Transportation resource interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`DRS018MI.json`](mi-swagger/DRS018MI.json) |
| **`DRS020MI`** | Transport resource shift interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`DRS020MI.json`](mi-swagger/DRS020MI.json) |
| **`DRS021MI`** | Unloading places per route | 15 | `Add, Delete, Get, List, Select...` | [`DRS021MI.json`](mi-swagger/DRS021MI.json) |
| **`DRS029MI`** | Transportation Indicator IDl interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS029MI.json`](mi-swagger/DRS029MI.json) |
| **`DRS045MI`** | Time zone | 18 | `ConvertByRef, ConvertByTIZO, GetDIVIData, GetEDESData, GetFACIData...` | [`DRS045MI.json`](mi-swagger/DRS045MI.json) |
| **`DRS081MI`** | Packaging holder selection table | 13 | `LstPackHdrDel, RtvHdrPerPacTyp, RtvHdrPerPackNo, RtvHdrPerPackg, FpwVersion...` | [`DRS081MI.json`](mi-swagger/DRS081MI.json) |
| **`DRS100MI`** | Shipment | 28 | `CloseShipment, CmfAllPickup, ConnectShipment, CreateShipment, DisconnectShip...` | [`DRS100MI.json`](mi-swagger/DRS100MI.json) |
| **`DRS102MI`** | Additional transportation info | 15 | `AddTrnspInfo, CpyTrnspInfo, DltTrnspInfo, GetTrnspInfo, LstTrnspInfo...` | [`DRS102MI.json`](mi-swagger/DRS102MI.json) |
| **`DRS150MI`** | Shipment Package Interface | 18 | `AddShipmentPck, ChgShipmentPck, DelShipmentPck, GetShipmentPck, LstShipmentPck...` | [`DRS150MI.json`](mi-swagger/DRS150MI.json) |
| **`DRS151MI`** | Shipment Package Detail Interface | 10 | `LstPckInShpPck, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`DRS151MI.json`](mi-swagger/DRS151MI.json) |
| **`DRS500MI`** | Freight Rate Calculation | 17 | `ConfirmFCM, CrtFreightPO, DistFCM, GetFCMDet, LstFCMDet...` | [`DRS500MI.json`](mi-swagger/DRS500MI.json) |
| **`ECS001MI`** | CAD Integration - Head | 11 | `AddHead, AddLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ECS001MI.json`](mi-swagger/ECS001MI.json) |
| **`ECS003MI`** | Material/Op. Connect Feature/Options | 13 | `Add, Del, Get, LstService, FpwVersion...` | [`ECS003MI.json`](mi-swagger/ECS003MI.json) |
| **`ECS018MI`** | Subcontracting Connect Supplier | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ECS018MI.json`](mi-swagger/ECS018MI.json) |
| **`ECS200MI`** | Engineering order revision interface | 27 | `AddAffSerialNo, AddEO, AddEOLine, AddModRefComp, CopyToNewRev...` | [`ECS200MI.json`](mi-swagger/ECS200MI.json) |
| **`ECS300MI`** | Service definition revision interface | 68 | `AddCertService, AddMaintLim, AddMtrl, AddOp, AddOpElement...` | [`ECS300MI.json`](mi-swagger/ECS300MI.json) |
| **`ECS420MI`** | Engineering Change Order Head | 17 | `Activate, Add, Copy, Deactivate, Delete...` | [`ECS420MI.json`](mi-swagger/ECS420MI.json) |
| **`ECS422MI`** | Engineering Change Order Detail | 15 | `Add, Copy, Delete, Get, List...` | [`ECS422MI.json`](mi-swagger/ECS422MI.json) |
| **`ENS100MI`** | Api: Eco Transaction | 11 | `LstDetailsByJob, LstTotalsByProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ENS100MI.json`](mi-swagger/ENS100MI.json) |
| **`EQINFOMI`** | API interface equipment info | 63 | `GetAgrConnModel, GetAgreement, GetEquipment, GetEquipmentLoc, GetMCOAddress...` | [`EQINFOMI.json`](mi-swagger/EQINFOMI.json) |
| **`EUS001MI`** | Manages the Tools (Education) | 17 | `Add, Chg, ChgPurPrice, Cpy, Del...` | [`EUS001MI.json`](mi-swagger/EUS001MI.json) |
| **`EVS001MI`** | Environment Interface | 21 | `ChkProgramExist, GetBEVersion, GetBJobStatus, GetFieldInfo, LstAutojobs...` | [`EVS001MI.json`](mi-swagger/EVS001MI.json) |
| **`EVS002MI`** | Send table data | 24 | `ActivateSubs, AddHost, AddSubscriber, DelHost, DelSubscriber...` | [`EVS002MI.json`](mi-swagger/EVS002MI.json) |
| **`EVS006MI`** | Manages the Initial Load | 16 | `Add, Cpy, Dlt, Get, LstByBODNoun...` | [`EVS006MI.json`](mi-swagger/EVS006MI.json) |
| **`EVS008MI`** | Manages the Initial Load Event | 16 | `Add, Cpy, Dlt, Get, LstByInitiaLoad...` | [`EVS008MI.json`](mi-swagger/EVS008MI.json) |
| **`EVS009MI`** | Manages the Initial Load Event Jobs Interface | 14 | `Add, Cpy, Dlt, Get, Lst...` | [`EVS009MI.json`](mi-swagger/EVS009MI.json) |
| **`EVS010MI`** | Asynchronous MI jobs | 12 | `Delete, LstAsyncJobs, SelAsyncTrans, FpwVersion, GetCurrentUser...` | [`EVS010MI.json`](mi-swagger/EVS010MI.json) |
| **`EVS100MI`** | Manages the File importing | 12 | `GetImportTempl, ImportFile, LstFiles, FpwVersion, GetCurrentUser...` | [`EVS100MI.json`](mi-swagger/EVS100MI.json) |
| **`EXPORTMI`** | Data export | 13 | `LstFields, Search, Select, SelectPad, FpwVersion...` | [`EXPORTMI.json`](mi-swagger/EXPORTMI.json) |
| **`EXT001MI`** | Extensibility defined EXT MI program | 15 | `Create, Read, List, Update, ListByBatch...` | [`EXT001MI.json`](mi-swagger/EXT001MI.json) |
| **`EXT002MI`** | Extensibility defined EXT MI program | 15 | `Delete, List, ListByBatch, Create, Update...` | [`EXT002MI.json`](mi-swagger/EXT002MI.json) |
| **`EXT003MI`** | Extensibility defined EXT MI program | 15 | `Update, Delete, ListByBatch, Create, Read...` | [`EXT003MI.json`](mi-swagger/EXT003MI.json) |
| **`EXT005MI`** | Extensibility defined EXT MI program | 15 | `DltStock, GetStock, UpdStock, AddStock, LstStockByBatch...` | [`EXT005MI.json`](mi-swagger/EXT005MI.json) |
| **`EXT007MI`** | Extensibility defined EXT MI program | 16 | `DltDebitNote, GetDebitNote, AddCustomerPart, LstDebitNote, DltCustomerPart...` | [`EXT007MI.json`](mi-swagger/EXT007MI.json) |
| **`FACETMI`** | Facets interface | 11 | `LstFacets, LstFacetsDescr, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`FACETMI.json`](mi-swagger/FACETMI.json) |
| **`FAS001MI`** | Fixed Asset Master | 18 | `Add, AddAsset, Delete, GetAsset, GetDeprType...` | [`FAS001MI.json`](mi-swagger/FAS001MI.json) |
| **`FAS002MI`** | Depreciation types interface | 13 | `CrtStdDeprType, Get, Lst, Upd, FpwVersion...` | [`FAS002MI.json`](mi-swagger/FAS002MI.json) |
| **`FAS003MI`** | Fixed Asset Value Types | 14 | `CrtStdValueType, Get, Lst, Upd, UpdYTDTrans...` | [`FAS003MI.json`](mi-swagger/FAS003MI.json) |
| **`FAS004MI`** | Connect Fixed Asset insurance types | 13 | `Add, Get, Lst, Upd, FpwVersion...` | [`FAS004MI.json`](mi-swagger/FAS004MI.json) |
| **`FAS010MI`** | Usage Based  and External User Defined Depreciation Plan | 15 | `AddUsrDefExtHis, DelUsrDefExtHis, LstAssetUsage, LstDepPlan, UpdAssetUsage...` | [`FAS010MI.json`](mi-swagger/FAS010MI.json) |
| **`FAS075MI`** | Fixed assets types | 15 | `AddFATypes, CpyFATypes, DltFATypes, GetFATypes, LstFATypes...` | [`FAS075MI.json`](mi-swagger/FAS075MI.json) |
| **`FAS076MI`** | Manages the FFSVFA - standared values for asset type | 12 | `GetStdValAsset, LstStsValAsset, UpdStdValAsset, FpwVersion, GetCurrentUser...` | [`FAS076MI.json`](mi-swagger/FAS076MI.json) |
| **`FAS077MI`** | Fixed assets depreciation types | 15 | `AddDeprTypes, CpyDeprTypes, DltDeprTypes, GetDeprTypes, LstDeprTypes...` | [`FAS077MI.json`](mi-swagger/FAS077MI.json) |
| **`FAS078MI`** | Standard value for value type | 14 | `AddValTypes, DltValTypes, GetValTypes, LstValTypes, UpdValTypes...` | [`FAS078MI.json`](mi-swagger/FAS078MI.json) |
| **`FAS220MI`** | Fixed asset value per period | 10 | `GetFAHistoryDtl, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS220MI.json`](mi-swagger/FAS220MI.json) |
| **`FAS660MI`** | Manage FA under construction proposal header | 18 | `Dlt, Get, LockProposal, LstByCreatedBy, LstByFixedAsset...` | [`FAS660MI.json`](mi-swagger/FAS660MI.json) |
| **`FAS661MI`** | Manage FA under construction proposal details | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, LstByAccDate...` | [`FAS661MI.json`](mi-swagger/FAS661MI.json) |
| **`FAS665MI`** | Process FA under construction proposal | 13 | `Activate, CreateProposal, PrintProposal, RestartAct, FpwVersion...` | [`FAS665MI.json`](mi-swagger/FAS665MI.json) |
| **`FAS840MI`** | Depreciation plan simulation header | 10 | `GetSimulation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS840MI.json`](mi-swagger/FAS840MI.json) |
| **`FAS841MI`** | Get depreciation plan simulation details | 10 | `LstSimPeriods, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS841MI.json`](mi-swagger/FAS841MI.json) |
| **`FAS845MI`** | Depreciation plan simulation batch interface | 10 | `CrtSimulation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS845MI.json`](mi-swagger/FAS845MI.json) |
| **`FAS955MI`** | Fixed Asset National Consumer Price Index (NCPI) | 15 | `AddDepTpNCPI, CpyDepTpNCPI, DltDepTpNCPI, GetDepTpNCPI, LstDepTpNCPI...` | [`FAS955MI.json`](mi-swagger/FAS955MI.json) |
| **`FCS330MI`** | Forecast Distribution Table Interface | 15 | `Add, AddLines, Del, Lst, Sel...` | [`FCS330MI.json`](mi-swagger/FCS330MI.json) |
| **`FCS350MI`** | Manual Forecast | 11 | `LstForQty, UpdForQty, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`FCS350MI.json`](mi-swagger/FCS350MI.json) |
| **`FCS366MI`** | Forecast Pacing | 10 | `LstForPacing, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FCS366MI.json`](mi-swagger/FCS366MI.json) |
| **`FLS001MI`** | Operational log sequence interface | 13 | `AddDelayReport, AddLogSequence, DelDelayReport, DelLogSequence, FpwVersion...` | [`FLS001MI.json`](mi-swagger/FLS001MI.json) |
| **`GENERAL`** | Transactions available in all MI-programs | 9 | `FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel, GetMIBuild...` | [`GENERAL.json`](mi-swagger/GENERAL.json) |
| **`GLS010MI`** | Bank operation | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`GLS010MI.json`](mi-swagger/GLS010MI.json) |
| **`GLS015MI`** | Standard Voucher | 14 | `Add, Del, Get, Lst, Upd...` | [`GLS015MI.json`](mi-swagger/GLS015MI.json) |
| **`GLS016MI`** | Standard Voucher Lines | 15 | `Add, CheckBalance, Del, Get, Lst...` | [`GLS016MI.json`](mi-swagger/GLS016MI.json) |
| **`GLS020MI`** | Account addition table | 19 | `AddHead, AddLine, DltHead, DltLine, GetHead...` | [`GLS020MI.json`](mi-swagger/GLS020MI.json) |
| **`GLS030MI`** | Account Translation Scenario | 21 | `AddTrScenHead, AddTrScenLine, CpyTrScenHead, DltTrScenHead, DltTrScenLine...` | [`GLS030MI.json`](mi-swagger/GLS030MI.json) |
| **`GLS032MI`** | Account Translation Scenario Grouping | 14 | `AddGrid, DltGrid, GetGrid, LstGrid, UpdGrid...` | [`GLS032MI.json`](mi-swagger/GLS032MI.json) |
| **`GLS060MI`** | Allocation tables | 45 | `AddAllocBase, AddAllocBaseLn, AddAllocSel, AddAllocSelLn, AddAllocTarg...` | [`GLS060MI.json`](mi-swagger/GLS060MI.json) |
| **`GLS080MI`** | Settings – Corporate Accounting | 14 | `AddCorpAccSettg, DltCorpAccSettg, GetCorpAccSettg, LstCorpAccSettg, UpdCorpAccSettg...` | [`GLS080MI.json`](mi-swagger/GLS080MI.json) |
| **`GLS085MI`** | Voucher number series for corporate accounting | 14 | `AddReplVoNoSer, DltReplVoNoSer, GetReplVoNoSer, LstReplVoNoSer, UpdReplVoNoSer...` | [`GLS085MI.json`](mi-swagger/GLS085MI.json) |
| **`GLS180MI`** | Bank Statement Reconciliation | 17 | `AddHead, AddHeadRecord, AddHeadRecord2, AddLine, AddLineRecord...` | [`GLS180MI.json`](mi-swagger/GLS180MI.json) |
| **`GLS200MI`** | General Ledger Information | 16 | `GetVoucherHead, GetVoucherHead2, GetVoucherLine, LstVoucherLines, LstVouchersByDt...` | [`GLS200MI.json`](mi-swagger/GLS200MI.json) |
| **`GLS215MI`** | General Ledger Balance File | 13 | `GetBitFromPtid, GetPerBalance, GetPerOpenBal, LstPerBalances, FpwVersion...` | [`GLS215MI.json`](mi-swagger/GLS215MI.json) |
| **`GLS250MI`** | General Ledger Additonal Information | 10 | `LstInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`GLS250MI.json`](mi-swagger/GLS250MI.json) |
| **`GLS385MI`** | Internal reconciliation – Header | 15 | `Clear, Close, Dlt, Get, Lst...` | [`GLS385MI.json`](mi-swagger/GLS385MI.json) |
| **`GLS386MI`** | Internal reconciliation – Details | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`GLS386MI.json`](mi-swagger/GLS386MI.json) |
| **`GLS387MI`** | Internal reconciliation – Manual | 15 | `CompleteRecon, CreateRecon, FinishRecon, ReallocateLine, ReleaseLine...` | [`GLS387MI.json`](mi-swagger/GLS387MI.json) |
| **`GLS470MI`** | Add records in period accounting table | 10 | `AddPeriodAcctng, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`GLS470MI.json`](mi-swagger/GLS470MI.json) |
| **`GLS490MI`** | Project Accounting Settings | 11 | `GetProject, LstProject, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS490MI.json`](mi-swagger/GLS490MI.json) |
| **`GLS495MI`** | Project Accounting Calculation Round | 11 | `GetProjectAccPr, LstProjectAccPr, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS495MI.json`](mi-swagger/GLS495MI.json) |
| **`GLS496MI`** | Project Accounting Calculation Round Details | 11 | `GetProjectAccDT, LstProjectAccDT, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS496MI.json`](mi-swagger/GLS496MI.json) |
| **`GLS840MI`** | Finance Interface | 17 | `AddBatchHead, AddBatchLine, AddBatchLineFld, CtrlBatch, DelBatch...` | [`GLS840MI.json`](mi-swagger/GLS840MI.json) |
| **`GMS200MI`** | Group Consolidation | 12 | `GetParentInfo, GetTransfTot, LstTransfDet, FpwVersion, GetCurrentUser...` | [`GMS200MI.json`](mi-swagger/GMS200MI.json) |
| **`GTCN10MI`** | Golden Tax | 14 | `GetBatchHead, LstInvDetails, LstInvHeadprBch, LstInvLines, UpdInvoiceNo...` | [`GTCN10MI.json`](mi-swagger/GTCN10MI.json) |
| **`IMS010MI`** | Manage issue management types | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS010MI.json`](mi-swagger/IMS010MI.json) |
| **`IMS011MI`** | Manage issue management types per language | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS011MI.json`](mi-swagger/IMS011MI.json) |
| **`IMS020MI`** | Manage issue management reason codes | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS020MI.json`](mi-swagger/IMS020MI.json) |
| **`IMS021MI`** | Manage issue management reason codes language texts | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS021MI.json`](mi-swagger/IMS021MI.json) |
| **`IMS025MI`** | Reason code - default values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS025MI.json`](mi-swagger/IMS025MI.json) |
| **`IMS030MI`** | Manage issue management action codes | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS030MI.json`](mi-swagger/IMS030MI.json) |
| **`IMS031MI`** | Manage issue management action codes language texts | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS031MI.json`](mi-swagger/IMS031MI.json) |
| **`IMS035MI`** | Action code - default values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS035MI.json`](mi-swagger/IMS035MI.json) |
| **`IMS040MI`** | Manage issue management action groups | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS040MI.json`](mi-swagger/IMS040MI.json) |
| **`IMS045MI`** | Manage issue management action group actions | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS045MI.json`](mi-swagger/IMS045MI.json) |
| **`IMS060MI`** | Manage issue management relation types | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS060MI.json`](mi-swagger/IMS060MI.json) |
| **`IMS100MI`** | Manage issue management headers | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS100MI.json`](mi-swagger/IMS100MI.json) |
| **`IMS101MI`** | Manage issue management lines | 16 | `Add, Cpy, Dlt, GenActions, Get...` | [`IMS101MI.json`](mi-swagger/IMS101MI.json) |
| **`IMS102MI`** | Manage issue management actions | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS102MI.json`](mi-swagger/IMS102MI.json) |
| **`IMS103MI`** | Issue management - addtional values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS103MI.json`](mi-swagger/IMS103MI.json) |
| **`IMS105MI`** | Manage issue management related issues | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS105MI.json`](mi-swagger/IMS105MI.json) |
| **`IMS110MI`** | Manage issue management watchers | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS110MI.json`](mi-swagger/IMS110MI.json) |
| **`IMS700MI`** | Manage issue management action codes | 10 | `SetIMStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`IMS700MI.json`](mi-swagger/IMS700MI.json) |
| **`INVBODMI`** | Api:Common Invoice | 37 | `AddErrorLog, AddGovInfo, CrtManualInv, DltGovInfo, GetGovInfo...` | [`INVBODMI.json`](mi-swagger/INVBODMI.json) |
| **`IPWAPPMI`** | IPW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`IPWAPPMI.json`](mi-swagger/IPWAPPMI.json) |
| **`LTS100MI`** | Api: LTR Agreement Head | 19 | `AddLTRHead, DltLTRAgree, GetLTRAgree, LstLTRByAgree, LstLTRByCO...` | [`LTS100MI.json`](mi-swagger/LTS100MI.json) |
| **`LTS101MI`** | Api: LTR Agreement line | 33 | `AddLTRHead, AddLeaseCond, AddLeasingLine, AddPreCalc, DelLTRAgree...` | [`LTS101MI.json`](mi-swagger/LTS101MI.json) |
| **`LTS108MI`** | Api: Leasing - curves | 12 | `LstBothCurve, LstCustCurve, LstFundCurve, FpwVersion, GetCurrentUser...` | [`LTS108MI.json`](mi-swagger/LTS108MI.json) |
| **`LTS200MI`** | Api: LTR Funding | 20 | `AddFundDetail, AddFunding, DltFundDetail, DltFunding, GetFundDetail...` | [`LTS200MI.json`](mi-swagger/LTS200MI.json) |
| **`LTS350MI`** | Long Term Rental invoice interface | 10 | `GetInvHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`LTS350MI.json`](mi-swagger/LTS350MI.json) |
| **`LTS401MI`** | API: Agreement Head. Simulate Totals | 11 | `LstSimulIndex, SimulIndexUpd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`LTS401MI.json`](mi-swagger/LTS401MI.json) |
| **`MDBREADMI`** | Generic MI for reading tables | 16 | `GetCIDVEN00, LstADECPL20M3C1, LstFSLEDG00M3C1, LstMITMAS00M3C1, LstMOOPGM10M3C1...` | [`MDBREADMI.json`](mi-swagger/MDBREADMI.json) |
| **`MFBR01MI`** | Manage country specific customer local exception information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MFBR01MI.json`](mi-swagger/MFBR01MI.json) |
| **`MFS025MI`** | Cash Pooling and Loan Management IDs | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MFS025MI.json`](mi-swagger/MFS025MI.json) |
| **`MFS169MI`** | Fixed Invoice Number Prefix | 16 | `AddInvPrefix, CpyInvPrefix, DelInvPrefix, GetInvInfo, GetInvPrefix...` | [`MFS169MI.json`](mi-swagger/MFS169MI.json) |
| **`MFS300MI`** | Cash Pooling and Loan Management Proposals | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`MFS300MI.json`](mi-swagger/MFS300MI.json) |
| **`MFS301MI`** | Cash Pooling and Loan Management Proposal Details per Date | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MFS301MI.json`](mi-swagger/MFS301MI.json) |
| **`MFS302MI`** | Cash Pooling and Loan Management Proposal Details per Pool | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MFS302MI.json`](mi-swagger/MFS302MI.json) |
| **`MFS303MI`** | Cash Pooling and Loan Management Proposal Details per Invoic | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`MFS303MI.json`](mi-swagger/MFS303MI.json) |
| **`MFS304MI`** | Print Cash Pooling and Loan Management Proposal | 10 | `Prt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MFS304MI.json`](mi-swagger/MFS304MI.json) |
| **`MFS307MI`** | Confirm Cash Pooling and Loan Management Proposal | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MFS307MI.json`](mi-swagger/MFS307MI.json) |
| **`MFS610MI`** | Customer Local exception | 22 | `Add, Dlt, Get, GetBCAgLocalExc, GetFinLocalExc...` | [`MFS610MI.json`](mi-swagger/MFS610MI.json) |
| **`MFS620MI`** | Supplier Local Exception Interface | 14 | `AddSuppLocalExc, DelSuppLocalExc, GetSuppLocalExc, LstSuppLocalExc, UpdSuppLocalExc...` | [`MFS620MI.json`](mi-swagger/MFS620MI.json) |
| **`MHS001MI`** | Interface Item Master | 24 | `AddIntItmMst, ChgIntItmMst, ChgIntItmMstFld, CpyIntItmMst, DelIntItmMst...` | [`MHS001MI.json`](mi-swagger/MHS001MI.json) |
| **`MHS002MI`** | Interface Item/Warehouse | 17 | `AddIntItmWhs, ChgIntItmWhs, CpyIntItmWhs, DelIntItmWhs, GetIntItmWhs...` | [`MHS002MI.json`](mi-swagger/MHS002MI.json) |
| **`MHS003MI`** | Interface Item/Facility | 17 | `AddIntItmFac, ChgIntItmFac, CpyIntItmFac, DelIntItmFac, GetIntItmFac...` | [`MHS003MI.json`](mi-swagger/MHS003MI.json) |
| **`MHS005MI`** | Interface Item/Customer | 17 | `AddIntItmCus, ChgIntItmCus, CpyIntItmCus, DelIntItmCus, GetIntItmCus...` | [`MHS005MI.json`](mi-swagger/MHS005MI.json) |
| **`MHS015MI`** | Interface Item/Alt U/M | 17 | `AddIntItmAum, ChgIntItmAum, CpyIntItmAum, DelIntItmAum, GetIntItmAum...` | [`MHS015MI.json`](mi-swagger/MHS015MI.json) |
| **`MHS020MI`** | Interface Item/Related Item | 17 | `AddIntItmAlt, ChgIntItmAlt, CpyIntItmAlt, DelIntItmAlt, GetIntItmAlt...` | [`MHS020MI.json`](mi-swagger/MHS020MI.json) |
| **`MHS025MI`** | Interface Item/Alias | 17 | `AddIntItmAli, ChgIntItmAli, CpyIntItmAli, DelIntItmAli, GetIntItmAli...` | [`MHS025MI.json`](mi-swagger/MHS025MI.json) |
| **`MHS040MI`** | Interface Item/Supplier | 17 | `AddIntItmVen, ChgIntItmVen, CpyIntItmVen, DelIntItmVen, GetIntItmVen...` | [`MHS040MI.json`](mi-swagger/MHS040MI.json) |
| **`MHS200MI`** | Interface Item | 22 | `AddIntItm, AddIntSku, ChgIntStyle, GetIntStyle, ImpIntItm...` | [`MHS200MI.json`](mi-swagger/MHS200MI.json) |
| **`MHS220MI`** | Interface SKU/Style Relation | 17 | `AddStySkuRel, ChgStySkuRel, CpyStySkuRel, DelStySkuRel, GetStySkuRel...` | [`MHS220MI.json`](mi-swagger/MHS220MI.json) |
| **`MHS221MI`** | Interface Style/Season | 12 | `AddStySea, DelStySea, LstStySea, FpwVersion, GetCurrentUser...` | [`MHS221MI.json`](mi-swagger/MHS221MI.json) |
| **`MHS630MI`** | Item master extract interface | 12 | `LstItemExtract, PrcItemExtract, SelItemExtract, FpwVersion, GetCurrentUser...` | [`MHS630MI.json`](mi-swagger/MHS630MI.json) |
| **`MHS635MI`** | Item alias extract interface | 12 | `LstAliasExtract, LstAliasViaItem, PrcAliasExtract, FpwVersion, GetCurrentUser...` | [`MHS635MI.json`](mi-swagger/MHS635MI.json) |
| **`MHS640MI`** | Supplier extract interface | 15 | `LstSupplier, LstSupplierAddr, LstSupplierPur, PrcSupplier, PrcSupplierAddr...` | [`MHS640MI.json`](mi-swagger/MHS640MI.json) |
| **`MHS800MI`** | Expected receipts download interface | 23 | `GetExpRec, GetExpRecDetail, GetExpRecPac, GetExpRecPacDet, LstExpPOPac...` | [`MHS800MI.json`](mi-swagger/MHS800MI.json) |
| **`MHS805MI`** | Pre-allocation download interface | 11 | `LstPreAlloc, PrcPreAlloc, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MHS805MI.json`](mi-swagger/MHS805MI.json) |
| **`MHS810MI`** | Picking list download interface | 18 | `ListDetByWave, LstPickAssign, LstPickDetail, LstPickList, LstPickListAdr...` | [`MHS810MI.json`](mi-swagger/MHS810MI.json) |
| **`MHS820MI`** | List movement tasks | 11 | `LstStkTranTask, PrcStkTranTask, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MHS820MI.json`](mi-swagger/MHS820MI.json) |
| **`MHS850MI`** | Order initiated stock transaction interface | 72 | `AddAttribute, AddCOPick, AddCOReturn, AddCfmPickList, AddCorrPickLine...` | [`MHS850MI.json`](mi-swagger/MHS850MI.json) |
| **`MHS854MI`** | SubLine  interface | 15 | `AddSublot, DltSublot, GetSublot, LstSublots, SetCurrentDate...` | [`MHS854MI.json`](mi-swagger/MHS854MI.json) |
| **`MLS170MI`** | Maint CO Invoice Specification Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MLS170MI.json`](mi-swagger/MLS170MI.json) |
| **`MMS004MI`** | Meters on Item master | 14 | `Add, Get, List, Select, Upd...` | [`MMS004MI.json`](mi-swagger/MMS004MI.json) |
| **`MMS005MI`** | Warehouse interface | 19 | `AddWarehouse, CpyRelInfo, DltWarehouse, GetFaclist, GetWarehouse...` | [`MMS005MI.json`](mi-swagger/MMS005MI.json) |
| **`MMS006MI`** | Warehouse. Connect to Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS006MI.json`](mi-swagger/MMS006MI.json) |
| **`MMS008MI`** | Place interface | 13 | `AddPlace, GetPlace, LstPlaces, UpdPlace, FpwVersion...` | [`MMS008MI.json`](mi-swagger/MMS008MI.json) |
| **`MMS009MI`** | Warehouse. Connect to Group | 14 | `Add, Delete, Get, List, Update...` | [`MMS009MI.json`](mi-swagger/MMS009MI.json) |
| **`MMS010MI`** | Stock location interface | 19 | `AddLocation, ChgLocation, DelLocation, GetLocation, ListLocations...` | [`MMS010MI.json`](mi-swagger/MMS010MI.json) |
| **`MMS015MI`** | Alterative units | 15 | `Add, Convert, Dlt, Get, Lst...` | [`MMS015MI.json`](mi-swagger/MMS015MI.json) |
| **`MMS016MI`** | Style information interface | 15 | `Add, Copy, Delete, Get, List...` | [`MMS016MI.json`](mi-swagger/MMS016MI.json) |
| **`MMS017MI`** | Features - Style interface | 14 | `Add, Copy, Delete, Get, List...` | [`MMS017MI.json`](mi-swagger/MMS017MI.json) |
| **`MMS018MI`** | Connect composition to style Interface | 15 | `Add, Copy, Delete, Get, List...` | [`MMS018MI.json`](mi-swagger/MMS018MI.json) |
| **`MMS019MI`** | Item -feature interface | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS019MI.json`](mi-swagger/MMS019MI.json) |
| **`MMS020MI`** | Related items interface | 14 | `AddRelatedItem, CpyRelatedItem, DelRelatedItem, LstItemRelation, UpdRelatedItem...` | [`MMS020MI.json`](mi-swagger/MMS020MI.json) |
| **`MMS021MI`** | Item Hierarchy interface | 15 | `AddItmHierarchy, DelItmHierarchy, GetHierarchySet, GetItmHierarchy, LstItmHierarchy...` | [`MMS021MI.json`](mi-swagger/MMS021MI.json) |
| **`MMS022MI`** | Item Search Group interface | 16 | `AddItmSearchGrp, AddLngTxt, DelItmSearchGrp, GetItmSearchGrp, GetSearchGrpSet...` | [`MMS022MI.json`](mi-swagger/MMS022MI.json) |
| **`MMS023MI`** | Item-Pack Interface | 13 | `AddItemPack, DltItemPack, GetItemPack, LstItemPack, FpwVersion...` | [`MMS023MI.json`](mi-swagger/MMS023MI.json) |
| **`MMS025MI`** | Alias numbers interface | 16 | `AddAlias, DltAlias, GetAlias, GetItem, LstAlias...` | [`MMS025MI.json`](mi-swagger/MMS025MI.json) |
| **`MMS028MI`** | Composition interface | 14 | `AddComposition, DltComposition, GetComposition, LstComposition, UpdComposition...` | [`MMS028MI.json`](mi-swagger/MMS028MI.json) |
| **`MMS030MI`** | Item description / language | 15 | `Add, Delete, Get, GetCustTblExt, List...` | [`MMS030MI.json`](mi-swagger/MMS030MI.json) |
| **`MMS037MI`** | Planning Policy | 10 | `LstPlanPolicy, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS037MI.json`](mi-swagger/MMS037MI.json) |
| **`MMS040MI`** | Stock Area | 15 | `AddStockZone, CpyStockZone, DltStockZone, GetStockZone, LstStockZone...` | [`MMS040MI.json`](mi-swagger/MMS040MI.json) |
| **`MMS047MI`** | Manage packaging group | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MMS047MI.json`](mi-swagger/MMS047MI.json) |
| **`MMS050MI`** | Packaging interface | 15 | `AddPackaging, DelPackaging, GetPackaging, GetPackagingItm, LstPackaging...` | [`MMS050MI.json`](mi-swagger/MMS050MI.json) |
| **`MMS053MI`** | Packaging/Customer Item interface | 21 | `AddItemConnPkg, DelItemConnPkg, GetConnPerPkg, GetItemConnPkg, GetPkgItemGrp...` | [`MMS053MI.json`](mi-swagger/MMS053MI.json) |
| **`MMS055MI`** | Manage items connect standard packaging | 16 | `AddItmStdPkg, CpyItmStdPkg, DelItmStdPkg, GetItmStdPkg, LstItmStdPkg...` | [`MMS055MI.json`](mi-swagger/MMS055MI.json) |
| **`MMS057MI`** | Stock Location Type/Item | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MMS057MI.json`](mi-swagger/MMS057MI.json) |
| **`MMS059MI`** | Supply model. Open lines | 14 | `Add, Delete, Get, List, Update...` | [`MMS059MI.json`](mi-swagger/MMS059MI.json) |
| **`MMS060MI`** | Detailed item balances interface | 25 | `Get, List, LstBalID, LstBalIDByOrd, LstContainer...` | [`MMS060MI.json`](mi-swagger/MMS060MI.json) |
| **`MMS065MI`** | Item Loacation interface | 15 | `AddItemLocation, CpyItemLocation, DltItemLocation, GetItemLocation, LstItemLocation...` | [`MMS065MI.json`](mi-swagger/MMS065MI.json) |
| **`MMS072MI`** | Cumulative quantity interface | 11 | `GetCumulative, LstCumulative, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS072MI.json`](mi-swagger/MMS072MI.json) |
| **`MMS074MI`** | Composition group interface | 14 | `AddCompGroup, DltCompGroup, GetCompGroup, LstCompGroups, UpdCompGroup...` | [`MMS074MI.json`](mi-swagger/MMS074MI.json) |
| **`MMS076MI`** | Style. Create item interface | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS076MI.json`](mi-swagger/MMS076MI.json) |
| **`MMS080MI`** | Material Planning Interface | 18 | `LstItemWarehous, LstMtPlByItmWhs, LstPOHBalance, SelByCoProd, SelForcTrans...` | [`MMS080MI.json`](mi-swagger/MMS080MI.json) |
| **`MMS090MI`** | Item Statistics | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS090MI.json`](mi-swagger/MMS090MI.json) |
| **`MMS092MI`** | Safety Stock Reason Code Interface | 14 | `AddSSReasonCode, DltSSReasonCode, GetSSReasonCode, LstSSReasonCode, UpdSSReasonCode...` | [`MMS092MI.json`](mi-swagger/MMS092MI.json) |
| **`MMS095MI`** | Copy Item Statistics Interface | 13 | `Add, Del, Imp, ImpAll, FpwVersion...` | [`MMS095MI.json`](mi-swagger/MMS095MI.json) |
| **`MMS100MI`** | Requisition/distribution orders interface | 19 | `AddDOHead, AddDOLine, DltDOLine, GetHead, GetLine...` | [`MMS100MI.json`](mi-swagger/MMS100MI.json) |
| **`MMS105MI`** | Container Movement | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS105MI.json`](mi-swagger/MMS105MI.json) |
| **`MMS120MI`** | Perform Detailed Allocation | 15 | `AllocateOrdLine, AllocateOrder, DeAllocateOrLne, DeAllocateOrder, PerfDetAlloc...` | [`MMS120MI.json`](mi-swagger/MMS120MI.json) |
| **`MMS122MI`** | Allocation Shut Off Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS122MI.json`](mi-swagger/MMS122MI.json) |
| **`MMS124MI`** | Allocation control selection  table interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS124MI.json`](mi-swagger/MMS124MI.json) |
| **`MMS130MI`** | Reclassification of lot | 10 | `RclLotSts, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS130MI.json`](mi-swagger/MMS130MI.json) |
| **`MMS160MI`** | Location Select | 12 | `ChkPutAwayLoc, LstPutAwayLoc, RtvPutAwayLoc, FpwVersion, GetCurrentUser...` | [`MMS160MI.json`](mi-swagger/MMS160MI.json) |
| **`MMS162MI`** | Stock levels on Style level | 13 | `GetPrePackNo, LstStyleItem, LstStyleWhsBal, LstWhsBal, FpwVersion...` | [`MMS162MI.json`](mi-swagger/MMS162MI.json) |
| **`MMS170MI`** | Location replenishment interface | 12 | `CrtReqOrder, LstByWhs, Release, FpwVersion, GetCurrentUser...` | [`MMS170MI.json`](mi-swagger/MMS170MI.json) |
| **`MMS175MI`** | Movement. Change location for and item interface | 10 | `Update, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS175MI.json`](mi-swagger/MMS175MI.json) |
| **`MMS200MI`** | Item toolbox interface | 86 | `AddItmBasic, AddItmFac, AddItmTrpFrelnf, AddItmTrplnf, AddItmViaItmTyp...` | [`MMS200MI.json`](mi-swagger/MMS200MI.json) |
| **`MMS230MI`** | Container interface | 15 | `AddContainer, CpyContainer, DltContainer, GetContainer, LstContainers...` | [`MMS230MI.json`](mi-swagger/MMS230MI.json) |
| **`MMS235MI`** | Lot Master interface | 22 | `AddFreeText, AddItmLot, DelItmLot, GetItmLot, GetLotItm...` | [`MMS235MI.json`](mi-swagger/MMS235MI.json) |
| **`MMS240MI`** | Item serialnumber/equipment interface | 33 | `Add, AddEquipment, AddFixedAsset, AddOEM, CpySerItem...` | [`MMS240MI.json`](mi-swagger/MMS240MI.json) |
| **`MMS241MI`** | Equipment Ser Item Meter Reading | 11 | `LstMeters, LstMtrSystemLvl, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS241MI.json`](mi-swagger/MMS241MI.json) |
| **`MMS250MI`** | Serialnumber based pricing | 16 | `Add, Del, GetSerialPrice, LstItem, LstItemSerCurr...` | [`MMS250MI.json`](mi-swagger/MMS250MI.json) |
| **`MMS252MI`** | Equipment class | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS252MI.json`](mi-swagger/MMS252MI.json) |
| **`MMS259MI`** | Equipment group | 14 | `Add, Dlt, Get, List, Upd...` | [`MMS259MI.json`](mi-swagger/MMS259MI.json) |
| **`MMS300MI`** | Stocktake - head | 11 | `CrtReqLines, LstPhysInvHead, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS300MI.json`](mi-swagger/MMS300MI.json) |
| **`MMS301MI`** | Report stocktake interface | 23 | `AddStockTakeDet, AddStockTakeHea, ConfirmStockBal, GetStockTakeDet, LstLocation...` | [`MMS301MI.json`](mi-swagger/MMS301MI.json) |
| **`MMS307MI`** | Physical Inventory Variance | 11 | `GetPhysInvVar, LstPhysInvVar, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS307MI.json`](mi-swagger/MMS307MI.json) |
| **`MMS310MI`** | Quick inventory counting interface | 13 | `Get, List, Update, UpdateViaAlias, FpwVersion...` | [`MMS310MI.json`](mi-swagger/MMS310MI.json) |
| **`MMS360MI`** | Recalassification - CW | 11 | `UpdCatchWeight, UpdSublotCW, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS360MI.json`](mi-swagger/MMS360MI.json) |
| **`MMS450MI`** | Packing instructions | 13 | `LstPckInstByOrd, LstPckInstCons, LstPckInstDet, LstPckInstLines, FpwVersion...` | [`MMS450MI.json`](mi-swagger/MMS450MI.json) |
| **`MMS460MI`** | Package Definitions | 18 | `AddKitPackDef, AddPackDefHead, AddPackDefLine, ChgPackDefHead, ChgPackDefLine...` | [`MMS460MI.json`](mi-swagger/MMS460MI.json) |
| **`MMS465MI`** | Unpack a pre-pack | 10 | `UnpackKit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS465MI.json`](mi-swagger/MMS465MI.json) |
| **`MMS470MI`** | Package Interface | 21 | `AddPackStk, CalcPackLevel, ChangePackStk, ConPacStkNoCalc, ConnectPackStk...` | [`MMS470MI.json`](mi-swagger/MMS470MI.json) |
| **`MMS472MI`** | Sublot interface | 21 | `AddSublot, DltSublot, GetSublot, LstSelect, LstSublot...` | [`MMS472MI.json`](mi-swagger/MMS472MI.json) |
| **`MMS476MI`** | Sublot Policy interface. | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS476MI.json`](mi-swagger/MMS476MI.json) |
| **`MMS850MI`** | Internal stock transaction interface | 48 | `AddAdjust, AddLocClean, AddLotBlend, AddMOOrdLess, AddMove...` | [`MMS850MI.json`](mi-swagger/MMS850MI.json) |
| **`MNGDIMMI`** | Initiate Browse on error codes | 20 | `AddErrorCode1, AddErrorCode2, AddErrorCode3, BrwsErrCde1, BrwsErrCde2...` | [`MNGDIMMI.json`](mi-swagger/MNGDIMMI.json) |
| **`MNS030MI`** | Get correct HB moniker for diffrent applications | 11 | `GetMonikerApp, LstMonikerApp, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS030MI.json`](mi-swagger/MNS030MI.json) |
| **`MNS035MI`** | Infor standard Workspace entities | 15 | `AddEntityMap, DelEntityMap, GetEntityMap, LstByEntity, LstByField...` | [`MNS035MI.json`](mi-swagger/MNS035MI.json) |
| **`MNS036MI`** | Infor Drillback Mapping | 14 | `AddDrillbackMap, ChgDrillbackMap, DelDrillbackMap, GetDrillbackMap, LstDrillbackMap...` | [`MNS036MI.json`](mi-swagger/MNS036MI.json) |
| **`MNS051MI`** | Manage Subsystem Job | 24 | `AddNewInstance, CrtStandard, Dlt, EndAll, EndJob...` | [`MNS051MI.json`](mi-swagger/MNS051MI.json) |
| **`MNS080MI`** | Menu version management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS080MI.json`](mi-swagger/MNS080MI.json) |
| **`MNS090MI`** | System Settings Interface | 12 | `ClearEmailPW, Get, Upd, FpwVersion, GetCurrentUser...` | [`MNS090MI.json`](mi-swagger/MNS090MI.json) |
| **`MNS095MI`** | Company interface | 14 | `Add, Del, Get, Lst, Upd...` | [`MNS095MI.json`](mi-swagger/MNS095MI.json) |
| **`MNS096MI`** | IEP Interface | 11 | `GetIEPStatus, LstIEPStatus, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS096MI.json`](mi-swagger/MNS096MI.json) |
| **`MNS100MI`** | Manages the Division Master Data | 14 | `GetActiveDates, GetAddBasicData, GetBasicData, LstDivisions, SetMigrateDate...` | [`MNS100MI.json`](mi-swagger/MNS100MI.json) |
| **`MNS105MI`** | System Languages | 17 | `AddLng, ChgLng, ChkLng, CpyLng, DelLng...` | [`MNS105MI.json`](mi-swagger/MNS105MI.json) |
| **`MNS110MI`** | Function management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS110MI.json`](mi-swagger/MNS110MI.json) |
| **`MNS111MI`** | Functions - Menu | 20 | `Add, Cpy, Dlt, Get, List...` | [`MNS111MI.json`](mi-swagger/MNS111MI.json) |
| **`MNS112MI`** | Function - program management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS112MI.json`](mi-swagger/MNS112MI.json) |
| **`MNS120MI`** | File Header Information Interface | 16 | `Add, Chg, Del, GenStandard, Get...` | [`MNS120MI.json`](mi-swagger/MNS120MI.json) |
| **`MNS121MI`** | Table Fields | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MNS121MI.json`](mi-swagger/MNS121MI.json) |
| **`MNS130MI`** | Template Item Interface | 16 | `AddConstant, CpyConstant, DltAllConstants, DltConstant, GetConstant...` | [`MNS130MI.json`](mi-swagger/MNS130MI.json) |
| **`MNS150MI`** | User | 26 | `Add, AddUsrPerCmpDiv, ChgDefaultValue, ChgUsrPerCmpDiv, ClearPinCode...` | [`MNS150MI.json`](mi-swagger/MNS150MI.json) |
| **`MNS155MI`** | Manages the User Settings Record in CMNUSR table | 11 | `UpdUserSettings, ValidatePinCode, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS155MI.json`](mi-swagger/MNS155MI.json) |
| **`MNS204MI`** | Manages the Output Service Selection | 14 | `AddOutService, DltOutService, GetOutService, LstOutServices, UpdOutService...` | [`MNS204MI.json`](mi-swagger/MNS204MI.json) |
| **`MNS205MI`** | Manages the output media selections | 22 | `AddArchiveMedia, AddFaxMedia, AddFileMedia, AddMailMedia, AddPrtMedia...` | [`MNS205MI.json`](mi-swagger/MNS205MI.json) |
| **`MNS206MI`** | Output management | 11 | `SbmOutput, UpdControl, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS206MI.json`](mi-swagger/MNS206MI.json) |
| **`MNS215MI`** | Manages the Output Media Selection in CCM110 table | 20 | `AddMedia, ConfirmJob, CopyMedia, DeleteMedia, DeselectMedia...` | [`MNS215MI.json`](mi-swagger/MNS215MI.json) |
| **`MNS216MI`** | Manages the Output Service | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS216MI.json`](mi-swagger/MNS216MI.json) |
| **`MNS217MI`** | Manages the Service Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS217MI.json`](mi-swagger/MNS217MI.json) |
| **`MNS218MI`** | Manages the Output Server in COSRVR table | 14 | `AddOutServer, DltOutServer, GetOutServer, LstOutServer, UpdOutServer...` | [`MNS218MI.json`](mi-swagger/MNS218MI.json) |
| **`MNS260MI`** | MBM Initiator | 29 | `AddMBMInit, AddMBMInitLRFld, AddMBMLog, DelMBMInit, DelMBMInitLRFld...` | [`MNS260MI.json`](mi-swagger/MNS260MI.json) |
| **`MNS271MI`** | Tool Interface | 13 | `DltGrpCntJob, GetGrpCntJob, LstGrpCntJob, SendGrpCntJob, FpwVersion...` | [`MNS271MI.json`](mi-swagger/MNS271MI.json) |
| **`MNS272MI`** | Grouped content jobs - included jobs | 12 | `DltIncludedJobs, GetIncludedJobs, LstIncludedJobs, FpwVersion, GetCurrentUser...` | [`MNS272MI.json`](mi-swagger/MNS272MI.json) |
| **`MNS300MI`** | Job queue management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS300MI.json`](mi-swagger/MNS300MI.json) |
| **`MNS310MI`** | Job definition management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS310MI.json`](mi-swagger/MNS310MI.json) |
| **`MNS320MI`** | Job Interface | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`MNS320MI.json`](mi-swagger/MNS320MI.json) |
| **`MNS405MI`** | Manages the Role per User | 15 | `Add, AddPermissions, Dlt, Get, Lst...` | [`MNS405MI.json`](mi-swagger/MNS405MI.json) |
| **`MNS410MI`** | Roles per User | 16 | `Add, Dlt, Get, Lst, LstRoles...` | [`MNS410MI.json`](mi-swagger/MNS410MI.json) |
| **`MNS415MI`** | User Class | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`MNS415MI.json`](mi-swagger/MNS415MI.json) |
| **`MNS416MI`** | User per User Class | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS416MI.json`](mi-swagger/MNS416MI.json) |
| **`MNS420MI`** | Report Configuration Group Definitions | 14 | `Add, Chg, Dlt, Get, Lst...` | [`MNS420MI.json`](mi-swagger/MNS420MI.json) |
| **`MNS425MI`** | Report Manager User | 14 | `Add, Chg, Dlt, Get, Lst...` | [`MNS425MI.json`](mi-swagger/MNS425MI.json) |
| **`MNS910MI`** | Mass Update in Menu System | 10 | `UpdMenu, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MNS910MI.json`](mi-swagger/MNS910MI.json) |
| **`MNTAGRMI`** | Agreement Line | 15 | `GetAgrContent, GetAgrLnDetail, GetMCOLineTotal, SelAgrContent, SelAgrLine...` | [`MNTAGRMI.json`](mi-swagger/MNTAGRMI.json) |
| **`MOS018MI`** | Subcontracting supplier | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MOS018MI.json`](mi-swagger/MOS018MI.json) |
| **`MOS049MI`** | Orderless reporting WO interface | 11 | `PutAway, RepEndProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS049MI.json`](mi-swagger/MOS049MI.json) |
| **`MOS050MI`** | Maintenance order receipt interface | 10 | `RptReceipt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS050MI.json`](mi-swagger/MOS050MI.json) |
| **`MOS054MI`** | Api: Service Error Report | 11 | `GetSerError, UpdSerError, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS054MI.json`](mi-swagger/MOS054MI.json) |
| **`MOS057MI`** | Service Error report | 26 | `Add, AddText, DltText, Get, GetMain...` | [`MOS057MI.json`](mi-swagger/MOS057MI.json) |
| **`MOS060MI`** | Work Order Report Issue | 11 | `DltIssue, RptIssue, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS060MI.json`](mi-swagger/MOS060MI.json) |
| **`MOS070MI`** | Maintenance time report interface | 17 | `CloseAllOp, CloseOp, Confirm, DeleteStartStop, ReportStartStop...` | [`MOS070MI.json`](mi-swagger/MOS070MI.json) |
| **`MOS085MI`** | Maintenance inspections interface | 13 | `AddInspText, ClsInsp, LstInsp, RptInsp, FpwVersion...` | [`MOS085MI.json`](mi-swagger/MOS085MI.json) |
| **`MOS087MI`** | Maintenance permits interface | 11 | `LstPermits, RptPermits, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS087MI.json`](mi-swagger/MOS087MI.json) |
| **`MOS095MI`** | Operation transaction | 20 | `Approve, Dlt, Get, LstDateTrans, LstOperTrans...` | [`MOS095MI.json`](mi-swagger/MOS095MI.json) |
| **`MOS100MI`** | Maintenance Work order | 56 | `AddInboxNetwork, AddInboxOp, AddInboxOrder, AddMtrl, AddOp...` | [`MOS100MI.json`](mi-swagger/MOS100MI.json) |
| **`MOS102MI`** | Api; Logg Records | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`MOS102MI.json`](mi-swagger/MOS102MI.json) |
| **`MOS104MI`** | Operation Element interface | 18 | `AddOpElement, AllocTool, ChgOpElement, DeAllocTool, DltOpElement...` | [`MOS104MI.json`](mi-swagger/MOS104MI.json) |
| **`MOS105MI`** | Purchase interface for work order | 14 | `AddPoReq, ChgPoReq, CrtPop, UpdCostOnWoMat, UpdPoLine...` | [`MOS105MI.json`](mi-swagger/MOS105MI.json) |
| **`MOS120MI`** | Work order type | 15 | `Add, Copy, Delete, Get, List...` | [`MOS120MI.json`](mi-swagger/MOS120MI.json) |
| **`MOS122MI`** | Agreement order type | 15 | `AddConnFacility, CpyConnFacility, DltConnFacility, GetConnFacility, LstConnFacility...` | [`MOS122MI.json`](mi-swagger/MOS122MI.json) |
| **`MOS124MI`** | Removal Installation Transactions | 11 | `GetLatestRem, PrintRemovalTag, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS124MI.json`](mi-swagger/MOS124MI.json) |
| **`MOS125MI`** | Maintenance Removal Installation | 10 | `RemoveInstall, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS125MI.json`](mi-swagger/MOS125MI.json) |
| **`MOS127MI`** | Tool interface - simple | 18 | `Add, Cpy, Dlt, Get, Lst...` | [`MOS127MI.json`](mi-swagger/MOS127MI.json) |
| **`MOS140MI`** | PrintWorkOrder | 10 | `PrintWorkOrder, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS140MI.json`](mi-swagger/MOS140MI.json) |
| **`MOS156MI`** | Ad hoc address repository interface | 16 | `Add, Chg, Delete, Get, LstByCustAddr...` | [`MOS156MI.json`](mi-swagger/MOS156MI.json) |
| **`MOS160MI`** | Maintenance meter interface | 15 | `CorrCalcMeter, CorrMeterRead, GetMeterValue, LstMeterValue, LstSystemLevel...` | [`MOS160MI.json`](mi-swagger/MOS160MI.json) |
| **`MOS170MI`** | Maintenance order proposals | 35 | `AddMtrl, AddOp, AddOp2, AddOpElement, AddProp...` | [`MOS170MI.json`](mi-swagger/MOS170MI.json) |
| **`MOS171MI`** | Maintenance order proposals APP interface | 15 | `Get, SelMaterials, SelOperations, SelTools, Select...` | [`MOS171MI.json`](mi-swagger/MOS171MI.json) |
| **`MOS180MI`** | Maintenance Service Approve | 15 | `AddServiceHist, Approve, ListServiceHist, NotPerformed, ResetApproval...` | [`MOS180MI.json`](mi-swagger/MOS180MI.json) |
| **`MOS195MI`** | Search WO Operation | 17 | `SelPlanned, SelReleased, SelReqElem, SelReqOper, SelWoAndReqElem...` | [`MOS195MI.json`](mi-swagger/MOS195MI.json) |
| **`MOS199MI`** | Rental planning board interface | 11 | `Lst, Update, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS199MI.json`](mi-swagger/MOS199MI.json) |
| **`MOS200MI`** | Engineering order interface | 28 | `AddAffSerialNo, AddEO, AddEOLine, AddModRefComp, CfrmAffSerialNo...` | [`MOS200MI.json`](mi-swagger/MOS200MI.json) |
| **`MOS250MI`** | Model individual interface | 12 | `SelRelations, SelShiftInfo, Select, FpwVersion, GetCurrentUser...` | [`MOS250MI.json`](mi-swagger/MOS250MI.json) |
| **`MOS256MI`** | As Build Structure | 13 | `GetNextHigher, LstAsBuild, LstAsBuildLevel, LstMeterPosOnly, FpwVersion...` | [`MOS256MI.json`](mi-swagger/MOS256MI.json) |
| **`MOS260MI`** | Modification history | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS260MI.json`](mi-swagger/MOS260MI.json) |
| **`MOS272MI`** | Vehicle location history interface | 16 | `Add, ChgStatus, CnvDataFeed, DltDataFeed, GetAddress...` | [`MOS272MI.json`](mi-swagger/MOS272MI.json) |
| **`MOS290MI`** | Equipment. Update History | 16 | `Add, AddHistoryMeter, ClearAsBuild, CrtAsBuildList, CrtAsBuildStr...` | [`MOS290MI.json`](mi-swagger/MOS290MI.json) |
| **`MOS296MI`** | Operational Enviroment | 15 | `Add, Chg, Cpy, Del, Get...` | [`MOS296MI.json`](mi-swagger/MOS296MI.json) |
| **`MOS297MI`** | Industry Application | 15 | `Add, Chg, Cpy, Del, Get...` | [`MOS297MI.json`](mi-swagger/MOS297MI.json) |
| **`MOS300MI`** | Service definition interface | 65 | `AddComponent, AddMaintLim, AddOp, AddOp2, AddOpElement...` | [`MOS300MI.json`](mi-swagger/MOS300MI.json) |
| **`MOS306MI`** | Service prices | 13 | `Add, Get, List, Upd, FpwVersion...` | [`MOS306MI.json`](mi-swagger/MOS306MI.json) |
| **`MOS380MI`** | Add Operation Plan | 11 | `AddOpPlan, AddOpPlanPos, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS380MI.json`](mi-swagger/MOS380MI.json) |
| **`MOS382MI`** | Maintentance order APP interface | 11 | `SelOperations, Select, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS382MI.json`](mi-swagger/MOS382MI.json) |
| **`MOS390MI`** | Service Warranty | 24 | `Add, AddClaimDetail, AddWarDetail, CheckWar, ChkWarMtrl...` | [`MOS390MI.json`](mi-swagger/MOS390MI.json) |
| **`MOS400MI`** | Models | 15 | `AddModel, CopyModel, DltModel, GetModel, LstModel...` | [`MOS400MI.json`](mi-swagger/MOS400MI.json) |
| **`MOS440MI`** | Maintenance positions interface | 14 | `Add, Del, GetBasic, LstPosition, Upd...` | [`MOS440MI.json`](mi-swagger/MOS440MI.json) |
| **`MOS446MI`** | hMaintenance site browser interface | 30 | `GetDefaultSite, GetHighestPos, GetPosition, GetUserSite, LstAllPlannedWo...` | [`MOS446MI.json`](mi-swagger/MOS446MI.json) |
| **`MOS450MI`** | Wrk: Components/Config Position | 15 | `AddComponent, DltComponent, GetComponent, LstComponent, LstItemsForInst...` | [`MOS450MI.json`](mi-swagger/MOS450MI.json) |
| **`MOS461MI`** | Sales Model interface | 13 | `Add, Dlt, Lst, Upd, FpwVersion...` | [`MOS461MI.json`](mi-swagger/MOS461MI.json) |
| **`MOS500MI`** | Maintenance complaints interface | 15 | `AddComp, AddDecision, DelComp, DelDecision, UpdComp...` | [`MOS500MI.json`](mi-swagger/MOS500MI.json) |
| **`MOS510MI`** | Maintenance disturbance interface | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS510MI.json`](mi-swagger/MOS510MI.json) |
| **`MOS595MI`** | Breakdown cause interface | 15 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`MOS595MI.json`](mi-swagger/MOS595MI.json) |
| **`MOS710MI`** | Warranty type interface | 14 | `AddWarrantyType, DltWarrantyType, GetWarrantyType, LstWarrantyType, UpdWarrantyType...` | [`MOS710MI.json`](mi-swagger/MOS710MI.json) |
| **`MOS720MI`** | Manage Warranty Storage Settings per Supplier | 14 | `AddWarTicket, DltWarTicket, GetWarTicket, LstWarTicket, UpdWarTicket...` | [`MOS720MI.json`](mi-swagger/MOS720MI.json) |
| **`MOS721MI`** | Manage Warranty Storage Settings per Supplier | 14 | `AddWarrStorage, DltWarrStorage, GetWarrStorage, LstWarrStorage, UpdWarrStorage...` | [`MOS721MI.json`](mi-swagger/MOS721MI.json) |
| **`MOS770MI`** | Create service pricelist | 10 | `CrtServPriceLst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS770MI.json`](mi-swagger/MOS770MI.json) |
| **`MOS820MI`** | Start/Stop time reporting | 17 | `StartDisturb, StartOp, StartTravel, StopDisturb, StopOp...` | [`MOS820MI.json`](mi-swagger/MOS820MI.json) |
| **`MRS001MI`** | MI-Repository interface | 45 | `AddField, AddProgram, AddText, AddTransaction, CheckFreeTrans...` | [`MRS001MI.json`](mi-swagger/MRS001MI.json) |
| **`MTS300MI`** | Manages the Performance Benchmark Reference Tables | 29 | `Add, DeleteAll, DeleteRelated, Dlt, GenerateData...` | [`MTS300MI.json`](mi-swagger/MTS300MI.json) |
| **`MWS001MI`** | Transport information | 14 | `AddItem, DltItem, GetItem, LstItem, UpdItem...` | [`MWS001MI.json`](mi-swagger/MWS001MI.json) |
| **`MWS020MI`** | Consignment owner quantities interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS020MI.json`](mi-swagger/MWS020MI.json) |
| **`MWS023MI`** | Warehouse Equipment interface | 10 | `LstWhsEq, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MWS023MI.json`](mi-swagger/MWS023MI.json) |
| **`MWS025MI`** | Pending consignment transaction | 13 | `DltPendingTrans, GetPendingTrans, LstPendingTrans, UpdPendingTrans, FpwVersion...` | [`MWS025MI.json`](mi-swagger/MWS025MI.json) |
| **`MWS042MI`** | Item Type Connect Warehouse interface | 15 | `AddWhsItemType, CpyWhsItemType, DltWhsItemType, GetWhsItemType, LstWhsItemTypes...` | [`MWS042MI.json`](mi-swagger/MWS042MI.json) |
| **`MWS043MI`** | Item Type Connect Warehouse interface | 15 | `AddAliasItmType, CpyAliasItmType, DltAliasItmType, GetAliasItmType, LstAliasItmType...` | [`MWS043MI.json`](mi-swagger/MWS043MI.json) |
| **`MWS045MI`** | Item Type Connect Description Rule interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MWS045MI.json`](mi-swagger/MWS045MI.json) |
| **`MWS070MI`** | Stock transaction history interface | 18 | `GetStockTrans, ListTransByDate, ListTransByRef, LstTransBalID, LstTransByDel...` | [`MWS070MI.json`](mi-swagger/MWS070MI.json) |
| **`MWS072MI`** | Sublot transactions | 15 | `GetSublotTrans, LstSelectByItem, LstSublotTrans, LstTransByDate, LstTransByRef...` | [`MWS072MI.json`](mi-swagger/MWS072MI.json) |
| **`MWS073MI`** | Goods in transit interface | 12 | `ConfirmDelivery, GetGoodsInTrans, LstGoodsInTrans, FpwVersion, GetCurrentUser...` | [`MWS073MI.json`](mi-swagger/MWS073MI.json) |
| **`MWS080MI`** | Packaging ledger | 14 | `AddAdjustPacLdg, GetPacLedger, LstPacLdgByPack, LstPacLedger, UpdPacLedger...` | [`MWS080MI.json`](mi-swagger/MWS080MI.json) |
| **`MWS081MI`** | Packaging ledger transactions | 11 | `GetPacLdgTra, LstPacLdgTra, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS081MI.json`](mi-swagger/MWS081MI.json) |
| **`MWS090MI`** | Entitlement | 19 | `AddEntitlement, ChgEntitlement, CoreTracking, DelEntitlement, GetEntitlement...` | [`MWS090MI.json`](mi-swagger/MWS090MI.json) |
| **`MWS091MI`** | Core Attrition | 15 | `AddCorAttrition, ChgCorAttrition, DltCorAttrition, GetCorAttrition, LstAttrBySuno...` | [`MWS091MI.json`](mi-swagger/MWS091MI.json) |
| **`MWS120MI`** | Pre-allocations interface | 16 | `ClrInboxPreAll, GetUserJobSts, SelErrPreAll, Select, SetUserJobSts...` | [`MWS120MI.json`](mi-swagger/MWS120MI.json) |
| **`MWS121MI`** | Preallocation | 18 | `GetAcqOrder, GetDmdOrder, LstAcqByCUOR, LstAcqByDmdOrd, LstDmdByAcqOrd...` | [`MWS121MI.json`](mi-swagger/MWS121MI.json) |
| **`MWS150MI`** | Active Supply Chain | 10 | `SelSupplyChain, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MWS150MI.json`](mi-swagger/MWS150MI.json) |
| **`MWS330MI`** | Reservation | 17 | `AddReservation, ChgReservation, DltReservation, GetReservation, LstReservation...` | [`MWS330MI.json`](mi-swagger/MWS330MI.json) |
| **`MWS410MI`** | Delivery number toolbox interface | 39 | `ApprDelValue, ChkDelValue, CloseDelivery, ClsRcptDlix, ClsRcptSscc...` | [`MWS410MI.json`](mi-swagger/MWS410MI.json) |
| **`MWS411MI`** | Delivery Lines  interface | 17 | `GetDeliveryLine, LstDelLnByOrd, LstDeliveryLine, MoveDelLn, RelPlanDelLn...` | [`MWS411MI.json`](mi-swagger/MWS411MI.json) |
| **`MWS413MI`** | Prepare pick release | 11 | `LstPickQuantity, SetPickQuantity, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS413MI.json`](mi-swagger/MWS413MI.json) |
| **`MWS417MI`** | Delivery accessorials | 15 | `Add, Delete, Get, LstAll, LstbyAccLvl...` | [`MWS417MI.json`](mi-swagger/MWS417MI.json) |
| **`MWS418MI`** | Delivery approval interface | 21 | `AddGovAppAct, Approve, BODMIDelLines, CpyGovAppAct, DltGovAppAct...` | [`MWS418MI.json`](mi-swagger/MWS418MI.json) |
| **`MWS419MI`** | Delivery approval log interface | 14 | `AddGovAppLog, DltGovAppLog, GetGovAppLog, LstGovAppLog, UpdGovAppLog...` | [`MWS419MI.json`](mi-swagger/MWS419MI.json) |
| **`MWS420MI`** | Picking List | 28 | `Confirm, GetPckLnViaRepN, GetPickListLine, HdAllocByPckLst, HdAllocLnByRepN...` | [`MWS420MI.json`](mi-swagger/MWS420MI.json) |
| **`MWS422MI`** | Picking list interface retrieval | 14 | `GetPickByRepNo, LstPickDetail, LstWavePickDet, RtvLastLoc, SelPickDetail...` | [`MWS422MI.json`](mi-swagger/MWS422MI.json) |
| **`MWS423MI`** | Package Interface | 52 | `AddCrate, AddPackage, AddPckToShpPck, CalcPackLevel, ChangePackage...` | [`MWS423MI.json`](mi-swagger/MWS423MI.json) |
| **`MWS429MI`** | Detailed delivery receipt confirmation | 15 | `CfmDetailedLine, ClsDeliveryRcpt, LstDetailedLine, OpnDeliveryRcpt, RstDeliveryRcpt...` | [`MWS429MI.json`](mi-swagger/MWS429MI.json) |
| **`MWS440MI`** | Goods Receipt DO/RO | 12 | `GetPack, LstPack, LstPackLine, FpwVersion, GetCurrentUser...` | [`MWS440MI.json`](mi-swagger/MWS440MI.json) |
| **`MWS460MI`** | Pending put-aways | 16 | `GetPutAwayTask, LstPackage, LstPutAwayByPac, LstPutAwayTask, RetrLocViaPano...` | [`MWS460MI.json`](mi-swagger/MWS460MI.json) |
| **`MWS471MI`** | Outbound tracking policy | 15 | `AddTrckngPlcy, CpyTrckngPlcy, DelTrckngPlcy, GetTrckngPlcy, LstTrckngPlcy...` | [`MWS471MI.json`](mi-swagger/MWS471MI.json) |
| **`MWS476MI`** | Tracking ID management | 17 | `Add, Assign, Cpy, Dlt, Get...` | [`MWS476MI.json`](mi-swagger/MWS476MI.json) |
| **`MWS495MI`** | Additional Delivery Information | 14 | `Get, Lst, LstByOrderLine, LstPickupDeliv, Upd...` | [`MWS495MI.json`](mi-swagger/MWS495MI.json) |
| **`MWSLWMMI`** | LWM List expected receipts | 22 | `GetPOData, LstDOLine, LstDOPac, LstExpPOReceipt, LstMOHead...` | [`MWSLWMMI.json`](mi-swagger/MWSLWMMI.json) |
| **`MYS450MI`** | Transport Operation Planning | 17 | `AddDelivery, LstAddtlInfo, LstDelPlaceLoad, LstDelivery, LstHead...` | [`MYS450MI.json`](mi-swagger/MYS450MI.json) |
| **`MYS500MI`** | TEI Transfer | 15 | `ChgHead, GetHead, LstDetail, LstPackGrp, LstPackages...` | [`MYS500MI.json`](mi-swagger/MYS500MI.json) |
| **`OIAR01MI`** | Customer Order type BR | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIAR01MI.json`](mi-swagger/OIAR01MI.json) |
| **`OIBR03MI`** | CO. Conn Reference Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR03MI.json`](mi-swagger/OIBR03MI.json) |
| **`OIBR04MI`** | CO Line. Conn Export Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR04MI.json`](mi-swagger/OIBR04MI.json) |
| **`OIBR05MI`** | CO Line. Conn Import Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR05MI.json`](mi-swagger/OIBR05MI.json) |
| **`OIBR06MI`** | Customer Order type BR | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR06MI.json`](mi-swagger/OIBR06MI.json) |
| **`OIS003MI`** | Customer connect charges interface | 15 | `AddCustCharge, DltCustCharge, GetCustCharge, LstByCustDivi, LstCustCharges...` | [`OIS003MI.json`](mi-swagger/OIS003MI.json) |
| **`OIS004MI`** | Api: Customer address - delivery specification | 14 | `Add, Del, Get, Lst, Upd...` | [`OIS004MI.json`](mi-swagger/OIS004MI.json) |
| **`OIS005MI`** | Api: Item / Customer | 16 | `Add, Del, Get, List, LstByItem...` | [`OIS005MI.json`](mi-swagger/OIS005MI.json) |
| **`OIS006MI`** | Api: Item / Customer Strict Rotation | 13 | `Get, Lst, UpdPrevDate, UpdResetDate, FpwVersion...` | [`OIS006MI.json`](mi-swagger/OIS006MI.json) |
| **`OIS010MI`** | Order type interface | 18 | `Add, Cpy, Dlt, Get, GetFieldInfo...` | [`OIS010MI.json`](mi-swagger/OIS010MI.json) |
| **`OIS011MI`** | CO Type connect document interface | 15 | `AddCOTypDoc, DltCOTypDoc, GetCOTypDoc, LstByCOTypeDoc, LstDocByCOType...` | [`OIS011MI.json`](mi-swagger/OIS011MI.json) |
| **`OIS012MI`** | Price list table interface | 16 | `AddPriceLstMtrx, DltPriceLstMtrx, GetPriceLstMtrx, LstObjConTable, LstPriceLstMtrx...` | [`OIS012MI.json`](mi-swagger/OIS012MI.json) |
| **`OIS013MI`** | Manage charges connected to CO Type | 15 | `AddCOTypChrg, DltCOTypChrg, GetCOTypChrg, LstByCOTypeChrg, LstChrgByCOType...` | [`OIS013MI.json`](mi-swagger/OIS013MI.json) |
| **`OIS014MI`** | Order type field selection interface | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`OIS014MI.json`](mi-swagger/OIS014MI.json) |
| **`OIS015MI`** | Api: Sales price calculation elements | 25 | `AddCostElement, AddElementExcl, AddElementRate, DltCostElement, DltElementExcl...` | [`OIS015MI.json`](mi-swagger/OIS015MI.json) |
| **`OIS017MI`** | Sales Price List interface | 29 | `AddBasePrice, AddGradSlsPrc, AddPriceList, AddScaleKey, ChgPriceList...` | [`OIS017MI.json`](mi-swagger/OIS017MI.json) |
| **`OIS022MI`** | Api: Sales Costing Model | 20 | `AddCostModelLin, AddCostingModel, DltCostModelLin, DltCostingModel, GetCostModelLin...` | [`OIS022MI.json`](mi-swagger/OIS022MI.json) |
| **`OIS028MI`** | Connect CO type group and CO type | 14 | `AddConnection, CopyConnection, DeleteConnect, LstOTConnection, LstOTGroup...` | [`OIS028MI.json`](mi-swagger/OIS028MI.json) |
| **`OIS030MI`** | Order charges | 17 | `AddCOCharge, CpyCOCharge, DltCOCharge, GetCOCharge, LstCOCharges...` | [`OIS030MI.json`](mi-swagger/OIS030MI.json) |
| **`OIS031MI`** | Service charge | 12 | `LstServChrgHead, LstServChrgLng, LstServChrgMtrx, FpwVersion, GetCurrentUser...` | [`OIS031MI.json`](mi-swagger/OIS031MI.json) |
| **`OIS035MI`** | Document Text  interface | 14 | `AddTxtDocument, ChgTxtDocument, DltTxtDocument, GetTxtDocument, LstTxtDocument...` | [`OIS035MI.json`](mi-swagger/OIS035MI.json) |
| **`OIS038MI`** | Business chain structure interface | 17 | `AddBusChain, AddBusChainCust, DelBusChain, DelBusChainCust, LstBusChainCust...` | [`OIS038MI.json`](mi-swagger/OIS038MI.json) |
| **`OIS040MI`** | Business chain structure interface | 20 | `AddBusChain, AddBusChainCust, DltBusChain, DltBusChainCust, GetBusChain...` | [`OIS040MI.json`](mi-swagger/OIS040MI.json) |
| **`OIS052MI`** | Contact plan | 31 | `AddConCustExc, AddConInfoCust, AddConPlan, AddConPlanExc, CrtActConPlans...` | [`OIS052MI.json`](mi-swagger/OIS052MI.json) |
| **`OIS060MI`** | Customer Blanket Agreement Interface | 26 | `AddAgrLnPrice, AddCustBlkAgr, AddCustBlkAgrLn, CloBulkOrder, DelAgrLnPrice...` | [`OIS060MI.json`](mi-swagger/OIS060MI.json) |
| **`OIS100MI`** | Customer order interface | 148 | `AddBatchAddress, AddBatchHead, AddBatchHeadChg, AddBatchLine, AddBatchLineChg...` | [`OIS100MI.json`](mi-swagger/OIS100MI.json) |
| **`OIS105MI`** | API: Advance invoicing | 15 | `AddPreInvoice, CnfPreInvoice, DltPreInvoice, GetPreInvByEXIN, GetPreInvoice...` | [`OIS105MI.json`](mi-swagger/OIS105MI.json) |
| **`OIS111MI`** | Display Valid Customer Blanket Agreements | 10 | `LstAgrHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS111MI.json`](mi-swagger/OIS111MI.json) |
| **`OIS115MI`** | Api: Approve CO | 10 | `ApproveCO, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS115MI.json`](mi-swagger/OIS115MI.json) |
| **`OIS120MI`** | Customer order stop | 14 | `GetCOStopInfo, LstCOStopByCUOR, LstCOStopByORNO, LstCOStopByPYNO, UpdCOStop...` | [`OIS120MI.json`](mi-swagger/OIS120MI.json) |
| **`OIS125MI`** | Payment request | 16 | `AddFinalPayment, AddGenPrePmt, AddPrePayment, LstFinPayByIVNO, LstPrePayByCO...` | [`OIS125MI.json`](mi-swagger/OIS125MI.json) |
| **`OIS155MI`** | Api: Delivery interface | 12 | `Approve, ListDeliveries, UpdateQty, FpwVersion, GetCurrentUser...` | [`OIS155MI.json`](mi-swagger/OIS155MI.json) |
| **`OIS157MI`** | Handling prepayment | 14 | `Calculate, DeliverAndInv, Lst, Print, RelForDelivery...` | [`OIS157MI.json`](mi-swagger/OIS157MI.json) |
| **`OIS158MI`** | Customer order deposit lines | 16 | `DeliverAndInv, Lst, ProposeQuantity, RelForDelivery, SetPropQtyRel...` | [`OIS158MI.json`](mi-swagger/OIS158MI.json) |
| **`OIS165MI`** | Order Entry Messages | 16 | `AddCOEntMsg, AddText, DltCOEntMsg, GetCOEntMsg, LstCOEntMsg...` | [`OIS165MI.json`](mi-swagger/OIS165MI.json) |
| **`OIS175MI`** | Customer order inquiry interface | 16 | `LstBySortOption, LstHeadByCust, LstHeadByDate, LstHeadByRef, LstSortOptions...` | [`OIS175MI.json`](mi-swagger/OIS175MI.json) |
| **`OIS210MI`** | Cash sales open | 28 | `AddAuthCashDesk, AddCashDesk, AddConApprover, AddPayMethod, DelAuthCashDesk...` | [`OIS210MI.json`](mi-swagger/OIS210MI.json) |
| **`OIS215MI`** | Cash sales open | 36 | `Add3rdpResult, AddCashMovement, AddCreateCheck, AddInvoice, AddOnAccount...` | [`OIS215MI.json`](mi-swagger/OIS215MI.json) |
| **`OIS225MI`** | Parameters Delivery windows | 12 | `Add, Get, Upd, FpwVersion, GetCurrentUser...` | [`OIS225MI.json`](mi-swagger/OIS225MI.json) |
| **`OIS226MI`** | Delivery window selection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS226MI.json`](mi-swagger/OIS226MI.json) |
| **`OIS275MI`** | Api: Customer batch-order head | 14 | `GetAddress, GetBatchHead, GetTmpOrderStat, LstBatchLine, SearchBatchLine...` | [`OIS275MI.json`](mi-swagger/OIS275MI.json) |
| **`OIS320MI`** | Price and discount inquiry interface | 17 | `GetPriceLine, LstDiscModels, LstDiscNumbers, LstListPrices, LstNewPrices...` | [`OIS320MI.json`](mi-swagger/OIS320MI.json) |
| **`OIS325MI`** | Api: simulate sales costing model. | 10 | `LstSlsPriceSim, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS325MI.json`](mi-swagger/OIS325MI.json) |
| **`OIS326MI`** | Price calculation CO line | 10 | `LstCalculation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS326MI.json`](mi-swagger/OIS326MI.json) |
| **`OIS335MI`** | Price guidance model | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS335MI.json`](mi-swagger/OIS335MI.json) |
| **`OIS336MI`** | Price guidance model | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS336MI.json`](mi-swagger/OIS336MI.json) |
| **`OIS337MI`** | Price Guidance | 13 | `ApprovePrice, LstPriGuidance, PriGuidByOrder, UpdPrice, FpwVersion...` | [`OIS337MI.json`](mi-swagger/OIS337MI.json) |
| **`OIS340MI`** | Api: Supply Model simulation | 10 | `LstSupplSummary, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS340MI.json`](mi-swagger/OIS340MI.json) |
| **`OIS345MI`** | Price Margin. Simulate CO Line | 11 | `GetSelSimFields, LstPriceMargin, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS345MI.json`](mi-swagger/OIS345MI.json) |
| **`OIS350MI`** | Customer Order invoice interface | 35 | `GetCashDiscount, GetDelHead, GetDelLine, GetHeadDiscNo, GetInvHead...` | [`OIS350MI.json`](mi-swagger/OIS350MI.json) |
| **`OIS358MI`** | List delivered lots per customer | 10 | `LstDelivLots, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS358MI.json`](mi-swagger/OIS358MI.json) |
| **`OIS361MI`** | Price list Table Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS361MI.json`](mi-swagger/OIS361MI.json) |
| **`OIS363MI`** | Dicount Model Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS363MI.json`](mi-swagger/OIS363MI.json) |
| **`OIS365MI`** | Pricing group interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS365MI.json`](mi-swagger/OIS365MI.json) |
| **`OIS366MI`** | Pricing group selection matrix interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS366MI.json`](mi-swagger/OIS366MI.json) |
| **`OIS368MI`** | Item Restriction Selection matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS368MI.json`](mi-swagger/OIS368MI.json) |
| **`OIS370MI`** | Api: Bulk order batch entry | 15 | `AddBatchHead, AddBatchLn, AddBatchPrice, DeleteEntry, FinishEntry...` | [`OIS370MI.json`](mi-swagger/OIS370MI.json) |
| **`OIS390MI`** | Customer Return | 27 | `AddHead, AddLine, ClsPickup, CrtPickup, DelPickup...` | [`OIS390MI.json`](mi-swagger/OIS390MI.json) |
| **`OIS393MI`** | Manage crediting of customer returns | 10 | `CreateCredit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS393MI.json`](mi-swagger/OIS393MI.json) |
| **`OIS407MI`** | Bonus and Commission customer table interface | 19 | `AddBCCustTable, AddBCCustomer, DltBCCustTable, DltBCCustomer, GetBCCustTable...` | [`OIS407MI.json`](mi-swagger/OIS407MI.json) |
| **`OIS412MI`** | Bonus & Commission Agreement Interface | 23 | `AddBCAgr, AddBCAgrRates, AddBCAgrReserv, DltBCAgr, DltBCAgrRates...` | [`OIS412MI.json`](mi-swagger/OIS412MI.json) |
| **`OIS415MI`** | Bonus Payout | 17 | `AddBCAgrStl, CrtBCAgrAdvPrpl, CrtBCAgrStl, DltBCAgrCalcAdv, GetBCAgrCalcAdv...` | [`OIS415MI.json`](mi-swagger/OIS415MI.json) |
| **`OIS421MI`** | B/C item select | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS421MI.json`](mi-swagger/OIS421MI.json) |
| **`OIS422MI`** | B/C Table Lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS422MI.json`](mi-swagger/OIS422MI.json) |
| **`OIS430MI`** | Trade agreement header interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS430MI.json`](mi-swagger/OIS430MI.json) |
| **`OIS431MI`** | Trade agreement recipient interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS431MI.json`](mi-swagger/OIS431MI.json) |
| **`OIS432MI`** | Trade agreement Scale rates Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS432MI.json`](mi-swagger/OIS432MI.json) |
| **`OIS433MI`** | Trade agreement bonus status per recipient | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`OIS433MI.json`](mi-swagger/OIS433MI.json) |
| **`OIS434MI`** | Bonus status per recipient per period interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS434MI.json`](mi-swagger/OIS434MI.json) |
| **`OIS435MI`** | Trade agreement transaction interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS435MI.json`](mi-swagger/OIS435MI.json) |
| **`OIS436MI`** | Trade agreement table interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS436MI.json`](mi-swagger/OIS436MI.json) |
| **`OIS437MI`** | Trade Agreement Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS437MI.json`](mi-swagger/OIS437MI.json) |
| **`OIS438MI`** | Trade agreement model Id interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS438MI.json`](mi-swagger/OIS438MI.json) |
| **`OIS439MI`** | Trade agreement model lines interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS439MI.json`](mi-swagger/OIS439MI.json) |
| **`OIS440MI`** | Trade agreement type interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS440MI.json`](mi-swagger/OIS440MI.json) |
| **`OIS445MI`** | Trade agreement payout interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS445MI.json`](mi-swagger/OIS445MI.json) |
| **`OIS446MI`** | Trade agreement payout amount interface | 13 | `Dlt, Get, Lst, Upd, FpwVersion...` | [`OIS446MI.json`](mi-swagger/OIS446MI.json) |
| **`OIS449MI`** | Trade agreement payment schedule per recipient Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS449MI.json`](mi-swagger/OIS449MI.json) |
| **`OIS455MI`** | Trade Agreement FIM periodic proposal interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS455MI.json`](mi-swagger/OIS455MI.json) |
| **`OIS456MI`** | Trade agreement FIM periodic proposal line interface | 13 | `Dlt, Get, Lst, Upd, FpwVersion...` | [`OIS456MI.json`](mi-swagger/OIS456MI.json) |
| **`OIS530MI`** | Sales price report interface | 12 | `GetHead, GetLine, LstLine, FpwVersion, GetCurrentUser...` | [`OIS530MI.json`](mi-swagger/OIS530MI.json) |
| **`OIS560MI`** | Api: Customer Settings | 14 | `GetSettings, LstDelMethod, LstDelTerm, LstFac, LstPayType...` | [`OIS560MI.json`](mi-swagger/OIS560MI.json) |
| **`OIS605MI`** | Print order confirmation | 10 | `PrtOrderConfirm, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS605MI.json`](mi-swagger/OIS605MI.json) |
| **`OIS680MI`** | Print customer order invoice copy | 10 | `PrintCopy, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS680MI.json`](mi-swagger/OIS680MI.json) |
| **`OIS800MI`** | Discount model | 23 | `AddModel, AddScaleLine, AddScaleLnCamp, DltModel, DltScaleLine...` | [`OIS800MI.json`](mi-swagger/OIS800MI.json) |
| **`OIS820MI`** | Discount Campaign API | 14 | `AddDiscCamp, DltDiscCamp, GetDiscCamp, LstDiscCamp, UpdDiscCamp...` | [`OIS820MI.json`](mi-swagger/OIS820MI.json) |
| **`OIS840MI`** | Promotion API | 27 | `AddPromCust, AddPromHead, AddPromLine, AddPromWhs, DltProm...` | [`OIS840MI.json`](mi-swagger/OIS840MI.json) |
| **`OIS847MI`** | API: Promotion Enter Scaled Prices | 13 | `Add, Change, Delet, List, FpwVersion...` | [`OIS847MI.json`](mi-swagger/OIS847MI.json) |
| **`OIS850MI`** | Initial Supply Orders | 18 | `Alloc, Close, DeAlloc, Gen, LstCOLines...` | [`OIS850MI.json`](mi-swagger/OIS850MI.json) |
| **`OIS860MI`** | Supplier rebate agreement on sales | 29 | `AddHead, AddLine, ConnectAgrValue, DelAgrValues, DelAgreement...` | [`OIS860MI.json`](mi-swagger/OIS860MI.json) |
| **`OIS865MI`** | Supplier Rebate agreement category | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS865MI.json`](mi-swagger/OIS865MI.json) |
| **`OIS867MI`** | Supplier rebate on sales | 19 | `AddScaleHead, AddScaleLimit, DelScale, DelScaleLimit, GetScaleHead...` | [`OIS867MI.json`](mi-swagger/OIS867MI.json) |
| **`OPS200MI`** | Value coupon ledger | 11 | `ChkVCLdgSale, ChkVCLdgTend, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OPS200MI.json`](mi-swagger/OPS200MI.json) |
| **`OPS210MI`** | Fnc: External Ticket lines | 13 | `AddExtTickLin, CnfExtTickLin, DltExtTickLin, LstExtTickLin, FpwVersion...` | [`OPS210MI.json`](mi-swagger/OPS210MI.json) |
| **`OPS270MI`** | POS Sales Tickets interface | 19 | `AddRoundNumber, AddSlsTicketLin, AddSlsTicketPay, BchPrcRound, DelRoundNumber...` | [`OPS270MI.json`](mi-swagger/OPS270MI.json) |
| **`OPS280MI`** | POS Sales ticket update interface | 10 | `SlsTicketUpdate, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS280MI.json`](mi-swagger/OPS280MI.json) |
| **`OPS291MI`** | Payment provider ledger entries | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`OPS291MI.json`](mi-swagger/OPS291MI.json) |
| **`OPS292MI`** | Transfer payment provider ledger entries to FIM. | 10 | `SndPaymentToFIM, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS292MI.json`](mi-swagger/OPS292MI.json) |
| **`OPS500MI`** | Retrieves Store Information | 18 | `AddStore, GetStore, LstCollabStores, LstShopCategory, LstShopClass...` | [`OPS500MI.json`](mi-swagger/OPS500MI.json) |
| **`OPS600MI`** | Fnc: POS - Filter records for Item and Customer replication | 15 | `CnfCus, CnfItm, CrtCstRepl, CrtItmRepl, LstCus...` | [`OPS600MI.json`](mi-swagger/OPS600MI.json) |
| **`OPS650MI`** | API: Print label | 10 | `PrintLabel, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS650MI.json`](mi-swagger/OPS650MI.json) |
| **`OPS660MI`** | Retrieve Mix and Match data | 10 | `LstMixMatch, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS660MI.json`](mi-swagger/OPS660MI.json) |
| **`OSBSTDMI`** | Api: Sales Statistics Details | 10 | `SelDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSBSTDMI.json`](mi-swagger/OSBSTDMI.json) |
| **`OSS220MI`** | Sales Budget.Consolidate/Copy | 10 | `TriggerCpyBudg, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSS220MI.json`](mi-swagger/OSS220MI.json) |
| **`OSS401MI`** | Dataset Information Interface | 29 | `Activate, AddDataset, CpyDataset, Deactivate, DltDataset...` | [`OSS401MI.json`](mi-swagger/OSS401MI.json) |
| **`OSS402MI`** | Dataset Keys And Accumulators Interface | 15 | `AddDatasetField, DltDatasetField, GetDatasetField, LstDatasetField, Select...` | [`OSS402MI.json`](mi-swagger/OSS402MI.json) |
| **`OSS406MI`** | Dataset Transaction Types Interface | 13 | `AddTransType, DltTransType, LstTransTypes, Select, FpwVersion...` | [`OSS406MI.json`](mi-swagger/OSS406MI.json) |
| **`OSS420MI`** | Sales Budget Interface | 19 | `Activate, AddSalesBudget, ClsBudget, CpySalesBudget, Deactivate...` | [`OSS420MI.json`](mi-swagger/OSS420MI.json) |
| **`OSS450MI`** | Api: Enter Lost Sales | 10 | `AddLostSales, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSS450MI.json`](mi-swagger/OSS450MI.json) |
| **`PCS005MI`** | Costing type | 14 | `Add, Del, Get, Lst, Upd...` | [`PCS005MI.json`](mi-swagger/PCS005MI.json) |
| **`PCS115MI`** | Material and Subcontract overhead | 15 | `Add, Copy, Delete, List, Retrieve...` | [`PCS115MI.json`](mi-swagger/PCS115MI.json) |
| **`PCS120MI`** | Costing Component. Create Cost Rates | 15 | `AddCostRate, CpyCostRate, DelCostRate, GetCostRate, LstCostRate...` | [`PCS120MI.json`](mi-swagger/PCS120MI.json) |
| **`PCS200MI`** | Product Costing Calculation | 11 | `CalcProdRange, CalcSingleProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS200MI.json`](mi-swagger/PCS200MI.json) |
| **`PCS240MI`** | Product costing. Calculate MO | 11 | `CalcMORange, CalcSingleMO, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS240MI.json`](mi-swagger/PCS240MI.json) |
| **`PCS260MI`** | Product Costing - Manual Update interface | 13 | `Add, Get, Lst, Upd, FpwVersion...` | [`PCS260MI.json`](mi-swagger/PCS260MI.json) |
| **`PCS265MI`** | Actual cost interface | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`PCS265MI.json`](mi-swagger/PCS265MI.json) |
| **`PCS280MI`** | Purchase distribution costing interface | 10 | `CalcCost, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PCS280MI.json`](mi-swagger/PCS280MI.json) |
| **`PCS350MI`** | FIFO Cost Goods receipt. | 13 | `GetTransaction, Lst, LstOrder, LstSupplierInv, FpwVersion...` | [`PCS350MI.json`](mi-swagger/PCS350MI.json) |
| **`PCS351MI`** | FIFO Cost Transactions. | 13 | `GetTransaction, Lst, LstFIFO, LstOrder, FpwVersion...` | [`PCS351MI.json`](mi-swagger/PCS351MI.json) |
| **`PCS352MI`** | FIFO Cost Details. | 11 | `GetDetail, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS352MI.json`](mi-swagger/PCS352MI.json) |
| **`PCS495MI`** | Budgeting maintenance proposal / update | 10 | `CalRevCos, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PCS495MI.json`](mi-swagger/PCS495MI.json) |
| **`PDS001MI`** | Product Structures | 28 | `Add, AddFeature, Copy, CpyProdVersion, Delete...` | [`PDS001MI.json`](mi-swagger/PDS001MI.json) |
| **`PDS002MI`** | Product Connect Materials and Operations | 30 | `AddComponent, AddOperation, AddOperation2, CpyComp, CpyComponent...` | [`PDS002MI.json`](mi-swagger/PDS002MI.json) |
| **`PDS003MI`** | Connect Feature and Option | 15 | `Add, Copy, Delete, Get, List...` | [`PDS003MI.json`](mi-swagger/PDS003MI.json) |
| **`PDS007MI`** | Quantity Limits for Alternate Routings | 11 | `Get, Update, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS007MI.json`](mi-swagger/PDS007MI.json) |
| **`PDS008MI`** | Alternate Routing | 14 | `Add, Delete, Get, List, Update...` | [`PDS008MI.json`](mi-swagger/PDS008MI.json) |
| **`PDS010MI`** | Work Center | 36 | `AddRelation, AddShiftInfo, AddShiftPatAdj, AddWorkCenter, ChgRelation...` | [`PDS010MI.json`](mi-swagger/PDS010MI.json) |
| **`PDS013MI`** | Alternate Material | 15 | `AddAltMat, CpyAltMat, DltAltMat, GetAltMat, LstAltMat...` | [`PDS013MI.json`](mi-swagger/PDS013MI.json) |
| **`PDS016MI`** | Daily Capacity | 16 | `AddDailyCap, DelDailyCap, GetDailyCap, LstDailyCap, SelDailyCap...` | [`PDS016MI.json`](mi-swagger/PDS016MI.json) |
| **`PDS017MI`** | Create Kits | 13 | `CreateKit, Initalize, List, PrepareKit, FpwVersion...` | [`PDS017MI.json`](mi-swagger/PDS017MI.json) |
| **`PDS021MI`** | End Product | 15 | `AddEndProduct, CpyEndProduct, DltEndProduct, GetEndProduct, LstEndProducts...` | [`PDS021MI.json`](mi-swagger/PDS021MI.json) |
| **`PDS022MI`** | Product Sequence Dependent Setup Times | 10 | `Select, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PDS022MI.json`](mi-swagger/PDS022MI.json) |
| **`PDS023MI`** | Alternate Structures | 15 | `AddAltStructure, CpyAltStructure, DltAltStructure, GetAltStructure, LstAltStructure...` | [`PDS023MI.json`](mi-swagger/PDS023MI.json) |
| **`PDS027MI`** | Connect Operation Element | 23 | `AddDocumentID, AddInspectionID, AddPermit, AddTool, AddWorkElement...` | [`PDS027MI.json`](mi-swagger/PDS027MI.json) |
| **`PDS028MI`** | Product Version | 15 | `AddVersion, CpyVersion, DltVersion, GetVersion, LstVersions...` | [`PDS028MI.json`](mi-swagger/PDS028MI.json) |
| **`PDS029MI`** | Output Interface | 14 | `AddOutput, DltOutput, GetOutput, LstOutputs, UpdOutput...` | [`PDS029MI.json`](mi-swagger/PDS029MI.json) |
| **`PDS030MI`** | Shift Planning Basic Data | 12 | `SelCalendar, SelModelLines, SelPatternLines, FpwVersion, GetCurrentUser...` | [`PDS030MI.json`](mi-swagger/PDS030MI.json) |
| **`PDS035MI`** | Alternate Routing | 15 | `AddAltRouting, CpyAltRouting, DltAltRouting, GetAltRouting, LstAltRouting...` | [`PDS035MI.json`](mi-swagger/PDS035MI.json) |
| **`PDS040MI`** | Inspection List | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS040MI.json`](mi-swagger/PDS040MI.json) |
| **`PDS041MI`** | Inspection ID's Lines | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS041MI.json`](mi-swagger/PDS041MI.json) |
| **`PDS042MI`** | Inspection Result IDs | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS042MI.json`](mi-swagger/PDS042MI.json) |
| **`PDS043MI`** | Inspection Result Values | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS043MI.json`](mi-swagger/PDS043MI.json) |
| **`PDS044MI`** | Disturbance Type | 14 | `Add, Delete, Get, List, Update...` | [`PDS044MI.json`](mi-swagger/PDS044MI.json) |
| **`PDS050MI`** | Product Option | 21 | `Add, AddNameLanguage, Copy, Delete, DltNameLanguage...` | [`PDS050MI.json`](mi-swagger/PDS050MI.json) |
| **`PDS055MI`** | Product Features | 15 | `Add, Copy, Delete, Get, List...` | [`PDS055MI.json`](mi-swagger/PDS055MI.json) |
| **`PDS056MI`** | Product Feature Connect Options | 15 | `Add, Copy, Delete, List, Retrieve...` | [`PDS056MI.json`](mi-swagger/PDS056MI.json) |
| **`PDS057MI`** | Feature Descriptions In Other Languages | 14 | `Add, Delete, Get, List, Update...` | [`PDS057MI.json`](mi-swagger/PDS057MI.json) |
| **`PDS061MI`** | Product variant | 18 | `AddSKUOption, AnswerFeature, ConfirmConfig, CreateSKU, CrtConfig...` | [`PDS061MI.json`](mi-swagger/PDS061MI.json) |
| **`PDS071MI`** | Feature Distribute Option | 11 | `FeatDistOpChk, FeatDistOpUpd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS071MI.json`](mi-swagger/PDS071MI.json) |
| **`PDS075MI`** | Product Structure Class | 14 | `AddStructClass, DltStructClass, GetStructClass, LstStructClass, UpdStructClass...` | [`PDS075MI.json`](mi-swagger/PDS075MI.json) |
| **`PDS090MI`** | Product Selection Matrix | 19 | `Add, AddLine, Copy, Delete, DeleteLine...` | [`PDS090MI.json`](mi-swagger/PDS090MI.json) |
| **`PDS103MI`** | Manages the MPDSUM table - Summarized Bill of Material | 11 | `LstSumBOM, LstWhereUsed, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS103MI.json`](mi-swagger/PDS103MI.json) |
| **`PDS250MI`** | Learning Curve | 12 | `LstLearnCurMod, LstLearnID, SelLearnHistory, FpwVersion, GetCurrentUser...` | [`PDS250MI.json`](mi-swagger/PDS250MI.json) |
| **`PDS360MI`** | Substitution Table | 15 | `AddSubstitFeat, AddSubstitOpt, DltSubstitFeat, DltSubstitOpt, LstSubstitFeat...` | [`PDS360MI.json`](mi-swagger/PDS360MI.json) |
| **`PDS600MI`** | Product Configuration Interface | 21 | `AbortConfig, AnswerDrawing, AnswerFeature, AnswerMatrix, ChangeConfig...` | [`PDS600MI.json`](mi-swagger/PDS600MI.json) |
| **`PDS601MI`** | Stateless | 15 | `AbortConfig, AnswerFeature, ConfirmConfig, InitConfig, OptionRequest...` | [`PDS601MI.json`](mi-swagger/PDS601MI.json) |
| **`PDS605MI`** | Configuration Head | 14 | `AddCfg, AddFeatOpt, Configure, ConfirmCfg, DeleteCfg...` | [`PDS605MI.json`](mi-swagger/PDS605MI.json) |
| **`PMS018MI`** | Transfer Supplier Capacity And Capability | 10 | `SupplierCap, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PMS018MI.json`](mi-swagger/PMS018MI.json) |
| **`PMS050MI`** | Manufacturing Order Report Receipt | 13 | `ConfirmAll, LstPndReceipt, RptReceipt, UpdProcess, FpwVersion...` | [`PMS050MI.json`](mi-swagger/PMS050MI.json) |
| **`PMS055MI`** | Manufacturing Order Backflush Functions | 10 | `GetBackFlushQty, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PMS055MI.json`](mi-swagger/PMS055MI.json) |
| **`PMS060MI`** | Manufacturing Order Report Issue | 14 | `DltIssue, LstAgrBySchedNo, LstMatBySchedNo, RptByAgrSchedNo, RptIssue...` | [`PMS060MI.json`](mi-swagger/PMS060MI.json) |
| **`PMS070MI`** | Manufacturing Order Report Operation | 13 | `CloseOperation, Confirm, GetOperation, RptOperation, FpwVersion...` | [`PMS070MI.json`](mi-swagger/PMS070MI.json) |
| **`PMS080MI`** | Manufacturing Order Report By-product | 12 | `Confirm, DltByProduct, RptByProduct, FpwVersion, GetCurrentUser...` | [`PMS080MI.json`](mi-swagger/PMS080MI.json) |
| **`PMS085MI`** | Inspection Results | 16 | `DelInspectionRs, GetInspectionRs, GetReportInspRs, LstInspectionRs, LstReportInspRs...` | [`PMS085MI.json`](mi-swagger/PMS085MI.json) |
| **`PMS090MI`** | Manufacturing Order Report Co-product | 14 | `ConfirmReport, DelCoProdReport, GetCoProdReport, LstCoProdReport, UpdCoProdReport...` | [`PMS090MI.json`](mi-swagger/PMS090MI.json) |
| **`PMS100MI`** | Manufacturing Order | 58 | `AddInboxOp, AddInboxOrder, AddMOComponent, AddMatLine, AddOperation...` | [`PMS100MI.json`](mi-swagger/PMS100MI.json) |
| **`PMS104MI`** | MO Operation Element Interface | 24 | `AddOpDocID, AddOpInspID, AddOpTool, AddOpWrkElement, CpyOpDocID...` | [`PMS104MI.json`](mi-swagger/PMS104MI.json) |
| **`PMS120MI`** | Manufacturing Order Type | 15 | `AddOrderType, CpyOrderType, DelOrderType, GetOrderType, LstOrderType...` | [`PMS120MI.json`](mi-swagger/PMS120MI.json) |
| **`PMS130MI`** | Receipt Inspection Coded Items | 11 | `LstOpenQI, SetQIItmPutAway, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PMS130MI.json`](mi-swagger/PMS130MI.json) |
| **`PMS150MI`** | Output Balancing | 13 | `BatchBalancing, GetProcessOrder, LstBatchBal, UndoBatchBal, FpwVersion...` | [`PMS150MI.json`](mi-swagger/PMS150MI.json) |
| **`PMS155MI`** | Bulk Redistribution | 13 | `GetRedisTotal, Lst, Redistribute, Reopen, FpwVersion...` | [`PMS155MI.json`](mi-swagger/PMS155MI.json) |
| **`PMS170MI`** | Manufacturing Order Proposals | 24 | `ClrSimulatedMOP, CrtPlannedMO, DelPlannedMO, Get, LstByRORN...` | [`PMS170MI.json`](mi-swagger/PMS170MI.json) |
| **`PMS230MI`** | Work Center Schedule | 13 | `ReschedWorkCen, SchedUnschedMO, Select, UpdScheduleOp, FpwVersion...` | [`PMS230MI.json`](mi-swagger/PMS230MI.json) |
| **`PMS260MI`** | Orderless Reporting MO | 11 | `PutAway, RepEndProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PMS260MI.json`](mi-swagger/PMS260MI.json) |
| **`PMS270MI`** | Schedule Number | 13 | `AddScheduleNo, GetScheduleNo, LstScheduleNo, UpdScheduleNo, FpwVersion...` | [`PMS270MI.json`](mi-swagger/PMS270MI.json) |
| **`PMS420MI`** | Report Operation Setup And Disturbance | 17 | `ChangeTeam, LstTransaction, StartDisturb, StartWorkOp, StartWorkSetup...` | [`PMS420MI.json`](mi-swagger/PMS420MI.json) |
| **`POS001MI`** | Project element interface | 15 | `AddProjElement, CpyProjElement, DltProjElement, GetProjElement, LstProjElement...` | [`POS001MI.json`](mi-swagger/POS001MI.json) |
| **`POS010MI`** | Project order type | 15 | `AddProjectType, CpyProjectType, DltProjectType, GetProjectType, LstProjectTypes...` | [`POS010MI.json`](mi-swagger/POS010MI.json) |
| **`POS015MI`** | Project order type | 15 | `AddProjectMngr, CpyProjectMngr, DltProjectMngr, GetProjectMngr, LstProjectMngrs...` | [`POS015MI.json`](mi-swagger/POS015MI.json) |
| **`POS030MI`** | Manage budget templates | 15 | `AddBudgTemplate, CpyBudgTemplate, DltBudgTemplate, GetBudgTemplate, LstBudgTemplate...` | [`POS030MI.json`](mi-swagger/POS030MI.json) |
| **`POS031MI`** | Handle budget template lines | 15 | `AddBudgTempLine, CpyBudgTempLine, DltBudgTempLine, GetBudgTempLine, LstBudgTempLine...` | [`POS031MI.json`](mi-swagger/POS031MI.json) |
| **`POS035MI`** | Project budget item management | 15 | `AddProjBudgItem, CpyProjBudgItem, DltProjBudgItem, GetProjBudgItem, LstProjBudgItem...` | [`POS035MI.json`](mi-swagger/POS035MI.json) |
| **`POS040MI`** | project checklist management | 15 | `AddProjCheckLst, CpyProjCheckLst, DltProjCheckLst, GetProjCheckLst, LstPrjCheckLsts...` | [`POS040MI.json`](mi-swagger/POS040MI.json) |
| **`POS041MI`** | Project checklist line management | 16 | `AddPrjChkLine, CpyPrjChkLine, DltPrjChkLine, GetPrjChkLine, LstPrjChkLines...` | [`POS041MI.json`](mi-swagger/POS041MI.json) |
| **`POS060MI`** | Project element type interface | 15 | `AddProjElemType, CpyProjElemType, DltProjElemType, GetProjElemType, LstProjElemType...` | [`POS060MI.json`](mi-swagger/POS060MI.json) |
| **`POS061MI`** | Status per element type | 14 | `AddStsDescr, DltStsDescr, GetStsDescr, LstStsDescr, UpdStsDescr...` | [`POS061MI.json`](mi-swagger/POS061MI.json) |
| **`POS062MI`** | Open/close project interface | 10 | `SetStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS062MI.json`](mi-swagger/POS062MI.json) |
| **`POS063MI`** | Start/finish activity interface | 10 | `SetStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS063MI.json`](mi-swagger/POS063MI.json) |
| **`POS070MI`** | Information structure | 15 | `AddInfoStruct, CpyInfoStruct, DltInfoStruct, GetInfoStruct, LstInfoStructs...` | [`POS070MI.json`](mi-swagger/POS070MI.json) |
| **`POS100MI`** | Project structure interface | 35 | `AddProject, ApprQuotation, CancelQuotation, ChgProjectMngr, CpyProjSubTempl...` | [`POS100MI.json`](mi-swagger/POS100MI.json) |
| **`POS105MI`** | Checklist per project element | 15 | `AddChkList, CpyChkList, DltChkList, GetChkList, LstChkLists...` | [`POS105MI.json`](mi-swagger/POS105MI.json) |
| **`POS106MI`** | Manage customers in project qoutation | 18 | `AddCustomer, CpyCustomer, DltCustomer, GetCustomer, LstCustomers...` | [`POS106MI.json`](mi-swagger/POS106MI.json) |
| **`POS110MI`** | Budget version interface | 18 | `AddBudget, CalcTimeRate, CpyBudget, DltBudget, GenLine...` | [`POS110MI.json`](mi-swagger/POS110MI.json) |
| **`POS111MI`** | Project budget interface | 18 | `AddBudgetLine, CfmBudget, CpyBudgetLine, DltBudgetLine, GetBudgetLine...` | [`POS111MI.json`](mi-swagger/POS111MI.json) |
| **`POS120MI`** | Forecast version interface | 17 | `AddForecast, CpyForecast, DltForecast, GenLine, GetForecast...` | [`POS120MI.json`](mi-swagger/POS120MI.json) |
| **`POS121MI`** | Project forecast version lines interface | 17 | `AddForecastLine, CpyForecastLine, DltForecastLine, GetForecastLine, LstForecastLine...` | [`POS121MI.json`](mi-swagger/POS121MI.json) |
| **`POS124MI`** | Project information version | 15 | `AddProjectInfo, CpyProjectInfo, DltProjectInfo, GetProjectInfo, LstProjectInfos...` | [`POS124MI.json`](mi-swagger/POS124MI.json) |
| **`POS125MI`** | Project info value line | 15 | `DltInfoBlock, DltProjElement, GenLine, GetInfoValLine, LstInfoValLines...` | [`POS125MI.json`](mi-swagger/POS125MI.json) |
| **`POS130MI`** | Manage purchase proposals | 25 | `AddProposal, CpyProposal, CrtPlannedPO, DltProposal, GetMilestone...` | [`POS130MI.json`](mi-swagger/POS130MI.json) |
| **`POS145MI`** | Work order proposal per activity | 15 | `Add, CrtWorkRequest, Dlt, Get, Lst...` | [`POS145MI.json`](mi-swagger/POS145MI.json) |
| **`POS176MI`** | Project Partner interface | 15 | `AddPartner, CpyPartner, DltPartner, GetPartner, LstPartners...` | [`POS176MI.json`](mi-swagger/POS176MI.json) |
| **`POS210MI`** | Project order time planning versions interface | 11 | `AddSchedule, LstVersions, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS210MI.json`](mi-swagger/POS210MI.json) |
| **`POS211MI`** | Project order time planning lines interface | 22 | `CheckIn, CheckOut, ChgBasicData, ChgConnection1, DltConnection1...` | [`POS211MI.json`](mi-swagger/POS211MI.json) |
| **`POS212MI`** | Project order element - create connections interface | 15 | `AddConnection, DltConnection, GetConnection, LstConnections, LstPossibleConn...` | [`POS212MI.json`](mi-swagger/POS212MI.json) |
| **`POS285MI`** | Manage percentage of completion | 14 | `GetElementPOC, LstHistory, LstProjectPOC, LstValidElement, SetPctOfCompl...` | [`POS285MI.json`](mi-swagger/POS285MI.json) |
| **`POS291MI`** | Material budget interface | 15 | `AddItem, CpyMtrlBudLine, DelMtrlBudLine, GetMtrlBudLine, LstMtrlBudLines...` | [`POS291MI.json`](mi-swagger/POS291MI.json) |
| **`POS305MI`** | The program displays progress of a project | 10 | `GetPeriodicBdg, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS305MI.json`](mi-swagger/POS305MI.json) |
| **`POS306MI`** | Project element progress management | 11 | `GetElemProgress, LstElemProgress, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS306MI.json`](mi-swagger/POS306MI.json) |
| **`POS307MI`** | Project element progress per period management | 11 | `GetElemProgress, LstElemProgress, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS307MI.json`](mi-swagger/POS307MI.json) |
| **`POS330MI`** | Project element type interface | 15 | `AddCostingTempl, CpyCostingTempl, DltCostingTempl, GetCostingTempl, LstCostingTempl...` | [`POS330MI.json`](mi-swagger/POS330MI.json) |
| **`POS340MI`** | Costing version | 17 | `AddCosting, CpyCosting, DltCosting, GetCosting, LockCosting...` | [`POS340MI.json`](mi-swagger/POS340MI.json) |
| **`POS341MI`** | Costing version line | 16 | `AddCostingLine, CfmBudget, CpyCostingLine, DltCostingLine, GetCostingLine...` | [`POS341MI.json`](mi-swagger/POS341MI.json) |
| **`POS350MI`** | Project invoice interface | 19 | `GetCashDiscount, GetDelLine, GetInvHead, GetInvLine, GetInvoiceHd...` | [`POS350MI.json`](mi-swagger/POS350MI.json) |
| **`POS370MI`** | Project costing total management | 13 | `LstBdgContriMrg, LstBdgCostTotal, LstElmContriMrg, LstElmCostTotal, FpwVersion...` | [`POS370MI.json`](mi-swagger/POS370MI.json) |
| **`POS410MI`** | Management of project task Project Order | 15 | `AddTask, DelTask, GetTask, LstTask, LstTask1...` | [`POS410MI.json`](mi-swagger/POS410MI.json) |
| **`POS411MI`** | Project task elements | 16 | `AddLngTxt, AddProjTaskElem, CpyProjTaskElem, DltProjTaskElem, GetProjTaskElem...` | [`POS411MI.json`](mi-swagger/POS411MI.json) |
| **`POS480MI`** | Project invoice head interface | 17 | `AddInvHead, DltInvHead, GetInvHead, LstAllInvoices, LstInvHead...` | [`POS480MI.json`](mi-swagger/POS480MI.json) |
| **`POS481MI`** | Project invoice line interface | 14 | `AddInvLine, DltInvLine, GetInvLine, LstInvLine, UpdInvLine...` | [`POS481MI.json`](mi-swagger/POS481MI.json) |
| **`POS482MI`** | Budget item to invoice | 13 | `GetBudItemToInv, InvoiceAll, LstBudItemToInv, UpdBudItemToInv, FpwVersion...` | [`POS482MI.json`](mi-swagger/POS482MI.json) |
| **`POS483MI`** | Budget item to invoice | 15 | `AddProjectPrice, CpyProjectPrice, DltProjectPrice, GetProjectPrice, LstProjectPrice...` | [`POS483MI.json`](mi-swagger/POS483MI.json) |
| **`POS488MI`** | Project Logged transactions | 20 | `AddLoggedTran, ApproveLogTrans, CpyLoggedTran, DltLoggedTran, GetLoggedTran...` | [`POS488MI.json`](mi-swagger/POS488MI.json) |
| **`POS700MI`** | Time reporting interface | 21 | `AddTimeAcc, AddTimeAccLine, Approve, Delete, LstPerApproval...` | [`POS700MI.json`](mi-swagger/POS700MI.json) |
| **`PPS001MI`** | Purchase Order Interface | 25 | `AdviseAll, AdviseLine, CalculateLine, ConfirmAll, ConfirmLine...` | [`PPS001MI.json`](mi-swagger/PPS001MI.json) |
| **`PPS007MI`** | Supplier Discount Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS007MI.json`](mi-swagger/PPS007MI.json) |
| **`PPS008MI`** | Vendor Order Total Discount Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS008MI.json`](mi-swagger/PPS008MI.json) |
| **`PPS010MI`** | Supplier Transportation Lead Time Interface | 14 | `AddConnTranspLT, DelConnTranspLT, GetConnTranspLT, LstConnTranspLT, UpdConnTranspLT...` | [`PPS010MI.json`](mi-swagger/PPS010MI.json) |
| **`PPS018MI`** | Supplier Capacity and Capability Interface | 12 | `AddSupplierCap, SupplierCap, UpdSupplierCap, FpwVersion, GetCurrentUser...` | [`PPS018MI.json`](mi-swagger/PPS018MI.json) |
| **`PPS040MI`** | Connect Supplier and Item | 17 | `AddItemSupplier, AddItemSupplrQI, DelItemSupplier, GetItemSupplier, GetItemSupplrQI...` | [`PPS040MI.json`](mi-swagger/PPS040MI.json) |
| **`PPS042MI`** | Advanced Manufacturer Control | 15 | `AddManufacturer, CpyManufacturer, DltManufacturer, GetManufacturer, LstManufacturer...` | [`PPS042MI.json`](mi-swagger/PPS042MI.json) |
| **`PPS095MI`** | Purchase Order Type | 15 | `AddOrderType, CpyOrderType, DltOrderType, GetOrderType, LstOrderType...` | [`PPS095MI.json`](mi-swagger/PPS095MI.json) |
| **`PPS099MI`** | Purchase Organization Interface | 16 | `AddLngTxt, AddPurchaseOrg, CpyPurchaseOrg, DltPurchaseOrg, GetPurchaseOrg...` | [`PPS099MI.json`](mi-swagger/PPS099MI.json) |
| **`PPS100MI`** | Purchase Agreement Interface | 27 | `AddAgrHead, AddAgrLine, AddFreightElmt, AddFreightRate, AddStgPrice...` | [`PPS100MI.json`](mi-swagger/PPS100MI.json) |
| **`PPS106MI`** | Purchase Price And Discount Maintenance Interface | 10 | `GetPrice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS106MI.json`](mi-swagger/PPS106MI.json) |
| **`PPS108MI`** | Base Origin for Grower Agreement | 14 | `AddBaseOrigin, DltBaseOrigin, GetBaseOrigin, LstBaseOrigin, UpdBaseOrigin...` | [`PPS108MI.json`](mi-swagger/PPS108MI.json) |
| **`PPS110MI`** | Purchase Agreement Type | 15 | `AddPurAgrType, CpyPurAgrType, DltPurAgrType, GetPurAgrType, LstPurAgrType...` | [`PPS110MI.json`](mi-swagger/PPS110MI.json) |
| **`PPS112MI`** | Self-billing Agreement Interface | 15 | `AddSelfBillAgr, CpySelfBillAgr, DltSelfBillAgr, GetSelfBillAgr, LstSelfBillAgr...` | [`PPS112MI.json`](mi-swagger/PPS112MI.json) |
| **`PPS115MI`** | List alternative supplier | 10 | `LstAltSupplier, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS115MI.json`](mi-swagger/PPS115MI.json) |
| **`PPS127MI`** | Supplier Rebate Invoice Transaction | 10 | `LstClaimDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS127MI.json`](mi-swagger/PPS127MI.json) |
| **`PPS135MI`** | Consignment Invoice Period | 14 | `Add, Dlt, Get, Lst, Upd...` | [`PPS135MI.json`](mi-swagger/PPS135MI.json) |
| **`PPS136MI`** | Consignment Inv Period Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PPS136MI.json`](mi-swagger/PPS136MI.json) |
| **`PPS160MI`** | Material Requisition Request Interface | 28 | `AddMRAdr, AddMRReq, AddText, AttestMR, ChgAuth...` | [`PPS160MI.json`](mi-swagger/PPS160MI.json) |
| **`PPS170MI`** | Planned Purchase Order Information and Text Interface | 31 | `ApprovePOP, ClrInboxPOP, CrtPOP, DelPlannedPO, GeneratePONbr...` | [`PPS170MI.json`](mi-swagger/PPS170MI.json) |
| **`PPS194MI`** | Purchase Release History Interface | 14 | `AddLine, DltLine, GetLine, LstLines, UpdLine...` | [`PPS194MI.json`](mi-swagger/PPS194MI.json) |
| **`PPS195MI`** | Purchase Planning Level | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS195MI.json`](mi-swagger/PPS195MI.json) |
| **`PPS197MI`** | Priority Rule | 14 | `AddPriorityRule, DltPriorityRule, GetPriorityRule, LstPriorityRule, UpdPriorityRule...` | [`PPS197MI.json`](mi-swagger/PPS197MI.json) |
| **`PPS199MI`** | Purchase organization connected warehouse | 15 | `Add, Dlt, Generate, Get, Lst...` | [`PPS199MI.json`](mi-swagger/PPS199MI.json) |
| **`PPS200MI`** | Purchase Order Information and Text Interface | 36 | `AddLine, ApprovePO, DltLine, GetAddresses, GetDelAddress...` | [`PPS200MI.json`](mi-swagger/PPS200MI.json) |
| **`PPS205MI`** | Monitor Purchase Order | 14 | `AddMonitor, DltMonitor, GetMonitor, LstMonitors, UpdMonitor...` | [`PPS205MI.json`](mi-swagger/PPS205MI.json) |
| **`PPS215MI`** | Purchase order expenditures | 14 | `AddPOCharge, DltPOCharge, GetPOCharge, LstPOCharges, UpdPOCharge...` | [`PPS215MI.json`](mi-swagger/PPS215MI.json) |
| **`PPS235MI`** | Authorization Distribution Interface | 15 | `AddAuthorized, CpyAuthorized, DltAuthorized, GetAuthorized, LstAuthorized...` | [`PPS235MI.json`](mi-swagger/PPS235MI.json) |
| **`PPS280MI`** | Purchase Costing Element | 19 | `AddElement, AddElementValue, DltElementValue, GetElement, GetElementValue...` | [`PPS280MI.json`](mi-swagger/PPS280MI.json) |
| **`PPS285MI`** | Connect Purchase Costing Model And Elements | 22 | `AddModel, AddModelElement, DltModel, DltModelElement, GetModel...` | [`PPS285MI.json`](mi-swagger/PPS285MI.json) |
| **`PPS295MI`** | Simulate pur cost model | 10 | `LstPurCostSim, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS295MI.json`](mi-swagger/PPS295MI.json) |
| **`PPS310MI`** | PO Quality Inspection Interface | 21 | `CloseQIDelNote, GetQIDataPO, LstBalIDQI, LstBalIDQI2, LstQIDataPO...` | [`PPS310MI.json`](mi-swagger/PPS310MI.json) |
| **`PPS320MI`** | Purchase Order Put-Away | 20 | `ClosePADelNote, GetPADataPO, LstBalIDPA, LstPADataPO, LstPADataPack...` | [`PPS320MI.json`](mi-swagger/PPS320MI.json) |
| **`PPS330MI`** | PO Transaction Interface | 12 | `CheckDelPOTrans, DelPOTrans, ListPOTrans, FpwVersion, GetCurrentUser...` | [`PPS330MI.json`](mi-swagger/PPS330MI.json) |
| **`PPS345MI`** | Goods Receiving Method Interface | 15 | `Add, Copy, Del, Get, Lst...` | [`PPS345MI.json`](mi-swagger/PPS345MI.json) |
| **`PPS360MI`** | Delivery Note Interface | 37 | `AdviseHead, CloseItem, CloseItmPackage, ClosePackage, DltHead...` | [`PPS360MI.json`](mi-swagger/PPS360MI.json) |
| **`PPS364MI`** | Delivery Note Sublot Interface | 14 | `AddSublot, DltSublot, GetSublot, LstSublot, UpdSublot...` | [`PPS364MI.json`](mi-swagger/PPS364MI.json) |
| **`PPS370MI`** | Purchase Order Batch Entry | 27 | `AddAccString, AddAddress, AddCharge, AddHead, AddLine...` | [`PPS370MI.json`](mi-swagger/PPS370MI.json) |
| **`PPS385MI`** | Settlement Printing Model Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`PPS385MI.json`](mi-swagger/PPS385MI.json) |
| **`PPS386MI`** | Connect Test and Attribute Lines to Settlement Printing | 14 | `AddModelElement, DltModelElement, GetModelElement, LstModelElement, UpdModelElement...` | [`PPS386MI.json`](mi-swagger/PPS386MI.json) |
| **`PPS390MI`** | Return to Supplier Interface | 23 | `AddClaimHead, AddClaimLine, ChgClaimHead, ChgClaimLine, CreateRO...` | [`PPS390MI.json`](mi-swagger/PPS390MI.json) |
| **`PPS430MI`** | Supplier statistics settings | 15 | `AddSupplierStat, CpySupplierStat, DltSupplierStat, GetSupplierStat, LstSupplierStat...` | [`PPS430MI.json`](mi-swagger/PPS430MI.json) |
| **`PPS470MI`** | Supplier Rebate Agreement Model Interface | 23 | `AddHead, AddHeadLngTxt, AddLine, AddLineLngTxt, CpyModel...` | [`PPS470MI.json`](mi-swagger/PPS470MI.json) |
| **`PPS472MI`** | Supplier Rebate Agreement Type Interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS472MI.json`](mi-swagger/PPS472MI.json) |
| **`PPS473MI`** | Supplier rebate agreement table interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS473MI.json`](mi-swagger/PPS473MI.json) |
| **`PPS474MI`** | Supplier Rebate Agreement Selection Matrix | 15 | `Add, Cpy, Del, Get, Lst...` | [`PPS474MI.json`](mi-swagger/PPS474MI.json) |
| **`PPS475MI`** | Supplier Rebate Agreement Interface | 21 | `AddAgr, AddAgrLngTxt, AddAgrRates, CpyAgr, DltAgr...` | [`PPS475MI.json`](mi-swagger/PPS475MI.json) |
| **`PPS478MI`** | Manage Supplier Rebate Transactions | 11 | `GetSupRebTrans, LstTransbyAgrNm, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PPS478MI.json`](mi-swagger/PPS478MI.json) |
| **`PPS482MI`** | Supplier rebate agr grp management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS482MI.json`](mi-swagger/PPS482MI.json) |
| **`PPS500MI`** | Freight Purchase Transaction Interface | 14 | `AddFreightTrans, DltFreightTrans, GetFreightTrans, LstFreightTrans, UpdFreightTrans...` | [`PPS500MI.json`](mi-swagger/PPS500MI.json) |
| **`PPSEPRMI`** | M3 e-Procurement Interface | 15 | `AddEPRReq, AddEPRText, ChgPOAdr, ConfirmEPRLine, CrtEPRPO...` | [`PPSEPRMI.json`](mi-swagger/PPSEPRMI.json) |
| **`PPSSPPMI`** | Supplier Portal Interface | 14 | `GetSupLine, LstSupAddresses, LstSupHead, LstSupLine1, LstSupLine2...` | [`PPSSPPMI.json`](mi-swagger/PPSSPPMI.json) |
| **`PSWAPPMI`** | PSW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`PSWAPPMI.json`](mi-swagger/PSWAPPMI.json) |
| **`QMS001MI`** | Qualitative Value Interface | 14 | `AddQualitative, DltQualitative, GetQualitative, LstQualitative, UpdQualitative...` | [`QMS001MI.json`](mi-swagger/QMS001MI.json) |
| **`QMS002MI`** | Numeric Qualitative Interface | 14 | `AddNumericQual, DltNumericQual, GetNumericQual, LstNumericQual, UpdNumericQual...` | [`QMS002MI.json`](mi-swagger/QMS002MI.json) |
| **`QMS003MI`** | Numeric Qualitative Value Interface | 14 | `AddNumericQualV, DltNumericQualV, GetNumericQualV, LstNumericQualV, UpdNumericQualV...` | [`QMS003MI.json`](mi-swagger/QMS003MI.json) |
| **`QMS004MI`** | Test Classification Interface | 14 | `AddTestClass, DltTestClass, GetTestClass, LstTestClass, UpdTestClass...` | [`QMS004MI.json`](mi-swagger/QMS004MI.json) |
| **`QMS005MI`** | Sample Type | 14 | `AddSampleType, DltSampleType, GetSampleType, LstSampleType, UpdSampleType...` | [`QMS005MI.json`](mi-swagger/QMS005MI.json) |
| **`QMS006MI`** | Industry Standard Interface | 14 | `AddIndustryStd, DltIndustryStd, GetIndustryStd, LstIndustryStd, UpdIndustryStd...` | [`QMS006MI.json`](mi-swagger/QMS006MI.json) |
| **`QMS007MI`** | Quality Group | 14 | `AddQualityGroup, DltQualityGroup, GetQualityGroup, LstQualityGroup, UpdQualityGroup...` | [`QMS007MI.json`](mi-swagger/QMS007MI.json) |
| **`QMS008MI`** | Reason Code | 14 | `AddReasonCode, DltReasonCode, GetReasonCode, LstReasonCode, UpdReasonCode...` | [`QMS008MI.json`](mi-swagger/QMS008MI.json) |
| **`QMS009MI`** | Quality Plan Interface | 14 | `AddQualityPlan, DltQualityPlan, GetQualityPlan, LstQualityPlan, UpdQualityPlan...` | [`QMS009MI.json`](mi-swagger/QMS009MI.json) |
| **`QMS010MI`** | Sampling Plan | 14 | `AddSamplingPlan, DltSamplingPlan, GetSamplingPlan, LstSamplingPlan, UpdSamplingPlan...` | [`QMS010MI.json`](mi-swagger/QMS010MI.json) |
| **`QMS011MI`** | Laboratory Code Interface | 14 | `AddLabCode, DltLabCode, GetLabCode, LstLabCodes, UpdLabCode...` | [`QMS011MI.json`](mi-swagger/QMS011MI.json) |
| **`QMS012MI`** | Measurement Method Interface | 14 | `AddMeasrmtMethd, DltMeasrmtMethd, GetMeasrmtMethd, LstMeasrmtMethd, UpdMeasrmtMethd...` | [`QMS012MI.json`](mi-swagger/QMS012MI.json) |
| **`QMS013MI`** | Measurement Instrument Interface | 14 | `AddMsrmntInstr, DltMsrmntInstr, GetMsrmntInstr, LstMsrmntInstr, UpdMsrmntInstr...` | [`QMS013MI.json`](mi-swagger/QMS013MI.json) |
| **`QMS014MI`** | Reinspection Plan | 14 | `AddReinsPlan, DltReinsPlan, GetReinsPlan, LstReinsPlan, UpdReinsPlan...` | [`QMS014MI.json`](mi-swagger/QMS014MI.json) |
| **`QMS015MI`** | Item Warehouse Quality Plan | 14 | `AddItemWhQPlan, DltItemWhQPlan, GetItemWhQPlan, LstItemWhQPlan, UpdItemWhQPlan...` | [`QMS015MI.json`](mi-swagger/QMS015MI.json) |
| **`QMS100MI`** | Test Template Interface | 14 | `AddTstTemplate, DltTstTemplate, GetTstTemplate, LstTstTemplates, UpdTstTemplate...` | [`QMS100MI.json`](mi-swagger/QMS100MI.json) |
| **`QMS150MI`** | Set Interface | 14 | `AddSet, DltSet, GetSet, LstSet, UpdSet...` | [`QMS150MI.json`](mi-swagger/QMS150MI.json) |
| **`QMS200MI`** | Specification Interface | 18 | `AddSpec, DltSpec, GetSpec, LstSpec, LstSpecsByItem...` | [`QMS200MI.json`](mi-swagger/QMS200MI.json) |
| **`QMS201MI`** | Specification Test Interface | 14 | `AddSpecTest, DltSpecTest, GetSpecTest, LstSpecTest, UpdSpecTest...` | [`QMS201MI.json`](mi-swagger/QMS201MI.json) |
| **`QMS210MI`** | Specification Entities Interface | 14 | `AddSpecEntity, DltSpecEntity, GetSpecEntity, LstSpecEntity, UpdSpecEntity...` | [`QMS210MI.json`](mi-swagger/QMS210MI.json) |
| **`QMS290MI`** | QI Request for Grower Agreement Interface | 11 | `AddQIRequest, LstSpec, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`QMS290MI.json`](mi-swagger/QMS290MI.json) |
| **`QMS300MI`** | QI Request Interface | 24 | `AddQIRequest, DltQIRequest, GetQIRequest, GetQIRqByREPN, GetQIRqByRefOrd...` | [`QMS300MI.json`](mi-swagger/QMS300MI.json) |
| **`QMS301MI`** | QI Specification Interface | 14 | `AddSpecToQIReqt, DelSpecToQIReqt, GetSpecQIReqt, LstSpecQIReqt, UpdSpecToQIReqt...` | [`QMS301MI.json`](mi-swagger/QMS301MI.json) |
| **`QMS302MI`** | QI Request Specification Test | 14 | `AddTesttoQIReq, DltTestQIReq, GetTestQIReq, LstTestQIReq, UpdTesttoQIReq...` | [`QMS302MI.json`](mi-swagger/QMS302MI.json) |
| **`QMS400MI`** | QI Request Test Result | 18 | `AddResultSeq, CalcSettlement, DltTestResults, GetTestResults, LstTestResults...` | [`QMS400MI.json`](mi-swagger/QMS400MI.json) |
| **`QMS450MI`** | Copy QI Request Test Results Interface | 10 | `UpdTestResults, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QMS450MI.json`](mi-swagger/QMS450MI.json) |
| **`QMS500MI`** | Order Specification Interface | 14 | `AddOrderSpec, DltOrderSpec, GetOrderSpec, LstOrderSpec, UpdOrderSpec...` | [`QMS500MI.json`](mi-swagger/QMS500MI.json) |
| **`QMS501MI`** | Order Specification Test Interface | 14 | `AddOrderSpecTst, DltOrderSpecTst, GetOrderSpecTst, LstOrderSpecTst, UpdOrderSpecTst...` | [`QMS501MI.json`](mi-swagger/QMS501MI.json) |
| **`QMS600MI`** | Generate Certificate of Analysis | 10 | `GenerateCOA, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QMS600MI.json`](mi-swagger/QMS600MI.json) |
| **`QPS115MI`** | Sales Quotation Information | 12 | `GetQuoteInfo, LstQuoteInfo, UpdQuoteInfo, FpwVersion, GetCurrentUser...` | [`QPS115MI.json`](mi-swagger/QPS115MI.json) |
| **`QQS001MI`** | Tool management | 17 | `AddLngTxt, AddTool, CpyTool, DltTool, GetTool...` | [`QQS001MI.json`](mi-swagger/QQS001MI.json) |
| **`QQS005MI`** | Template item management | 17 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`QQS005MI.json`](mi-swagger/QQS005MI.json) |
| **`QQS011MI`** | Tool and connected template items management | 10 | `Lst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QQS011MI.json`](mi-swagger/QQS011MI.json) |
| **`QUS020MI`** | Quotation type | 13 | `AddQuoteType, DltQuoteType, GetQuoteType, LstQuoteType, FpwVersion...` | [`QUS020MI.json`](mi-swagger/QUS020MI.json) |
| **`QUS046MI`** | Product. Connect item | 13 | `AddItemConnect, DltItemConnect, GetItemConnect, LstItemConnect, FpwVersion...` | [`QUS046MI.json`](mi-swagger/QUS046MI.json) |
| **`QUS050MI`** | Quick add of attribute | 10 | `QuickAddAttrib, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS050MI.json`](mi-swagger/QUS050MI.json) |
| **`QUS060MI`** | Attribute Template | 14 | `AddAtte, DltAtte, GetAtte, LstAtte, UpdAtte...` | [`QUS060MI.json`](mi-swagger/QUS060MI.json) |
| **`QUS095MI`** | EQM Status handling | 15 | `ApproveHead, ApproveLine, ChangeQuoteSts, ReadyLine, RejectHead...` | [`QUS095MI.json`](mi-swagger/QUS095MI.json) |
| **`QUS100MI`** | Quotation head | 42 | `AddLineItem, AddQuote, AddQuoteHead, AddQuoteLine, AddTradeIn...` | [`QUS100MI.json`](mi-swagger/QUS100MI.json) |
| **`QUS102MI`** | Quotation line configuration interface | 15 | `AdjustQuote, Get, GetQuotePrice, Lst, Reset...` | [`QUS102MI.json`](mi-swagger/QUS102MI.json) |
| **`QUS103MI`** | Warranty interface | 14 | `AddWarranty, Dlt, Get, Lst, Upd...` | [`QUS103MI.json`](mi-swagger/QUS103MI.json) |
| **`QUS104MI`** | Service interface | 15 | `AddService, CreateQuoteMCO, Dlt, Get, Lst...` | [`QUS104MI.json`](mi-swagger/QUS104MI.json) |
| **`QUS105MI`** | Financing interface | 14 | `AddAgreement, Dlt, Get, Lst, Upd...` | [`QUS105MI.json`](mi-swagger/QUS105MI.json) |
| **`QUS106MI`** | Financing interface | 14 | `AddFinancing, Dlt, Get, Lst, Upd...` | [`QUS106MI.json`](mi-swagger/QUS106MI.json) |
| **`QUS107MI`** | Cash flow component interface | 15 | `AddPromotion, Dlt, Get, Lst, ReCalcPromotion...` | [`QUS107MI.json`](mi-swagger/QUS107MI.json) |
| **`QUS108MI`** | Miscellaneous interface | 15 | `AddMisc, CalcLineCharges, Dlt, Get, Lst...` | [`QUS108MI.json`](mi-swagger/QUS108MI.json) |
| **`QUS113MI`** | Add Warranty | 15 | `AddWarranty, ChgWarranty, DltWarranty, GetWarranty, LstWarrQuote...` | [`QUS113MI.json`](mi-swagger/QUS113MI.json) |
| **`QUS114MI`** | Add Service | 15 | `AddService, ChgService, DltService, GetService, LstServQuote...` | [`QUS114MI.json`](mi-swagger/QUS114MI.json) |
| **`QUS115MI`** | Add Agreement | 15 | `AddAgreement, ChgAgreement, DltAgreement, GetAgreement, LstAgrQuote...` | [`QUS115MI.json`](mi-swagger/QUS115MI.json) |
| **`QUS116MI`** | Add Financing | 15 | `AddFinancing, ChgFinancing, DltFinancing, GetFinancing, LstFinaQuote...` | [`QUS116MI.json`](mi-swagger/QUS116MI.json) |
| **`QUS117MI`** | Add Promotion | 15 | `AddPromotion, ChgPromotion, DltPromotion, GetPromotion, LstPromoQuote...` | [`QUS117MI.json`](mi-swagger/QUS117MI.json) |
| **`QUS118MI`** | Add Miscellaneous Costs | 15 | `AddMiscellaneou, ChgMiscellaneou, DltMiscellaneou, GetMiscellaneou, LstMiscQuote...` | [`QUS118MI.json`](mi-swagger/QUS118MI.json) |
| **`QUS119MI`** | Add Customer Variations | 14 | `AddCustomerVar, ChgCustomerVar, DltCustomerVar, GetCustomerVar, LstCustomerVar...` | [`QUS119MI.json`](mi-swagger/QUS119MI.json) |
| **`QUS120MI`** | Related quotation | 17 | `Add, ConnectRelQuot, DisconRelQuot, Dlt, Get...` | [`QUS120MI.json`](mi-swagger/QUS120MI.json) |
| **`QUS121MI`** | Grouped quotation | 17 | `Add, ConGroupQuot, DisconGroupQuot, Dlt, Get...` | [`QUS121MI.json`](mi-swagger/QUS121MI.json) |
| **`QUS122MI`** | Quotation. Adjust price interface | 15 | `AdjustQuote, Get, GetQuotePrice, Lst, Reset...` | [`QUS122MI.json`](mi-swagger/QUS122MI.json) |
| **`QUS123MI`** | Manage charges connected to and EQM head | 14 | `Add, Dlt, Get, Lst, Upd...` | [`QUS123MI.json`](mi-swagger/QUS123MI.json) |
| **`QUS150MI`** | Cash flow component interface | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`QUS150MI.json`](mi-swagger/QUS150MI.json) |
| **`QUS151MI`** | Salespersons connected to sales managers | 14 | `ConnSalesperson, Dlt, Get, Lst, LstByManager...` | [`QUS151MI.json`](mi-swagger/QUS151MI.json) |
| **`QUS160MI`** | Target Margin | 14 | `AddTargetMargin, ChgTargetMargin, DltTargetMargin, GetTargetMargin, LstTargetMargin...` | [`QUS160MI.json`](mi-swagger/QUS160MI.json) |
| **`QUS200MI`** | Equipment search interface | 10 | `SearchEquipment, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS200MI.json`](mi-swagger/QUS200MI.json) |
| **`QUS210MI`** | Item search interface | 10 | `SearchItem, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS210MI.json`](mi-swagger/QUS210MI.json) |
| **`QUS260MI`** | Quotation deal review interface | 10 | `LstDealReview, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS260MI.json`](mi-swagger/QUS260MI.json) |
| **`QUS300MI`** | Quotation fulfillment interface | 10 | `LstFulfillment, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS300MI.json`](mi-swagger/QUS300MI.json) |
| **`REFFLDMI`** | Reference field interface | 11 | `Get, LstValueMap, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`REFFLDMI.json`](mi-swagger/REFFLDMI.json) |
| **`RGS300MI`** | Financial Report Header | 21 | `Add, AddLngTxt, Cpy, CrtFile, CrtProposal...` | [`RGS300MI.json`](mi-swagger/RGS300MI.json) |
| **`RGS301MI`** | Financial Report Sections | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS301MI.json`](mi-swagger/RGS301MI.json) |
| **`RGS305MI`** | Financial Report Group Run Header | 19 | `Add, AddLngTxt, Cpy, CrtFiles, CrtProposals...` | [`RGS305MI.json`](mi-swagger/RGS305MI.json) |
| **`RGS306MI`** | Financial Report Group Run Details | 14 | `Add, Dlt, Get, Lst, Upd...` | [`RGS306MI.json`](mi-swagger/RGS306MI.json) |
| **`RGS307MI`** | Financial Report Purchase Invoice Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS307MI.json`](mi-swagger/RGS307MI.json) |
| **`RGS308MI`** | Financial Report Sales Invoice Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS308MI.json`](mi-swagger/RGS308MI.json) |
| **`RGS309MI`** | Financial Report Sales Invoice Charges | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS309MI.json`](mi-swagger/RGS309MI.json) |
| **`RGS310MI`** | Financial Report Payment Receipt Documents | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS310MI.json`](mi-swagger/RGS310MI.json) |
| **`RGS311MI`** | Financial Report Chart Of Accounts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS311MI.json`](mi-swagger/RGS311MI.json) |
| **`RGS312MI`** | Financial Report Customer Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS312MI.json`](mi-swagger/RGS312MI.json) |
| **`RGS313MI`** | Financial Report Supplier Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS313MI.json`](mi-swagger/RGS313MI.json) |
| **`RGS314MI`** | Financial Report Item Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS314MI.json`](mi-swagger/RGS314MI.json) |
| **`RGS315MI`** | Financial Report Unit Of Measure | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS315MI.json`](mi-swagger/RGS315MI.json) |
| **`RGS316MI`** | Financial Report VAT Codes And Percentages | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS316MI.json`](mi-swagger/RGS316MI.json) |
| **`RGS317MI`** | Financial Report Inventory Value | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS317MI.json`](mi-swagger/RGS317MI.json) |
| **`RGS318MI`** | Financial Report Fixed Assets | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS318MI.json`](mi-swagger/RGS318MI.json) |
| **`RGS319MI`** | Financial Report Bank Accounts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS319MI.json`](mi-swagger/RGS319MI.json) |
| **`RGS320MI`** | Financial Report General Ledger | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS320MI.json`](mi-swagger/RGS320MI.json) |
| **`RGS321MI`** | Financial Report Stock Transactions | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS321MI.json`](mi-swagger/RGS321MI.json) |
| **`RGS322MI`** | Financial Report Purchase Invoice Header | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS322MI.json`](mi-swagger/RGS322MI.json) |
| **`RGS323MI`** | Financial Report Payments | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS323MI.json`](mi-swagger/RGS323MI.json) |
| **`RGS324MI`** | Financial Report Sales Invoice Header | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS324MI.json`](mi-swagger/RGS324MI.json) |
| **`RGS325MI`** | Financial Report Withholding Tax Transactions | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS325MI.json`](mi-swagger/RGS325MI.json) |
| **`RGS326MI`** | Financial Report Fixed Asset History | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS326MI.json`](mi-swagger/RGS326MI.json) |
| **`RGS327MI`** | Financial Report Payment Receipts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS327MI.json`](mi-swagger/RGS327MI.json) |
| **`RGS900MI`** | Financial Report Header Specification | 17 | `Add, AddLngTxt, Cpy, CrtXmlStruct, Dlt...` | [`RGS900MI.json`](mi-swagger/RGS900MI.json) |
| **`RGS901MI`** | Financial Report Section Specification | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`RGS901MI.json`](mi-swagger/RGS901MI.json) |
| **`RGS905MI`** | Financial Report Group Header Specification | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`RGS905MI.json`](mi-swagger/RGS905MI.json) |
| **`RGS906MI`** | Financial Report Group Detail Specification | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`RGS906MI.json`](mi-swagger/RGS906MI.json) |
| **`RMS120MI`** | Future rate agreements | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`RMS120MI.json`](mi-swagger/RMS120MI.json) |
| **`RMS440MI`** | Tickler notes | 16 | `AddTickleNote, CopyTickleNote, DltTickleNote, GetTickleNote, LstTickleNote...` | [`RMS440MI.json`](mi-swagger/RMS440MI.json) |
| **`RPS040MI`** | Inventory Build-Up Interface | 15 | `Add, Clc, Dlt, Get, Lst...` | [`RPS040MI.json`](mi-swagger/RPS040MI.json) |
| **`RPS045MI`** | Planning Entity Interface | 22 | `Add, AddAttribute, AddItem, Del, DelItem...` | [`RPS045MI.json`](mi-swagger/RPS045MI.json) |
| **`RPS070MI`** | MRP Versions | 11 | `GetMrpVer, LstMrpVer, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RPS070MI.json`](mi-swagger/RPS070MI.json) |
| **`RPS080MI`** | Point Of Time Table | 10 | `LstPointOfTime, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS080MI.json`](mi-swagger/RPS080MI.json) |
| **`RPS090MI`** | Sourcing Rule Interface | 14 | `AddSourcingRule, DltSourcingRule, GetSourcingRule, LstSourcingRule, UpdSourcingRule...` | [`RPS090MI.json`](mi-swagger/RPS090MI.json) |
| **`RPS120MI`** | Demand Order Type | 10 | `GetDEOType, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS120MI.json`](mi-swagger/RPS120MI.json) |
| **`RPS170MI`** | Demand Order Interface | 17 | `GenDEOStat, GetDEORel, GetDEOStat, LstDEONo, LstDEORel...` | [`RPS170MI.json`](mi-swagger/RPS170MI.json) |
| **`RPS180MI`** | Planning Template | 14 | `AddPLT, ChangePLT, CopyPLT, DeletePLT, ListPLT...` | [`RPS180MI.json`](mi-swagger/RPS180MI.json) |
| **`RPS185MI`** | Planning Template Rules | 14 | `AddPLTRule, ChangePLTRule, CopyPLTRule, DeletePLTRule, ListPLTRule...` | [`RPS185MI.json`](mi-swagger/RPS185MI.json) |
| **`RPS195MI`** | Priority Rule Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`RPS195MI.json`](mi-swagger/RPS195MI.json) |
| **`RPS200MI`** | Manage Supply Chain Order | 10 | `ReGenSupChain, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS200MI.json`](mi-swagger/RPS200MI.json) |
| **`RPS300MI`** | Transfer Macro Orders To Fashion Planner | 19 | `GenDetSevMac, GetMacroHead, ListHeader, ListMaterials, ListOperations...` | [`RPS300MI.json`](mi-swagger/RPS300MI.json) |
| **`RPS675MI`** | Surplus Return | 19 | `AddSurplHead, AddSurplLine, DltSurplHead, DltSurplLine, GetSurplRec...` | [`RPS675MI.json`](mi-swagger/RPS675MI.json) |
| **`RPS680MI`** | Inventory Sharing | 16 | `GetItem, LstItems, LstItemsByFaci, LstItemsBySts, LstItemsBySup...` | [`RPS680MI.json`](mi-swagger/RPS680MI.json) |
| **`RSS110MI`** | Customer delivery schedule interface | 30 | `AddAddress, AddCumQuantity, AddDeliveryNote, AddHeader, AddInstruction...` | [`RSS110MI.json`](mi-swagger/RSS110MI.json) |
| **`SAS018MI`** | STR Rates:Contract Item Price | 14 | `AddServPrcList, DelServPrcList, GetServPrcList, LstServPrcList, UpdServPrcList...` | [`SAS018MI.json`](mi-swagger/SAS018MI.json) |
| **`SAS100MI`** | Api: Agreement Head | 13 | `DelServiceAgrmt, GetServiceAgrmt, LstServiceAgrmt, UpdServiceAgrmt, FpwVersion...` | [`SAS100MI.json`](mi-swagger/SAS100MI.json) |
| **`SAS110MI`** | Api: Agreement locations | 13 | `DelAgrmtCusSite, GetAgrmtCusSite, LstAgrmtCusSite, UpdAgrmtCusSite, FpwVersion...` | [`SAS110MI.json`](mi-swagger/SAS110MI.json) |
| **`SAS120MI`** | Api: Agreement Item Lines | 13 | `DelAgreementLn, GetAgreementLn, LstAgreementLn, UpdAgreementLn, FpwVersion...` | [`SAS120MI.json`](mi-swagger/SAS120MI.json) |
| **`SAS460MI`** | Manages the SARPIT table - Contract item per item | 14 | `AddContractItem, DltContractItem, GetContractItem, LstContractItem, UpdContractItem...` | [`SAS460MI.json`](mi-swagger/SAS460MI.json) |
| **`SES120MI`** | Field Audit Trail Access | 13 | `HasDeleted, LstAuditFields, LstDeleted, LstFieldInfo, FpwVersion...` | [`SES120MI.json`](mi-swagger/SES120MI.json) |
| **`SES300MI`** | Manages the Keystore in CKEYST table | 15 | `AddKeyStore, DltKeyStore, GetKeyStore, LstKeyStoreData, LstKeyStores...` | [`SES300MI.json`](mi-swagger/SES300MI.json) |
| **`SES400MI`** | Manages the Permission Setup | 16 | `Add, ChkRoleFnc, Dlt, Get, Lst...` | [`SES400MI.json`](mi-swagger/SES400MI.json) |
| **`SES403MI`** | Functions per Role | 17 | `Activate, Add, Cpy, Deactivate, Dlt...` | [`SES403MI.json`](mi-swagger/SES403MI.json) |
| **`SES405MI`** | Manages the MI Transaction Security Option | 13 | `CrtDefValues, Get, Lst, Upd, FpwVersion...` | [`SES405MI.json`](mi-swagger/SES405MI.json) |
| **`SES410MI`** | eSign Program Interface | 12 | `GetProgram, LstPrograms, UpdProgram, FpwVersion, GetCurrentUser...` | [`SES410MI.json`](mi-swagger/SES410MI.json) |
| **`SES411MI`** | Manages the Object to use E-Signature | 14 | `AddObject, DltObject, GetObject, LstObjects, UpdObject...` | [`SES411MI.json`](mi-swagger/SES411MI.json) |
| **`SES414MI`** | E-Signature object group | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`SES414MI.json`](mi-swagger/SES414MI.json) |
| **`SES415MI`** | Manages the Signatory in E-Signature process | 14 | `AddSignatory, DltSignatory, GetSignatory, LstSignatories, UpdSignatory...` | [`SES415MI.json`](mi-swagger/SES415MI.json) |
| **`SES440MI`** | Manages the E-Signature Records | 11 | `GetEsignRecord, LstEsignRecords, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES440MI.json`](mi-swagger/SES440MI.json) |
| **`SES450MI`** | Manage e-signature | 14 | `GetEsignature, LstBySignatory, LstEsignatures, PrcEsignature, RejEsignature...` | [`SES450MI.json`](mi-swagger/SES450MI.json) |
| **`SES490MI`** | Manages the E-Sign Error Log | 11 | `GetErrorLog, LstErrorLogs, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES490MI.json`](mi-swagger/SES490MI.json) |
| **`SES510MI`** | Security Audit Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES510MI.json`](mi-swagger/SES510MI.json) |
| **`SHS010MI`** | Manage the job schedule entries | 14 | `DltExternalJob, ExecuteJob, GetExternalJob, LstExtJobs, SchedXM3Job...` | [`SHS010MI.json`](mi-swagger/SHS010MI.json) |
| **`SOS001MI`** | Item Complement | 14 | `AddItem, DltItem, GetItem, LstItem, UpdItem...` | [`SOS001MI.json`](mi-swagger/SOS001MI.json) |
| **`SOS050MI`** | Brands | 14 | `Add, Chg, Del, Get, Lst...` | [`SOS050MI.json`](mi-swagger/SOS050MI.json) |
| **`SOS100MI`** | Service order interface | 55 | `AddIndItem, AddLine, AddMtrReading, ChgAssignm, ChgAssignmSts...` | [`SOS100MI.json`](mi-swagger/SOS100MI.json) |
| **`SOS200MI`** | Service order inquiry interface | 40 | `AddIndItemText, AddSOText, GetServInfo, LstAddnlSts, LstAgrText...` | [`SOS200MI.json`](mi-swagger/SOS200MI.json) |
| **`SOS300MI`** | Batch order entry Service order | 21 | `AddSOLine, AddServBatchAdr, AddServBatchLin, AddServBatchTxt, ChgFixedPrAssig...` | [`SOS300MI.json`](mi-swagger/SOS300MI.json) |
| **`SOS350MI`** | Service order invoice interface | 24 | `GetCashDiscount, GetDelHead, GetDelLine, GetInvHead, GetInvLine...` | [`SOS350MI.json`](mi-swagger/SOS350MI.json) |
| **`SOS400MI`** | Service order inquiry interface | 24 | `AddAssignStsHis, DelAssignStsHis, LstAgrLocation, LstAgrMtrPrDet, LstAgrMtrPrHd...` | [`SOS400MI.json`](mi-swagger/SOS400MI.json) |
| **`SOS408MI`** | Service item identity | 14 | `Add, Del, Get, Lst, Upd...` | [`SOS408MI.json`](mi-swagger/SOS408MI.json) |
| **`SOS500MI`** | Service order entry interface | 13 | `GetFixedPrAssig, LstAssignSOText, LstAssignmPerSO, LstFixedPrAssig, FpwVersion...` | [`SOS500MI.json`](mi-swagger/SOS500MI.json) |
| **`SOS550MI`** | List and Get Transactions | 11 | `GetRntlEquipmnt, LstRntlEquipmnt, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SOS550MI.json`](mi-swagger/SOS550MI.json) |
| **`SOS600MI`** | Service order entry - Charges | 13 | `GetAssignmChrg, GetSOLineChrg, LstAssignmChrg, LstSOLineChrg, FpwVersion...` | [`SOS600MI.json`](mi-swagger/SOS600MI.json) |
| **`SOS800MI`** | Discount Model Interface | 15 | `AddDiscModel, CpyDiscModel, DltDiscModel, GetDiscModel, LstDiscModels...` | [`SOS800MI.json`](mi-swagger/SOS800MI.json) |
| **`SOS805MI`** | Discount Number Interface | 15 | `AddDiscNumber, CpyDiscNumber, DltDiscNumber, GetDiscNumber, LstDiscNumbers...` | [`SOS805MI.json`](mi-swagger/SOS805MI.json) |
| **`SOS811MI`** | Discount Matrix Interface | 15 | `AddDiscMatrix, CpyDiscMatrix, DltDiscMatrix, GetDiscMatrix, LstDiscMatrixs...` | [`SOS811MI.json`](mi-swagger/SOS811MI.json) |
| **`SPS020MI`** | Supply Chain Node Interface | 11 | `SndCoordinates, UpdCoordinates, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SPS020MI.json`](mi-swagger/SPS020MI.json) |
| **`SPS100MI`** | SCP Versions Interface | 11 | `Select, SelectYOP, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SPS100MI.json`](mi-swagger/SPS100MI.json) |
| **`SPS101MI`** | SCP Basic Data Interface | 24 | `BuildSelection, DeleteMOP, DeletePOP, DisAndImpINV, DisAndImpMDS...` | [`SPS101MI.json`](mi-swagger/SPS101MI.json) |
| **`SPS300MI`** | Manages SCP business area | 23 | `AddBSARWhs, AddBusinessArea, AddFieldSel, DelBSARWhs, DelBusinessArea...` | [`SPS300MI.json`](mi-swagger/SPS300MI.json) |
| **`STS012MI`** | Price list table interface | 16 | `AddPriceLstMtrx, DltPriceLstMtrx, GetPriceLstMtrx, LstObjConTable, LstPriceLstMtrx...` | [`STS012MI.json`](mi-swagger/STS012MI.json) |
| **`STS017MI`** | Rental Price List | 14 | `AddPrcLstHead, DelPriceList, GetPriceList, LstPriceLstHead, UpdPriceList...` | [`STS017MI.json`](mi-swagger/STS017MI.json) |
| **`STS020MI`** | Agreement order type | 15 | `AddAgrOrderType, CpyAgrOrderType, DltAgrOrderType, GetAgrOrderType, LstAgrOrderType...` | [`STS020MI.json`](mi-swagger/STS020MI.json) |
| **`STS030MI`** | Rental depot | 14 | `AddDepot, DltDepot, GetDepot, LstDepots, UpdDepot...` | [`STS030MI.json`](mi-swagger/STS030MI.json) |
| **`STS040MI`** | Cost and Revenue Allocation rules | 14 | `AddAllocRules, DelAllocRules, GetAllocRules, LstAllocRules, UpdAllocRules...` | [`STS040MI.json`](mi-swagger/STS040MI.json) |
| **`STS045MI`** | Generic item management | 14 | `AddGenericItem, CpyGenericItem, DltGenericItem, GetGenericItem, LstGenericItems...` | [`STS045MI.json`](mi-swagger/STS045MI.json) |
| **`STS046MI`** | Generic Item. Connect Equipment - STR | 16 | `AddGenItem, DelGenItem, GetGenItem, LstGenItemWhs, RevAgrToGenItem...` | [`STS046MI.json`](mi-swagger/STS046MI.json) |
| **`STS060MI`** | Reason code interface | 14 | `AddReasonCode, DelReasonCode, GetReasonCode, LstReasonCode, UpdReasonCode...` | [`STS060MI.json`](mi-swagger/STS060MI.json) |
| **`STS100MI`** | Agreement Head - Short term rental | 20 | `AddRentalAgree, DltRentalAgree, GetRentalAgree, LstAgreeByAOTP, LstAgreeByCUOR...` | [`STS100MI.json`](mi-swagger/STS100MI.json) |
| **`STS101MI`** | API: Short term rental agreement Line | 15 | `AddRentalLine, DltRentalLine, GetRentalLine, LstRentActivity, LstRentalLine...` | [`STS101MI.json`](mi-swagger/STS101MI.json) |
| **`STS103MI`** | Additional charges (STR) | 16 | `AddAddChrg, ChgAddChrg, ChkInAddChrg, ChkOutAddChrg, DelAddChrg...` | [`STS103MI.json`](mi-swagger/STS103MI.json) |
| **`STS105MI`** | Agreement Head. Simulate Totals | 10 | `SimulateTotals, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS105MI.json`](mi-swagger/STS105MI.json) |
| **`STS106MI`** | Calculate Leasing | 12 | `AddCalcRPO, DelRPO, UpdCalcRPO, FpwVersion, GetCurrentUser...` | [`STS106MI.json`](mi-swagger/STS106MI.json) |
| **`STS107MI`** | Simulate Rental Price | 10 | `SimRentalPrc, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS107MI.json`](mi-swagger/STS107MI.json) |
| **`STS109MI`** | STR Agreement - Create | 10 | `CrtRentalAgrmnt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS109MI.json`](mi-swagger/STS109MI.json) |
| **`STS110MI`** | STR Agreement - Deposit | 14 | `AddDeposit, ChgDeposit, DelDeposit, GetDeposit, LstDeposit...` | [`STS110MI.json`](mi-swagger/STS110MI.json) |
| **`STS112MI`** | Rental Agreement- invoice in advance | 14 | `AddAdvanceInv, DelAdvanceInv, GetAdvanceInv, LstAdvanceInv, UpdAdvanceInv...` | [`STS112MI.json`](mi-swagger/STS112MI.json) |
| **`STS117MI`** | Rental agreement line charges | 14 | `AddLineChrg, ChgLineChrg, DelLineChrg, GetLineChrg, LstLineChrg...` | [`STS117MI.json`](mi-swagger/STS117MI.json) |
| **`STS118MI`** | Rental Agr Stand down period | 14 | `Add, Del, Get, Lst, Upd...` | [`STS118MI.json`](mi-swagger/STS118MI.json) |
| **`STS119MI`** | STR Agreement - Contact person | 13 | `Add, Del, Get, Lst, FpwVersion...` | [`STS119MI.json`](mi-swagger/STS119MI.json) |
| **`STS120MI`** | Price list lines (STR) | 15 | `AddPrcLstLines, DelPrcLstLines, GetPrcLstLines, GetPrcLstLines2, LstPrclistLines...` | [`STS120MI.json`](mi-swagger/STS120MI.json) |
| **`STS121MI`** | Rental meter price schedule | 10 | `UpdMeterPrice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS121MI.json`](mi-swagger/STS121MI.json) |
| **`STS122MI`** | Rental Price List Description Language | 14 | `AddNamePerLng, DelNamePerLng, GetNamePerLng, LstNamePerLng, UpdNamePerLng...` | [`STS122MI.json`](mi-swagger/STS122MI.json) |
| **`STS123MI`** | Rates: Stepped Price | 14 | `AddSteppedPrice, DelSteppedPrice, GetSteppedPrice, LstSteppedPrice, UpdSteppedPrice...` | [`STS123MI.json`](mi-swagger/STS123MI.json) |
| **`STS124MI`** | STR Rates, Meter Prices | 15 | `AddMeterPrice, DelMeterPrice, GetMeterPrice, GetMeterPrice2, LstMeterPrice...` | [`STS124MI.json`](mi-swagger/STS124MI.json) |
| **`STS125MI`** | STR Rates: Enter Package Price | 14 | `AddPckgRate, DelPckgRate, GetPckgRate, LstPckgRate, UpdPckgRate...` | [`STS125MI.json`](mi-swagger/STS125MI.json) |
| **`STS127MI`** | Service price management | 14 | `AddServPrice, DltServPrice, GetServPrice, LstServPrices, UpdServPrice...` | [`STS127MI.json`](mi-swagger/STS127MI.json) |
| **`STS128MI`** | Block code on rental agreement | 12 | `GetAgreeStop, LstAgreeStop, UpdAgreeStop, FpwVersion, GetCurrentUser...` | [`STS128MI.json`](mi-swagger/STS128MI.json) |
| **`STS129MI`** | Rental Rates, Meters Price | 14 | `AddMeterPrice, DelMeterPrice, GetMeterPrice, LstMeterPrice, UpdMeterPrice...` | [`STS129MI.json`](mi-swagger/STS129MI.json) |
| **`STS136MI`** | Cash flow component interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`STS136MI.json`](mi-swagger/STS136MI.json) |
| **`STS137MI`** | Cash flow price list interface | 17 | `Add, Dlt, Get, LstPerAgreem, LstPerComp...` | [`STS137MI.json`](mi-swagger/STS137MI.json) |
| **`STS138MI`** | Cash flow curve interface | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`STS138MI.json`](mi-swagger/STS138MI.json) |
| **`STS140MI`** | Rental Logistic Toolbox | 17 | `ConfirmIssues, DispatchTech, GetToolboxStat, LstByStatus, ReturnTech...` | [`STS140MI.json`](mi-swagger/STS140MI.json) |
| **`STS177MI`** | Change Customer Site | 10 | `UpdCustSite, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS177MI.json`](mi-swagger/STS177MI.json) |
| **`STS201MI`** | Short term rental agreement Line | 21 | `AddRentalLine, CrtExchange, DltRentalLine, DownUpRent, GetRentalLine...` | [`STS201MI.json`](mi-swagger/STS201MI.json) |
| **`STS205MI`** | Rental sales line stock return interface | 10 | `Create, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS205MI.json`](mi-swagger/STS205MI.json) |
| **`STS225MI`** | Rental partial termination | 13 | `DltPartialTerm, GetPartialTerm, LstPartialTerms, UpdPartialTerm, FpwVersion...` | [`STS225MI.json`](mi-swagger/STS225MI.json) |
| **`STS300MI`** | Equipment search interface | 11 | `AggregSearch, DetailedSearch, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`STS300MI.json`](mi-swagger/STS300MI.json) |
| **`STS350MI`** | Short Term Rental invoice interface | 14 | `GetInvHead, ListInvHistLine, LslInvHistDet, LstInvHistPrItm, LstInvPerPayer...` | [`STS350MI.json`](mi-swagger/STS350MI.json) |
| **`STS455MI`** | STR Package Structure Header | 14 | `Add, Del, Get, Lst, Upd...` | [`STS455MI.json`](mi-swagger/STS455MI.json) |
| **`STS456MI`** | STR Package Structure Lines | 14 | `Add, Del, Get, Lst, Upd...` | [`STS456MI.json`](mi-swagger/STS456MI.json) |
| **`STS465MI`** | Rental Alias number | 14 | `AddAlias, DltAlias, GetAlias, LstAlias, UpdAlias...` | [`STS465MI.json`](mi-swagger/STS465MI.json) |
| **`STS490MI`** | Short term rental transactions | 12 | `LstByFleetNo, LstBySerialNo, LstByWarehouse, FpwVersion, GetCurrentUser...` | [`STS490MI.json`](mi-swagger/STS490MI.json) |
| **`STS495MI`** | Rental planning board interface | 13 | `LstAvailGeneric, LstAvailability, LstEquipment, LstGenericItem, FpwVersion...` | [`STS495MI.json`](mi-swagger/STS495MI.json) |
| **`STS590MI`** | Management of additional charges connected to items | 14 | `AddAdChargItem, DltAdChargItem, GetAdChargItem, LstAdChargItems, UpdAdChargItem...` | [`STS590MI.json`](mi-swagger/STS590MI.json) |
| **`STS610MI`** | Print Rental Agr | 10 | `PrintRentalAgr, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS610MI.json`](mi-swagger/STS610MI.json) |
| **`STS675MI`** | Fleet value | 12 | `GenFleetValue, GetFleetValue, LstFleetValues, FpwVersion, GetCurrentUser...` | [`STS675MI.json`](mi-swagger/STS675MI.json) |
| **`STS940MI`** | Rental Counter Settings | 12 | `GetSetting, LstAgrOrdTypes, SetSetting, FpwVersion, GetCurrentUser...` | [`STS940MI.json`](mi-swagger/STS940MI.json) |
| **`TAS010MI`** | Time accounting pricelist head | 15 | `AddPrcLstHead, CpyPrcLstHead, DltPrcLstHead, GetPrcLstHead, LstPrcLstHead...` | [`TAS010MI.json`](mi-swagger/TAS010MI.json) |
| **`TAS011MI`** | Time accounting pricelist line | 15 | `AddPrcLstLine, CpyPrcLstLine, DltPrcLstLine, GetPrcLstLine, LstPrcLstLines...` | [`TAS011MI.json`](mi-swagger/TAS011MI.json) |
| **`TAS100MI`** | Time accounting head | 16 | `AddTimeAcctHead, CompTimeReport, DltTimeAcctHead, GetTimeAcctHead, LstTimeAcctHead...` | [`TAS100MI.json`](mi-swagger/TAS100MI.json) |
| **`TAS101MI`** | Time reports interface | 16 | `AddExpense, AddTimeTranWeek, AddTimeTrans, DltTimeTrans, GetTimeTrans...` | [`TAS101MI.json`](mi-swagger/TAS101MI.json) |
| **`TAS110MI`** | Approve time reports | 14 | `ApproveReport, GetTimeReport, LstPerApprover, LstPerEmployee, RejectReport...` | [`TAS110MI.json`](mi-swagger/TAS110MI.json) |
| **`TAS111MI`** | Approve time repot lines | 16 | `ApproveAllLines, GetLine, HoldLine, LstLinesEmpl, LstLinesProj...` | [`TAS111MI.json`](mi-swagger/TAS111MI.json) |
| **`TAS115MI`** | Manage authorization of time reports | 16 | `ApproveAllLines, ApproveLine, GetLine, HoldLine, LstLines...` | [`TAS115MI.json`](mi-swagger/TAS115MI.json) |
| **`TAS120MI`** | Transfer time transactions | 15 | `CreateAndUpdate, CreateProposal, DeleteProposal, GetSelection, LstProposalRec...` | [`TAS120MI.json`](mi-swagger/TAS120MI.json) |
| **`TEMPLATEMI`** | MI Component template | 14 | `Add, Delete, Get, List, Update...` | [`TEMPLATEMI.json`](mi-swagger/TEMPLATEMI.json) |
| **`TMS006MI`** | Time and Attendance | 35 | `ChgCostCenter, DelTimeTrans, FixedTime, GetEmpStat, In...` | [`TMS006MI.json`](mi-swagger/TMS006MI.json) |
| **`TMS200MI`** | Absence stamps | 15 | `AddAbsence, CpyAbsence, DltAbsence, GetAbsence, LstAbsence...` | [`TMS200MI.json`](mi-swagger/TMS200MI.json) |
| **`TMS800MI`** | Payroll Transaction | 12 | `DltPayTrans, LstCalTrans, LstPayTrans, FpwVersion, GetCurrentUser...` | [`TMS800MI.json`](mi-swagger/TMS800MI.json) |
| **`TXAT30MI`** | Austrian Intrastat Declarations | 11 | `GetHead, LstLine, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXAT30MI.json`](mi-swagger/TXAT30MI.json) |
| **`TXBR10MI`** | CBS/IBS Classification Code | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR10MI.json`](mi-swagger/TXBR10MI.json) |
| **`TXBR11MI`** | IS classification code management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR11MI.json`](mi-swagger/TXBR11MI.json) |
| **`TXBR12MI`** | CBS/IBS Tax Rate management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR12MI.json`](mi-swagger/TXBR12MI.json) |
| **`TXBR13MI`** | Classification code priority management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR13MI.json`](mi-swagger/TXBR13MI.json) |
| **`TXBR14MI`** | Classification code selection management | 16 | `Add, Cpy, Dlt, Get, GetRplClssifCd...` | [`TXBR14MI.json`](mi-swagger/TXBR14MI.json) |
| **`TXIT40MI`** | Electronic VAT report - White List | 12 | `GetVATHead, LstVATDetailsAg, LstVATDetailsAl, FpwVersion, GetCurrentUser...` | [`TXIT40MI.json`](mi-swagger/TXIT40MI.json) |
| **`TXS003MI`** | VAT Registration Number Validation Policy | 15 | `AddVATRegNoVali, CpyVATRegNoVali, DltVATRegNoVali, GetVATRegNoVali, LstVATRegNoVali...` | [`TXS003MI.json`](mi-swagger/TXS003MI.json) |
| **`TXS005MI`** | VAT report template | 43 | `AddElReportTemp, AddTempColumSel, AddTempColumn, AddTempLine, AddTempLineSel...` | [`TXS005MI.json`](mi-swagger/TXS005MI.json) |
| **`TXS011MI`** | VAT Registration Number Validation Policy - Local Exception | 15 | `AddValidPolicy, CpyValidPolicy, DltValidPolicy, GetValidPolicy, LstValidPolicy...` | [`TXS011MI.json`](mi-swagger/TXS011MI.json) |
| **`TXS030MI`** | Fiscal Representative | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS030MI.json`](mi-swagger/TXS030MI.json) |
| **`TXS031MI`** | VAT rate rule interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS031MI.json`](mi-swagger/TXS031MI.json) |
| **`TXS035MI`** | EU Sales/Purchase Additional Field | 15 | `AddAddField, CpyAddField, DltAddField, GetAddField, LstBaseCountry...` | [`TXS035MI.json`](mi-swagger/TXS035MI.json) |
| **`TXS040MI`** | VAT registration number for supplier cash purchase | 10 | `GetVATRegNoInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`TXS040MI.json`](mi-swagger/TXS040MI.json) |
| **`TXS070MI`** | VAT Registration Number | 17 | `AddVATRegNo, CpyVATRegNo, DltVATRegNo, GetVATRegNo, LstVATRegNo...` | [`TXS070MI.json`](mi-swagger/TXS070MI.json) |
| **`TXS071MI`** | VAT Registration Number Validation Status | 14 | `AddVATRegStatus, DltVATRegStatus, GetVATRegStatus, LstVATRegStatus, UpdVATRegStatus...` | [`TXS071MI.json`](mi-swagger/TXS071MI.json) |
| **`TXS072MI`** | VAT Registration Number Validation Log | 11 | `GetVATRegNoLog, LstVATRegNoLog, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS072MI.json`](mi-swagger/TXS072MI.json) |
| **`TXS080MI`** | Item Related Tax ID | 15 | `AddID, CpyID, DltID, GetID, LstID...` | [`TXS080MI.json`](mi-swagger/TXS080MI.json) |
| **`TXS081MI`** | Item Related Tax ID Lines | 15 | `AddLine, CpyLine, DltLine, GetLine, LstLine...` | [`TXS081MI.json`](mi-swagger/TXS081MI.json) |
| **`TXS082MI`** | Item Related Tax ID Column Specification | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS082MI.json`](mi-swagger/TXS082MI.json) |
| **`TXS083MI`** | Item Related Tax ID Limit Connection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS083MI.json`](mi-swagger/TXS083MI.json) |
| **`TXS085MI`** | Item Related Tax ID Item Connection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS085MI.json`](mi-swagger/TXS085MI.json) |
| **`TXS090MI`** | Tax Invoice Settings | 15 | `AddTaxInvSet, CpyTaxInvSet, DelTaxInvSet, GetTaxInvSet, LstTaxInvSet...` | [`TXS090MI.json`](mi-swagger/TXS090MI.json) |
| **`TXS091MI`** | Tax Invoice Settings - Customer Exemptions | 15 | `AddTaxInvCusEx, CpyTaxInvCusEx, DelTaxInvCusEx, GetTaxInvCusEx, LstTaxInvCusEx...` | [`TXS091MI.json`](mi-swagger/TXS091MI.json) |
| **`TXS095MI`** | Tax Invoice Agent Settings | 15 | `AddTaxAgentSet, CpyTaxAgentSet, DelTaxAgentSet, GetTaxAgentSet, LstTaxAgentSet...` | [`TXS095MI.json`](mi-swagger/TXS095MI.json) |
| **`TXS100MI`** | Electronic VAT report | 19 | `GetHeadInfo, GetVATRunID, LstVATDetails, LstVATInvPerLn, LstVATInvoice...` | [`TXS100MI.json`](mi-swagger/TXS100MI.json) |
| **`TXS130MI`** | EU Sales/Purchase Proposal | 12 | `GetHeadInfo, LstAmountEUSale, LstInvEUSale, FpwVersion, GetCurrentUser...` | [`TXS130MI.json`](mi-swagger/TXS130MI.json) |
| **`TXS140MI`** | Annual VAT Report | 13 | `GetHeadInfo, LstCusSupVATLin, LstTotalPerInv, LstVATRegNoLine, FpwVersion...` | [`TXS140MI.json`](mi-swagger/TXS140MI.json) |
| **`TXS170MI`** | Item Related Tax Report Header | 14 | `Dlt, Get, Lst, RestartProposal, Upd...` | [`TXS170MI.json`](mi-swagger/TXS170MI.json) |
| **`TXS171MI`** | Item Related Tax Report Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS171MI.json`](mi-swagger/TXS171MI.json) |
| **`TXS172MI`** | Item Related Tax Report Details | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS172MI.json`](mi-swagger/TXS172MI.json) |
| **`TXS174MI`** | Item Related Tax Report Creation | 10 | `CreateProposals, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`TXS174MI.json`](mi-swagger/TXS174MI.json) |
| **`TXS175MI`** | Item Related Tax Transaction Creation | 11 | `Add, AddSingleItem, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS175MI.json`](mi-swagger/TXS175MI.json) |
| **`TXS300MI`** | Intrastat Declarations | 14 | `GetHead, GetHeadAddress, LstLine, SearchIntTrans, UpdSuppression...` | [`TXS300MI.json`](mi-swagger/TXS300MI.json) |
| **`TXS905MI`** | AR Tax Invoice | 16 | `Approve, Confirm, GetDefTaxInv, GetPrelTaxInv, LstDefTaxInv...` | [`TXS905MI.json`](mi-swagger/TXS905MI.json) |
| **`TXS910MI`** | AP Tax Invoice | 12 | `Add, Get, List, FpwVersion, GetCurrentUser...` | [`TXS910MI.json`](mi-swagger/TXS910MI.json) |
| **`XBR001MI`** | Basic data information for Brazil | 35 | `GetCFOP, GetCOAddress, GetCountry, GetCustAddress, GetCustInvLine...` | [`XBR001MI.json`](mi-swagger/XBR001MI.json) |
| **`XFI100MI`** | Get invoice reference in Finland | 10 | `GetReference, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`XFI100MI.json`](mi-swagger/XFI100MI.json) |
