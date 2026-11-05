# Infor M3 MI API Swagger Catalog

This catalog indexes all **1311 Infor M3 Machine Interface (MI) APIs** available in the `m3-api/mi-swagger/` directory.
AI agents and developers can search this table to find the appropriate MI program, transaction names, and corresponding Swagger JSON definitions.

## Quick Search Table

| Program | Description | Transactions Count | Sample Transactions | Swagger File |
| :--- | :--- | :--- | :--- | :--- |
| **`AAS320MI`** | Claim/Liability Reports | 12 | `GetClaimHead, LstClaimDet, LstClaimLin, FpwVersion, GetCurrentUser...` | [`AAS320MI.json`](AAS320MI.json) |
| **`AAS330MI`** | Electronic bank report interface | 9 | `FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel, GetMIBuild...` | [`AAS330MI.json`](AAS330MI.json) |
| **`AAS333MI`** | Electronic Bank Report Transactions | 10 | `LstBasicData, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AAS333MI.json`](AAS333MI.json) |
| **`AAS350MI`** | Api : General Ledger Information | 11 | `LstVoucherHeads, LstVoucherLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AAS350MI.json`](AAS350MI.json) |
| **`AAS390MI`** | Online Invoicing Transaction | 15 | `Add, Dlt, Get, Lst, UpdInvStatus...` | [`AAS390MI.json`](AAS390MI.json) |
| **`AAS640MI`** | Api : Electronic chart of account | 12 | `DelHeader, GetHeader, UpdStatus, FpwVersion, GetCurrentUser...` | [`AAS640MI.json`](AAS640MI.json) |
| **`AAS910MI`** | Electronic Bank Reporting Reason Codes | 13 | `AddBasicData, DltBasicData, GetBasicData, UpdBasicData, FpwVersion...` | [`AAS910MI.json`](AAS910MI.json) |
| **`ABS100MI`** | Bank statement | 21 | `AddStatmtAdditi, AddStatmtDetail, AddStatmtHead, AddStatmtLine, GetBankIdent...` | [`ABS100MI.json`](ABS100MI.json) |
| **`ABS180MI`** | Bank statement reconciliation header | 22 | `Add, AddLngTxt, AutoReconcile, Dlt, Get...` | [`ABS180MI.json`](ABS180MI.json) |
| **`ABS181MI`** | Bank stmn reconc line interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`ABS181MI.json`](ABS181MI.json) |
| **`ABS182MI`** | Bank statement reconc, reconciled transaction interface | 12 | `Get, LstReconcLines, ReverseReconc, FpwVersion, GetCurrentUser...` | [`ABS182MI.json`](ABS182MI.json) |
| **`ABS185MI`** | Bnk stmn recon, not reconciled trans interface | 17 | `Get, GetSelectionId, LstBnkStmnLines, LstGenLedger, ReconcBySelId...` | [`ABS185MI.json`](ABS185MI.json) |
| **`ABS960MI`** | Bank stmnt reconc tp interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`ABS960MI.json`](ABS960MI.json) |
| **`ABS965MI`** | Reconciliation search seq interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`ABS965MI.json`](ABS965MI.json) |
| **`AEMAPIMI`** | AEM telematics standard for equipment data | 29 | `AddEquip, AddFault, AddLoc, AddMeterReading, AddSwitch...` | [`AEMAPIMI.json`](AEMAPIMI.json) |
| **`AGS100MI`** | Financial Agreement | 13 | `AddFinAgr, DltFinAgr, GetFinAgr, LstFinAgr, FpwVersion...` | [`AGS100MI.json`](AGS100MI.json) |
| **`AGS101MI`** | Financial Agreement Line | 13 | `DltAgrLin, GetAgrLin, LstAgrLin, addAgrLin, FpwVersion...` | [`AGS101MI.json`](AGS101MI.json) |
| **`AGS130MI`** | Financial Agreement Connected Invoice | 11 | `GetFinAgrConInv, LstFinAgrConInv, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AGS130MI.json`](AGS130MI.json) |
| **`AGS140MI`** | Financial Agreement Budget and Actuals per Period | 11 | `GetFinAgrBudAct, LstFinAgrBudAct, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`AGS140MI.json`](AGS140MI.json) |
| **`AHS100MI`** | Ad-hoc Report Group | 16 | `AddReportGroup, DelReportGroup, ExportConfig, GetReportGroup, ImportRepGroup...` | [`AHS100MI.json`](AHS100MI.json) |
| **`AHS110MI`** | Ad-hoc Report Version | 15 | `AddReport, DelReport, GetReport, LstReport, UpdAppMes...` | [`AHS110MI.json`](AHS110MI.json) |
| **`AHS150MI`** | Run Ad-hoc Report | 10 | `Submit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AHS150MI.json`](AHS150MI.json) |
| **`AHS200MI`** | Ad-hoc Report Version by User | 10 | `LstByUser, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`AHS200MI.json`](AHS200MI.json) |
| **`AMS100MI`** | Archiving Toolbox interface | 23 | `GenerateStd, LstArchiveProgr, LstArchiveViews, LstCurrentRuns, LstErrorLog...` | [`AMS100MI.json`](AMS100MI.json) |
| **`APAT13MI`** | Supplier payment interface in market Austria | 20 | `DeleteProposal, GetHead, GetHeadAddress, GetInvLine, GetInvLineTxt...` | [`APAT13MI.json`](APAT13MI.json) |
| **`APBR30MI`** | Get and list payment proposal information | 15 | `GetHead, GetHeadAddress, LstInvByPayDate, LstInvByPayDoc, LstInvByPayee...` | [`APBR30MI.json`](APBR30MI.json) |
| **`APBR50MI`** | Add an invoice batch head | 10 | `AddHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR50MI.json`](APBR50MI.json) |
| **`APBR51MI`** | Add an invoice batch line | 10 | `AddLine, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR51MI.json`](APBR51MI.json) |
| **`APBR53MI`** | Validate batch invoice | 10 | `ValidateInvoice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APBR53MI.json`](APBR53MI.json) |
| **`APCH01MI`** | Supports UTC for selected transactions using the UTCM field | 13 | `AddExtension, DltExtension, GetExtention, UpdExtension, FpwVersion...` | [`APCH01MI.json`](APCH01MI.json) |
| **`APS015MI`** | Bank Fee Type | 15 | `AddBankFee, CpyBankFee, DltBankFee, GetBankFee, LstBankFee...` | [`APS015MI.json`](APS015MI.json) |
| **`APS020MI`** | AP Accounting options | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS020MI.json`](APS020MI.json) |
| **`APS025MI`** | Activity code | 14 | `Add, Delete, Get, List, Update...` | [`APS025MI.json`](APS025MI.json) |
| **`APS026MI`** | Official service code | 14 | `Add, Delete, Get, List, Update...` | [`APS026MI.json`](APS026MI.json) |
| **`APS050MI`** | Supplier invoice interface | 24 | `AcceptInv, AddBatchAddInfo, AddBatchHead, AddBatchLine, GetAddInfo...` | [`APS050MI.json`](APS050MI.json) |
| **`APS051MI`** | Batch invoice control interface | 11 | `ControlAll, ControlInvoice, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`APS051MI.json`](APS051MI.json) |
| **`APS092MI`** | Selection of Payment Details | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS092MI.json`](APS092MI.json) |
| **`APS106MI`** | Supplier Payment Request | 12 | `GetPaymentReq, LstReqByPayee, LstReqByRefNo, FpwVersion, GetCurrentUser...` | [`APS106MI.json`](APS106MI.json) |
| **`APS110MI`** | Recode and Approve Supplier Invoices | 12 | `ApproveInvoice, CancelInvoice, ChgAuthorizer, FpwVersion, GetCurrentUser...` | [`APS110MI.json`](APS110MI.json) |
| **`APS130MI`** | Supplier Payment Proposal | 28 | `CreateConfChk, CreateProposal, DeleteProposal, GetHead, GetHead2...` | [`APS130MI.json`](APS130MI.json) |
| **`APS190MI`** | Supplier Payment - Report Bank Confirmation | 15 | `AddCharge, AddHead, GetHead, LstHeadByBank, LstPaymentRef...` | [`APS190MI.json`](APS190MI.json) |
| **`APS200MI`** | Supplier invoice | 21 | `AddInvoiceLog, GetCashDiscInfo, GetInvImagePath, GetInvTotBOD, GetInvTotInfo...` | [`APS200MI.json`](APS200MI.json) |
| **`APS201MI`** | Update of Single Invoice Details | 10 | `UpdInvDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APS201MI.json`](APS201MI.json) |
| **`APS250MI`** | Add additional information to an invoice | 10 | `AddInvInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`APS250MI.json`](APS250MI.json) |
| **`APS251MI`** | Additional information category | 16 | `AddInfoCat, DltInfoCat, GetInfo, GetInvInfo, LstInfo...` | [`APS251MI.json`](APS251MI.json) |
| **`APS260MI`** | Supplier Invoice Header Display | 14 | `Get, Lst, LstByInvAdmin, LstWithFilters, SearchInvHeader...` | [`APS260MI.json`](APS260MI.json) |
| **`APS305MI`** | Due date check proposal | 14 | `Confirm, Create, Dlt, Get, Lst...` | [`APS305MI.json`](APS305MI.json) |
| **`APS306MI`** | Due date check proposal detail | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`APS306MI.json`](APS306MI.json) |
| **`APS330MI`** | Outgoing payment proposal | 22 | `ApproveProposal, ConfirmProposal, CreateProposal, DeleteProposal, GetHead...` | [`APS330MI.json`](APS330MI.json) |
| **`APS331MI`** | Outgoing payment proposal | 18 | `DeleteInvoice, GetInvoice, HoldInvoice, LstInvoice, ReleaseInvoice...` | [`APS331MI.json`](APS331MI.json) |
| **`APS360MI`** | Supplier Invoice. Match GR Line | 12 | `LstHeadChgTrans, LstInvLnChgTran, LstInvLnTrans, FpwVersion, GetCurrentUser...` | [`APS360MI.json`](APS360MI.json) |
| **`APS370MI`** | Reconcile received goods/not invoiced | 16 | `InvCmplPO, InvCmplRcpt, LstRecByPO, RecalcStatus, RvrsInvCmplPO...` | [`APS370MI.json`](APS370MI.json) |
| **`APS390MI`** | Credit requeat transaction | 11 | `GetCrdReqRef, LstByCrdReqRef, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`APS390MI.json`](APS390MI.json) |
| **`APS430MI`** | Supplier withheld tax reporting | 17 | `GetTaxHead, GetTaxTotSer, GetTaxTotStaSer, GetTaxTotSupSer, LstTaxArLine...` | [`APS430MI.json`](APS430MI.json) |
| **`APS440MI`** | Supplier statement | 12 | `AddStmntHead, AddStmntLine, AddStmntPayee, FpwVersion, GetCurrentUser...` | [`APS440MI.json`](APS440MI.json) |
| **`APS450MI`** | Supplier Invoice Batch APL | 36 | `AcceptInvoice, Acknowledge, AddAddInfo, AddHead, AddHeadRecode...` | [`APS450MI.json`](APS450MI.json) |
| **`APS455MI`** | Supplier Invoice Batch Validation | 13 | `ConfrmByBatchNo, ConfrmBySelect, ValidByBatchNo, ValidBySelect, FpwVersion...` | [`APS455MI.json`](APS455MI.json) |
| **`APS485MI`** | Create credit self-billing | 12 | `CrtCreditInv, CrtCreditPOLine, CrtCreditRcpt, FpwVersion, GetCurrentUser...` | [`APS485MI.json`](APS485MI.json) |
| **`APS630MI`** | Supplier payment proposal | 18 | `ApproveProposal, ChangeBank, ChgPmtMethod, DeleteProposal, Get...` | [`APS630MI.json`](APS630MI.json) |
| **`APS631MI`** | Supplier payment proposal | 16 | `Dlt, Get, Lst, Upd, UpdPaymentMtd...` | [`APS631MI.json`](APS631MI.json) |
| **`APS635MI`** | Supplier payment proposal | 13 | `ConfirmProposal, CreateProposal, PrelimProposal, PrintProposal, FpwVersion...` | [`APS635MI.json`](APS635MI.json) |
| **`APS905MI`** | Accounts payable interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS905MI.json`](APS905MI.json) |
| **`APS925MI`** | Supplier self-billing invoice settings | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`APS925MI.json`](APS925MI.json) |
| **`ARBR01MI`** | COUNTRY:Bank remittance proposal interface | 13 | `GetHead, GetPayerInfo, LstPayerInfo, LstRemByPayer, FpwVersion...` | [`ARBR01MI.json`](ARBR01MI.json) |
| **`ARBR75MI`** | Batch payment types for Brazil | 11 | `GetBasicData, GetBatchPaymTyp, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARBR75MI.json`](ARBR75MI.json) |
| **`ARPT01MI`** | Payment receipt digital signature | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`ARPT01MI.json`](ARPT01MI.json) |
| **`ARS008MI`** | Interest rule | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS008MI.json`](ARS008MI.json) |
| **`ARS015MI`** | Bank fee type | 15 | `AddBankFee, CpyBankFee, DltBankFee, GetBankFee, LstBankFee...` | [`ARS015MI.json`](ARS015MI.json) |
| **`ARS020MI`** | AR Accounting options | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS020MI.json`](ARS020MI.json) |
| **`ARS040MI`** | Batch payments | 13 | `AddBatchCharge, AddBatchHead, AddBatchLine, ControlBatch, FpwVersion...` | [`ARS040MI.json`](ARS040MI.json) |
| **`ARS092MI`** | Cash Register ID | 15 | `AddCashRegistID, CpyCashRegistID, DltCashRegistID, GetCashRegistID, LstCashRegistID...` | [`ARS092MI.json`](ARS092MI.json) |
| **`ARS120MI`** | Manual customer invoices | 14 | `GetHeadText, GetInvHead, LstInvLines, LstSalesTaxInfo, LstTxExmpTxtVAT...` | [`ARS120MI.json`](ARS120MI.json) |
| **`ARS125MI`** | Debit notes | 10 | `UpdateDebitNote, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`ARS125MI.json`](ARS125MI.json) |
| **`ARS200MI`** | Customer invoice information | 17 | `GetCashDiscInfo, GetInvTotInfo, GetInvoice, GetUniqueKey, LstInvByDivi...` | [`ARS200MI.json`](ARS200MI.json) |
| **`ARS201MI`** | Update customer invoice | 11 | `UpdCustInv, UpdPmtReminStop, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARS201MI.json`](ARS201MI.json) |
| **`ARS251MI`** | Accounts receivable additional information | 16 | `AddCustomsDecNo, AddInfoCat, DltInfoCat, LstExtraInfo, LstInfo...` | [`ARS251MI.json`](ARS251MI.json) |
| **`ARS300MI`** | Bank remittance proposals | 23 | `DeleteProposal, GetHead, GetHead2, GetHeadAddress, GetPayerInfo...` | [`ARS300MI.json`](ARS300MI.json) |
| **`ARS355MI`** | Bank remittance - Reconcile payments per due date | 15 | `CreateProposal, DeleteProposal, GetBankConfNo, Recalculate, ReconProposal...` | [`ARS355MI.json`](ARS355MI.json) |
| **`ARS356MI`** | Bank remittance - Update details | 13 | `Delete, Hold, List, Release, FpwVersion...` | [`ARS356MI.json`](ARS356MI.json) |
| **`ARS400MI`** | Payment Receipt | 13 | `GetPaymentRcpt, LstPaymentRcpt, PrintCopy, RestartInteJob, FpwVersion...` | [`ARS400MI.json`](ARS400MI.json) |
| **`ARS401MI`** | Payment Receipt Document | 13 | `GetPmtRcptDoc, LstPmtRcptDoc, SelDocByCashReg, UpdPmtRcptDoc, FpwVersion...` | [`ARS401MI.json`](ARS401MI.json) |
| **`ARS402MI`** | Payment receipt lines | 11 | `GetPmtRcptLine, LstPmtRcptLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ARS402MI.json`](ARS402MI.json) |
| **`ARS410MI`** | Manages payment remittance header | 15 | `Dlt, Get, LockProposal, Lst, LstTotPerPmtDt...` | [`ARS410MI.json`](ARS410MI.json) |
| **`ARS411MI`** | Manage payment remittance details | 16 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS411MI.json`](ARS411MI.json) |
| **`ARS412MI`** | Manage payment remittance invoices | 16 | `AddInvoice, Dlt, ExcludeRecord, Get, IncludeRecord...` | [`ARS412MI.json`](ARS412MI.json) |
| **`ARS413MI`** | Manages remittance payment information | 12 | `CrtPaymentInfo, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS413MI.json`](ARS413MI.json) |
| **`ARS415MI`** | Manages payment remittance | 16 | `Confirm, CreateProposal, PrintPmtAdvice, PrintProposal, Reconcile...` | [`ARS415MI.json`](ARS415MI.json) |
| **`ARS425MI`** | Withheld tax AR management | 15 | `Add, AddCertNbr, Dlt, Get, Lst...` | [`ARS425MI.json`](ARS425MI.json) |
| **`ARS450MI`** | Direct debiting agreements | 14 | `AddDirDebAgr, DelDirDebAgr, GetBasicData, LstAgrByCustNo, UpdAgr...` | [`ARS450MI.json`](ARS450MI.json) |
| **`ARS460MI`** | Direct debiting agreements transfer | 14 | `GetAgByCustomer, GetCustomerHead, GetHead, GetHeadAdress, LstAgByCustomer...` | [`ARS460MI.json`](ARS460MI.json) |
| **`ARS630MI`** | Doubful accounts proposal | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS630MI.json`](ARS630MI.json) |
| **`ARS631MI`** | Doubtful accounts details | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS631MI.json`](ARS631MI.json) |
| **`ARS632MI`** | Doubtful accounts  invoice | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`ARS632MI.json`](ARS632MI.json) |
| **`ARS635MI`** | Doubtful accounts allowance | 13 | `Confirm, CreateProposal, PrintProposal, ResetPropStatus, FpwVersion...` | [`ARS635MI.json`](ARS635MI.json) |
| **`ARS640MI`** | Manages statement of account header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS640MI.json`](ARS640MI.json) |
| **`ARS641MI`** | Manage statement of account details | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS641MI.json`](ARS641MI.json) |
| **`ARS642MI`** | Manage statement of account invoice | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS642MI.json`](ARS642MI.json) |
| **`ARS645MI`** | Manages statement of account | 13 | `Confirm, CreateProposal, PrintProposal, PrintStatement, FpwVersion...` | [`ARS645MI.json`](ARS645MI.json) |
| **`ARS650MI`** | Manages payment reminder header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS650MI.json`](ARS650MI.json) |
| **`ARS651MI`** | Manage payment reminder details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS651MI.json`](ARS651MI.json) |
| **`ARS652MI`** | Manage payment reminder invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS652MI.json`](ARS652MI.json) |
| **`ARS655MI`** | Manages payment reminders. | 13 | `Confirm, CreateProposal, PrintProposal, PrintReminder, FpwVersion...` | [`ARS655MI.json`](ARS655MI.json) |
| **`ARS660MI`** | Manages interest invoice header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS660MI.json`](ARS660MI.json) |
| **`ARS661MI`** | Manages interest invoice details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS661MI.json`](ARS661MI.json) |
| **`ARS662MI`** | Manages interest invoice invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS662MI.json`](ARS662MI.json) |
| **`ARS665MI`** | Manages interest invoices. | 13 | `Confirm, CreateProposal, PrintIntInvoice, PrintProposal, FpwVersion...` | [`ARS665MI.json`](ARS665MI.json) |
| **`ARS670MI`** | Manages collection header | 14 | `Dlt, Get, LockProposal, Lst, UnlockProposal...` | [`ARS670MI.json`](ARS670MI.json) |
| **`ARS671MI`** | Manages collection details | 17 | `Dlt, ExcludeRecord, Get, IncludeRecord, LockDetails...` | [`ARS671MI.json`](ARS671MI.json) |
| **`ARS672MI`** | Manages collection invoices | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, Lst...` | [`ARS672MI.json`](ARS672MI.json) |
| **`ARS675MI`** | Manages collection. | 13 | `Confirm, CreateProposal, PrintCollection, PrintProposal, FpwVersion...` | [`ARS675MI.json`](ARS675MI.json) |
| **`ARS905MI`** | Accounts receivable interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ARS905MI.json`](ARS905MI.json) |
| **`ATS010MI`** | Attribute | 21 | `AddAttrLang, AddAttribute, DelAttrLang, DelAttribute, GetAttrLang...` | [`ATS010MI.json`](ATS010MI.json) |
| **`ATS014MI`** | Display Group Interface | 15 | `AddDisplayGroup, DelDisplayGroup, GetDisplayGroup, LstDisplayGroup, LstDspByDesc...` | [`ATS014MI.json`](ATS014MI.json) |
| **`ATS020MI`** | Attribute Values Matrix | 17 | `AddAttrMatrix, AddAttrValue, DelAttrMatrix, DelAttrValue, LstAttrMatrix...` | [`ATS020MI.json`](ATS020MI.json) |
| **`ATS030MI`** | Default Attribute Values | 15 | `AddDefaultVal, AddPriority, DelDefaultVal, GetDefaultVal, LstDefaultVal...` | [`ATS030MI.json`](ATS030MI.json) |
| **`ATS040MI`** | Attribute Dependent Values | 18 | `AddAttrDepID, AddAttrDepObj, AddAttrDepVal, AddPriority, DelAttrDepID...` | [`ATS040MI.json`](ATS040MI.json) |
| **`ATS050MI`** | Attribute Model | 21 | `AddAttrModel, AddAttribute, DelAttrModel, DelAttribute, GetAttrModel...` | [`ATS050MI.json`](ATS050MI.json) |
| **`ATS061MI`** | Default Information Group | 14 | `AddDefInfGrp, DltDefInfGrp, GetDefInfGrp, LstDefInfGrp, UpdDefInfGrp...` | [`ATS061MI.json`](ATS061MI.json) |
| **`ATS070MI`** | Attribute table interface | 16 | `AddAttrTable, AddLngTxt, CpyAttrTable, DltAttrTable, GetAttrTable...` | [`ATS070MI.json`](ATS070MI.json) |
| **`ATS071MI`** | Attrbute model selection interface | 14 | `AddAttrModel, DltAttrModel, GetAttrModel, LstAttrModel, UpdAttrModel...` | [`ATS071MI.json`](ATS071MI.json) |
| **`ATS101MI`** | Attribute Information Interface | 29 | `AddAttr, CalcOrderAttrb, CalcSettlement, CalcStockAttrb, DltAttr...` | [`ATS101MI.json`](ATS101MI.json) |
| **`ATS103MI`** | Condition report interface | 20 | `Add, AddReport, AddReportSerial, Cpy, Dlt...` | [`ATS103MI.json`](ATS103MI.json) |
| **`ATS104MI`** | Specification report interface | 20 | `Add, AddReport, AddReportSerial, Cpy, Dlt...` | [`ATS104MI.json`](ATS104MI.json) |
| **`ATS105MI`** | Condition report interface | 15 | `Add, Dlt, Get, Lst, LstQuoteLine...` | [`ATS105MI.json`](ATS105MI.json) |
| **`ATS200MI`** | Additional Information Interface | 13 | `AddAddInf, CopyAddInf, DltAddInf, LstAddInfo, FpwVersion...` | [`ATS200MI.json`](ATS200MI.json) |
| **`AUTCHKMI`** | Check authority | 13 | `ChkAutTblRcd, ChkAuthority, SelFncRolePerm, SelRolePerm, FpwVersion...` | [`AUTCHKMI.json`](AUTCHKMI.json) |
| **`BODCSSMI`** | Business Object Documents | 10 | `LstBillToParty, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`BODCSSMI.json`](BODCSSMI.json) |
| **`BOOKMKMI`** | Bookmark metadata interface | 16 | `Exists, GetParByInfoCat, GetParByPgm, GetParByTable, LstExtraParams...` | [`BOOKMKMI.json`](BOOKMKMI.json) |
| **`BROWSEMI`** | Browse functionality for clients | 17 | `GetBrowseParms, GetParameters, LstBrowseParms, LstBrowseVals, LstParameters...` | [`BROWSEMI.json`](BROWSEMI.json) |
| **`BUS100MI`** | Budget Definition | 26 | `AddBudgetHeader, AddBudgetLines, AddBudgetLnPer, DelBudgetHeader, DelBudgetLines...` | [`BUS100MI.json`](BUS100MI.json) |
| **`CAS025MI`** | API Settings - Inventory Valuation | 16 | `AddInvValuation, CpyInvValuation, DltInvValuation, GetInvValuation, LstInvValuation...` | [`CAS025MI.json`](CAS025MI.json) |
| **`CAS030MI`** | API Settings - WIP Valuation | 15 | `AddWIPValuation, CpyWIPValuation, DltWIPValuation, GetWIPValuation, LstWIPValuation...` | [`CAS030MI.json`](CAS030MI.json) |
| **`CAS310MI`** | Release / Hold Order costing | 13 | `LstByProduct, LstBySchedule, RelHoldOrdrCost, RelHoldSchedNo, FpwVersion...` | [`CAS310MI.json`](CAS310MI.json) |
| **`CAS393MI`** | Analytic Accounting Model / Balance | 12 | `AddAccBalance, DelActValues, DelBudgValues, FpwVersion, GetCurrentUser...` | [`CAS393MI.json`](CAS393MI.json) |
| **`CBS001MI`** | Api: Capable object | 13 | `Cpy, Del, Get, Lst, FpwVersion...` | [`CBS001MI.json`](CBS001MI.json) |
| **`CBS002MI`** | Api: Capability | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS002MI.json`](CBS002MI.json) |
| **`CBS003MI`** | Api: Capability range | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS003MI.json`](CBS003MI.json) |
| **`CBS004MI`** | Api: Capability definition | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS004MI.json`](CBS004MI.json) |
| **`CBS005MI`** | Api: Capability type | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS005MI.json`](CBS005MI.json) |
| **`CBS006MI`** | Api: Capability level | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS006MI.json`](CBS006MI.json) |
| **`CBS007MI`** | Api: Capability history | 14 | `Add, Chg, Del, Get, Lst...` | [`CBS007MI.json`](CBS007MI.json) |
| **`CBS010MI`** | Api: Role definition | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS010MI.json`](CBS010MI.json) |
| **`CBS011MI`** | Api: Role/employee | 15 | `Add, Chg, Cpy, Del, Get...` | [`CBS011MI.json`](CBS011MI.json) |
| **`CBS012MI`** | Capacity connect to role | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CBS012MI.json`](CBS012MI.json) |
| **`CCHKVOMI`** | Retrieve voucher number interface | 10 | `GetNumber, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CCHKVOMI.json`](CCHKVOMI.json) |
| **`CEVENTMI`** | Eventstore | 17 | `ActArchived, Add, Archive, Del, DelArchive...` | [`CEVENTMI.json`](CEVENTMI.json) |
| **`CLAIMSMI`** | API interface Maint Claims | 52 | `AddClaimHead, AddClaimSpec, AddClaimVer, ApproveReqAmt, ApproveTotalAmt...` | [`CLAIMSMI.json`](CLAIMSMI.json) |
| **`CMBR01MI`** | Custom Declaration Info Header | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMBR01MI.json`](CMBR01MI.json) |
| **`CMBR02MI`** | Custom Declaration Info Lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMBR02MI.json`](CMBR02MI.json) |
| **`CMS001MI`** | Planning Node Distribution Relation | 10 | `LstRelations, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CMS001MI.json`](CMS001MI.json) |
| **`CMS003MI`** | Company Business Type interface | 15 | `AddBusinessType, CpyBusinessType, DltBusinessType, GetBusinessType, LstBusinessType...` | [`CMS003MI.json`](CMS003MI.json) |
| **`CMS004MI`** | Manages the XML variant per printer file | 15 | `AddLngTxtOVNM, DltLngTxtOVNM, GetXmlVariant, LstPrtfVariants, LstXmlVariants...` | [`CMS004MI.json`](CMS004MI.json) |
| **`CMS005MI`** | List and printer programs configuration and metadata | 18 | `GenStandard, GetInfoCategory, LstFieldInfo, LstInfoCategory, LstSortOrdInfo...` | [`CMS005MI.json`](CMS005MI.json) |
| **`CMS006MI`** | Manages the XML Structure per Printerfile | 17 | `AddXmlStructure, DltXmlArchAttr, DltXmlStructure, GetXmlStructure, LstPrtfStructs...` | [`CMS006MI.json`](CMS006MI.json) |
| **`CMS007MI`** | Manages in defining the XML Sections | 23 | `AddCustSection, AddCustSubtotal, AddCustTxtBlock, AddLngTxtOVNM, AddXmlSection...` | [`CMS007MI.json`](CMS007MI.json) |
| **`CMS008MI`** | Manages XML Sections Table | 15 | `AddFields, AddSectionTable, DltSectionTable, GetSectionTable, LstSectionTable...` | [`CMS008MI.json`](CMS008MI.json) |
| **`CMS009MI`** | Manages in defining the XML Elements | 24 | `AddLngTxtOVNM, AddLngTxtTX40, AddRowSection, AddXmlAttribute, AddXmlElement...` | [`CMS009MI.json`](CMS009MI.json) |
| **`CMS010MI`** | Information Browser Category | 19 | `ActivateInfoCat, AddInfoCat, AddStdVrtFld, CheckSortOption, ChgInfoCat...` | [`CMS010MI.json`](CMS010MI.json) |
| **`CMS011MI`** | Information Browser Category - Related Tables | 15 | `AddFields, AddRelatedTable, DelRelatedTable, GetRelatedTable, LstRelatedTable...` | [`CMS011MI.json`](CMS011MI.json) |
| **`CMS012MI`** | Information Browser Category - Virtul Fields | 23 | `AddCalcVal, AddCurrConv, AddDate, AddDescription, AddExtendedCalc...` | [`CMS012MI.json`](CMS012MI.json) |
| **`CMS013MI`** | Information browser category related option management | 14 | `Add, AddLngTxt, Dlt, Get, Upd...` | [`CMS013MI.json`](CMS013MI.json) |
| **`CMS015MI`** | Manages the custom Information Browser - MI | 18 | `AddCustomMI, DltCustomMI, DltMIRepository, GetCustomMI, ImportCustomMI...` | [`CMS015MI.json`](CMS015MI.json) |
| **`CMS018MI`** | Manages the XML Custom Subtotals Sections | 14 | `AddCustSubtotal, DltCustSubtotal, GetCustSubtotal, LstCustSubtotal, UpdCustSubtotal...` | [`CMS018MI.json`](CMS018MI.json) |
| **`CMS020MI`** | Planning Node | 10 | `LstPlanningNode, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CMS020MI.json`](CMS020MI.json) |
| **`CMS025MI`** | Manages in defining the Report Layout | 18 | `AddLngTxtTX40, AddLngTxtWTTX, AddReportLayout, DltLngTxtTX40, DltLngTxtWTTX...` | [`CMS025MI.json`](CMS025MI.json) |
| **`CMS030MI`** | Key search | 14 | `AddKeySearch, DelKeySearch, GetKeySearch, LstKeySearch, UpdKeySearch...` | [`CMS030MI.json`](CMS030MI.json) |
| **`CMS033MI`** | Custom Text Section Interface | 15 | `AddCustTextSec, CpyCustTextSec, DltCustTextSec, GetCustTextSec, LstCustTextSec...` | [`CMS033MI.json`](CMS033MI.json) |
| **`CMS034MI`** | Key Group Interface | 17 | `AddKeyGroup, AddLngTxt, CpyKeyGroup, DltKeyGroup, DltLngTxt...` | [`CMS034MI.json`](CMS034MI.json) |
| **`CMS035MI`** | Search Tags | 13 | `Add, Chg, Del, List, FpwVersion...` | [`CMS035MI.json`](CMS035MI.json) |
| **`CMS036MI`** | Text Identity Interface | 22 | `AddLngTxtFRTX, AddLngTxtTX40, AddText, AddTextIdentity, CpyTextIdentity...` | [`CMS036MI.json`](CMS036MI.json) |
| **`CMS038MI`** | XML Custom Text Key Field Interface | 14 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS038MI.json`](CMS038MI.json) |
| **`CMS045MI`** | Event based subscriptions/alerts | 22 | `AddAlertRule, AddFieldKey, AddSubscription, DelAlertRule, DelSubscription...` | [`CMS045MI.json`](CMS045MI.json) |
| **`CMS048MI`** | Event log fields | 14 | `AddField, DltField, GetField, LstFields, UpdField...` | [`CMS048MI.json`](CMS048MI.json) |
| **`CMS050MI`** | Action Log | 19 | `CloseAction, CreateHeader, CreateLine, DeleteHeader, DeleteLine...` | [`CMS050MI.json`](CMS050MI.json) |
| **`CMS055MI`** | Customer. Connect Contact | 13 | `AddConnection, DeleteConnect, LstByCustomer, LstConnection, FpwVersion...` | [`CMS055MI.json`](CMS055MI.json) |
| **`CMS071MI`** | Start Day Interval Rules | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CMS071MI.json`](CMS071MI.json) |
| **`CMS072MI`** | Start Day Interval Rule Details Interface | 13 | `AddDateRule, DltDateRule, GetDateRule, LstDateRules, FpwVersion...` | [`CMS072MI.json`](CMS072MI.json) |
| **`CMS075MI`** | Manages the Search Tables and Fields. | 17 | `AddSearchFld, CpySearchFld, DltSearchFld, GenStd, GetSearchFld...` | [`CMS075MI.json`](CMS075MI.json) |
| **`CMS076MI`** | Manages the Action for the data fields | 16 | `AddAction, CpyAction, DltAction, GenStd, GetAction...` | [`CMS076MI.json`](CMS076MI.json) |
| **`CMS080MI`** | Manages the Customer Extension Field Attributes | 14 | `AddCustExtMetad, DltCustExtMetad, GetCustExtMetad, LstCustExtMetad, UpdCustExtMetad...` | [`CMS080MI.json`](CMS080MI.json) |
| **`CMS081MI`** | Manages Customer extension Field Attributes in CUGEVM table | 14 | `AddCustExtVaMap, DltCustExtVaMap, GetCustExtVaMap, LstCustExtVaMap, UpdCustExtVaMap...` | [`CMS081MI.json`](CMS081MI.json) |
| **`CMS082MI`** | Manges the User-Defined Fields Interface | 16 | `AddField, AddLngTxt, DltField, GenerateEntries, GetField...` | [`CMS082MI.json`](CMS082MI.json) |
| **`CMS083MI`** | Manages User-Defined Fields Value Map in CUDFLV table | 15 | `AddLngTxt, AddValue, DltValue, GetValue, LstValues...` | [`CMS083MI.json`](CMS083MI.json) |
| **`CMS085MI`** | Formating Rule Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS085MI.json`](CMS085MI.json) |
| **`CMS086MI`** | Field Formatting Rules Interface | 13 | `Add, Cpy, Dlt, Lst, FpwVersion...` | [`CMS086MI.json`](CMS086MI.json) |
| **`CMS095MI`** | NLP Translation Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS095MI.json`](CMS095MI.json) |
| **`CMS096MI`** | Manages Mapping of text for Natural Language Processing | 17 | `Add, Cpy, Dlt, Get, GetNLPText...` | [`CMS096MI.json`](CMS096MI.json) |
| **`CMS100MI`** | Custom list designer MI | 169 | `Lst3PLAdjust, Lst3PLOpenCO, Lst3PLOpenDO, Lst3PLOpenPO, Lst3PLStLoad...` | [`CMS100MI.json`](CMS100MI.json) |
| **`CMS103MI`** | Finance Reason Code | 14 | `AddFinReason, DltFinReason, GetFinReason, LstFinReason, UpdFinReason...` | [`CMS103MI.json`](CMS103MI.json) |
| **`CMS105MI`** | Manages the Advanced Selection | 14 | `AddAdvSelection, DelAdvSelection, GetAdvSelection, LstAdvSelection, UpdAdvSelection...` | [`CMS105MI.json`](CMS105MI.json) |
| **`CMS124MI`** | Tariff code group management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS124MI.json`](CMS124MI.json) |
| **`CMS126MI`** | Tariff code object selection management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS126MI.json`](CMS126MI.json) |
| **`CMS127MI`** | Tariff code object control management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS127MI.json`](CMS127MI.json) |
| **`CMS128MI`** | Tariff code management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS128MI.json`](CMS128MI.json) |
| **`CMS129MI`** | Tariff code country text management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS129MI.json`](CMS129MI.json) |
| **`CMS130MI`** | Import declaration info header | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS130MI.json`](CMS130MI.json) |
| **`CMS131MI`** | Import declaration info lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS131MI.json`](CMS131MI.json) |
| **`CMS133MI`** | Manage delivery connected to import declaration | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS133MI.json`](CMS133MI.json) |
| **`CMS135MI`** | Import declaration transaction history | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CMS135MI.json`](CMS135MI.json) |
| **`CMS137MI`** | Import declaration transaction summary | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CMS137MI.json`](CMS137MI.json) |
| **`CMS200MI`** | ICustomer channel | 20 | `Add, AddCusActivity, AddCusChannelID, Del, DelCusActivity...` | [`CMS200MI.json`](CMS200MI.json) |
| **`CMS210MI`** | Manages the GDPR Data Subject Run in CDPRUN table | 33 | `AddRun, AddRunLn, AddSrData, CpyRun, CpyRunLn...` | [`CMS210MI.json`](CMS210MI.json) |
| **`CMS212MI`** | Manages the GDPR Search Result in CDPRSH table | 17 | `DltResAct, DltSrRes, GetResAct, GetSrRes, LstResActByID...` | [`CMS212MI.json`](CMS212MI.json) |
| **`CMS220MI`** | Manages the GDPR Anonymous Key Data in CDPKEY table | 12 | `GetAnymsKey, LstByAnymsKey, LstByText, FpwVersion, GetCurrentUser...` | [`CMS220MI.json`](CMS220MI.json) |
| **`CMS235MI`** | Tax regime interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS235MI.json`](CMS235MI.json) |
| **`CMS236MI`** | Tax calculation code number | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS236MI.json`](CMS236MI.json) |
| **`CMS239MI`** | External withholding tax code management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CMS239MI.json`](CMS239MI.json) |
| **`CMS240MI`** | CSYTAB Export Interface | 13 | `AddCSYTAB, AddLngTxt, ChkSysConf, DltCSYTAB, FpwVersion...` | [`CMS240MI.json`](CMS240MI.json) |
| **`CMS250MI`** | User Location Interface | 13 | `CheckIn, GetCurrUserLoc, GetUserLocation, LstUserLocation, FpwVersion...` | [`CMS250MI.json`](CMS250MI.json) |
| **`CMS300MI`** | Event log | 14 | `Get, Lst, LstField, LstKey, Upd...` | [`CMS300MI.json`](CMS300MI.json) |
| **`CMS325MI`** | Event management | 13 | `DltApiCalls, DltDupLogs, LstApiCalls, LstDupLogs, FpwVersion...` | [`CMS325MI.json`](CMS325MI.json) |
| **`CMS350MI`** | Event log subscriber | 14 | `AddPartner, DltPartner, GetPartner, LstPartners, UpdPartner...` | [`CMS350MI.json`](CMS350MI.json) |
| **`CMS430MI`** | Manage Records for the Record Locking Functionality | 17 | `AddRecordLock, DltMultiRecLock, DltRecordLock, GetRecordLock, LstRecordLock...` | [`CMS430MI.json`](CMS430MI.json) |
| **`CMS432MI`** | Manage Reason Codes for the Record Locking Functionality | 15 | `AddReasonCode, CpyReasonCode, DltReasonCode, GetReasonCode, LstReasonCode...` | [`CMS432MI.json`](CMS432MI.json) |
| **`CMS460MI`** | Interest Rate ID interface | 15 | `AddIrti, CpyIrti, DltIrti, GetIRTI, LstIrti...` | [`CMS460MI.json`](CMS460MI.json) |
| **`CMS461MI`** | Interest Rate ID interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS461MI.json`](CMS461MI.json) |
| **`CMS470MI`** | Manages the Custom Fields | 14 | `AddCustomField, DltCustomField, GetCustomField, LstCustomField, UpdCustomField...` | [`CMS470MI.json`](CMS470MI.json) |
| **`CMS471MI`** | Manages the Custom Field Group | 14 | `AddCustFieldGrp, DltCustFieldGrp, GetCustFieldGrp, LstCustFieldGrp, UpdCustFieldGrp...` | [`CMS471MI.json`](CMS471MI.json) |
| **`CMS472MI`** | Manages the link of Custom Field in the Custom Field Group | 14 | `AddCustPerGrp, DltCustPerGrp, GetCustPerGrp, LstCustPerGrp, UpdCustPerGrp...` | [`CMS472MI.json`](CMS472MI.json) |
| **`CMS473MI`** | Manages the link of Custom Field Group to Items | 14 | `AddConnection, DltConnection, GetConnection, LstConnection, UpdConnection...` | [`CMS473MI.json`](CMS473MI.json) |
| **`CMS474MI`** | User Defined Fields | 30 | `AddCompInfo, AddEqInfo, AddPosInfo, AddUdefContent, DltCompInfo...` | [`CMS474MI.json`](CMS474MI.json) |
| **`CMS520MI`** | E-invoice Settings | 14 | `AddSettings, DltSettings, GetSettings, LstSettings, UpdSettings...` | [`CMS520MI.json`](CMS520MI.json) |
| **`CMS525MI`** | E-invoice Additional Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS525MI.json`](CMS525MI.json) |
| **`CMS526MI`** | BO Entry E-invoice Additional Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CMS526MI.json`](CMS526MI.json) |
| **`CMS530MI`** | Data field name interface | 15 | `AddDfna, CpyDfna, DltDfna, GetDfna, LstDfna...` | [`CMS530MI.json`](CMS530MI.json) |
| **`CMS535MI`** | SchemeID interface | 15 | `AddSchemeID, CpySchemeID, DltSchemeID, GetSchemeID, LstSchemeID...` | [`CMS535MI.json`](CMS535MI.json) |
| **`CMS540MI`** | E-invoice interface | 15 | `AddEivf, CpyEivf, DltEivf, GetEivf, LstEivf...` | [`CMS540MI.json`](CMS540MI.json) |
| **`CMS550MI`** | Customer invoice number approval | 13 | `Get, LstAINO, LstCINO, UpdAppdInvNo, FpwVersion...` | [`CMS550MI.json`](CMS550MI.json) |
| **`CMS560MI`** | Supplier E-invoice header | 16 | `AcptHead, AddHead, DltHead, GetHead, LstHead...` | [`CMS560MI.json`](CMS560MI.json) |
| **`CMS561MI`** | Supplier E-invoice government information | 14 | `AddGovInfo, DltGovInfo, GetGovInfo, LstGovInfo, UpdGovInfo...` | [`CMS561MI.json`](CMS561MI.json) |
| **`CMS615MI`** | Api: Supplier customer reference | 15 | `AddSupCustRef, DelSupCustRef, GetSupCustRef, LstByCustomer, LstBySupCustRef...` | [`CMS615MI.json`](CMS615MI.json) |
| **`CMS616MI`** | Customer reference type | 13 | `AddSupRefType, DelSupRefType, GetSupRefType, LstSupRefType, FpwVersion...` | [`CMS616MI.json`](CMS616MI.json) |
| **`CMS700MI`** | Settings - Output Management | 13 | `Add, Del, Get, Upd, FpwVersion...` | [`CMS700MI.json`](CMS700MI.json) |
| **`CMS710MI`** | Authorization Selections | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS710MI.json`](CMS710MI.json) |
| **`CMS711MI`** | Authorization Priorities object field | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS711MI.json`](CMS711MI.json) |
| **`CMS715MI`** | Approval flow general managment | 18 | `Add, Cpy, Dlt, Get, LstPerApprType...` | [`CMS715MI.json`](CMS715MI.json) |
| **`CMS716MI`** | Approval route management | 15 | `Add, Cpy, Dlt, Get, LstPosFilter...` | [`CMS716MI.json`](CMS716MI.json) |
| **`CMS717MI`** | Approval route grp management | 15 | `Add, Cpy, Dlt, Get, LstPosFilter...` | [`CMS717MI.json`](CMS717MI.json) |
| **`CMS718MI`** | Authorized users management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS718MI.json`](CMS718MI.json) |
| **`CMS719MI`** | Authorized user route groups | 17 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS719MI.json`](CMS719MI.json) |
| **`CMS720MI`** | Approval code management | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS720MI.json`](CMS720MI.json) |
| **`CMS721MI`** | Approval code route groups | 17 | `Add, Cpy, Dlt, Get, Lst...` | [`CMS721MI.json`](CMS721MI.json) |
| **`CMS730MI`** | Profile Management | 15 | `AddProfile, CpyProfile, DltProfile, GetProfile, LstProfile...` | [`CMS730MI.json`](CMS730MI.json) |
| **`CMS740MI`** | Approval Actions - Per user | 18 | `ApproveInvoice, CancelInvoice, ChangeRole, Get, Lst...` | [`CMS740MI.json`](CMS740MI.json) |
| **`CMS741MI`** | Approval Actions - Per invoice | 17 | `AddTask, ChangeRole, Generate, Get, Lst...` | [`CMS741MI.json`](CMS741MI.json) |
| **`CMS742MI`** | Approval Actions - Authorization | 16 | `ApproveAllLines, ApproveLine, Get, Lst, LstUserPerInv...` | [`CMS742MI.json`](CMS742MI.json) |
| **`CMS798MI`** | APS Policy | 17 | `AddAPSPolicy, AddAPSPolicySel, DelAPSPolicy, DelAPSPolicySel, GetAPSPolicy...` | [`CMS798MI.json`](CMS798MI.json) |
| **`CMS880MI`** | Business Message Data Translation | 15 | `AddMsgMapDet, DltMsgMapDet, GetMsgMapDet, LstMsgMapDet, UpdMsgMapDet...` | [`CMS880MI.json`](CMS880MI.json) |
| **`CMS950MI`** | Db Update Manager | 17 | `DltProgram, GenPrograms, GetProgram, LstPrograms, RunAllPrograms...` | [`CMS950MI.json`](CMS950MI.json) |
| **`CMS965MI`** | System Update Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CMS965MI.json`](CMS965MI.json) |
| **`CMS970MI`** | Manages Feature Updates on Header Level | 13 | `Add, Get, GetGeneralInfo, Lst, FpwVersion...` | [`CMS970MI.json`](CMS970MI.json) |
| **`CMS975MI`** | Manages Feature Updates on Line Levels | 20 | `DnAdoptions, Get, GetAdoption, GetKBURL, IsActive...` | [`CMS975MI.json`](CMS975MI.json) |
| **`CODEXPMI`** | Generic API to interact with Configuration Items | 17 | `ExportConfItem, ExprtCnfItmCSV, ExprtCnfItmTag, GetConfigItem, GetIRN...` | [`CODEXPMI.json`](CODEXPMI.json) |
| **`COS024MI`** | Labor sell rate interface | 15 | `Add, Delete, Get, List, LstByPriority...` | [`COS024MI.json`](COS024MI.json) |
| **`COS100MI`** | Maintenance customer order interface | 33 | `Add, AddClaimMCO, AddHead, AddLine, ApproveMCOLine...` | [`COS100MI.json`](COS100MI.json) |
| **`COS102MI`** | Advance Invoice | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`COS102MI.json`](COS102MI.json) |
| **`COS115MI`** | Maintenance Quotation Information | 23 | `AccRelConQtn, AcceptQuotation, AddQuotation, AmendQuotation, ConvrtFixdPrice...` | [`COS115MI.json`](COS115MI.json) |
| **`COS117MI`** | Split Payer MCO  interface | 14 | `Dlt, Get, GetItmCost, Lst, Upd...` | [`COS117MI.json`](COS117MI.json) |
| **`COS119MI`** | Maintenance customer order. Connect Contact | 13 | `AddConnection, DeleteConnect, LstByOrder, LstConnection, FpwVersion...` | [`COS119MI.json`](COS119MI.json) |
| **`COS120MI`** | Maintenance customer order stop | 12 | `GetMCOStop, LstMCOStop, UpdMCOStop, FpwVersion, GetCurrentUser...` | [`COS120MI.json`](COS120MI.json) |
| **`COS150MI`** | Api; MCO Miscellaneous cost | 22 | `Add, Approve, Delete, DeleteByMSEQ, Get...` | [`COS150MI.json`](COS150MI.json) |
| **`COS155MI`** | Manage MCO Miscellaneous cost | 19 | `Add, Approve, Confirm, Delete, Get...` | [`COS155MI.json`](COS155MI.json) |
| **`COS160MI`** | Miscellaneous type | 15 | `Add, Copy, Delete, Get, List...` | [`COS160MI.json`](COS160MI.json) |
| **`COS170MI`** | Maint CO Invoice Specification Interface | 19 | `AddInvoiceLine, CopySplit, DltInvoiceLine, Get, Lst...` | [`COS170MI.json`](COS170MI.json) |
| **`COS180MI`** | Invoice select | 12 | `CreateInvoice, InvoiceProp, PrintQuotation, FpwVersion, GetCurrentUser...` | [`COS180MI.json`](COS180MI.json) |
| **`COS275MI`** | Batch Order. Maintenance Customer Order | 14 | `AddBatchHead, AddBatchLine, AddText, Confirm, SndBatchLine...` | [`COS275MI.json`](COS275MI.json) |
| **`COS340MI`** | MCOChangeItemSerialNumber Interface | 15 | `ChgMCOCustAgr, ChgMCOItemLot, ChgMCOLot, ChgWOItemLot, ChgWOLot...` | [`COS340MI.json`](COS340MI.json) |
| **`COS350MI`** | Maint CO Invoices | 19 | `GetDelLine, GetInvHead, GetInvLine, LstDelLine, LstInvHead...` | [`COS350MI.json`](COS350MI.json) |
| **`COS403MI`** | Agreement Site | 15 | `AddAgrSite, DltAgrSite, GetAgrSite, LstAgrSite, Search...` | [`COS403MI.json`](COS403MI.json) |
| **`COS406MI`** | Agreement type interface | 14 | `AddAgrType, DltAgrType, GetAgrType, LstAgrType, UpdAgrType...` | [`COS406MI.json`](COS406MI.json) |
| **`COS410MI`** | Maintenance agreement interface | 37 | `AddAgrCharges, AddAgrLines, AddAgrLinesMtrl, AddAgrObjects, AddAgreement...` | [`COS410MI.json`](COS410MI.json) |
| **`COS413MI`** | Maint Agrmnt: Model Individual | 15 | `AddAgrModel, DltAgrModel, GetAgrModel, LstAgrModel, SearchAgrModel...` | [`COS413MI.json`](COS413MI.json) |
| **`COS421MI`** | Contents of agreement | 14 | `Add, Del, Get, Lst, Upd...` | [`COS421MI.json`](COS421MI.json) |
| **`COS427MI`** | Maint. Agreement invoice split | 14 | `Add, Dlt, Get, Lst, Upd...` | [`COS427MI.json`](COS427MI.json) |
| **`COS429MI`** | Add contact person to Maint. Agreement | 13 | `AddContact, DelContact, GetContact, LstContact, FpwVersion...` | [`COS429MI.json`](COS429MI.json) |
| **`COS433MI`** | Agreement Site Equipment | 15 | `AddAgrSiteEq, DltAgrSiteEq, GetAgrSiteEq, LstAgrSiteEq, Search...` | [`COS433MI.json`](COS433MI.json) |
| **`COS435MI`** | List Agreements - select | 10 | `PrintMaintAgr, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS435MI.json`](COS435MI.json) |
| **`COS438MI`** | Maintenance agreement line discount management | 15 | `AddDiscount, CpyDiscount, DltDiscount, GetDiscount, LstDiscounts...` | [`COS438MI.json`](COS438MI.json) |
| **`COS439MI`** | Agreement profitability summary | 10 | `LstAgrProftblt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS439MI.json`](COS439MI.json) |
| **`COS470MI`** | Content | 19 | `AddContDetails, AddContentType, DelContDetails, DelContentType, GetContDetails...` | [`COS470MI.json`](COS470MI.json) |
| **`COS605MI`** | Order Confirmation | 10 | `PrintConfirm, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`COS605MI.json`](COS605MI.json) |
| **`CPS100MI`** | Load and capacity | 11 | `SelDetailedLoad, SelTotalLoad, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CPS100MI.json`](CPS100MI.json) |
| **`CPS170MI`** | Person Capacity | 10 | `Lst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CPS170MI.json`](CPS170MI.json) |
| **`CPWAPPMI`** | CPW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`CPWAPPMI.json`](CPWAPPMI.json) |
| **`CRAR03MI`** | Manage country specific customer information for Argentina | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRAR03MI.json`](CRAR03MI.json) |
| **`CRBR04MI`** | Manage extra information of items | 15 | `AddItem, CpyItem, DltItem, GetItem, LstItems...` | [`CRBR04MI.json`](CRBR04MI.json) |
| **`CRBR11MI`** | Basic customer data information for Brazil | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRBR11MI.json`](CRBR11MI.json) |
| **`CRBR55MI`** | BR Facility | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRBR55MI.json`](CRBR55MI.json) |
| **`CRBR60MI`** | From To Federation Unit interface | 15 | `AddFromToFU, CpyFromToFU, DltFromToFU, GetFromToFU, LstFromToFU...` | [`CRBR60MI.json`](CRBR60MI.json) |
| **`CRCCINMI`** | Credit Card Interface | 20 | `AddAuth, AddCCRefNo, AddCapture, AddCredit, AddPaymentRef...` | [`CRCCINMI.json`](CRCCINMI.json) |
| **`CRIT10MI`** | COUNTRY: Customer ITA-information | 14 | `Add, Dlt, GetBasicData, LstByNumber, Upd...` | [`CRIT10MI.json`](CRIT10MI.json) |
| **`CRIT24MI`** | Supplier ITA Information | 15 | `Add, Dlt, GetAddress, GetBasicData, LstByNumber...` | [`CRIT24MI.json`](CRIT24MI.json) |
| **`CRJP01MI`** | Manage country specific customer information for Japan | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRJP01MI.json`](CRJP01MI.json) |
| **`CRPT03MI`** | Manage country specific customer information for Portugal | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRPT03MI.json`](CRPT03MI.json) |
| **`CRRU01MI`** | Manages the Russia Dvision Master | 15 | `AddDivisionRU, ChgDivisionRU, CpyDivisionRU, DelDivisionRU, GetDivisionRU...` | [`CRRU01MI.json`](CRRU01MI.json) |
| **`CRRU02MI`** | RU Customer Master | 15 | `AddCustomerRU, ChgCustomerRU, CpyCustomerRU, DelCustomerRU, GetCustomerRU...` | [`CRRU02MI.json`](CRRU02MI.json) |
| **`CRRU03MI`** | RU Supplier Master | 15 | `AddSupplierRU, ChgSupplierRU, CpySupplierRU, DelSupplierRU, GetSupplierRU...` | [`CRRU03MI.json`](CRRU03MI.json) |
| **`CRRU04MI`** | Banks for Russia | 15 | `AddBankRU, ChgBankRU, CpyBankRU, DelBankRU, GetBankRU...` | [`CRRU04MI.json`](CRRU04MI.json) |
| **`CRRU05MI`** | RU Unit of Measure Master | 15 | `AddUOMRU, ChgUOMRU, CpyUOMRU, DelUOMRU, GetUOMRU...` | [`CRRU05MI.json`](CRRU05MI.json) |
| **`CRRU06MI`** | RU Currency Master | 15 | `AddCurrencyRU, ChgCurrencyRU, CpyCurrencyRU, DelCurrencyRU, GetCurrencyRU...` | [`CRRU06MI.json`](CRRU06MI.json) |
| **`CRRU20MI`** | Document head for Russia | 14 | `AddRUDoc, ChgRUDoc, GetRUDocRecGrp, GetRUDocUnique, LstRUDocRecGrp...` | [`CRRU20MI.json`](CRRU20MI.json) |
| **`CRRU21MI`** | Document lines for Russia | 15 | `AddRUDoc, ChgRUDoc, GetRUDocRecGrp, GetRUDocUnique, LstRUDocItem...` | [`CRRU21MI.json`](CRRU21MI.json) |
| **`CRS004MI`** | User Group | 14 | `Add, Delete, Get, List, Update...` | [`CRS004MI.json`](CRS004MI.json) |
| **`CRS006MI`** | ObjectAccessGroup | 14 | `Add, Delete, Get, List, Update...` | [`CRS006MI.json`](CRS006MI.json) |
| **`CRS007MI`** | AccessGroupEntries | 13 | `Add, Delete, Get, List, FpwVersion...` | [`CRS007MI.json`](CRS007MI.json) |
| **`CRS008MI`** | Facility interface | 13 | `AddFacility, ChgFacility, Get, ListFacility, FpwVersion...` | [`CRS008MI.json`](CRS008MI.json) |
| **`CRS014MI`** | Program Start Values Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS014MI.json`](CRS014MI.json) |
| **`CRS020MI`** | Panel version interface | 20 | `AddLngTxt, DelLngTxt, DelPanelVersion, GetFldColParm, ImportView...` | [`CRS020MI.json`](CRS020MI.json) |
| **`CRS021MI`** | Manages the Sorting Option | 19 | `ActSrtOpt, AddSrtOpt, CheckSrtOpt, CheckTable, CrtStdSrtOpt...` | [`CRS021MI.json`](CRS021MI.json) |
| **`CRS022MI`** | Sorting order interface | 19 | `AddLngTxt, AddSortOrder, AddStdPersView, ChgSortOrder, CpySortOrder...` | [`CRS022MI.json`](CRS022MI.json) |
| **`CRS025MI`** | Item Group interface | 15 | `AddItemGroup, AddLngTxt, DelItemGroup, GetItemGroup, LstItemGroup...` | [`CRS025MI.json`](CRS025MI.json) |
| **`CRS030MI`** | VAT Code | 11 | `GetBasicData, LstVat, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS030MI.json`](CRS030MI.json) |
| **`CRS035MI`** | Product Group interface | 14 | `AddProductGroup, DelProductGroup, GetProductGroup, LstProductGroup, UpdProductGroup...` | [`CRS035MI.json`](CRS035MI.json) |
| **`CRS036MI`** | Business area | 13 | `AddBusinessArea, AddLngTxt, LstBusinessArea, UpdBusinessArea, FpwVersion...` | [`CRS036MI.json`](CRS036MI.json) |
| **`CRS040MI`** | Manages Item type | 16 | `AddItmType, AddLngTxt, CpyItmType, DltItmType, GetItmType...` | [`CRS040MI.json`](CRS040MI.json) |
| **`CRS041MI`** | Manages the Additional Country Code | 14 | `AddAddCountry, DltAddCountry, GetAddCountry, LstAddCountry, UpdAddCountry...` | [`CRS041MI.json`](CRS041MI.json) |
| **`CRS042MI`** | County ID interface | 14 | `AddCountyID, DltCountyID, GetCountyID, LstCountyID, UpdCountyID...` | [`CRS042MI.json`](CRS042MI.json) |
| **`CRS044MI`** | Postal codes interface | 13 | `AddPostalCode, DelPostalCode, LstCityByCode, LstPostalCodes, FpwVersion...` | [`CRS044MI.json`](CRS044MI.json) |
| **`CRS045MI`** | Country interface | 13 | `GetBasicData, LstByCode, LstCountry, LstCountryArea, FpwVersion...` | [`CRS045MI.json`](CRS045MI.json) |
| **`CRS046MI`** | State / Area code interface | 10 | `LstAreaCodes, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS046MI.json`](CRS046MI.json) |
| **`CRS050MI`** | Unit of Measure | 14 | `Add, Delete, Get, List, Update...` | [`CRS050MI.json`](CRS050MI.json) |
| **`CRS051MI`** | Unit of Measure conversion table | 14 | `Add, Delete, Get, List, Update...` | [`CRS051MI.json`](CRS051MI.json) |
| **`CRS052MI`** | Unit of Measure Languages | 14 | `Add, Delete, Get, List, Update...` | [`CRS052MI.json`](CRS052MI.json) |
| **`CRS055MI`** | Currency Exchange Rates | 16 | `AddRate, AddRate2, GetBasicData, LstRatesPerType, LstRtPerPeriod...` | [`CRS055MI.json`](CRS055MI.json) |
| **`CRS060MI`** | Purchase Price Text Interface | 14 | `Add, Delete, Get, List, Update...` | [`CRS060MI.json`](CRS060MI.json) |
| **`CRS061MI`** | Rail station interface | 14 | `AddRailStation, DltRailStation, GetRailStation, LstRailStation, UpdRailStation...` | [`CRS061MI.json`](CRS061MI.json) |
| **`CRS063MI`** | Supplier service code | 14 | `Add, Delete, Get, List, Update...` | [`CRS063MI.json`](CRS063MI.json) |
| **`CRS064MI`** | Customer service code | 14 | `Add, Delete, Get, List, Update...` | [`CRS064MI.json`](CRS064MI.json) |
| **`CRS065MI`** | Delivery Term interface | 14 | `AddDelyTerm, DelDelyTerm, GetDelyTerm, LstDelyTerm, UpdDelyTerm...` | [`CRS065MI.json`](CRS065MI.json) |
| **`CRS070MI`** | Delivery Method interface | 14 | `AddDelyMethod, DelDelyMethod, GetDelyMethod, LstDelyMethod, UpdDelyMethod...` | [`CRS070MI.json`](CRS070MI.json) |
| **`CRS075MI`** | Payment term | 14 | `Add, Delete, Get, List, Update...` | [`CRS075MI.json`](CRS075MI.json) |
| **`CRS078MI`** | Payment Type | 10 | `GetBasicData, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS078MI.json`](CRS078MI.json) |
| **`CRS080MI`** | Department | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS080MI.json`](CRS080MI.json) |
| **`CRS096MI`** | Milestone Chain interface | 20 | `AddMilestnLine, AddMilestoneChn, DelMilestoneChn, DelMilestoneLn, GetMilestoneChn...` | [`CRS096MI.json`](CRS096MI.json) |
| **`CRS099MI`** | Product Line Interface | 14 | `AddProductLine, DltProductLine, GetProductLine, LstProductLine, UpdProductLine...` | [`CRS099MI.json`](CRS099MI.json) |
| **`CRS100MI`** | Salesperson | 13 | `Add, Delete, Get, List, FpwVersion...` | [`CRS100MI.json`](CRS100MI.json) |
| **`CRS105MI`** | Assortment | 24 | `AddAssmCust, AddAssmHead, AddAssmItem, DltAssmCust, DltAssmHead...` | [`CRS105MI.json`](CRS105MI.json) |
| **`CRS109MI`** | Field Group Interface | 12 | `DelField, LstFieldGroup, UpdField, FpwVersion, GetCurrentUser...` | [`CRS109MI.json`](CRS109MI.json) |
| **`CRS111MI`** | E-mail address repository interface | 19 | `Add, Change, Delete, Get, List...` | [`CRS111MI.json`](CRS111MI.json) |
| **`CRS114MI`** | Order Line Salespersons Interface | 12 | `Add, Delete, List, FpwVersion, GetCurrentUser...` | [`CRS114MI.json`](CRS114MI.json) |
| **`CRS118MI`** | Manages the Email Group in CEMAGH table | 16 | `AddEmailGroup, AddLngTxt, CpyEmailGroup, DltEmailGroup, GetEmailGroup...` | [`CRS118MI.json`](CRS118MI.json) |
| **`CRS119MI`** | Manages the Email Address for an Email Group in CEMAGL table | 14 | `AddEmailGrpAddr, CpyEmailGrpAddr, DltEmailGrpAddr, GetEmailGrpAddr, LstEmailGrpAddr...` | [`CRS119MI.json`](CRS119MI.json) |
| **`CRS121MI`** | Inventory Segment | 14 | `AddInventorySeg, DltInventorySeg, GetInventorySeg, LstInventorySeg, UpdInventorySeg...` | [`CRS121MI.json`](CRS121MI.json) |
| **`CRS122MI`** | Trade agreement class id interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`CRS122MI.json`](CRS122MI.json) |
| **`CRS128MI`** | Customs Statistics Number | 14 | `AddBasicData, DltBasicData, GetBasicData, LstByNumber, UpdBasicData...` | [`CRS128MI.json`](CRS128MI.json) |
| **`CRS137MI`** | Geographical Code - Jurisdiction | 15 | `AddGeoCode, DltGeoCode, GetByJurisdict, GetGeoCode, LstGeoCodes...` | [`CRS137MI.json`](CRS137MI.json) |
| **`CRS138MI`** | Geographical Code - Tax rate | 15 | `AddTaxRate, DltTaxRate, GetTaxCodeType, GetTaxRate, LstTaxRates...` | [`CRS138MI.json`](CRS138MI.json) |
| **`CRS140MI`** | District interface | 10 | `LstDistrict, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS140MI.json`](CRS140MI.json) |
| **`CRS165MI`** | Manages the Number Series | 10 | `RtvNextNumber, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS165MI.json`](CRS165MI.json) |
| **`CRS169MI`** | Acceptance Group Interface | 14 | `AddAcceptGroup, DelAcceptGroup, GetAcceptGroup, LstAcceptGroup, UpdAcceptGroup...` | [`CRS169MI.json`](CRS169MI.json) |
| **`CRS175MI`** | Cross application basic data interface | 21 | `GetGeneralCode, GetGeneralParm, GetItemFreeFlds, GetSetTradeStat, LstCodesByLng...` | [`CRS175MI.json`](CRS175MI.json) |
| **`CRS180MI`** | Convert Amount in Words | 11 | `GetAmtInWords, GetCurrPerLng, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS180MI.json`](CRS180MI.json) |
| **`CRS181MI`** | User-defined field 1 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS181MI.json`](CRS181MI.json) |
| **`CRS183MI`** | User-defined field 3 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS183MI.json`](CRS183MI.json) |
| **`CRS184MI`** | User-defined field 4 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS184MI.json`](CRS184MI.json) |
| **`CRS185MI`** | User-defined field 5 | 15 | `Add, AddLangTxt, Del, Get, Lst...` | [`CRS185MI.json`](CRS185MI.json) |
| **`CRS200MI`** | GST Order Types | 10 | `LstOrderType, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS200MI.json`](CRS200MI.json) |
| **`CRS207MI`** | List API for fashion matrix | 13 | `LstStyleDetByCO, LstStyleDetByDO, LstStyleDetByMO, LstStyleDetByPO, FpwVersion...` | [`CRS207MI.json`](CRS207MI.json) |
| **`CRS212MI`** | Item Danger Class Interface | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CRS212MI.json`](CRS212MI.json) |
| **`CRS213MI`** | Hazardous material management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS213MI.json`](CRS213MI.json) |
| **`CRS214MI`** | Supplementary info management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS214MI.json`](CRS214MI.json) |
| **`CRS220MI`** | Reason category | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`CRS220MI.json`](CRS220MI.json) |
| **`CRS221MI`** | Reason codes per reason category | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`CRS221MI.json`](CRS221MI.json) |
| **`CRS222MI`** | Reason category per function | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS222MI.json`](CRS222MI.json) |
| **`CRS230MI`** | Technical documents | 34 | `Add, AddDocActivity, AddDocEff1, AddDocEff2, AddDocEff3...` | [`CRS230MI.json`](CRS230MI.json) |
| **`CRS235MI`** | Internal address interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS235MI.json`](CRS235MI.json) |
| **`CRS247MI`** | Standard Numbering-Functional Area | 14 | `AddFunctionArea, DelFunctionArea, GetFunctionArea, LstFunctionArea, UpdFunctionArea...` | [`CRS247MI.json`](CRS247MI.json) |
| **`CRS275MI`** | Order line charges | 20 | `AddLineChrgHead, AddLineChrgRate, DltLineChrgHead, DltLineChrgRate, GetLineChrgHead...` | [`CRS275MI.json`](CRS275MI.json) |
| **`CRS278MI`** | Line charge models | 12 | `LstChrgModels, LstKeyLineChrg, LstLineChrgMod, FpwVersion, GetCurrentUser...` | [`CRS278MI.json`](CRS278MI.json) |
| **`CRS290MI`** | Manages the Printer on which the document should be printed | 16 | `AddPrinter, DltPrinter, GetPrinter, LstPrinters, LstPrtByGrp...` | [`CRS290MI.json`](CRS290MI.json) |
| **`CRS295MI`** | Manages the Replacement of Printer in CSYDEC table | 14 | `AddReplPrt, DltReplPrt, GetReplPrt, LstReplPrt, UpdReplPrt...` | [`CRS295MI.json`](CRS295MI.json) |
| **`CRS300MI`** | Ship-via address | 11 | `GetShipVia, LstShipVia, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS300MI.json`](CRS300MI.json) |
| **`CRS316MI`** | Credit group interface | 12 | `AddPayerToCrGrp, DltPayerFrCrGrp, LstPayersInCrGr, FpwVersion, GetCurrentUser...` | [`CRS316MI.json`](CRS316MI.json) |
| **`CRS317MI`** | Stopped orders interface | 10 | `StoppedOrders, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS317MI.json`](CRS317MI.json) |
| **`CRS335MI`** | Control object | 14 | `AddCtrlObj, DltCtrlObj, GetCtrlObj, LstCtrlObj, UpdCtrlObj...` | [`CRS335MI.json`](CRS335MI.json) |
| **`CRS388MI`** | Object value translations | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS388MI.json`](CRS388MI.json) |
| **`CRS395MI`** | Accounting Rules | 16 | `AddExceptionPri, CrtStdAccRules, DltAccRule, DltRmvAccRules, GetAccRule...` | [`CRS395MI.json`](CRS395MI.json) |
| **`CRS396MI`** | Accounting Exceptions | 13 | `AddExceptionVal, DltExceptionVal, GetExceptionVal, LstExceptionVal, FpwVersion...` | [`CRS396MI.json`](CRS396MI.json) |
| **`CRS399MI`** | Simulate Accounting String | 11 | `GetCA60910, GetOI2Evnts, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS399MI.json`](CRS399MI.json) |
| **`CRS407MI`** | FAM function connect to order type | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS407MI.json`](CRS407MI.json) |
| **`CRS420MI`** | Application messages interface | 33 | `Add, AddExtRefInfo, AddFreeText, Complete, Delete...` | [`CRS420MI.json`](CRS420MI.json) |
| **`CRS434MI`** | Credit card intercface settings | 19 | `Add3rdPartyId, ClearAuthToken, ClearProxyPwd, ClearPwd, Dlt3rdPartyId...` | [`CRS434MI.json`](CRS434MI.json) |
| **`CRS438MI`** | Latest User Interface Server | 14 | `Add, Delete, Get, List, Update...` | [`CRS438MI.json`](CRS438MI.json) |
| **`CRS515MI`** | Work schedule basic data interface | 11 | `SelModelLines, SelPatternLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS515MI.json`](CRS515MI.json) |
| **`CRS526MI`** | Change of Calendar | 10 | `UpdEmpCalendar, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS526MI.json`](CRS526MI.json) |
| **`CRS530MI`** | Employee basic data interface | 30 | `AddAddress, AddEmplExp, AddEmployee, ChgAddress, DelEmployee...` | [`CRS530MI.json`](CRS530MI.json) |
| **`CRS545MI`** | User Connect Authority | 14 | `AddUsrAuthority, DltUsrAuthority, GetUsrAuthority, LstUsrAuthority, UpdUsrAuthority...` | [`CRS545MI.json`](CRS545MI.json) |
| **`CRS610MI`** | Customer interface | 46 | `Add, AddAddress, AddCheckAddress, AddText, CheckPIN...` | [`CRS610MI.json`](CRS610MI.json) |
| **`CRS612MI`** | Api: Customer cards | 14 | `AddCustCard, DelCustCard, GetCustCard, LstCustCard, UpdCustCard...` | [`CRS612MI.json`](CRS612MI.json) |
| **`CRS618MI`** | Contact Person | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS618MI.json`](CRS618MI.json) |
| **`CRS620MI`** | Supplier Interface | 31 | `AddAddress, AddSupplier, AddSupplierRef, CopyTemplate, DelAddress...` | [`CRS620MI.json`](CRS620MI.json) |
| **`CRS621MI`** | Contact Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS621MI.json`](CRS621MI.json) |
| **`CRS628MI`** | Supplier Tax Number | 15 | `AddSupTaxNo, CpySupTaxNo, DelSupTaxNo, GetSupTaxNo, LstSupTaxNo...` | [`CRS628MI.json`](CRS628MI.json) |
| **`CRS630MI`** | Accounting Identity | 27 | `AddAccountID, AddAccountIDACR, AddAccountIDLng, CpyAccountID, CpyAccountIDACR...` | [`CRS630MI.json`](CRS630MI.json) |
| **`CRS633MI`** | Account groups interface | 15 | `AddAccGroup, CpyAccGroup, DltAccGroup, GetAccGroup, LstAccGroups...` | [`CRS633MI.json`](CRS633MI.json) |
| **`CRS634MI`** | Reconciliation rule | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS634MI.json`](CRS634MI.json) |
| **`CRS638MI`** | Account Identity Authorization | 15 | `AddAcctgDimAuth, CpyAcctgDimAuth, DltAcctgDimAuth, GetAcctgDimAuth, LstAcctgDimAuth...` | [`CRS638MI.json`](CRS638MI.json) |
| **`CRS645MI`** | Accounting Structures | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS645MI.json`](CRS645MI.json) |
| **`CRS646MI`** | Accounting Structure Lines | 14 | `Add, Del, Get, Lst, Upd...` | [`CRS646MI.json`](CRS646MI.json) |
| **`CRS650MI`** | Authorized User | 14 | `Add, Del, GetBasicData, LstByCode, Upd...` | [`CRS650MI.json`](CRS650MI.json) |
| **`CRS668MI`** | Flexible Service Code Date Limits Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS668MI.json`](CRS668MI.json) |
| **`CRS682MI`** | Insurance ID | 14 | `Add, Delete, Get, Lst, Upd...` | [`CRS682MI.json`](CRS682MI.json) |
| **`CRS683MI`** | Wrk: Customer Insurance by Product Group | 14 | `Add, Delete, Get, List, Update...` | [`CRS683MI.json`](CRS683MI.json) |
| **`CRS685MI`** | Manage item owner | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS685MI.json`](CRS685MI.json) |
| **`CRS686MI`** | Manage connection between owner and identity | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CRS686MI.json`](CRS686MI.json) |
| **`CRS690MI`** | Banks | 18 | `AddBank, DelByNumber, DelBySwiftCode, GetBasicData, LstByCountry...` | [`CRS690MI.json`](CRS690MI.json) |
| **`CRS691MI`** | Bank Branches | 17 | `AddBankBranch, DelByNumber, GetBasicData, LstByCountry, LstByNumber...` | [`CRS691MI.json`](CRS691MI.json) |
| **`CRS692MI`** | Bank Accounts | 26 | `AddBankAccount, AddBankAccount2, ChgBankAccount2, ChgBasicData, DelBankAccount...` | [`CRS692MI.json`](CRS692MI.json) |
| **`CRS693MI`** | Bank Account Additional Values | 12 | `GetBasicData, LstByAccHolder, LstByValueType, FpwVersion, GetCurrentUser...` | [`CRS693MI.json`](CRS693MI.json) |
| **`CRS740MI`** | Trade agreement settings interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`CRS740MI.json`](CRS740MI.json) |
| **`CRS750MI`** | General Ledger Settings | 10 | `GetGLSettings, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CRS750MI.json`](CRS750MI.json) |
| **`CRS780MI`** | purchase parameters management | 15 | `AddPurchSetting, CpyPurchSetting, DltPurchSetting, GetPurchSetting, LstPurchSetting...` | [`CRS780MI.json`](CRS780MI.json) |
| **`CRS795MI`** | Integration settings interface | 14 | `CrtStandard, Dlt, Get, Lst, Upd...` | [`CRS795MI.json`](CRS795MI.json) |
| **`CRS798MI`** | APS Policy | 14 | `Add, Delete, Get, List, Update...` | [`CRS798MI.json`](CRS798MI.json) |
| **`CRS830MI`** | Language Handling interface | 11 | `GetLngTxt, LstLngTxt, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS830MI.json`](CRS830MI.json) |
| **`CRS881MI`** | Business Message Data Translation Interface | 24 | `AddTranslData, AddTranslation, DelDeletedTrans, DelTranslData, DelTranslation...` | [`CRS881MI.json`](CRS881MI.json) |
| **`CRS885MI`** | Partner repository | 11 | `AddPartnerRepo, DelPartnerRepo, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS885MI.json`](CRS885MI.json) |
| **`CRS886MI`** | Partner alias interface | 16 | `AddPtrAlias, CnvPtr, CnvPtrAlias, CnvPtrAliasQual, CnvPtrQual...` | [`CRS886MI.json`](CRS886MI.json) |
| **`CRS900MI`** | System Calendar | 16 | `ActSysCalDates, AddWorkingDays, CreateDays, GetSysCalDate, LstSysCalendar...` | [`CRS900MI.json`](CRS900MI.json) |
| **`CRS910MI`** | System Periods | 14 | `CpyToDivision, GenPeriods, GetYear, Select, UpdPeriod...` | [`CRS910MI.json`](CRS910MI.json) |
| **`CRS912MI`** | Season | 14 | `AddSeason, DelSeason, GetSeason, LstSeason, UpdSeason...` | [`CRS912MI.json`](CRS912MI.json) |
| **`CRS913MI`** | Classification per Season Interface | 14 | `AddClassif, DltClassif, GetClassif, LstClassif, UpdClassif...` | [`CRS913MI.json`](CRS913MI.json) |
| **`CRS945MI`** | Manages the media control object connected to the Document | 14 | `AddPartnerRef, DltPartnerRef, GetPartnerRef, LstPartnerRef, UpdPartnerRef...` | [`CRS945MI.json`](CRS945MI.json) |
| **`CRS949MI`** | Manages the media control object connected to a Media | 26 | `AddPartnerArch, AddPartnerEmail, AddPartnerEvent, AddPartnerFax, AddPartnerFile...` | [`CRS949MI.json`](CRS949MI.json) |
| **`CRS950MI`** | Handle predefined texts | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS950MI.json`](CRS950MI.json) |
| **`CRS980MI`** | Text blocks interface | 19 | `AddTxtBlockHead, AddTxtBlockLine, DltTxtBlockLins, GetTextID, ImportText...` | [`CRS980MI.json`](CRS980MI.json) |
| **`CRS990MI`** | Generic Browse | 17 | `Get, GetBrowse, GetHeading, InitBrowse, InitBrowseWHead...` | [`CRS990MI.json`](CRS990MI.json) |
| **`CRS995MI`** | System Application Monitor | 11 | `GetMonitor, LstMonitors, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRS995MI.json`](CRS995MI.json) |
| **`CRS998MI`** | Manages System Diagnostic in CSYDIA table | 15 | `Dlt, GenStd, Get, Lst, Run...` | [`CRS998MI.json`](CRS998MI.json) |
| **`CRSPCIMI`** | EQM configurator API | 38 | `DltAttrLine, DltAttrModel, GetAttrInfo, GetAttrLine, GetForcedSeq...` | [`CRSPCIMI.json`](CRSPCIMI.json) |
| **`CRTVSUMI`** | Retrieves supplier number from an alternative search key | 11 | `GetSupplier, LstSuppliers, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CRTVSUMI.json`](CRTVSUMI.json) |
| **`CSS006MI`** | Machine/Engine pricing API | 39 | `AddN, AddP, AddR, AddS, AddT...` | [`CSS006MI.json`](CSS006MI.json) |
| **`CSS100MI`** | Api: External orderline Information | 11 | `UpdExtInf, UpdExtInfOrder, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSS100MI.json`](CSS100MI.json) |
| **`CSS105MI`** | Api: External invoice Information | 11 | `LstExtInvInf, UpdStatus, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSS105MI.json`](CSS105MI.json) |
| **`CSS200MI`** | Api:GetDealerCode | 10 | `GetDealerCode, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CSS200MI.json`](CSS200MI.json) |
| **`CSS204MI`** | Api: SCORE Reporting | 16 | `AddGrief, AddScore, DelScore, GetCatScore, GetSCOREREP...` | [`CSS204MI.json`](CSS204MI.json) |
| **`CSS300MI`** | PoU Sales Order Interface | 13 | `Delete, LstLineSupply, LstOrdLine, LstSalesOrd, FpwVersion...` | [`CSS300MI.json`](CSS300MI.json) |
| **`CSS720MI`** | Api: Sup Related Process.Connect Ref Type | 12 | `AddRefType, DltRefType, LstByProcess, FpwVersion, GetCurrentUser...` | [`CSS720MI.json`](CSS720MI.json) |
| **`CSSEITMI`** | Api: External Temporary order information | 11 | `LstExtTempInf, UpdExtTempInf, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`CSSEITMI.json`](CSSEITMI.json) |
| **`CSSEIXMI`** | Api: External Supplier Information Temporary orders | 10 | `UpdExtInfSts15, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`CSSEIXMI.json`](CSSEIXMI.json) |
| **`CTS040MI`** | Supply Model Information | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`CTS040MI.json`](CTS040MI.json) |
| **`CTS095MI`** | ATP Safety stock protection | 14 | `Add, Dlt, Get, Lst, Upd...` | [`CTS095MI.json`](CTS095MI.json) |
| **`CUGEXTMI`** | Customer generic extension tables | 15 | `AddFieldKey, AddFieldMap, AddFieldSub, LstFieldKey, LstFieldMap...` | [`CUGEXTMI.json`](CUGEXTMI.json) |
| **`CUSEXTMI`** | Customer generic extension table | 39 | `AddAlphaKPI, AddFieldAttr, AddFieldVM, AddFieldValue, AddNumericKPI...` | [`CUSEXTMI.json`](CUSEXTMI.json) |
| **`DPS001MI`** | Distribution relation interface | 11 | `LstNodeRelation, LstRelation, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`DPS001MI.json`](DPS001MI.json) |
| **`DPS170MI`** | Planned distribution orders interface | 25 | `ClrInboxDOP, CrtPlannedDO, DelPlannedDO, GetDistDays, GetDistRel...` | [`DPS170MI.json`](DPS170MI.json) |
| **`DPS910MI`** | Recreate Distribution Level | 10 | `CalcItmWhsDOLvl, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`DPS910MI.json`](DPS910MI.json) |
| **`DRS005MI`** | Route interface | 15 | `AddRoute, DltRoute, GetRoute, LstRoute, SelRoute...` | [`DRS005MI.json`](DRS005MI.json) |
| **`DRS006MI`** | Route Departure Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS006MI.json`](DRS006MI.json) |
| **`DRS007MI`** | Exceptions in route departures | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS007MI.json`](DRS007MI.json) |
| **`DRS008MI`** | Predefined departure calendar management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS008MI.json`](DRS008MI.json) |
| **`DRS011MI`** | Route selection table interface | 15 | `Add, Dlt, Get, Lst, RtvRouteDep...` | [`DRS011MI.json`](DRS011MI.json) |
| **`DRS013MI`** | Transportation equipment interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS013MI.json`](DRS013MI.json) |
| **`DRS015MI`** | Transportation equipment type interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`DRS015MI.json`](DRS015MI.json) |
| **`DRS016MI`** | Loading platform Interface | 14 | `Add, Del, Get, LstLoadPlat, Upd...` | [`DRS016MI.json`](DRS016MI.json) |
| **`DRS018MI`** | Transportation resource interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`DRS018MI.json`](DRS018MI.json) |
| **`DRS020MI`** | Transport resource shift interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`DRS020MI.json`](DRS020MI.json) |
| **`DRS021MI`** | Unloading places per route | 15 | `Add, Delete, Get, List, Select...` | [`DRS021MI.json`](DRS021MI.json) |
| **`DRS029MI`** | Transportation Indicator IDl interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`DRS029MI.json`](DRS029MI.json) |
| **`DRS045MI`** | Time zone | 18 | `ConvertByRef, ConvertByTIZO, GetDIVIData, GetEDESData, GetFACIData...` | [`DRS045MI.json`](DRS045MI.json) |
| **`DRS081MI`** | Packaging holder selection table | 13 | `LstPackHdrDel, RtvHdrPerPacTyp, RtvHdrPerPackNo, RtvHdrPerPackg, FpwVersion...` | [`DRS081MI.json`](DRS081MI.json) |
| **`DRS100MI`** | Shipment | 28 | `CloseShipment, CmfAllPickup, ConnectShipment, CreateShipment, DisconnectShip...` | [`DRS100MI.json`](DRS100MI.json) |
| **`DRS102MI`** | Additional transportation info | 15 | `AddTrnspInfo, CpyTrnspInfo, DltTrnspInfo, GetTrnspInfo, LstTrnspInfo...` | [`DRS102MI.json`](DRS102MI.json) |
| **`DRS150MI`** | Shipment Package Interface | 18 | `AddShipmentPck, ChgShipmentPck, DelShipmentPck, GetShipmentPck, LstShipmentPck...` | [`DRS150MI.json`](DRS150MI.json) |
| **`DRS151MI`** | Shipment Package Detail Interface | 10 | `LstPckInShpPck, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`DRS151MI.json`](DRS151MI.json) |
| **`DRS500MI`** | Freight Rate Calculation | 17 | `ConfirmFCM, CrtFreightPO, DistFCM, GetFCMDet, LstFCMDet...` | [`DRS500MI.json`](DRS500MI.json) |
| **`ECS001MI`** | CAD Integration - Head | 11 | `AddHead, AddLines, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ECS001MI.json`](ECS001MI.json) |
| **`ECS003MI`** | Material/Op. Connect Feature/Options | 13 | `Add, Del, Get, LstService, FpwVersion...` | [`ECS003MI.json`](ECS003MI.json) |
| **`ECS018MI`** | Subcontracting Connect Supplier | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`ECS018MI.json`](ECS018MI.json) |
| **`ECS200MI`** | Engineering order revision interface | 27 | `AddAffSerialNo, AddEO, AddEOLine, AddModRefComp, CopyToNewRev...` | [`ECS200MI.json`](ECS200MI.json) |
| **`ECS300MI`** | Service definition revision interface | 68 | `AddCertService, AddMaintLim, AddMtrl, AddOp, AddOpElement...` | [`ECS300MI.json`](ECS300MI.json) |
| **`ECS420MI`** | Engineering Change Order Head | 17 | `Activate, Add, Copy, Deactivate, Delete...` | [`ECS420MI.json`](ECS420MI.json) |
| **`ECS422MI`** | Engineering Change Order Detail | 15 | `Add, Copy, Delete, Get, List...` | [`ECS422MI.json`](ECS422MI.json) |
| **`ENS100MI`** | Api: Eco Transaction | 11 | `LstDetailsByJob, LstTotalsByProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`ENS100MI.json`](ENS100MI.json) |
| **`EQINFOMI`** | API interface equipment info | 63 | `GetAgrConnModel, GetAgreement, GetEquipment, GetEquipmentLoc, GetMCOAddress...` | [`EQINFOMI.json`](EQINFOMI.json) |
| **`EUS001MI`** | Manages the Tools (Education) | 17 | `Add, Chg, ChgPurPrice, Cpy, Del...` | [`EUS001MI.json`](EUS001MI.json) |
| **`EVS001MI`** | Environment Interface | 21 | `ChkProgramExist, GetBEVersion, GetBJobStatus, GetFieldInfo, LstAutojobs...` | [`EVS001MI.json`](EVS001MI.json) |
| **`EVS002MI`** | Send table data | 24 | `ActivateSubs, AddHost, AddSubscriber, DelHost, DelSubscriber...` | [`EVS002MI.json`](EVS002MI.json) |
| **`EVS006MI`** | Manages the Initial Load | 16 | `Add, Cpy, Dlt, Get, LstByBODNoun...` | [`EVS006MI.json`](EVS006MI.json) |
| **`EVS008MI`** | Manages the Initial Load Event | 16 | `Add, Cpy, Dlt, Get, LstByInitiaLoad...` | [`EVS008MI.json`](EVS008MI.json) |
| **`EVS009MI`** | Manages the Initial Load Event Jobs Interface | 14 | `Add, Cpy, Dlt, Get, Lst...` | [`EVS009MI.json`](EVS009MI.json) |
| **`EVS010MI`** | Asynchronous MI jobs | 12 | `Delete, LstAsyncJobs, SelAsyncTrans, FpwVersion, GetCurrentUser...` | [`EVS010MI.json`](EVS010MI.json) |
| **`EVS100MI`** | Manages the File importing | 12 | `GetImportTempl, ImportFile, LstFiles, FpwVersion, GetCurrentUser...` | [`EVS100MI.json`](EVS100MI.json) |
| **`EXPORTMI`** | Data export | 13 | `LstFields, Search, Select, SelectPad, FpwVersion...` | [`EXPORTMI.json`](EXPORTMI.json) |
| **`EXT001MI`** | Extensibility defined EXT MI program | 15 | `Create, Read, List, Update, ListByBatch...` | [`EXT001MI.json`](EXT001MI.json) |
| **`EXT002MI`** | Extensibility defined EXT MI program | 15 | `Delete, List, ListByBatch, Create, Update...` | [`EXT002MI.json`](EXT002MI.json) |
| **`EXT003MI`** | Extensibility defined EXT MI program | 15 | `Update, Delete, ListByBatch, Create, Read...` | [`EXT003MI.json`](EXT003MI.json) |
| **`EXT005MI`** | Extensibility defined EXT MI program | 15 | `DltStock, GetStock, UpdStock, AddStock, LstStockByBatch...` | [`EXT005MI.json`](EXT005MI.json) |
| **`EXT007MI`** | Extensibility defined EXT MI program | 16 | `DltDebitNote, GetDebitNote, AddCustomerPart, LstDebitNote, DltCustomerPart...` | [`EXT007MI.json`](EXT007MI.json) |
| **`FACETMI`** | Facets interface | 11 | `LstFacets, LstFacetsDescr, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`FACETMI.json`](FACETMI.json) |
| **`FAS001MI`** | Fixed Asset Master | 18 | `Add, AddAsset, Delete, GetAsset, GetDeprType...` | [`FAS001MI.json`](FAS001MI.json) |
| **`FAS002MI`** | Depreciation types interface | 13 | `CrtStdDeprType, Get, Lst, Upd, FpwVersion...` | [`FAS002MI.json`](FAS002MI.json) |
| **`FAS003MI`** | Fixed Asset Value Types | 14 | `CrtStdValueType, Get, Lst, Upd, UpdYTDTrans...` | [`FAS003MI.json`](FAS003MI.json) |
| **`FAS004MI`** | Connect Fixed Asset insurance types | 13 | `Add, Get, Lst, Upd, FpwVersion...` | [`FAS004MI.json`](FAS004MI.json) |
| **`FAS010MI`** | Usage Based  and External User Defined Depreciation Plan | 15 | `AddUsrDefExtHis, DelUsrDefExtHis, LstAssetUsage, LstDepPlan, UpdAssetUsage...` | [`FAS010MI.json`](FAS010MI.json) |
| **`FAS075MI`** | Fixed assets types | 15 | `AddFATypes, CpyFATypes, DltFATypes, GetFATypes, LstFATypes...` | [`FAS075MI.json`](FAS075MI.json) |
| **`FAS076MI`** | Manages the FFSVFA - standared values for asset type | 12 | `GetStdValAsset, LstStsValAsset, UpdStdValAsset, FpwVersion, GetCurrentUser...` | [`FAS076MI.json`](FAS076MI.json) |
| **`FAS077MI`** | Fixed assets depreciation types | 15 | `AddDeprTypes, CpyDeprTypes, DltDeprTypes, GetDeprTypes, LstDeprTypes...` | [`FAS077MI.json`](FAS077MI.json) |
| **`FAS078MI`** | Standard value for value type | 14 | `AddValTypes, DltValTypes, GetValTypes, LstValTypes, UpdValTypes...` | [`FAS078MI.json`](FAS078MI.json) |
| **`FAS220MI`** | Fixed asset value per period | 10 | `GetFAHistoryDtl, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS220MI.json`](FAS220MI.json) |
| **`FAS660MI`** | Manage FA under construction proposal header | 18 | `Dlt, Get, LockProposal, LstByCreatedBy, LstByFixedAsset...` | [`FAS660MI.json`](FAS660MI.json) |
| **`FAS661MI`** | Manage FA under construction proposal details | 15 | `Dlt, ExcludeRecord, Get, IncludeRecord, LstByAccDate...` | [`FAS661MI.json`](FAS661MI.json) |
| **`FAS665MI`** | Process FA under construction proposal | 13 | `Activate, CreateProposal, PrintProposal, RestartAct, FpwVersion...` | [`FAS665MI.json`](FAS665MI.json) |
| **`FAS840MI`** | Depreciation plan simulation header | 10 | `GetSimulation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS840MI.json`](FAS840MI.json) |
| **`FAS841MI`** | Get depreciation plan simulation details | 10 | `LstSimPeriods, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS841MI.json`](FAS841MI.json) |
| **`FAS845MI`** | Depreciation plan simulation batch interface | 10 | `CrtSimulation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FAS845MI.json`](FAS845MI.json) |
| **`FAS955MI`** | Fixed Asset National Consumer Price Index (NCPI) | 15 | `AddDepTpNCPI, CpyDepTpNCPI, DltDepTpNCPI, GetDepTpNCPI, LstDepTpNCPI...` | [`FAS955MI.json`](FAS955MI.json) |
| **`FCS330MI`** | Forecast Distribution Table Interface | 15 | `Add, AddLines, Del, Lst, Sel...` | [`FCS330MI.json`](FCS330MI.json) |
| **`FCS350MI`** | Manual Forecast | 11 | `LstForQty, UpdForQty, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`FCS350MI.json`](FCS350MI.json) |
| **`FCS366MI`** | Forecast Pacing | 10 | `LstForPacing, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`FCS366MI.json`](FCS366MI.json) |
| **`FLS001MI`** | Operational log sequence interface | 13 | `AddDelayReport, AddLogSequence, DelDelayReport, DelLogSequence, FpwVersion...` | [`FLS001MI.json`](FLS001MI.json) |
| **`GENERAL`** | Transactions available in all MI-programs | 9 | `FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel, GetMIBuild...` | [`GENERAL.json`](GENERAL.json) |
| **`GLS010MI`** | Bank operation | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`GLS010MI.json`](GLS010MI.json) |
| **`GLS015MI`** | Standard Voucher | 14 | `Add, Del, Get, Lst, Upd...` | [`GLS015MI.json`](GLS015MI.json) |
| **`GLS016MI`** | Standard Voucher Lines | 15 | `Add, CheckBalance, Del, Get, Lst...` | [`GLS016MI.json`](GLS016MI.json) |
| **`GLS020MI`** | Account addition table | 19 | `AddHead, AddLine, DltHead, DltLine, GetHead...` | [`GLS020MI.json`](GLS020MI.json) |
| **`GLS030MI`** | Account Translation Scenario | 21 | `AddTrScenHead, AddTrScenLine, CpyTrScenHead, DltTrScenHead, DltTrScenLine...` | [`GLS030MI.json`](GLS030MI.json) |
| **`GLS032MI`** | Account Translation Scenario Grouping | 14 | `AddGrid, DltGrid, GetGrid, LstGrid, UpdGrid...` | [`GLS032MI.json`](GLS032MI.json) |
| **`GLS060MI`** | Allocation tables | 45 | `AddAllocBase, AddAllocBaseLn, AddAllocSel, AddAllocSelLn, AddAllocTarg...` | [`GLS060MI.json`](GLS060MI.json) |
| **`GLS080MI`** | Settings – Corporate Accounting | 14 | `AddCorpAccSettg, DltCorpAccSettg, GetCorpAccSettg, LstCorpAccSettg, UpdCorpAccSettg...` | [`GLS080MI.json`](GLS080MI.json) |
| **`GLS085MI`** | Voucher number series for corporate accounting | 14 | `AddReplVoNoSer, DltReplVoNoSer, GetReplVoNoSer, LstReplVoNoSer, UpdReplVoNoSer...` | [`GLS085MI.json`](GLS085MI.json) |
| **`GLS180MI`** | Bank Statement Reconciliation | 17 | `AddHead, AddHeadRecord, AddHeadRecord2, AddLine, AddLineRecord...` | [`GLS180MI.json`](GLS180MI.json) |
| **`GLS200MI`** | General Ledger Information | 16 | `GetVoucherHead, GetVoucherHead2, GetVoucherLine, LstVoucherLines, LstVouchersByDt...` | [`GLS200MI.json`](GLS200MI.json) |
| **`GLS215MI`** | General Ledger Balance File | 13 | `GetBitFromPtid, GetPerBalance, GetPerOpenBal, LstPerBalances, FpwVersion...` | [`GLS215MI.json`](GLS215MI.json) |
| **`GLS250MI`** | General Ledger Additonal Information | 10 | `LstInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`GLS250MI.json`](GLS250MI.json) |
| **`GLS385MI`** | Internal reconciliation – Header | 15 | `Clear, Close, Dlt, Get, Lst...` | [`GLS385MI.json`](GLS385MI.json) |
| **`GLS386MI`** | Internal reconciliation – Details | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`GLS386MI.json`](GLS386MI.json) |
| **`GLS387MI`** | Internal reconciliation – Manual | 15 | `CompleteRecon, CreateRecon, FinishRecon, ReallocateLine, ReleaseLine...` | [`GLS387MI.json`](GLS387MI.json) |
| **`GLS470MI`** | Add records in period accounting table | 10 | `AddPeriodAcctng, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`GLS470MI.json`](GLS470MI.json) |
| **`GLS490MI`** | Project Accounting Settings | 11 | `GetProject, LstProject, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS490MI.json`](GLS490MI.json) |
| **`GLS495MI`** | Project Accounting Calculation Round | 11 | `GetProjectAccPr, LstProjectAccPr, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS495MI.json`](GLS495MI.json) |
| **`GLS496MI`** | Project Accounting Calculation Round Details | 11 | `GetProjectAccDT, LstProjectAccDT, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`GLS496MI.json`](GLS496MI.json) |
| **`GLS840MI`** | Finance Interface | 17 | `AddBatchHead, AddBatchLine, AddBatchLineFld, CtrlBatch, DelBatch...` | [`GLS840MI.json`](GLS840MI.json) |
| **`GMS200MI`** | Group Consolidation | 12 | `GetParentInfo, GetTransfTot, LstTransfDet, FpwVersion, GetCurrentUser...` | [`GMS200MI.json`](GMS200MI.json) |
| **`GTCN10MI`** | Golden Tax | 14 | `GetBatchHead, LstInvDetails, LstInvHeadprBch, LstInvLines, UpdInvoiceNo...` | [`GTCN10MI.json`](GTCN10MI.json) |
| **`IMS010MI`** | Manage issue management types | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS010MI.json`](IMS010MI.json) |
| **`IMS011MI`** | Manage issue management types per language | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS011MI.json`](IMS011MI.json) |
| **`IMS020MI`** | Manage issue management reason codes | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS020MI.json`](IMS020MI.json) |
| **`IMS021MI`** | Manage issue management reason codes language texts | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS021MI.json`](IMS021MI.json) |
| **`IMS025MI`** | Reason code - default values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS025MI.json`](IMS025MI.json) |
| **`IMS030MI`** | Manage issue management action codes | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS030MI.json`](IMS030MI.json) |
| **`IMS031MI`** | Manage issue management action codes language texts | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS031MI.json`](IMS031MI.json) |
| **`IMS035MI`** | Action code - default values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS035MI.json`](IMS035MI.json) |
| **`IMS040MI`** | Manage issue management action groups | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS040MI.json`](IMS040MI.json) |
| **`IMS045MI`** | Manage issue management action group actions | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS045MI.json`](IMS045MI.json) |
| **`IMS060MI`** | Manage issue management relation types | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS060MI.json`](IMS060MI.json) |
| **`IMS100MI`** | Manage issue management headers | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS100MI.json`](IMS100MI.json) |
| **`IMS101MI`** | Manage issue management lines | 16 | `Add, Cpy, Dlt, GenActions, Get...` | [`IMS101MI.json`](IMS101MI.json) |
| **`IMS102MI`** | Manage issue management actions | 16 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS102MI.json`](IMS102MI.json) |
| **`IMS103MI`** | Issue management - addtional values | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS103MI.json`](IMS103MI.json) |
| **`IMS105MI`** | Manage issue management related issues | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS105MI.json`](IMS105MI.json) |
| **`IMS110MI`** | Manage issue management watchers | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`IMS110MI.json`](IMS110MI.json) |
| **`IMS700MI`** | Manage issue management action codes | 10 | `SetIMStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`IMS700MI.json`](IMS700MI.json) |
| **`INVBODMI`** | Api:Common Invoice | 37 | `AddErrorLog, AddGovInfo, CrtManualInv, DltGovInfo, GetGovInfo...` | [`INVBODMI.json`](INVBODMI.json) |
| **`IPWAPPMI`** | IPW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`IPWAPPMI.json`](IPWAPPMI.json) |
| **`LTS100MI`** | Api: LTR Agreement Head | 19 | `AddLTRHead, DltLTRAgree, GetLTRAgree, LstLTRByAgree, LstLTRByCO...` | [`LTS100MI.json`](LTS100MI.json) |
| **`LTS101MI`** | Api: LTR Agreement line | 33 | `AddLTRHead, AddLeaseCond, AddLeasingLine, AddPreCalc, DelLTRAgree...` | [`LTS101MI.json`](LTS101MI.json) |
| **`LTS108MI`** | Api: Leasing - curves | 12 | `LstBothCurve, LstCustCurve, LstFundCurve, FpwVersion, GetCurrentUser...` | [`LTS108MI.json`](LTS108MI.json) |
| **`LTS200MI`** | Api: LTR Funding | 20 | `AddFundDetail, AddFunding, DltFundDetail, DltFunding, GetFundDetail...` | [`LTS200MI.json`](LTS200MI.json) |
| **`LTS350MI`** | Long Term Rental invoice interface | 10 | `GetInvHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`LTS350MI.json`](LTS350MI.json) |
| **`LTS401MI`** | API: Agreement Head. Simulate Totals | 11 | `LstSimulIndex, SimulIndexUpd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`LTS401MI.json`](LTS401MI.json) |
| **`MDBREADMI`** | Generic MI for reading tables | 16 | `GetCIDVEN00, LstADECPL20M3C1, LstFSLEDG00M3C1, LstMITMAS00M3C1, LstMOOPGM10M3C1...` | [`MDBREADMI.json`](MDBREADMI.json) |
| **`MFBR01MI`** | Manage country specific customer local exception information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MFBR01MI.json`](MFBR01MI.json) |
| **`MFS025MI`** | Cash Pooling and Loan Management IDs | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MFS025MI.json`](MFS025MI.json) |
| **`MFS169MI`** | Fixed Invoice Number Prefix | 16 | `AddInvPrefix, CpyInvPrefix, DelInvPrefix, GetInvInfo, GetInvPrefix...` | [`MFS169MI.json`](MFS169MI.json) |
| **`MFS300MI`** | Cash Pooling and Loan Management Proposals | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`MFS300MI.json`](MFS300MI.json) |
| **`MFS301MI`** | Cash Pooling and Loan Management Proposal Details per Date | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MFS301MI.json`](MFS301MI.json) |
| **`MFS302MI`** | Cash Pooling and Loan Management Proposal Details per Pool | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MFS302MI.json`](MFS302MI.json) |
| **`MFS303MI`** | Cash Pooling and Loan Management Proposal Details per Invoic | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`MFS303MI.json`](MFS303MI.json) |
| **`MFS304MI`** | Print Cash Pooling and Loan Management Proposal | 10 | `Prt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MFS304MI.json`](MFS304MI.json) |
| **`MFS307MI`** | Confirm Cash Pooling and Loan Management Proposal | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MFS307MI.json`](MFS307MI.json) |
| **`MFS610MI`** | Customer Local exception | 22 | `Add, Dlt, Get, GetBCAgLocalExc, GetFinLocalExc...` | [`MFS610MI.json`](MFS610MI.json) |
| **`MFS620MI`** | Supplier Local Exception Interface | 14 | `AddSuppLocalExc, DelSuppLocalExc, GetSuppLocalExc, LstSuppLocalExc, UpdSuppLocalExc...` | [`MFS620MI.json`](MFS620MI.json) |
| **`MHS001MI`** | Interface Item Master | 24 | `AddIntItmMst, ChgIntItmMst, ChgIntItmMstFld, CpyIntItmMst, DelIntItmMst...` | [`MHS001MI.json`](MHS001MI.json) |
| **`MHS002MI`** | Interface Item/Warehouse | 17 | `AddIntItmWhs, ChgIntItmWhs, CpyIntItmWhs, DelIntItmWhs, GetIntItmWhs...` | [`MHS002MI.json`](MHS002MI.json) |
| **`MHS003MI`** | Interface Item/Facility | 17 | `AddIntItmFac, ChgIntItmFac, CpyIntItmFac, DelIntItmFac, GetIntItmFac...` | [`MHS003MI.json`](MHS003MI.json) |
| **`MHS005MI`** | Interface Item/Customer | 17 | `AddIntItmCus, ChgIntItmCus, CpyIntItmCus, DelIntItmCus, GetIntItmCus...` | [`MHS005MI.json`](MHS005MI.json) |
| **`MHS015MI`** | Interface Item/Alt U/M | 17 | `AddIntItmAum, ChgIntItmAum, CpyIntItmAum, DelIntItmAum, GetIntItmAum...` | [`MHS015MI.json`](MHS015MI.json) |
| **`MHS020MI`** | Interface Item/Related Item | 17 | `AddIntItmAlt, ChgIntItmAlt, CpyIntItmAlt, DelIntItmAlt, GetIntItmAlt...` | [`MHS020MI.json`](MHS020MI.json) |
| **`MHS025MI`** | Interface Item/Alias | 17 | `AddIntItmAli, ChgIntItmAli, CpyIntItmAli, DelIntItmAli, GetIntItmAli...` | [`MHS025MI.json`](MHS025MI.json) |
| **`MHS040MI`** | Interface Item/Supplier | 17 | `AddIntItmVen, ChgIntItmVen, CpyIntItmVen, DelIntItmVen, GetIntItmVen...` | [`MHS040MI.json`](MHS040MI.json) |
| **`MHS200MI`** | Interface Item | 22 | `AddIntItm, AddIntSku, ChgIntStyle, GetIntStyle, ImpIntItm...` | [`MHS200MI.json`](MHS200MI.json) |
| **`MHS220MI`** | Interface SKU/Style Relation | 17 | `AddStySkuRel, ChgStySkuRel, CpyStySkuRel, DelStySkuRel, GetStySkuRel...` | [`MHS220MI.json`](MHS220MI.json) |
| **`MHS221MI`** | Interface Style/Season | 12 | `AddStySea, DelStySea, LstStySea, FpwVersion, GetCurrentUser...` | [`MHS221MI.json`](MHS221MI.json) |
| **`MHS630MI`** | Item master extract interface | 12 | `LstItemExtract, PrcItemExtract, SelItemExtract, FpwVersion, GetCurrentUser...` | [`MHS630MI.json`](MHS630MI.json) |
| **`MHS635MI`** | Item alias extract interface | 12 | `LstAliasExtract, LstAliasViaItem, PrcAliasExtract, FpwVersion, GetCurrentUser...` | [`MHS635MI.json`](MHS635MI.json) |
| **`MHS640MI`** | Supplier extract interface | 15 | `LstSupplier, LstSupplierAddr, LstSupplierPur, PrcSupplier, PrcSupplierAddr...` | [`MHS640MI.json`](MHS640MI.json) |
| **`MHS800MI`** | Expected receipts download interface | 23 | `GetExpRec, GetExpRecDetail, GetExpRecPac, GetExpRecPacDet, LstExpPOPac...` | [`MHS800MI.json`](MHS800MI.json) |
| **`MHS805MI`** | Pre-allocation download interface | 11 | `LstPreAlloc, PrcPreAlloc, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MHS805MI.json`](MHS805MI.json) |
| **`MHS810MI`** | Picking list download interface | 18 | `ListDetByWave, LstPickAssign, LstPickDetail, LstPickList, LstPickListAdr...` | [`MHS810MI.json`](MHS810MI.json) |
| **`MHS820MI`** | List movement tasks | 11 | `LstStkTranTask, PrcStkTranTask, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MHS820MI.json`](MHS820MI.json) |
| **`MHS850MI`** | Order initiated stock transaction interface | 72 | `AddAttribute, AddCOPick, AddCOReturn, AddCfmPickList, AddCorrPickLine...` | [`MHS850MI.json`](MHS850MI.json) |
| **`MHS854MI`** | SubLine  interface | 15 | `AddSublot, DltSublot, GetSublot, LstSublots, SetCurrentDate...` | [`MHS854MI.json`](MHS854MI.json) |
| **`MLS170MI`** | Maint CO Invoice Specification Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MLS170MI.json`](MLS170MI.json) |
| **`MMS004MI`** | Meters on Item master | 14 | `Add, Get, List, Select, Upd...` | [`MMS004MI.json`](MMS004MI.json) |
| **`MMS005MI`** | Warehouse interface | 19 | `AddWarehouse, CpyRelInfo, DltWarehouse, GetFaclist, GetWarehouse...` | [`MMS005MI.json`](MMS005MI.json) |
| **`MMS006MI`** | Warehouse. Connect to Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS006MI.json`](MMS006MI.json) |
| **`MMS008MI`** | Place interface | 13 | `AddPlace, GetPlace, LstPlaces, UpdPlace, FpwVersion...` | [`MMS008MI.json`](MMS008MI.json) |
| **`MMS009MI`** | Warehouse. Connect to Group | 14 | `Add, Delete, Get, List, Update...` | [`MMS009MI.json`](MMS009MI.json) |
| **`MMS010MI`** | Stock location interface | 19 | `AddLocation, ChgLocation, DelLocation, GetLocation, ListLocations...` | [`MMS010MI.json`](MMS010MI.json) |
| **`MMS015MI`** | Alterative units | 15 | `Add, Convert, Dlt, Get, Lst...` | [`MMS015MI.json`](MMS015MI.json) |
| **`MMS016MI`** | Style information interface | 15 | `Add, Copy, Delete, Get, List...` | [`MMS016MI.json`](MMS016MI.json) |
| **`MMS017MI`** | Features - Style interface | 14 | `Add, Copy, Delete, Get, List...` | [`MMS017MI.json`](MMS017MI.json) |
| **`MMS018MI`** | Connect composition to style Interface | 15 | `Add, Copy, Delete, Get, List...` | [`MMS018MI.json`](MMS018MI.json) |
| **`MMS019MI`** | Item -feature interface | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS019MI.json`](MMS019MI.json) |
| **`MMS020MI`** | Related items interface | 14 | `AddRelatedItem, CpyRelatedItem, DelRelatedItem, LstItemRelation, UpdRelatedItem...` | [`MMS020MI.json`](MMS020MI.json) |
| **`MMS021MI`** | Item Hierarchy interface | 15 | `AddItmHierarchy, DelItmHierarchy, GetHierarchySet, GetItmHierarchy, LstItmHierarchy...` | [`MMS021MI.json`](MMS021MI.json) |
| **`MMS022MI`** | Item Search Group interface | 16 | `AddItmSearchGrp, AddLngTxt, DelItmSearchGrp, GetItmSearchGrp, GetSearchGrpSet...` | [`MMS022MI.json`](MMS022MI.json) |
| **`MMS023MI`** | Item-Pack Interface | 13 | `AddItemPack, DltItemPack, GetItemPack, LstItemPack, FpwVersion...` | [`MMS023MI.json`](MMS023MI.json) |
| **`MMS025MI`** | Alias numbers interface | 16 | `AddAlias, DltAlias, GetAlias, GetItem, LstAlias...` | [`MMS025MI.json`](MMS025MI.json) |
| **`MMS028MI`** | Composition interface | 14 | `AddComposition, DltComposition, GetComposition, LstComposition, UpdComposition...` | [`MMS028MI.json`](MMS028MI.json) |
| **`MMS030MI`** | Item description / language | 15 | `Add, Delete, Get, GetCustTblExt, List...` | [`MMS030MI.json`](MMS030MI.json) |
| **`MMS037MI`** | Planning Policy | 10 | `LstPlanPolicy, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS037MI.json`](MMS037MI.json) |
| **`MMS040MI`** | Stock Area | 15 | `AddStockZone, CpyStockZone, DltStockZone, GetStockZone, LstStockZone...` | [`MMS040MI.json`](MMS040MI.json) |
| **`MMS047MI`** | Manage packaging group | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MMS047MI.json`](MMS047MI.json) |
| **`MMS050MI`** | Packaging interface | 15 | `AddPackaging, DelPackaging, GetPackaging, GetPackagingItm, LstPackaging...` | [`MMS050MI.json`](MMS050MI.json) |
| **`MMS053MI`** | Packaging/Customer Item interface | 21 | `AddItemConnPkg, DelItemConnPkg, GetConnPerPkg, GetItemConnPkg, GetPkgItemGrp...` | [`MMS053MI.json`](MMS053MI.json) |
| **`MMS055MI`** | Manage items connect standard packaging | 16 | `AddItmStdPkg, CpyItmStdPkg, DelItmStdPkg, GetItmStdPkg, LstItmStdPkg...` | [`MMS055MI.json`](MMS055MI.json) |
| **`MMS057MI`** | Stock Location Type/Item | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MMS057MI.json`](MMS057MI.json) |
| **`MMS059MI`** | Supply model. Open lines | 14 | `Add, Delete, Get, List, Update...` | [`MMS059MI.json`](MMS059MI.json) |
| **`MMS060MI`** | Detailed item balances interface | 25 | `Get, List, LstBalID, LstBalIDByOrd, LstContainer...` | [`MMS060MI.json`](MMS060MI.json) |
| **`MMS065MI`** | Item Loacation interface | 15 | `AddItemLocation, CpyItemLocation, DltItemLocation, GetItemLocation, LstItemLocation...` | [`MMS065MI.json`](MMS065MI.json) |
| **`MMS072MI`** | Cumulative quantity interface | 11 | `GetCumulative, LstCumulative, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS072MI.json`](MMS072MI.json) |
| **`MMS074MI`** | Composition group interface | 14 | `AddCompGroup, DltCompGroup, GetCompGroup, LstCompGroups, UpdCompGroup...` | [`MMS074MI.json`](MMS074MI.json) |
| **`MMS076MI`** | Style. Create item interface | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS076MI.json`](MMS076MI.json) |
| **`MMS080MI`** | Material Planning Interface | 18 | `LstItemWarehous, LstMtPlByItmWhs, LstPOHBalance, SelByCoProd, SelForcTrans...` | [`MMS080MI.json`](MMS080MI.json) |
| **`MMS090MI`** | Item Statistics | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS090MI.json`](MMS090MI.json) |
| **`MMS092MI`** | Safety Stock Reason Code Interface | 14 | `AddSSReasonCode, DltSSReasonCode, GetSSReasonCode, LstSSReasonCode, UpdSSReasonCode...` | [`MMS092MI.json`](MMS092MI.json) |
| **`MMS095MI`** | Copy Item Statistics Interface | 13 | `Add, Del, Imp, ImpAll, FpwVersion...` | [`MMS095MI.json`](MMS095MI.json) |
| **`MMS100MI`** | Requisition/distribution orders interface | 19 | `AddDOHead, AddDOLine, DltDOLine, GetHead, GetLine...` | [`MMS100MI.json`](MMS100MI.json) |
| **`MMS105MI`** | Container Movement | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS105MI.json`](MMS105MI.json) |
| **`MMS120MI`** | Perform Detailed Allocation | 15 | `AllocateOrdLine, AllocateOrder, DeAllocateOrLne, DeAllocateOrder, PerfDetAlloc...` | [`MMS120MI.json`](MMS120MI.json) |
| **`MMS122MI`** | Allocation Shut Off Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS122MI.json`](MMS122MI.json) |
| **`MMS124MI`** | Allocation control selection  table interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS124MI.json`](MMS124MI.json) |
| **`MMS130MI`** | Reclassification of lot | 10 | `RclLotSts, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS130MI.json`](MMS130MI.json) |
| **`MMS160MI`** | Location Select | 12 | `ChkPutAwayLoc, LstPutAwayLoc, RtvPutAwayLoc, FpwVersion, GetCurrentUser...` | [`MMS160MI.json`](MMS160MI.json) |
| **`MMS162MI`** | Stock levels on Style level | 13 | `GetPrePackNo, LstStyleItem, LstStyleWhsBal, LstWhsBal, FpwVersion...` | [`MMS162MI.json`](MMS162MI.json) |
| **`MMS170MI`** | Location replenishment interface | 12 | `CrtReqOrder, LstByWhs, Release, FpwVersion, GetCurrentUser...` | [`MMS170MI.json`](MMS170MI.json) |
| **`MMS175MI`** | Movement. Change location for and item interface | 10 | `Update, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS175MI.json`](MMS175MI.json) |
| **`MMS200MI`** | Item toolbox interface | 86 | `AddItmBasic, AddItmFac, AddItmTrpFrelnf, AddItmTrplnf, AddItmViaItmTyp...` | [`MMS200MI.json`](MMS200MI.json) |
| **`MMS230MI`** | Container interface | 15 | `AddContainer, CpyContainer, DltContainer, GetContainer, LstContainers...` | [`MMS230MI.json`](MMS230MI.json) |
| **`MMS235MI`** | Lot Master interface | 22 | `AddFreeText, AddItmLot, DelItmLot, GetItmLot, GetLotItm...` | [`MMS235MI.json`](MMS235MI.json) |
| **`MMS240MI`** | Item serialnumber/equipment interface | 33 | `Add, AddEquipment, AddFixedAsset, AddOEM, CpySerItem...` | [`MMS240MI.json`](MMS240MI.json) |
| **`MMS241MI`** | Equipment Ser Item Meter Reading | 11 | `LstMeters, LstMtrSystemLvl, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS241MI.json`](MMS241MI.json) |
| **`MMS250MI`** | Serialnumber based pricing | 16 | `Add, Del, GetSerialPrice, LstItem, LstItemSerCurr...` | [`MMS250MI.json`](MMS250MI.json) |
| **`MMS252MI`** | Equipment class | 11 | `Get, List, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS252MI.json`](MMS252MI.json) |
| **`MMS259MI`** | Equipment group | 14 | `Add, Dlt, Get, List, Upd...` | [`MMS259MI.json`](MMS259MI.json) |
| **`MMS300MI`** | Stocktake - head | 11 | `CrtReqLines, LstPhysInvHead, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS300MI.json`](MMS300MI.json) |
| **`MMS301MI`** | Report stocktake interface | 23 | `AddStockTakeDet, AddStockTakeHea, ConfirmStockBal, GetStockTakeDet, LstLocation...` | [`MMS301MI.json`](MMS301MI.json) |
| **`MMS307MI`** | Physical Inventory Variance | 11 | `GetPhysInvVar, LstPhysInvVar, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS307MI.json`](MMS307MI.json) |
| **`MMS310MI`** | Quick inventory counting interface | 13 | `Get, List, Update, UpdateViaAlias, FpwVersion...` | [`MMS310MI.json`](MMS310MI.json) |
| **`MMS360MI`** | Recalassification - CW | 11 | `UpdCatchWeight, UpdSublotCW, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MMS360MI.json`](MMS360MI.json) |
| **`MMS450MI`** | Packing instructions | 13 | `LstPckInstByOrd, LstPckInstCons, LstPckInstDet, LstPckInstLines, FpwVersion...` | [`MMS450MI.json`](MMS450MI.json) |
| **`MMS460MI`** | Package Definitions | 18 | `AddKitPackDef, AddPackDefHead, AddPackDefLine, ChgPackDefHead, ChgPackDefLine...` | [`MMS460MI.json`](MMS460MI.json) |
| **`MMS465MI`** | Unpack a pre-pack | 10 | `UnpackKit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MMS465MI.json`](MMS465MI.json) |
| **`MMS470MI`** | Package Interface | 21 | `AddPackStk, CalcPackLevel, ChangePackStk, ConPacStkNoCalc, ConnectPackStk...` | [`MMS470MI.json`](MMS470MI.json) |
| **`MMS472MI`** | Sublot interface | 21 | `AddSublot, DltSublot, GetSublot, LstSelect, LstSublot...` | [`MMS472MI.json`](MMS472MI.json) |
| **`MMS476MI`** | Sublot Policy interface. | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MMS476MI.json`](MMS476MI.json) |
| **`MMS850MI`** | Internal stock transaction interface | 48 | `AddAdjust, AddLocClean, AddLotBlend, AddMOOrdLess, AddMove...` | [`MMS850MI.json`](MMS850MI.json) |
| **`MNGDIMMI`** | Initiate Browse on error codes | 20 | `AddErrorCode1, AddErrorCode2, AddErrorCode3, BrwsErrCde1, BrwsErrCde2...` | [`MNGDIMMI.json`](MNGDIMMI.json) |
| **`MNS030MI`** | Get correct HB moniker for diffrent applications | 11 | `GetMonikerApp, LstMonikerApp, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS030MI.json`](MNS030MI.json) |
| **`MNS035MI`** | Infor standard Workspace entities | 15 | `AddEntityMap, DelEntityMap, GetEntityMap, LstByEntity, LstByField...` | [`MNS035MI.json`](MNS035MI.json) |
| **`MNS036MI`** | Infor Drillback Mapping | 14 | `AddDrillbackMap, ChgDrillbackMap, DelDrillbackMap, GetDrillbackMap, LstDrillbackMap...` | [`MNS036MI.json`](MNS036MI.json) |
| **`MNS051MI`** | Manage Subsystem Job | 24 | `AddNewInstance, CrtStandard, Dlt, EndAll, EndJob...` | [`MNS051MI.json`](MNS051MI.json) |
| **`MNS080MI`** | Menu version management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS080MI.json`](MNS080MI.json) |
| **`MNS090MI`** | System Settings Interface | 12 | `ClearEmailPW, Get, Upd, FpwVersion, GetCurrentUser...` | [`MNS090MI.json`](MNS090MI.json) |
| **`MNS095MI`** | Company interface | 14 | `Add, Del, Get, Lst, Upd...` | [`MNS095MI.json`](MNS095MI.json) |
| **`MNS096MI`** | IEP Interface | 11 | `GetIEPStatus, LstIEPStatus, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS096MI.json`](MNS096MI.json) |
| **`MNS100MI`** | Manages the Division Master Data | 14 | `GetActiveDates, GetAddBasicData, GetBasicData, LstDivisions, SetMigrateDate...` | [`MNS100MI.json`](MNS100MI.json) |
| **`MNS105MI`** | System Languages | 17 | `AddLng, ChgLng, ChkLng, CpyLng, DelLng...` | [`MNS105MI.json`](MNS105MI.json) |
| **`MNS110MI`** | Function management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS110MI.json`](MNS110MI.json) |
| **`MNS111MI`** | Functions - Menu | 20 | `Add, Cpy, Dlt, Get, List...` | [`MNS111MI.json`](MNS111MI.json) |
| **`MNS112MI`** | Function - program management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS112MI.json`](MNS112MI.json) |
| **`MNS120MI`** | File Header Information Interface | 16 | `Add, Chg, Del, GenStandard, Get...` | [`MNS120MI.json`](MNS120MI.json) |
| **`MNS121MI`** | Table Fields | 10 | `Get, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MNS121MI.json`](MNS121MI.json) |
| **`MNS130MI`** | Template Item Interface | 16 | `AddConstant, CpyConstant, DltAllConstants, DltConstant, GetConstant...` | [`MNS130MI.json`](MNS130MI.json) |
| **`MNS150MI`** | User | 26 | `Add, AddUsrPerCmpDiv, ChgDefaultValue, ChgUsrPerCmpDiv, ClearPinCode...` | [`MNS150MI.json`](MNS150MI.json) |
| **`MNS155MI`** | Manages the User Settings Record in CMNUSR table | 11 | `UpdUserSettings, ValidatePinCode, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS155MI.json`](MNS155MI.json) |
| **`MNS204MI`** | Manages the Output Service Selection | 14 | `AddOutService, DltOutService, GetOutService, LstOutServices, UpdOutService...` | [`MNS204MI.json`](MNS204MI.json) |
| **`MNS205MI`** | Manages the output media selections | 22 | `AddArchiveMedia, AddFaxMedia, AddFileMedia, AddMailMedia, AddPrtMedia...` | [`MNS205MI.json`](MNS205MI.json) |
| **`MNS206MI`** | Output management | 11 | `SbmOutput, UpdControl, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MNS206MI.json`](MNS206MI.json) |
| **`MNS215MI`** | Manages the Output Media Selection in CCM110 table | 20 | `AddMedia, ConfirmJob, CopyMedia, DeleteMedia, DeselectMedia...` | [`MNS215MI.json`](MNS215MI.json) |
| **`MNS216MI`** | Manages the Output Service | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS216MI.json`](MNS216MI.json) |
| **`MNS217MI`** | Manages the Service Type | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS217MI.json`](MNS217MI.json) |
| **`MNS218MI`** | Manages the Output Server in COSRVR table | 14 | `AddOutServer, DltOutServer, GetOutServer, LstOutServer, UpdOutServer...` | [`MNS218MI.json`](MNS218MI.json) |
| **`MNS260MI`** | MBM Initiator | 29 | `AddMBMInit, AddMBMInitLRFld, AddMBMLog, DelMBMInit, DelMBMInitLRFld...` | [`MNS260MI.json`](MNS260MI.json) |
| **`MNS271MI`** | Tool Interface | 13 | `DltGrpCntJob, GetGrpCntJob, LstGrpCntJob, SendGrpCntJob, FpwVersion...` | [`MNS271MI.json`](MNS271MI.json) |
| **`MNS272MI`** | Grouped content jobs - included jobs | 12 | `DltIncludedJobs, GetIncludedJobs, LstIncludedJobs, FpwVersion, GetCurrentUser...` | [`MNS272MI.json`](MNS272MI.json) |
| **`MNS300MI`** | Job queue management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS300MI.json`](MNS300MI.json) |
| **`MNS310MI`** | Job definition management | 14 | `Add, Cpy, Dlt, Get, Upd...` | [`MNS310MI.json`](MNS310MI.json) |
| **`MNS320MI`** | Job Interface | 12 | `Dlt, Get, Lst, FpwVersion, GetCurrentUser...` | [`MNS320MI.json`](MNS320MI.json) |
| **`MNS405MI`** | Manages the Role per User | 15 | `Add, AddPermissions, Dlt, Get, Lst...` | [`MNS405MI.json`](MNS405MI.json) |
| **`MNS410MI`** | Roles per User | 16 | `Add, Dlt, Get, Lst, LstRoles...` | [`MNS410MI.json`](MNS410MI.json) |
| **`MNS415MI`** | User Class | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`MNS415MI.json`](MNS415MI.json) |
| **`MNS416MI`** | User per User Class | 14 | `Add, Dlt, Get, Lst, Upd...` | [`MNS416MI.json`](MNS416MI.json) |
| **`MNS420MI`** | Report Configuration Group Definitions | 14 | `Add, Chg, Dlt, Get, Lst...` | [`MNS420MI.json`](MNS420MI.json) |
| **`MNS425MI`** | Report Manager User | 14 | `Add, Chg, Dlt, Get, Lst...` | [`MNS425MI.json`](MNS425MI.json) |
| **`MNS910MI`** | Mass Update in Menu System | 10 | `UpdMenu, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MNS910MI.json`](MNS910MI.json) |
| **`MNTAGRMI`** | Agreement Line | 15 | `GetAgrContent, GetAgrLnDetail, GetMCOLineTotal, SelAgrContent, SelAgrLine...` | [`MNTAGRMI.json`](MNTAGRMI.json) |
| **`MOS018MI`** | Subcontracting supplier | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MOS018MI.json`](MOS018MI.json) |
| **`MOS049MI`** | Orderless reporting WO interface | 11 | `PutAway, RepEndProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS049MI.json`](MOS049MI.json) |
| **`MOS050MI`** | Maintenance order receipt interface | 10 | `RptReceipt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS050MI.json`](MOS050MI.json) |
| **`MOS054MI`** | Api: Service Error Report | 11 | `GetSerError, UpdSerError, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS054MI.json`](MOS054MI.json) |
| **`MOS057MI`** | Service Error report | 26 | `Add, AddText, DltText, Get, GetMain...` | [`MOS057MI.json`](MOS057MI.json) |
| **`MOS060MI`** | Work Order Report Issue | 11 | `DltIssue, RptIssue, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS060MI.json`](MOS060MI.json) |
| **`MOS070MI`** | Maintenance time report interface | 17 | `CloseAllOp, CloseOp, Confirm, DeleteStartStop, ReportStartStop...` | [`MOS070MI.json`](MOS070MI.json) |
| **`MOS085MI`** | Maintenance inspections interface | 13 | `AddInspText, ClsInsp, LstInsp, RptInsp, FpwVersion...` | [`MOS085MI.json`](MOS085MI.json) |
| **`MOS087MI`** | Maintenance permits interface | 11 | `LstPermits, RptPermits, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS087MI.json`](MOS087MI.json) |
| **`MOS095MI`** | Operation transaction | 20 | `Approve, Dlt, Get, LstDateTrans, LstOperTrans...` | [`MOS095MI.json`](MOS095MI.json) |
| **`MOS100MI`** | Maintenance Work order | 56 | `AddInboxNetwork, AddInboxOp, AddInboxOrder, AddMtrl, AddOp...` | [`MOS100MI.json`](MOS100MI.json) |
| **`MOS102MI`** | Api; Logg Records | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`MOS102MI.json`](MOS102MI.json) |
| **`MOS104MI`** | Operation Element interface | 18 | `AddOpElement, AllocTool, ChgOpElement, DeAllocTool, DltOpElement...` | [`MOS104MI.json`](MOS104MI.json) |
| **`MOS105MI`** | Purchase interface for work order | 14 | `AddPoReq, ChgPoReq, CrtPop, UpdCostOnWoMat, UpdPoLine...` | [`MOS105MI.json`](MOS105MI.json) |
| **`MOS120MI`** | Work order type | 15 | `Add, Copy, Delete, Get, List...` | [`MOS120MI.json`](MOS120MI.json) |
| **`MOS122MI`** | Agreement order type | 15 | `AddConnFacility, CpyConnFacility, DltConnFacility, GetConnFacility, LstConnFacility...` | [`MOS122MI.json`](MOS122MI.json) |
| **`MOS124MI`** | Removal Installation Transactions | 11 | `GetLatestRem, PrintRemovalTag, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS124MI.json`](MOS124MI.json) |
| **`MOS125MI`** | Maintenance Removal Installation | 10 | `RemoveInstall, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS125MI.json`](MOS125MI.json) |
| **`MOS127MI`** | Tool interface - simple | 18 | `Add, Cpy, Dlt, Get, Lst...` | [`MOS127MI.json`](MOS127MI.json) |
| **`MOS140MI`** | PrintWorkOrder | 10 | `PrintWorkOrder, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS140MI.json`](MOS140MI.json) |
| **`MOS156MI`** | Ad hoc address repository interface | 16 | `Add, Chg, Delete, Get, LstByCustAddr...` | [`MOS156MI.json`](MOS156MI.json) |
| **`MOS160MI`** | Maintenance meter interface | 15 | `CorrCalcMeter, CorrMeterRead, GetMeterValue, LstMeterValue, LstSystemLevel...` | [`MOS160MI.json`](MOS160MI.json) |
| **`MOS170MI`** | Maintenance order proposals | 35 | `AddMtrl, AddOp, AddOp2, AddOpElement, AddProp...` | [`MOS170MI.json`](MOS170MI.json) |
| **`MOS171MI`** | Maintenance order proposals APP interface | 15 | `Get, SelMaterials, SelOperations, SelTools, Select...` | [`MOS171MI.json`](MOS171MI.json) |
| **`MOS180MI`** | Maintenance Service Approve | 15 | `AddServiceHist, Approve, ListServiceHist, NotPerformed, ResetApproval...` | [`MOS180MI.json`](MOS180MI.json) |
| **`MOS195MI`** | Search WO Operation | 17 | `SelPlanned, SelReleased, SelReqElem, SelReqOper, SelWoAndReqElem...` | [`MOS195MI.json`](MOS195MI.json) |
| **`MOS199MI`** | Rental planning board interface | 11 | `Lst, Update, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS199MI.json`](MOS199MI.json) |
| **`MOS200MI`** | Engineering order interface | 28 | `AddAffSerialNo, AddEO, AddEOLine, AddModRefComp, CfrmAffSerialNo...` | [`MOS200MI.json`](MOS200MI.json) |
| **`MOS250MI`** | Model individual interface | 12 | `SelRelations, SelShiftInfo, Select, FpwVersion, GetCurrentUser...` | [`MOS250MI.json`](MOS250MI.json) |
| **`MOS256MI`** | As Build Structure | 13 | `GetNextHigher, LstAsBuild, LstAsBuildLevel, LstMeterPosOnly, FpwVersion...` | [`MOS256MI.json`](MOS256MI.json) |
| **`MOS260MI`** | Modification history | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS260MI.json`](MOS260MI.json) |
| **`MOS272MI`** | Vehicle location history interface | 16 | `Add, ChgStatus, CnvDataFeed, DltDataFeed, GetAddress...` | [`MOS272MI.json`](MOS272MI.json) |
| **`MOS290MI`** | Equipment. Update History | 16 | `Add, AddHistoryMeter, ClearAsBuild, CrtAsBuildList, CrtAsBuildStr...` | [`MOS290MI.json`](MOS290MI.json) |
| **`MOS296MI`** | Operational Enviroment | 15 | `Add, Chg, Cpy, Del, Get...` | [`MOS296MI.json`](MOS296MI.json) |
| **`MOS297MI`** | Industry Application | 15 | `Add, Chg, Cpy, Del, Get...` | [`MOS297MI.json`](MOS297MI.json) |
| **`MOS300MI`** | Service definition interface | 65 | `AddComponent, AddMaintLim, AddOp, AddOp2, AddOpElement...` | [`MOS300MI.json`](MOS300MI.json) |
| **`MOS306MI`** | Service prices | 13 | `Add, Get, List, Upd, FpwVersion...` | [`MOS306MI.json`](MOS306MI.json) |
| **`MOS380MI`** | Add Operation Plan | 11 | `AddOpPlan, AddOpPlanPos, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS380MI.json`](MOS380MI.json) |
| **`MOS382MI`** | Maintentance order APP interface | 11 | `SelOperations, Select, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MOS382MI.json`](MOS382MI.json) |
| **`MOS390MI`** | Service Warranty | 24 | `Add, AddClaimDetail, AddWarDetail, CheckWar, ChkWarMtrl...` | [`MOS390MI.json`](MOS390MI.json) |
| **`MOS400MI`** | Models | 15 | `AddModel, CopyModel, DltModel, GetModel, LstModel...` | [`MOS400MI.json`](MOS400MI.json) |
| **`MOS440MI`** | Maintenance positions interface | 14 | `Add, Del, GetBasic, LstPosition, Upd...` | [`MOS440MI.json`](MOS440MI.json) |
| **`MOS446MI`** | hMaintenance site browser interface | 30 | `GetDefaultSite, GetHighestPos, GetPosition, GetUserSite, LstAllPlannedWo...` | [`MOS446MI.json`](MOS446MI.json) |
| **`MOS450MI`** | Wrk: Components/Config Position | 15 | `AddComponent, DltComponent, GetComponent, LstComponent, LstItemsForInst...` | [`MOS450MI.json`](MOS450MI.json) |
| **`MOS461MI`** | Sales Model interface | 13 | `Add, Dlt, Lst, Upd, FpwVersion...` | [`MOS461MI.json`](MOS461MI.json) |
| **`MOS500MI`** | Maintenance complaints interface | 15 | `AddComp, AddDecision, DelComp, DelDecision, UpdComp...` | [`MOS500MI.json`](MOS500MI.json) |
| **`MOS510MI`** | Maintenance disturbance interface | 10 | `Add, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS510MI.json`](MOS510MI.json) |
| **`MOS595MI`** | Breakdown cause interface | 15 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`MOS595MI.json`](MOS595MI.json) |
| **`MOS710MI`** | Warranty type interface | 14 | `AddWarrantyType, DltWarrantyType, GetWarrantyType, LstWarrantyType, UpdWarrantyType...` | [`MOS710MI.json`](MOS710MI.json) |
| **`MOS720MI`** | Manage Warranty Storage Settings per Supplier | 14 | `AddWarTicket, DltWarTicket, GetWarTicket, LstWarTicket, UpdWarTicket...` | [`MOS720MI.json`](MOS720MI.json) |
| **`MOS721MI`** | Manage Warranty Storage Settings per Supplier | 14 | `AddWarrStorage, DltWarrStorage, GetWarrStorage, LstWarrStorage, UpdWarrStorage...` | [`MOS721MI.json`](MOS721MI.json) |
| **`MOS770MI`** | Create service pricelist | 10 | `CrtServPriceLst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MOS770MI.json`](MOS770MI.json) |
| **`MOS820MI`** | Start/Stop time reporting | 17 | `StartDisturb, StartOp, StartTravel, StopDisturb, StopOp...` | [`MOS820MI.json`](MOS820MI.json) |
| **`MRS001MI`** | MI-Repository interface | 45 | `AddField, AddProgram, AddText, AddTransaction, CheckFreeTrans...` | [`MRS001MI.json`](MRS001MI.json) |
| **`MTS300MI`** | Manages the Performance Benchmark Reference Tables | 29 | `Add, DeleteAll, DeleteRelated, Dlt, GenerateData...` | [`MTS300MI.json`](MTS300MI.json) |
| **`MWS001MI`** | Transport information | 14 | `AddItem, DltItem, GetItem, LstItem, UpdItem...` | [`MWS001MI.json`](MWS001MI.json) |
| **`MWS020MI`** | Consignment owner quantities interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS020MI.json`](MWS020MI.json) |
| **`MWS023MI`** | Warehouse Equipment interface | 10 | `LstWhsEq, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MWS023MI.json`](MWS023MI.json) |
| **`MWS025MI`** | Pending consignment transaction | 13 | `DltPendingTrans, GetPendingTrans, LstPendingTrans, UpdPendingTrans, FpwVersion...` | [`MWS025MI.json`](MWS025MI.json) |
| **`MWS042MI`** | Item Type Connect Warehouse interface | 15 | `AddWhsItemType, CpyWhsItemType, DltWhsItemType, GetWhsItemType, LstWhsItemTypes...` | [`MWS042MI.json`](MWS042MI.json) |
| **`MWS043MI`** | Item Type Connect Warehouse interface | 15 | `AddAliasItmType, CpyAliasItmType, DltAliasItmType, GetAliasItmType, LstAliasItmType...` | [`MWS043MI.json`](MWS043MI.json) |
| **`MWS045MI`** | Item Type Connect Description Rule interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`MWS045MI.json`](MWS045MI.json) |
| **`MWS070MI`** | Stock transaction history interface | 18 | `GetStockTrans, ListTransByDate, ListTransByRef, LstTransBalID, LstTransByDel...` | [`MWS070MI.json`](MWS070MI.json) |
| **`MWS072MI`** | Sublot transactions | 15 | `GetSublotTrans, LstSelectByItem, LstSublotTrans, LstTransByDate, LstTransByRef...` | [`MWS072MI.json`](MWS072MI.json) |
| **`MWS073MI`** | Goods in transit interface | 12 | `ConfirmDelivery, GetGoodsInTrans, LstGoodsInTrans, FpwVersion, GetCurrentUser...` | [`MWS073MI.json`](MWS073MI.json) |
| **`MWS080MI`** | Packaging ledger | 14 | `AddAdjustPacLdg, GetPacLedger, LstPacLdgByPack, LstPacLedger, UpdPacLedger...` | [`MWS080MI.json`](MWS080MI.json) |
| **`MWS081MI`** | Packaging ledger transactions | 11 | `GetPacLdgTra, LstPacLdgTra, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS081MI.json`](MWS081MI.json) |
| **`MWS090MI`** | Entitlement | 19 | `AddEntitlement, ChgEntitlement, CoreTracking, DelEntitlement, GetEntitlement...` | [`MWS090MI.json`](MWS090MI.json) |
| **`MWS091MI`** | Core Attrition | 15 | `AddCorAttrition, ChgCorAttrition, DltCorAttrition, GetCorAttrition, LstAttrBySuno...` | [`MWS091MI.json`](MWS091MI.json) |
| **`MWS120MI`** | Pre-allocations interface | 16 | `ClrInboxPreAll, GetUserJobSts, SelErrPreAll, Select, SetUserJobSts...` | [`MWS120MI.json`](MWS120MI.json) |
| **`MWS121MI`** | Preallocation | 18 | `GetAcqOrder, GetDmdOrder, LstAcqByCUOR, LstAcqByDmdOrd, LstDmdByAcqOrd...` | [`MWS121MI.json`](MWS121MI.json) |
| **`MWS150MI`** | Active Supply Chain | 10 | `SelSupplyChain, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`MWS150MI.json`](MWS150MI.json) |
| **`MWS330MI`** | Reservation | 17 | `AddReservation, ChgReservation, DltReservation, GetReservation, LstReservation...` | [`MWS330MI.json`](MWS330MI.json) |
| **`MWS410MI`** | Delivery number toolbox interface | 39 | `ApprDelValue, ChkDelValue, CloseDelivery, ClsRcptDlix, ClsRcptSscc...` | [`MWS410MI.json`](MWS410MI.json) |
| **`MWS411MI`** | Delivery Lines  interface | 17 | `GetDeliveryLine, LstDelLnByOrd, LstDeliveryLine, MoveDelLn, RelPlanDelLn...` | [`MWS411MI.json`](MWS411MI.json) |
| **`MWS413MI`** | Prepare pick release | 11 | `LstPickQuantity, SetPickQuantity, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`MWS413MI.json`](MWS413MI.json) |
| **`MWS417MI`** | Delivery accessorials | 15 | `Add, Delete, Get, LstAll, LstbyAccLvl...` | [`MWS417MI.json`](MWS417MI.json) |
| **`MWS418MI`** | Delivery approval interface | 21 | `AddGovAppAct, Approve, BODMIDelLines, CpyGovAppAct, DltGovAppAct...` | [`MWS418MI.json`](MWS418MI.json) |
| **`MWS419MI`** | Delivery approval log interface | 14 | `AddGovAppLog, DltGovAppLog, GetGovAppLog, LstGovAppLog, UpdGovAppLog...` | [`MWS419MI.json`](MWS419MI.json) |
| **`MWS420MI`** | Picking List | 28 | `Confirm, GetPckLnViaRepN, GetPickListLine, HdAllocByPckLst, HdAllocLnByRepN...` | [`MWS420MI.json`](MWS420MI.json) |
| **`MWS422MI`** | Picking list interface retrieval | 14 | `GetPickByRepNo, LstPickDetail, LstWavePickDet, RtvLastLoc, SelPickDetail...` | [`MWS422MI.json`](MWS422MI.json) |
| **`MWS423MI`** | Package Interface | 52 | `AddCrate, AddPackage, AddPckToShpPck, CalcPackLevel, ChangePackage...` | [`MWS423MI.json`](MWS423MI.json) |
| **`MWS429MI`** | Detailed delivery receipt confirmation | 15 | `CfmDetailedLine, ClsDeliveryRcpt, LstDetailedLine, OpnDeliveryRcpt, RstDeliveryRcpt...` | [`MWS429MI.json`](MWS429MI.json) |
| **`MWS440MI`** | Goods Receipt DO/RO | 12 | `GetPack, LstPack, LstPackLine, FpwVersion, GetCurrentUser...` | [`MWS440MI.json`](MWS440MI.json) |
| **`MWS460MI`** | Pending put-aways | 16 | `GetPutAwayTask, LstPackage, LstPutAwayByPac, LstPutAwayTask, RetrLocViaPano...` | [`MWS460MI.json`](MWS460MI.json) |
| **`MWS471MI`** | Outbound tracking policy | 15 | `AddTrckngPlcy, CpyTrckngPlcy, DelTrckngPlcy, GetTrckngPlcy, LstTrckngPlcy...` | [`MWS471MI.json`](MWS471MI.json) |
| **`MWS476MI`** | Tracking ID management | 17 | `Add, Assign, Cpy, Dlt, Get...` | [`MWS476MI.json`](MWS476MI.json) |
| **`MWS495MI`** | Additional Delivery Information | 14 | `Get, Lst, LstByOrderLine, LstPickupDeliv, Upd...` | [`MWS495MI.json`](MWS495MI.json) |
| **`MWSLWMMI`** | LWM List expected receipts | 22 | `GetPOData, LstDOLine, LstDOPac, LstExpPOReceipt, LstMOHead...` | [`MWSLWMMI.json`](MWSLWMMI.json) |
| **`MYS450MI`** | Transport Operation Planning | 17 | `AddDelivery, LstAddtlInfo, LstDelPlaceLoad, LstDelivery, LstHead...` | [`MYS450MI.json`](MYS450MI.json) |
| **`MYS500MI`** | TEI Transfer | 15 | `ChgHead, GetHead, LstDetail, LstPackGrp, LstPackages...` | [`MYS500MI.json`](MYS500MI.json) |
| **`OIAR01MI`** | Customer Order type BR | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIAR01MI.json`](OIAR01MI.json) |
| **`OIBR03MI`** | CO. Conn Reference Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR03MI.json`](OIBR03MI.json) |
| **`OIBR04MI`** | CO Line. Conn Export Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR04MI.json`](OIBR04MI.json) |
| **`OIBR05MI`** | CO Line. Conn Import Information | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR05MI.json`](OIBR05MI.json) |
| **`OIBR06MI`** | Customer Order type BR | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIBR06MI.json`](OIBR06MI.json) |
| **`OIS003MI`** | Customer connect charges interface | 15 | `AddCustCharge, DltCustCharge, GetCustCharge, LstByCustDivi, LstCustCharges...` | [`OIS003MI.json`](OIS003MI.json) |
| **`OIS004MI`** | Api: Customer address - delivery specification | 14 | `Add, Del, Get, Lst, Upd...` | [`OIS004MI.json`](OIS004MI.json) |
| **`OIS005MI`** | Api: Item / Customer | 16 | `Add, Del, Get, List, LstByItem...` | [`OIS005MI.json`](OIS005MI.json) |
| **`OIS006MI`** | Api: Item / Customer Strict Rotation | 13 | `Get, Lst, UpdPrevDate, UpdResetDate, FpwVersion...` | [`OIS006MI.json`](OIS006MI.json) |
| **`OIS010MI`** | Order type interface | 18 | `Add, Cpy, Dlt, Get, GetFieldInfo...` | [`OIS010MI.json`](OIS010MI.json) |
| **`OIS011MI`** | CO Type connect document interface | 15 | `AddCOTypDoc, DltCOTypDoc, GetCOTypDoc, LstByCOTypeDoc, LstDocByCOType...` | [`OIS011MI.json`](OIS011MI.json) |
| **`OIS012MI`** | Price list table interface | 16 | `AddPriceLstMtrx, DltPriceLstMtrx, GetPriceLstMtrx, LstObjConTable, LstPriceLstMtrx...` | [`OIS012MI.json`](OIS012MI.json) |
| **`OIS013MI`** | Manage charges connected to CO Type | 15 | `AddCOTypChrg, DltCOTypChrg, GetCOTypChrg, LstByCOTypeChrg, LstChrgByCOType...` | [`OIS013MI.json`](OIS013MI.json) |
| **`OIS014MI`** | Order type field selection interface | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`OIS014MI.json`](OIS014MI.json) |
| **`OIS015MI`** | Api: Sales price calculation elements | 25 | `AddCostElement, AddElementExcl, AddElementRate, DltCostElement, DltElementExcl...` | [`OIS015MI.json`](OIS015MI.json) |
| **`OIS017MI`** | Sales Price List interface | 29 | `AddBasePrice, AddGradSlsPrc, AddPriceList, AddScaleKey, ChgPriceList...` | [`OIS017MI.json`](OIS017MI.json) |
| **`OIS022MI`** | Api: Sales Costing Model | 20 | `AddCostModelLin, AddCostingModel, DltCostModelLin, DltCostingModel, GetCostModelLin...` | [`OIS022MI.json`](OIS022MI.json) |
| **`OIS028MI`** | Connect CO type group and CO type | 14 | `AddConnection, CopyConnection, DeleteConnect, LstOTConnection, LstOTGroup...` | [`OIS028MI.json`](OIS028MI.json) |
| **`OIS030MI`** | Order charges | 17 | `AddCOCharge, CpyCOCharge, DltCOCharge, GetCOCharge, LstCOCharges...` | [`OIS030MI.json`](OIS030MI.json) |
| **`OIS031MI`** | Service charge | 12 | `LstServChrgHead, LstServChrgLng, LstServChrgMtrx, FpwVersion, GetCurrentUser...` | [`OIS031MI.json`](OIS031MI.json) |
| **`OIS035MI`** | Document Text  interface | 14 | `AddTxtDocument, ChgTxtDocument, DltTxtDocument, GetTxtDocument, LstTxtDocument...` | [`OIS035MI.json`](OIS035MI.json) |
| **`OIS038MI`** | Business chain structure interface | 17 | `AddBusChain, AddBusChainCust, DelBusChain, DelBusChainCust, LstBusChainCust...` | [`OIS038MI.json`](OIS038MI.json) |
| **`OIS040MI`** | Business chain structure interface | 20 | `AddBusChain, AddBusChainCust, DltBusChain, DltBusChainCust, GetBusChain...` | [`OIS040MI.json`](OIS040MI.json) |
| **`OIS052MI`** | Contact plan | 31 | `AddConCustExc, AddConInfoCust, AddConPlan, AddConPlanExc, CrtActConPlans...` | [`OIS052MI.json`](OIS052MI.json) |
| **`OIS060MI`** | Customer Blanket Agreement Interface | 26 | `AddAgrLnPrice, AddCustBlkAgr, AddCustBlkAgrLn, CloBulkOrder, DelAgrLnPrice...` | [`OIS060MI.json`](OIS060MI.json) |
| **`OIS100MI`** | Customer order interface | 148 | `AddBatchAddress, AddBatchHead, AddBatchHeadChg, AddBatchLine, AddBatchLineChg...` | [`OIS100MI.json`](OIS100MI.json) |
| **`OIS105MI`** | API: Advance invoicing | 15 | `AddPreInvoice, CnfPreInvoice, DltPreInvoice, GetPreInvByEXIN, GetPreInvoice...` | [`OIS105MI.json`](OIS105MI.json) |
| **`OIS111MI`** | Display Valid Customer Blanket Agreements | 10 | `LstAgrHead, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS111MI.json`](OIS111MI.json) |
| **`OIS115MI`** | Api: Approve CO | 10 | `ApproveCO, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS115MI.json`](OIS115MI.json) |
| **`OIS120MI`** | Customer order stop | 14 | `GetCOStopInfo, LstCOStopByCUOR, LstCOStopByORNO, LstCOStopByPYNO, UpdCOStop...` | [`OIS120MI.json`](OIS120MI.json) |
| **`OIS125MI`** | Payment request | 16 | `AddFinalPayment, AddGenPrePmt, AddPrePayment, LstFinPayByIVNO, LstPrePayByCO...` | [`OIS125MI.json`](OIS125MI.json) |
| **`OIS155MI`** | Api: Delivery interface | 12 | `Approve, ListDeliveries, UpdateQty, FpwVersion, GetCurrentUser...` | [`OIS155MI.json`](OIS155MI.json) |
| **`OIS157MI`** | Handling prepayment | 14 | `Calculate, DeliverAndInv, Lst, Print, RelForDelivery...` | [`OIS157MI.json`](OIS157MI.json) |
| **`OIS158MI`** | Customer order deposit lines | 16 | `DeliverAndInv, Lst, ProposeQuantity, RelForDelivery, SetPropQtyRel...` | [`OIS158MI.json`](OIS158MI.json) |
| **`OIS165MI`** | Order Entry Messages | 16 | `AddCOEntMsg, AddText, DltCOEntMsg, GetCOEntMsg, LstCOEntMsg...` | [`OIS165MI.json`](OIS165MI.json) |
| **`OIS175MI`** | Customer order inquiry interface | 16 | `LstBySortOption, LstHeadByCust, LstHeadByDate, LstHeadByRef, LstSortOptions...` | [`OIS175MI.json`](OIS175MI.json) |
| **`OIS210MI`** | Cash sales open | 28 | `AddAuthCashDesk, AddCashDesk, AddConApprover, AddPayMethod, DelAuthCashDesk...` | [`OIS210MI.json`](OIS210MI.json) |
| **`OIS215MI`** | Cash sales open | 36 | `Add3rdpResult, AddCashMovement, AddCreateCheck, AddInvoice, AddOnAccount...` | [`OIS215MI.json`](OIS215MI.json) |
| **`OIS225MI`** | Parameters Delivery windows | 12 | `Add, Get, Upd, FpwVersion, GetCurrentUser...` | [`OIS225MI.json`](OIS225MI.json) |
| **`OIS226MI`** | Delivery window selection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS226MI.json`](OIS226MI.json) |
| **`OIS275MI`** | Api: Customer batch-order head | 14 | `GetAddress, GetBatchHead, GetTmpOrderStat, LstBatchLine, SearchBatchLine...` | [`OIS275MI.json`](OIS275MI.json) |
| **`OIS320MI`** | Price and discount inquiry interface | 17 | `GetPriceLine, LstDiscModels, LstDiscNumbers, LstListPrices, LstNewPrices...` | [`OIS320MI.json`](OIS320MI.json) |
| **`OIS325MI`** | Api: simulate sales costing model. | 10 | `LstSlsPriceSim, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS325MI.json`](OIS325MI.json) |
| **`OIS326MI`** | Price calculation CO line | 10 | `LstCalculation, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS326MI.json`](OIS326MI.json) |
| **`OIS335MI`** | Price guidance model | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS335MI.json`](OIS335MI.json) |
| **`OIS336MI`** | Price guidance model | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS336MI.json`](OIS336MI.json) |
| **`OIS337MI`** | Price Guidance | 13 | `ApprovePrice, LstPriGuidance, PriGuidByOrder, UpdPrice, FpwVersion...` | [`OIS337MI.json`](OIS337MI.json) |
| **`OIS340MI`** | Api: Supply Model simulation | 10 | `LstSupplSummary, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS340MI.json`](OIS340MI.json) |
| **`OIS345MI`** | Price Margin. Simulate CO Line | 11 | `GetSelSimFields, LstPriceMargin, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS345MI.json`](OIS345MI.json) |
| **`OIS350MI`** | Customer Order invoice interface | 35 | `GetCashDiscount, GetDelHead, GetDelLine, GetHeadDiscNo, GetInvHead...` | [`OIS350MI.json`](OIS350MI.json) |
| **`OIS358MI`** | List delivered lots per customer | 10 | `LstDelivLots, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS358MI.json`](OIS358MI.json) |
| **`OIS361MI`** | Price list Table Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS361MI.json`](OIS361MI.json) |
| **`OIS363MI`** | Dicount Model Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS363MI.json`](OIS363MI.json) |
| **`OIS365MI`** | Pricing group interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS365MI.json`](OIS365MI.json) |
| **`OIS366MI`** | Pricing group selection matrix interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS366MI.json`](OIS366MI.json) |
| **`OIS368MI`** | Item Restriction Selection matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS368MI.json`](OIS368MI.json) |
| **`OIS370MI`** | Api: Bulk order batch entry | 15 | `AddBatchHead, AddBatchLn, AddBatchPrice, DeleteEntry, FinishEntry...` | [`OIS370MI.json`](OIS370MI.json) |
| **`OIS390MI`** | Customer Return | 27 | `AddHead, AddLine, ClsPickup, CrtPickup, DelPickup...` | [`OIS390MI.json`](OIS390MI.json) |
| **`OIS393MI`** | Manage crediting of customer returns | 10 | `CreateCredit, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS393MI.json`](OIS393MI.json) |
| **`OIS407MI`** | Bonus and Commission customer table interface | 19 | `AddBCCustTable, AddBCCustomer, DltBCCustTable, DltBCCustomer, GetBCCustTable...` | [`OIS407MI.json`](OIS407MI.json) |
| **`OIS412MI`** | Bonus & Commission Agreement Interface | 23 | `AddBCAgr, AddBCAgrRates, AddBCAgrReserv, DltBCAgr, DltBCAgrRates...` | [`OIS412MI.json`](OIS412MI.json) |
| **`OIS415MI`** | Bonus Payout | 17 | `AddBCAgrStl, CrtBCAgrAdvPrpl, CrtBCAgrStl, DltBCAgrCalcAdv, GetBCAgrCalcAdv...` | [`OIS415MI.json`](OIS415MI.json) |
| **`OIS421MI`** | B/C item select | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS421MI.json`](OIS421MI.json) |
| **`OIS422MI`** | B/C Table Lines | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS422MI.json`](OIS422MI.json) |
| **`OIS430MI`** | Trade agreement header interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS430MI.json`](OIS430MI.json) |
| **`OIS431MI`** | Trade agreement recipient interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`OIS431MI.json`](OIS431MI.json) |
| **`OIS432MI`** | Trade agreement Scale rates Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS432MI.json`](OIS432MI.json) |
| **`OIS433MI`** | Trade agreement bonus status per recipient | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`OIS433MI.json`](OIS433MI.json) |
| **`OIS434MI`** | Bonus status per recipient per period interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS434MI.json`](OIS434MI.json) |
| **`OIS435MI`** | Trade agreement transaction interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OIS435MI.json`](OIS435MI.json) |
| **`OIS436MI`** | Trade agreement table interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS436MI.json`](OIS436MI.json) |
| **`OIS437MI`** | Trade Agreement Selection Matrix | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS437MI.json`](OIS437MI.json) |
| **`OIS438MI`** | Trade agreement model Id interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS438MI.json`](OIS438MI.json) |
| **`OIS439MI`** | Trade agreement model lines interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS439MI.json`](OIS439MI.json) |
| **`OIS440MI`** | Trade agreement type interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`OIS440MI.json`](OIS440MI.json) |
| **`OIS445MI`** | Trade agreement payout interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS445MI.json`](OIS445MI.json) |
| **`OIS446MI`** | Trade agreement payout amount interface | 13 | `Dlt, Get, Lst, Upd, FpwVersion...` | [`OIS446MI.json`](OIS446MI.json) |
| **`OIS449MI`** | Trade agreement payment schedule per recipient Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS449MI.json`](OIS449MI.json) |
| **`OIS455MI`** | Trade Agreement FIM periodic proposal interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`OIS455MI.json`](OIS455MI.json) |
| **`OIS456MI`** | Trade agreement FIM periodic proposal line interface | 13 | `Dlt, Get, Lst, Upd, FpwVersion...` | [`OIS456MI.json`](OIS456MI.json) |
| **`OIS530MI`** | Sales price report interface | 12 | `GetHead, GetLine, LstLine, FpwVersion, GetCurrentUser...` | [`OIS530MI.json`](OIS530MI.json) |
| **`OIS560MI`** | Api: Customer Settings | 14 | `GetSettings, LstDelMethod, LstDelTerm, LstFac, LstPayType...` | [`OIS560MI.json`](OIS560MI.json) |
| **`OIS605MI`** | Print order confirmation | 10 | `PrtOrderConfirm, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS605MI.json`](OIS605MI.json) |
| **`OIS680MI`** | Print customer order invoice copy | 10 | `PrintCopy, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OIS680MI.json`](OIS680MI.json) |
| **`OIS800MI`** | Discount model | 23 | `AddModel, AddScaleLine, AddScaleLnCamp, DltModel, DltScaleLine...` | [`OIS800MI.json`](OIS800MI.json) |
| **`OIS820MI`** | Discount Campaign API | 14 | `AddDiscCamp, DltDiscCamp, GetDiscCamp, LstDiscCamp, UpdDiscCamp...` | [`OIS820MI.json`](OIS820MI.json) |
| **`OIS840MI`** | Promotion API | 27 | `AddPromCust, AddPromHead, AddPromLine, AddPromWhs, DltProm...` | [`OIS840MI.json`](OIS840MI.json) |
| **`OIS847MI`** | API: Promotion Enter Scaled Prices | 13 | `Add, Change, Delet, List, FpwVersion...` | [`OIS847MI.json`](OIS847MI.json) |
| **`OIS850MI`** | Initial Supply Orders | 18 | `Alloc, Close, DeAlloc, Gen, LstCOLines...` | [`OIS850MI.json`](OIS850MI.json) |
| **`OIS860MI`** | Supplier rebate agreement on sales | 29 | `AddHead, AddLine, ConnectAgrValue, DelAgrValues, DelAgreement...` | [`OIS860MI.json`](OIS860MI.json) |
| **`OIS865MI`** | Supplier Rebate agreement category | 15 | `Add, AddLngTxt, Dlt, Get, Lst...` | [`OIS865MI.json`](OIS865MI.json) |
| **`OIS867MI`** | Supplier rebate on sales | 19 | `AddScaleHead, AddScaleLimit, DelScale, DelScaleLimit, GetScaleHead...` | [`OIS867MI.json`](OIS867MI.json) |
| **`OPS200MI`** | Value coupon ledger | 11 | `ChkVCLdgSale, ChkVCLdgTend, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`OPS200MI.json`](OPS200MI.json) |
| **`OPS210MI`** | Fnc: External Ticket lines | 13 | `AddExtTickLin, CnfExtTickLin, DltExtTickLin, LstExtTickLin, FpwVersion...` | [`OPS210MI.json`](OPS210MI.json) |
| **`OPS270MI`** | POS Sales Tickets interface | 19 | `AddRoundNumber, AddSlsTicketLin, AddSlsTicketPay, BchPrcRound, DelRoundNumber...` | [`OPS270MI.json`](OPS270MI.json) |
| **`OPS280MI`** | POS Sales ticket update interface | 10 | `SlsTicketUpdate, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS280MI.json`](OPS280MI.json) |
| **`OPS291MI`** | Payment provider ledger entries | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`OPS291MI.json`](OPS291MI.json) |
| **`OPS292MI`** | Transfer payment provider ledger entries to FIM. | 10 | `SndPaymentToFIM, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS292MI.json`](OPS292MI.json) |
| **`OPS500MI`** | Retrieves Store Information | 18 | `AddStore, GetStore, LstCollabStores, LstShopCategory, LstShopClass...` | [`OPS500MI.json`](OPS500MI.json) |
| **`OPS600MI`** | Fnc: POS - Filter records for Item and Customer replication | 15 | `CnfCus, CnfItm, CrtCstRepl, CrtItmRepl, LstCus...` | [`OPS600MI.json`](OPS600MI.json) |
| **`OPS650MI`** | API: Print label | 10 | `PrintLabel, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS650MI.json`](OPS650MI.json) |
| **`OPS660MI`** | Retrieve Mix and Match data | 10 | `LstMixMatch, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OPS660MI.json`](OPS660MI.json) |
| **`OSBSTDMI`** | Api: Sales Statistics Details | 10 | `SelDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSBSTDMI.json`](OSBSTDMI.json) |
| **`OSS220MI`** | Sales Budget.Consolidate/Copy | 10 | `TriggerCpyBudg, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSS220MI.json`](OSS220MI.json) |
| **`OSS401MI`** | Dataset Information Interface | 29 | `Activate, AddDataset, CpyDataset, Deactivate, DltDataset...` | [`OSS401MI.json`](OSS401MI.json) |
| **`OSS402MI`** | Dataset Keys And Accumulators Interface | 15 | `AddDatasetField, DltDatasetField, GetDatasetField, LstDatasetField, Select...` | [`OSS402MI.json`](OSS402MI.json) |
| **`OSS406MI`** | Dataset Transaction Types Interface | 13 | `AddTransType, DltTransType, LstTransTypes, Select, FpwVersion...` | [`OSS406MI.json`](OSS406MI.json) |
| **`OSS420MI`** | Sales Budget Interface | 19 | `Activate, AddSalesBudget, ClsBudget, CpySalesBudget, Deactivate...` | [`OSS420MI.json`](OSS420MI.json) |
| **`OSS450MI`** | Api: Enter Lost Sales | 10 | `AddLostSales, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`OSS450MI.json`](OSS450MI.json) |
| **`PCS005MI`** | Costing type | 14 | `Add, Del, Get, Lst, Upd...` | [`PCS005MI.json`](PCS005MI.json) |
| **`PCS115MI`** | Material and Subcontract overhead | 15 | `Add, Copy, Delete, List, Retrieve...` | [`PCS115MI.json`](PCS115MI.json) |
| **`PCS120MI`** | Costing Component. Create Cost Rates | 15 | `AddCostRate, CpyCostRate, DelCostRate, GetCostRate, LstCostRate...` | [`PCS120MI.json`](PCS120MI.json) |
| **`PCS200MI`** | Product Costing Calculation | 11 | `CalcProdRange, CalcSingleProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS200MI.json`](PCS200MI.json) |
| **`PCS240MI`** | Product costing. Calculate MO | 11 | `CalcMORange, CalcSingleMO, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS240MI.json`](PCS240MI.json) |
| **`PCS260MI`** | Product Costing - Manual Update interface | 13 | `Add, Get, Lst, Upd, FpwVersion...` | [`PCS260MI.json`](PCS260MI.json) |
| **`PCS265MI`** | Actual cost interface | 12 | `Add, Get, Lst, FpwVersion, GetCurrentUser...` | [`PCS265MI.json`](PCS265MI.json) |
| **`PCS280MI`** | Purchase distribution costing interface | 10 | `CalcCost, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PCS280MI.json`](PCS280MI.json) |
| **`PCS350MI`** | FIFO Cost Goods receipt. | 13 | `GetTransaction, Lst, LstOrder, LstSupplierInv, FpwVersion...` | [`PCS350MI.json`](PCS350MI.json) |
| **`PCS351MI`** | FIFO Cost Transactions. | 13 | `GetTransaction, Lst, LstFIFO, LstOrder, FpwVersion...` | [`PCS351MI.json`](PCS351MI.json) |
| **`PCS352MI`** | FIFO Cost Details. | 11 | `GetDetail, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PCS352MI.json`](PCS352MI.json) |
| **`PCS495MI`** | Budgeting maintenance proposal / update | 10 | `CalRevCos, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PCS495MI.json`](PCS495MI.json) |
| **`PDS001MI`** | Product Structures | 28 | `Add, AddFeature, Copy, CpyProdVersion, Delete...` | [`PDS001MI.json`](PDS001MI.json) |
| **`PDS002MI`** | Product Connect Materials and Operations | 30 | `AddComponent, AddOperation, AddOperation2, CpyComp, CpyComponent...` | [`PDS002MI.json`](PDS002MI.json) |
| **`PDS003MI`** | Connect Feature and Option | 15 | `Add, Copy, Delete, Get, List...` | [`PDS003MI.json`](PDS003MI.json) |
| **`PDS007MI`** | Quantity Limits for Alternate Routings | 11 | `Get, Update, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS007MI.json`](PDS007MI.json) |
| **`PDS008MI`** | Alternate Routing | 14 | `Add, Delete, Get, List, Update...` | [`PDS008MI.json`](PDS008MI.json) |
| **`PDS010MI`** | Work Center | 36 | `AddRelation, AddShiftInfo, AddShiftPatAdj, AddWorkCenter, ChgRelation...` | [`PDS010MI.json`](PDS010MI.json) |
| **`PDS013MI`** | Alternate Material | 15 | `AddAltMat, CpyAltMat, DltAltMat, GetAltMat, LstAltMat...` | [`PDS013MI.json`](PDS013MI.json) |
| **`PDS016MI`** | Daily Capacity | 16 | `AddDailyCap, DelDailyCap, GetDailyCap, LstDailyCap, SelDailyCap...` | [`PDS016MI.json`](PDS016MI.json) |
| **`PDS017MI`** | Create Kits | 13 | `CreateKit, Initalize, List, PrepareKit, FpwVersion...` | [`PDS017MI.json`](PDS017MI.json) |
| **`PDS021MI`** | End Product | 15 | `AddEndProduct, CpyEndProduct, DltEndProduct, GetEndProduct, LstEndProducts...` | [`PDS021MI.json`](PDS021MI.json) |
| **`PDS022MI`** | Product Sequence Dependent Setup Times | 10 | `Select, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PDS022MI.json`](PDS022MI.json) |
| **`PDS023MI`** | Alternate Structures | 15 | `AddAltStructure, CpyAltStructure, DltAltStructure, GetAltStructure, LstAltStructure...` | [`PDS023MI.json`](PDS023MI.json) |
| **`PDS027MI`** | Connect Operation Element | 23 | `AddDocumentID, AddInspectionID, AddPermit, AddTool, AddWorkElement...` | [`PDS027MI.json`](PDS027MI.json) |
| **`PDS028MI`** | Product Version | 15 | `AddVersion, CpyVersion, DltVersion, GetVersion, LstVersions...` | [`PDS028MI.json`](PDS028MI.json) |
| **`PDS029MI`** | Output Interface | 14 | `AddOutput, DltOutput, GetOutput, LstOutputs, UpdOutput...` | [`PDS029MI.json`](PDS029MI.json) |
| **`PDS030MI`** | Shift Planning Basic Data | 12 | `SelCalendar, SelModelLines, SelPatternLines, FpwVersion, GetCurrentUser...` | [`PDS030MI.json`](PDS030MI.json) |
| **`PDS035MI`** | Alternate Routing | 15 | `AddAltRouting, CpyAltRouting, DltAltRouting, GetAltRouting, LstAltRouting...` | [`PDS035MI.json`](PDS035MI.json) |
| **`PDS040MI`** | Inspection List | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS040MI.json`](PDS040MI.json) |
| **`PDS041MI`** | Inspection ID's Lines | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS041MI.json`](PDS041MI.json) |
| **`PDS042MI`** | Inspection Result IDs | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS042MI.json`](PDS042MI.json) |
| **`PDS043MI`** | Inspection Result Values | 14 | `Add, Delete, Get, Lst, Update...` | [`PDS043MI.json`](PDS043MI.json) |
| **`PDS044MI`** | Disturbance Type | 14 | `Add, Delete, Get, List, Update...` | [`PDS044MI.json`](PDS044MI.json) |
| **`PDS050MI`** | Product Option | 21 | `Add, AddNameLanguage, Copy, Delete, DltNameLanguage...` | [`PDS050MI.json`](PDS050MI.json) |
| **`PDS055MI`** | Product Features | 15 | `Add, Copy, Delete, Get, List...` | [`PDS055MI.json`](PDS055MI.json) |
| **`PDS056MI`** | Product Feature Connect Options | 15 | `Add, Copy, Delete, List, Retrieve...` | [`PDS056MI.json`](PDS056MI.json) |
| **`PDS057MI`** | Feature Descriptions In Other Languages | 14 | `Add, Delete, Get, List, Update...` | [`PDS057MI.json`](PDS057MI.json) |
| **`PDS061MI`** | Product variant | 18 | `AddSKUOption, AnswerFeature, ConfirmConfig, CreateSKU, CrtConfig...` | [`PDS061MI.json`](PDS061MI.json) |
| **`PDS071MI`** | Feature Distribute Option | 11 | `FeatDistOpChk, FeatDistOpUpd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS071MI.json`](PDS071MI.json) |
| **`PDS075MI`** | Product Structure Class | 14 | `AddStructClass, DltStructClass, GetStructClass, LstStructClass, UpdStructClass...` | [`PDS075MI.json`](PDS075MI.json) |
| **`PDS090MI`** | Product Selection Matrix | 19 | `Add, AddLine, Copy, Delete, DeleteLine...` | [`PDS090MI.json`](PDS090MI.json) |
| **`PDS103MI`** | Manages the MPDSUM table - Summarized Bill of Material | 11 | `LstSumBOM, LstWhereUsed, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PDS103MI.json`](PDS103MI.json) |
| **`PDS250MI`** | Learning Curve | 12 | `LstLearnCurMod, LstLearnID, SelLearnHistory, FpwVersion, GetCurrentUser...` | [`PDS250MI.json`](PDS250MI.json) |
| **`PDS360MI`** | Substitution Table | 15 | `AddSubstitFeat, AddSubstitOpt, DltSubstitFeat, DltSubstitOpt, LstSubstitFeat...` | [`PDS360MI.json`](PDS360MI.json) |
| **`PDS600MI`** | Product Configuration Interface | 21 | `AbortConfig, AnswerDrawing, AnswerFeature, AnswerMatrix, ChangeConfig...` | [`PDS600MI.json`](PDS600MI.json) |
| **`PDS601MI`** | Stateless | 15 | `AbortConfig, AnswerFeature, ConfirmConfig, InitConfig, OptionRequest...` | [`PDS601MI.json`](PDS601MI.json) |
| **`PDS605MI`** | Configuration Head | 14 | `AddCfg, AddFeatOpt, Configure, ConfirmCfg, DeleteCfg...` | [`PDS605MI.json`](PDS605MI.json) |
| **`PMS018MI`** | Transfer Supplier Capacity And Capability | 10 | `SupplierCap, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PMS018MI.json`](PMS018MI.json) |
| **`PMS050MI`** | Manufacturing Order Report Receipt | 13 | `ConfirmAll, LstPndReceipt, RptReceipt, UpdProcess, FpwVersion...` | [`PMS050MI.json`](PMS050MI.json) |
| **`PMS055MI`** | Manufacturing Order Backflush Functions | 10 | `GetBackFlushQty, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PMS055MI.json`](PMS055MI.json) |
| **`PMS060MI`** | Manufacturing Order Report Issue | 14 | `DltIssue, LstAgrBySchedNo, LstMatBySchedNo, RptByAgrSchedNo, RptIssue...` | [`PMS060MI.json`](PMS060MI.json) |
| **`PMS070MI`** | Manufacturing Order Report Operation | 13 | `CloseOperation, Confirm, GetOperation, RptOperation, FpwVersion...` | [`PMS070MI.json`](PMS070MI.json) |
| **`PMS080MI`** | Manufacturing Order Report By-product | 12 | `Confirm, DltByProduct, RptByProduct, FpwVersion, GetCurrentUser...` | [`PMS080MI.json`](PMS080MI.json) |
| **`PMS085MI`** | Inspection Results | 16 | `DelInspectionRs, GetInspectionRs, GetReportInspRs, LstInspectionRs, LstReportInspRs...` | [`PMS085MI.json`](PMS085MI.json) |
| **`PMS090MI`** | Manufacturing Order Report Co-product | 14 | `ConfirmReport, DelCoProdReport, GetCoProdReport, LstCoProdReport, UpdCoProdReport...` | [`PMS090MI.json`](PMS090MI.json) |
| **`PMS100MI`** | Manufacturing Order | 58 | `AddInboxOp, AddInboxOrder, AddMOComponent, AddMatLine, AddOperation...` | [`PMS100MI.json`](PMS100MI.json) |
| **`PMS104MI`** | MO Operation Element Interface | 24 | `AddOpDocID, AddOpInspID, AddOpTool, AddOpWrkElement, CpyOpDocID...` | [`PMS104MI.json`](PMS104MI.json) |
| **`PMS120MI`** | Manufacturing Order Type | 15 | `AddOrderType, CpyOrderType, DelOrderType, GetOrderType, LstOrderType...` | [`PMS120MI.json`](PMS120MI.json) |
| **`PMS130MI`** | Receipt Inspection Coded Items | 11 | `LstOpenQI, SetQIItmPutAway, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PMS130MI.json`](PMS130MI.json) |
| **`PMS150MI`** | Output Balancing | 13 | `BatchBalancing, GetProcessOrder, LstBatchBal, UndoBatchBal, FpwVersion...` | [`PMS150MI.json`](PMS150MI.json) |
| **`PMS155MI`** | Bulk Redistribution | 13 | `GetRedisTotal, Lst, Redistribute, Reopen, FpwVersion...` | [`PMS155MI.json`](PMS155MI.json) |
| **`PMS170MI`** | Manufacturing Order Proposals | 24 | `ClrSimulatedMOP, CrtPlannedMO, DelPlannedMO, Get, LstByRORN...` | [`PMS170MI.json`](PMS170MI.json) |
| **`PMS230MI`** | Work Center Schedule | 13 | `ReschedWorkCen, SchedUnschedMO, Select, UpdScheduleOp, FpwVersion...` | [`PMS230MI.json`](PMS230MI.json) |
| **`PMS260MI`** | Orderless Reporting MO | 11 | `PutAway, RepEndProd, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PMS260MI.json`](PMS260MI.json) |
| **`PMS270MI`** | Schedule Number | 13 | `AddScheduleNo, GetScheduleNo, LstScheduleNo, UpdScheduleNo, FpwVersion...` | [`PMS270MI.json`](PMS270MI.json) |
| **`PMS420MI`** | Report Operation Setup And Disturbance | 17 | `ChangeTeam, LstTransaction, StartDisturb, StartWorkOp, StartWorkSetup...` | [`PMS420MI.json`](PMS420MI.json) |
| **`POS001MI`** | Project element interface | 15 | `AddProjElement, CpyProjElement, DltProjElement, GetProjElement, LstProjElement...` | [`POS001MI.json`](POS001MI.json) |
| **`POS010MI`** | Project order type | 15 | `AddProjectType, CpyProjectType, DltProjectType, GetProjectType, LstProjectTypes...` | [`POS010MI.json`](POS010MI.json) |
| **`POS015MI`** | Project order type | 15 | `AddProjectMngr, CpyProjectMngr, DltProjectMngr, GetProjectMngr, LstProjectMngrs...` | [`POS015MI.json`](POS015MI.json) |
| **`POS030MI`** | Manage budget templates | 15 | `AddBudgTemplate, CpyBudgTemplate, DltBudgTemplate, GetBudgTemplate, LstBudgTemplate...` | [`POS030MI.json`](POS030MI.json) |
| **`POS031MI`** | Handle budget template lines | 15 | `AddBudgTempLine, CpyBudgTempLine, DltBudgTempLine, GetBudgTempLine, LstBudgTempLine...` | [`POS031MI.json`](POS031MI.json) |
| **`POS035MI`** | Project budget item management | 15 | `AddProjBudgItem, CpyProjBudgItem, DltProjBudgItem, GetProjBudgItem, LstProjBudgItem...` | [`POS035MI.json`](POS035MI.json) |
| **`POS040MI`** | project checklist management | 15 | `AddProjCheckLst, CpyProjCheckLst, DltProjCheckLst, GetProjCheckLst, LstPrjCheckLsts...` | [`POS040MI.json`](POS040MI.json) |
| **`POS041MI`** | Project checklist line management | 16 | `AddPrjChkLine, CpyPrjChkLine, DltPrjChkLine, GetPrjChkLine, LstPrjChkLines...` | [`POS041MI.json`](POS041MI.json) |
| **`POS060MI`** | Project element type interface | 15 | `AddProjElemType, CpyProjElemType, DltProjElemType, GetProjElemType, LstProjElemType...` | [`POS060MI.json`](POS060MI.json) |
| **`POS061MI`** | Status per element type | 14 | `AddStsDescr, DltStsDescr, GetStsDescr, LstStsDescr, UpdStsDescr...` | [`POS061MI.json`](POS061MI.json) |
| **`POS062MI`** | Open/close project interface | 10 | `SetStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS062MI.json`](POS062MI.json) |
| **`POS063MI`** | Start/finish activity interface | 10 | `SetStatus, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS063MI.json`](POS063MI.json) |
| **`POS070MI`** | Information structure | 15 | `AddInfoStruct, CpyInfoStruct, DltInfoStruct, GetInfoStruct, LstInfoStructs...` | [`POS070MI.json`](POS070MI.json) |
| **`POS100MI`** | Project structure interface | 35 | `AddProject, ApprQuotation, CancelQuotation, ChgProjectMngr, CpyProjSubTempl...` | [`POS100MI.json`](POS100MI.json) |
| **`POS105MI`** | Checklist per project element | 15 | `AddChkList, CpyChkList, DltChkList, GetChkList, LstChkLists...` | [`POS105MI.json`](POS105MI.json) |
| **`POS106MI`** | Manage customers in project qoutation | 18 | `AddCustomer, CpyCustomer, DltCustomer, GetCustomer, LstCustomers...` | [`POS106MI.json`](POS106MI.json) |
| **`POS110MI`** | Budget version interface | 18 | `AddBudget, CalcTimeRate, CpyBudget, DltBudget, GenLine...` | [`POS110MI.json`](POS110MI.json) |
| **`POS111MI`** | Project budget interface | 18 | `AddBudgetLine, CfmBudget, CpyBudgetLine, DltBudgetLine, GetBudgetLine...` | [`POS111MI.json`](POS111MI.json) |
| **`POS120MI`** | Forecast version interface | 17 | `AddForecast, CpyForecast, DltForecast, GenLine, GetForecast...` | [`POS120MI.json`](POS120MI.json) |
| **`POS121MI`** | Project forecast version lines interface | 17 | `AddForecastLine, CpyForecastLine, DltForecastLine, GetForecastLine, LstForecastLine...` | [`POS121MI.json`](POS121MI.json) |
| **`POS124MI`** | Project information version | 15 | `AddProjectInfo, CpyProjectInfo, DltProjectInfo, GetProjectInfo, LstProjectInfos...` | [`POS124MI.json`](POS124MI.json) |
| **`POS125MI`** | Project info value line | 15 | `DltInfoBlock, DltProjElement, GenLine, GetInfoValLine, LstInfoValLines...` | [`POS125MI.json`](POS125MI.json) |
| **`POS130MI`** | Manage purchase proposals | 25 | `AddProposal, CpyProposal, CrtPlannedPO, DltProposal, GetMilestone...` | [`POS130MI.json`](POS130MI.json) |
| **`POS145MI`** | Work order proposal per activity | 15 | `Add, CrtWorkRequest, Dlt, Get, Lst...` | [`POS145MI.json`](POS145MI.json) |
| **`POS176MI`** | Project Partner interface | 15 | `AddPartner, CpyPartner, DltPartner, GetPartner, LstPartners...` | [`POS176MI.json`](POS176MI.json) |
| **`POS210MI`** | Project order time planning versions interface | 11 | `AddSchedule, LstVersions, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS210MI.json`](POS210MI.json) |
| **`POS211MI`** | Project order time planning lines interface | 22 | `CheckIn, CheckOut, ChgBasicData, ChgConnection1, DltConnection1...` | [`POS211MI.json`](POS211MI.json) |
| **`POS212MI`** | Project order element - create connections interface | 15 | `AddConnection, DltConnection, GetConnection, LstConnections, LstPossibleConn...` | [`POS212MI.json`](POS212MI.json) |
| **`POS285MI`** | Manage percentage of completion | 14 | `GetElementPOC, LstHistory, LstProjectPOC, LstValidElement, SetPctOfCompl...` | [`POS285MI.json`](POS285MI.json) |
| **`POS291MI`** | Material budget interface | 15 | `AddItem, CpyMtrlBudLine, DelMtrlBudLine, GetMtrlBudLine, LstMtrlBudLines...` | [`POS291MI.json`](POS291MI.json) |
| **`POS305MI`** | The program displays progress of a project | 10 | `GetPeriodicBdg, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`POS305MI.json`](POS305MI.json) |
| **`POS306MI`** | Project element progress management | 11 | `GetElemProgress, LstElemProgress, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS306MI.json`](POS306MI.json) |
| **`POS307MI`** | Project element progress per period management | 11 | `GetElemProgress, LstElemProgress, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`POS307MI.json`](POS307MI.json) |
| **`POS330MI`** | Project element type interface | 15 | `AddCostingTempl, CpyCostingTempl, DltCostingTempl, GetCostingTempl, LstCostingTempl...` | [`POS330MI.json`](POS330MI.json) |
| **`POS340MI`** | Costing version | 17 | `AddCosting, CpyCosting, DltCosting, GetCosting, LockCosting...` | [`POS340MI.json`](POS340MI.json) |
| **`POS341MI`** | Costing version line | 16 | `AddCostingLine, CfmBudget, CpyCostingLine, DltCostingLine, GetCostingLine...` | [`POS341MI.json`](POS341MI.json) |
| **`POS350MI`** | Project invoice interface | 19 | `GetCashDiscount, GetDelLine, GetInvHead, GetInvLine, GetInvoiceHd...` | [`POS350MI.json`](POS350MI.json) |
| **`POS370MI`** | Project costing total management | 13 | `LstBdgContriMrg, LstBdgCostTotal, LstElmContriMrg, LstElmCostTotal, FpwVersion...` | [`POS370MI.json`](POS370MI.json) |
| **`POS410MI`** | Management of project task Project Order | 15 | `AddTask, DelTask, GetTask, LstTask, LstTask1...` | [`POS410MI.json`](POS410MI.json) |
| **`POS411MI`** | Project task elements | 16 | `AddLngTxt, AddProjTaskElem, CpyProjTaskElem, DltProjTaskElem, GetProjTaskElem...` | [`POS411MI.json`](POS411MI.json) |
| **`POS480MI`** | Project invoice head interface | 17 | `AddInvHead, DltInvHead, GetInvHead, LstAllInvoices, LstInvHead...` | [`POS480MI.json`](POS480MI.json) |
| **`POS481MI`** | Project invoice line interface | 14 | `AddInvLine, DltInvLine, GetInvLine, LstInvLine, UpdInvLine...` | [`POS481MI.json`](POS481MI.json) |
| **`POS482MI`** | Budget item to invoice | 13 | `GetBudItemToInv, InvoiceAll, LstBudItemToInv, UpdBudItemToInv, FpwVersion...` | [`POS482MI.json`](POS482MI.json) |
| **`POS483MI`** | Budget item to invoice | 15 | `AddProjectPrice, CpyProjectPrice, DltProjectPrice, GetProjectPrice, LstProjectPrice...` | [`POS483MI.json`](POS483MI.json) |
| **`POS488MI`** | Project Logged transactions | 20 | `AddLoggedTran, ApproveLogTrans, CpyLoggedTran, DltLoggedTran, GetLoggedTran...` | [`POS488MI.json`](POS488MI.json) |
| **`POS700MI`** | Time reporting interface | 21 | `AddTimeAcc, AddTimeAccLine, Approve, Delete, LstPerApproval...` | [`POS700MI.json`](POS700MI.json) |
| **`PPS001MI`** | Purchase Order Interface | 25 | `AdviseAll, AdviseLine, CalculateLine, ConfirmAll, ConfirmLine...` | [`PPS001MI.json`](PPS001MI.json) |
| **`PPS007MI`** | Supplier Discount Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS007MI.json`](PPS007MI.json) |
| **`PPS008MI`** | Vendor Order Total Discount Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS008MI.json`](PPS008MI.json) |
| **`PPS010MI`** | Supplier Transportation Lead Time Interface | 14 | `AddConnTranspLT, DelConnTranspLT, GetConnTranspLT, LstConnTranspLT, UpdConnTranspLT...` | [`PPS010MI.json`](PPS010MI.json) |
| **`PPS018MI`** | Supplier Capacity and Capability Interface | 12 | `AddSupplierCap, SupplierCap, UpdSupplierCap, FpwVersion, GetCurrentUser...` | [`PPS018MI.json`](PPS018MI.json) |
| **`PPS040MI`** | Connect Supplier and Item | 17 | `AddItemSupplier, AddItemSupplrQI, DelItemSupplier, GetItemSupplier, GetItemSupplrQI...` | [`PPS040MI.json`](PPS040MI.json) |
| **`PPS042MI`** | Advanced Manufacturer Control | 15 | `AddManufacturer, CpyManufacturer, DltManufacturer, GetManufacturer, LstManufacturer...` | [`PPS042MI.json`](PPS042MI.json) |
| **`PPS095MI`** | Purchase Order Type | 15 | `AddOrderType, CpyOrderType, DltOrderType, GetOrderType, LstOrderType...` | [`PPS095MI.json`](PPS095MI.json) |
| **`PPS099MI`** | Purchase Organization Interface | 16 | `AddLngTxt, AddPurchaseOrg, CpyPurchaseOrg, DltPurchaseOrg, GetPurchaseOrg...` | [`PPS099MI.json`](PPS099MI.json) |
| **`PPS100MI`** | Purchase Agreement Interface | 27 | `AddAgrHead, AddAgrLine, AddFreightElmt, AddFreightRate, AddStgPrice...` | [`PPS100MI.json`](PPS100MI.json) |
| **`PPS106MI`** | Purchase Price And Discount Maintenance Interface | 10 | `GetPrice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS106MI.json`](PPS106MI.json) |
| **`PPS108MI`** | Base Origin for Grower Agreement | 14 | `AddBaseOrigin, DltBaseOrigin, GetBaseOrigin, LstBaseOrigin, UpdBaseOrigin...` | [`PPS108MI.json`](PPS108MI.json) |
| **`PPS110MI`** | Purchase Agreement Type | 15 | `AddPurAgrType, CpyPurAgrType, DltPurAgrType, GetPurAgrType, LstPurAgrType...` | [`PPS110MI.json`](PPS110MI.json) |
| **`PPS112MI`** | Self-billing Agreement Interface | 15 | `AddSelfBillAgr, CpySelfBillAgr, DltSelfBillAgr, GetSelfBillAgr, LstSelfBillAgr...` | [`PPS112MI.json`](PPS112MI.json) |
| **`PPS115MI`** | List alternative supplier | 10 | `LstAltSupplier, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS115MI.json`](PPS115MI.json) |
| **`PPS127MI`** | Supplier Rebate Invoice Transaction | 10 | `LstClaimDetails, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS127MI.json`](PPS127MI.json) |
| **`PPS135MI`** | Consignment Invoice Period | 14 | `Add, Dlt, Get, Lst, Upd...` | [`PPS135MI.json`](PPS135MI.json) |
| **`PPS136MI`** | Consignment Inv Period Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PPS136MI.json`](PPS136MI.json) |
| **`PPS160MI`** | Material Requisition Request Interface | 28 | `AddMRAdr, AddMRReq, AddText, AttestMR, ChgAuth...` | [`PPS160MI.json`](PPS160MI.json) |
| **`PPS170MI`** | Planned Purchase Order Information and Text Interface | 31 | `ApprovePOP, ClrInboxPOP, CrtPOP, DelPlannedPO, GeneratePONbr...` | [`PPS170MI.json`](PPS170MI.json) |
| **`PPS194MI`** | Purchase Release History Interface | 14 | `AddLine, DltLine, GetLine, LstLines, UpdLine...` | [`PPS194MI.json`](PPS194MI.json) |
| **`PPS195MI`** | Purchase Planning Level | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`PPS195MI.json`](PPS195MI.json) |
| **`PPS197MI`** | Priority Rule | 14 | `AddPriorityRule, DltPriorityRule, GetPriorityRule, LstPriorityRule, UpdPriorityRule...` | [`PPS197MI.json`](PPS197MI.json) |
| **`PPS199MI`** | Purchase organization connected warehouse | 15 | `Add, Dlt, Generate, Get, Lst...` | [`PPS199MI.json`](PPS199MI.json) |
| **`PPS200MI`** | Purchase Order Information and Text Interface | 36 | `AddLine, ApprovePO, DltLine, GetAddresses, GetDelAddress...` | [`PPS200MI.json`](PPS200MI.json) |
| **`PPS205MI`** | Monitor Purchase Order | 14 | `AddMonitor, DltMonitor, GetMonitor, LstMonitors, UpdMonitor...` | [`PPS205MI.json`](PPS205MI.json) |
| **`PPS215MI`** | Purchase order expenditures | 14 | `AddPOCharge, DltPOCharge, GetPOCharge, LstPOCharges, UpdPOCharge...` | [`PPS215MI.json`](PPS215MI.json) |
| **`PPS235MI`** | Authorization Distribution Interface | 15 | `AddAuthorized, CpyAuthorized, DltAuthorized, GetAuthorized, LstAuthorized...` | [`PPS235MI.json`](PPS235MI.json) |
| **`PPS280MI`** | Purchase Costing Element | 19 | `AddElement, AddElementValue, DltElementValue, GetElement, GetElementValue...` | [`PPS280MI.json`](PPS280MI.json) |
| **`PPS285MI`** | Connect Purchase Costing Model And Elements | 22 | `AddModel, AddModelElement, DltModel, DltModelElement, GetModel...` | [`PPS285MI.json`](PPS285MI.json) |
| **`PPS295MI`** | Simulate pur cost model | 10 | `LstPurCostSim, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`PPS295MI.json`](PPS295MI.json) |
| **`PPS310MI`** | PO Quality Inspection Interface | 21 | `CloseQIDelNote, GetQIDataPO, LstBalIDQI, LstBalIDQI2, LstQIDataPO...` | [`PPS310MI.json`](PPS310MI.json) |
| **`PPS320MI`** | Purchase Order Put-Away | 20 | `ClosePADelNote, GetPADataPO, LstBalIDPA, LstPADataPO, LstPADataPack...` | [`PPS320MI.json`](PPS320MI.json) |
| **`PPS330MI`** | PO Transaction Interface | 12 | `CheckDelPOTrans, DelPOTrans, ListPOTrans, FpwVersion, GetCurrentUser...` | [`PPS330MI.json`](PPS330MI.json) |
| **`PPS345MI`** | Goods Receiving Method Interface | 15 | `Add, Copy, Del, Get, Lst...` | [`PPS345MI.json`](PPS345MI.json) |
| **`PPS360MI`** | Delivery Note Interface | 37 | `AdviseHead, CloseItem, CloseItmPackage, ClosePackage, DltHead...` | [`PPS360MI.json`](PPS360MI.json) |
| **`PPS364MI`** | Delivery Note Sublot Interface | 14 | `AddSublot, DltSublot, GetSublot, LstSublot, UpdSublot...` | [`PPS364MI.json`](PPS364MI.json) |
| **`PPS370MI`** | Purchase Order Batch Entry | 27 | `AddAccString, AddAddress, AddCharge, AddHead, AddLine...` | [`PPS370MI.json`](PPS370MI.json) |
| **`PPS385MI`** | Settlement Printing Model Interface | 14 | `Add, Dlt, Get, Lst, Upd...` | [`PPS385MI.json`](PPS385MI.json) |
| **`PPS386MI`** | Connect Test and Attribute Lines to Settlement Printing | 14 | `AddModelElement, DltModelElement, GetModelElement, LstModelElement, UpdModelElement...` | [`PPS386MI.json`](PPS386MI.json) |
| **`PPS390MI`** | Return to Supplier Interface | 23 | `AddClaimHead, AddClaimLine, ChgClaimHead, ChgClaimLine, CreateRO...` | [`PPS390MI.json`](PPS390MI.json) |
| **`PPS430MI`** | Supplier statistics settings | 15 | `AddSupplierStat, CpySupplierStat, DltSupplierStat, GetSupplierStat, LstSupplierStat...` | [`PPS430MI.json`](PPS430MI.json) |
| **`PPS470MI`** | Supplier Rebate Agreement Model Interface | 23 | `AddHead, AddHeadLngTxt, AddLine, AddLineLngTxt, CpyModel...` | [`PPS470MI.json`](PPS470MI.json) |
| **`PPS472MI`** | Supplier Rebate Agreement Type Interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS472MI.json`](PPS472MI.json) |
| **`PPS473MI`** | Supplier rebate agreement table interface | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS473MI.json`](PPS473MI.json) |
| **`PPS474MI`** | Supplier Rebate Agreement Selection Matrix | 15 | `Add, Cpy, Del, Get, Lst...` | [`PPS474MI.json`](PPS474MI.json) |
| **`PPS475MI`** | Supplier Rebate Agreement Interface | 21 | `AddAgr, AddAgrLngTxt, AddAgrRates, CpyAgr, DltAgr...` | [`PPS475MI.json`](PPS475MI.json) |
| **`PPS478MI`** | Manage Supplier Rebate Transactions | 11 | `GetSupRebTrans, LstTransbyAgrNm, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`PPS478MI.json`](PPS478MI.json) |
| **`PPS482MI`** | Supplier rebate agr grp management | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`PPS482MI.json`](PPS482MI.json) |
| **`PPS500MI`** | Freight Purchase Transaction Interface | 14 | `AddFreightTrans, DltFreightTrans, GetFreightTrans, LstFreightTrans, UpdFreightTrans...` | [`PPS500MI.json`](PPS500MI.json) |
| **`PPSEPRMI`** | M3 e-Procurement Interface | 15 | `AddEPRReq, AddEPRText, ChgPOAdr, ConfirmEPRLine, CrtEPRPO...` | [`PPSEPRMI.json`](PPSEPRMI.json) |
| **`PPSSPPMI`** | Supplier Portal Interface | 14 | `GetSupLine, LstSupAddresses, LstSupHead, LstSupLine1, LstSupLine2...` | [`PPSSPPMI.json`](PPSSPPMI.json) |
| **`PSWAPPMI`** | PSW settings management | 15 | `AddSettings, DltSettings, GetSettings, LstSetBySeGr, LstSetByTypSet...` | [`PSWAPPMI.json`](PSWAPPMI.json) |
| **`QMS001MI`** | Qualitative Value Interface | 14 | `AddQualitative, DltQualitative, GetQualitative, LstQualitative, UpdQualitative...` | [`QMS001MI.json`](QMS001MI.json) |
| **`QMS002MI`** | Numeric Qualitative Interface | 14 | `AddNumericQual, DltNumericQual, GetNumericQual, LstNumericQual, UpdNumericQual...` | [`QMS002MI.json`](QMS002MI.json) |
| **`QMS003MI`** | Numeric Qualitative Value Interface | 14 | `AddNumericQualV, DltNumericQualV, GetNumericQualV, LstNumericQualV, UpdNumericQualV...` | [`QMS003MI.json`](QMS003MI.json) |
| **`QMS004MI`** | Test Classification Interface | 14 | `AddTestClass, DltTestClass, GetTestClass, LstTestClass, UpdTestClass...` | [`QMS004MI.json`](QMS004MI.json) |
| **`QMS005MI`** | Sample Type | 14 | `AddSampleType, DltSampleType, GetSampleType, LstSampleType, UpdSampleType...` | [`QMS005MI.json`](QMS005MI.json) |
| **`QMS006MI`** | Industry Standard Interface | 14 | `AddIndustryStd, DltIndustryStd, GetIndustryStd, LstIndustryStd, UpdIndustryStd...` | [`QMS006MI.json`](QMS006MI.json) |
| **`QMS007MI`** | Quality Group | 14 | `AddQualityGroup, DltQualityGroup, GetQualityGroup, LstQualityGroup, UpdQualityGroup...` | [`QMS007MI.json`](QMS007MI.json) |
| **`QMS008MI`** | Reason Code | 14 | `AddReasonCode, DltReasonCode, GetReasonCode, LstReasonCode, UpdReasonCode...` | [`QMS008MI.json`](QMS008MI.json) |
| **`QMS009MI`** | Quality Plan Interface | 14 | `AddQualityPlan, DltQualityPlan, GetQualityPlan, LstQualityPlan, UpdQualityPlan...` | [`QMS009MI.json`](QMS009MI.json) |
| **`QMS010MI`** | Sampling Plan | 14 | `AddSamplingPlan, DltSamplingPlan, GetSamplingPlan, LstSamplingPlan, UpdSamplingPlan...` | [`QMS010MI.json`](QMS010MI.json) |
| **`QMS011MI`** | Laboratory Code Interface | 14 | `AddLabCode, DltLabCode, GetLabCode, LstLabCodes, UpdLabCode...` | [`QMS011MI.json`](QMS011MI.json) |
| **`QMS012MI`** | Measurement Method Interface | 14 | `AddMeasrmtMethd, DltMeasrmtMethd, GetMeasrmtMethd, LstMeasrmtMethd, UpdMeasrmtMethd...` | [`QMS012MI.json`](QMS012MI.json) |
| **`QMS013MI`** | Measurement Instrument Interface | 14 | `AddMsrmntInstr, DltMsrmntInstr, GetMsrmntInstr, LstMsrmntInstr, UpdMsrmntInstr...` | [`QMS013MI.json`](QMS013MI.json) |
| **`QMS014MI`** | Reinspection Plan | 14 | `AddReinsPlan, DltReinsPlan, GetReinsPlan, LstReinsPlan, UpdReinsPlan...` | [`QMS014MI.json`](QMS014MI.json) |
| **`QMS015MI`** | Item Warehouse Quality Plan | 14 | `AddItemWhQPlan, DltItemWhQPlan, GetItemWhQPlan, LstItemWhQPlan, UpdItemWhQPlan...` | [`QMS015MI.json`](QMS015MI.json) |
| **`QMS100MI`** | Test Template Interface | 14 | `AddTstTemplate, DltTstTemplate, GetTstTemplate, LstTstTemplates, UpdTstTemplate...` | [`QMS100MI.json`](QMS100MI.json) |
| **`QMS150MI`** | Set Interface | 14 | `AddSet, DltSet, GetSet, LstSet, UpdSet...` | [`QMS150MI.json`](QMS150MI.json) |
| **`QMS200MI`** | Specification Interface | 18 | `AddSpec, DltSpec, GetSpec, LstSpec, LstSpecsByItem...` | [`QMS200MI.json`](QMS200MI.json) |
| **`QMS201MI`** | Specification Test Interface | 14 | `AddSpecTest, DltSpecTest, GetSpecTest, LstSpecTest, UpdSpecTest...` | [`QMS201MI.json`](QMS201MI.json) |
| **`QMS210MI`** | Specification Entities Interface | 14 | `AddSpecEntity, DltSpecEntity, GetSpecEntity, LstSpecEntity, UpdSpecEntity...` | [`QMS210MI.json`](QMS210MI.json) |
| **`QMS290MI`** | QI Request for Grower Agreement Interface | 11 | `AddQIRequest, LstSpec, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`QMS290MI.json`](QMS290MI.json) |
| **`QMS300MI`** | QI Request Interface | 24 | `AddQIRequest, DltQIRequest, GetQIRequest, GetQIRqByREPN, GetQIRqByRefOrd...` | [`QMS300MI.json`](QMS300MI.json) |
| **`QMS301MI`** | QI Specification Interface | 14 | `AddSpecToQIReqt, DelSpecToQIReqt, GetSpecQIReqt, LstSpecQIReqt, UpdSpecToQIReqt...` | [`QMS301MI.json`](QMS301MI.json) |
| **`QMS302MI`** | QI Request Specification Test | 14 | `AddTesttoQIReq, DltTestQIReq, GetTestQIReq, LstTestQIReq, UpdTesttoQIReq...` | [`QMS302MI.json`](QMS302MI.json) |
| **`QMS400MI`** | QI Request Test Result | 18 | `AddResultSeq, CalcSettlement, DltTestResults, GetTestResults, LstTestResults...` | [`QMS400MI.json`](QMS400MI.json) |
| **`QMS450MI`** | Copy QI Request Test Results Interface | 10 | `UpdTestResults, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QMS450MI.json`](QMS450MI.json) |
| **`QMS500MI`** | Order Specification Interface | 14 | `AddOrderSpec, DltOrderSpec, GetOrderSpec, LstOrderSpec, UpdOrderSpec...` | [`QMS500MI.json`](QMS500MI.json) |
| **`QMS501MI`** | Order Specification Test Interface | 14 | `AddOrderSpecTst, DltOrderSpecTst, GetOrderSpecTst, LstOrderSpecTst, UpdOrderSpecTst...` | [`QMS501MI.json`](QMS501MI.json) |
| **`QMS600MI`** | Generate Certificate of Analysis | 10 | `GenerateCOA, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QMS600MI.json`](QMS600MI.json) |
| **`QPS115MI`** | Sales Quotation Information | 12 | `GetQuoteInfo, LstQuoteInfo, UpdQuoteInfo, FpwVersion, GetCurrentUser...` | [`QPS115MI.json`](QPS115MI.json) |
| **`QQS001MI`** | Tool management | 17 | `AddLngTxt, AddTool, CpyTool, DltTool, GetTool...` | [`QQS001MI.json`](QQS001MI.json) |
| **`QQS005MI`** | Template item management | 17 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`QQS005MI.json`](QQS005MI.json) |
| **`QQS011MI`** | Tool and connected template items management | 10 | `Lst, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QQS011MI.json`](QQS011MI.json) |
| **`QUS020MI`** | Quotation type | 13 | `AddQuoteType, DltQuoteType, GetQuoteType, LstQuoteType, FpwVersion...` | [`QUS020MI.json`](QUS020MI.json) |
| **`QUS046MI`** | Product. Connect item | 13 | `AddItemConnect, DltItemConnect, GetItemConnect, LstItemConnect, FpwVersion...` | [`QUS046MI.json`](QUS046MI.json) |
| **`QUS050MI`** | Quick add of attribute | 10 | `QuickAddAttrib, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS050MI.json`](QUS050MI.json) |
| **`QUS060MI`** | Attribute Template | 14 | `AddAtte, DltAtte, GetAtte, LstAtte, UpdAtte...` | [`QUS060MI.json`](QUS060MI.json) |
| **`QUS095MI`** | EQM Status handling | 15 | `ApproveHead, ApproveLine, ChangeQuoteSts, ReadyLine, RejectHead...` | [`QUS095MI.json`](QUS095MI.json) |
| **`QUS100MI`** | Quotation head | 42 | `AddLineItem, AddQuote, AddQuoteHead, AddQuoteLine, AddTradeIn...` | [`QUS100MI.json`](QUS100MI.json) |
| **`QUS102MI`** | Quotation line configuration interface | 15 | `AdjustQuote, Get, GetQuotePrice, Lst, Reset...` | [`QUS102MI.json`](QUS102MI.json) |
| **`QUS103MI`** | Warranty interface | 14 | `AddWarranty, Dlt, Get, Lst, Upd...` | [`QUS103MI.json`](QUS103MI.json) |
| **`QUS104MI`** | Service interface | 15 | `AddService, CreateQuoteMCO, Dlt, Get, Lst...` | [`QUS104MI.json`](QUS104MI.json) |
| **`QUS105MI`** | Financing interface | 14 | `AddAgreement, Dlt, Get, Lst, Upd...` | [`QUS105MI.json`](QUS105MI.json) |
| **`QUS106MI`** | Financing interface | 14 | `AddFinancing, Dlt, Get, Lst, Upd...` | [`QUS106MI.json`](QUS106MI.json) |
| **`QUS107MI`** | Cash flow component interface | 15 | `AddPromotion, Dlt, Get, Lst, ReCalcPromotion...` | [`QUS107MI.json`](QUS107MI.json) |
| **`QUS108MI`** | Miscellaneous interface | 15 | `AddMisc, CalcLineCharges, Dlt, Get, Lst...` | [`QUS108MI.json`](QUS108MI.json) |
| **`QUS113MI`** | Add Warranty | 15 | `AddWarranty, ChgWarranty, DltWarranty, GetWarranty, LstWarrQuote...` | [`QUS113MI.json`](QUS113MI.json) |
| **`QUS114MI`** | Add Service | 15 | `AddService, ChgService, DltService, GetService, LstServQuote...` | [`QUS114MI.json`](QUS114MI.json) |
| **`QUS115MI`** | Add Agreement | 15 | `AddAgreement, ChgAgreement, DltAgreement, GetAgreement, LstAgrQuote...` | [`QUS115MI.json`](QUS115MI.json) |
| **`QUS116MI`** | Add Financing | 15 | `AddFinancing, ChgFinancing, DltFinancing, GetFinancing, LstFinaQuote...` | [`QUS116MI.json`](QUS116MI.json) |
| **`QUS117MI`** | Add Promotion | 15 | `AddPromotion, ChgPromotion, DltPromotion, GetPromotion, LstPromoQuote...` | [`QUS117MI.json`](QUS117MI.json) |
| **`QUS118MI`** | Add Miscellaneous Costs | 15 | `AddMiscellaneou, ChgMiscellaneou, DltMiscellaneou, GetMiscellaneou, LstMiscQuote...` | [`QUS118MI.json`](QUS118MI.json) |
| **`QUS119MI`** | Add Customer Variations | 14 | `AddCustomerVar, ChgCustomerVar, DltCustomerVar, GetCustomerVar, LstCustomerVar...` | [`QUS119MI.json`](QUS119MI.json) |
| **`QUS120MI`** | Related quotation | 17 | `Add, ConnectRelQuot, DisconRelQuot, Dlt, Get...` | [`QUS120MI.json`](QUS120MI.json) |
| **`QUS121MI`** | Grouped quotation | 17 | `Add, ConGroupQuot, DisconGroupQuot, Dlt, Get...` | [`QUS121MI.json`](QUS121MI.json) |
| **`QUS122MI`** | Quotation. Adjust price interface | 15 | `AdjustQuote, Get, GetQuotePrice, Lst, Reset...` | [`QUS122MI.json`](QUS122MI.json) |
| **`QUS123MI`** | Manage charges connected to and EQM head | 14 | `Add, Dlt, Get, Lst, Upd...` | [`QUS123MI.json`](QUS123MI.json) |
| **`QUS150MI`** | Cash flow component interface | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`QUS150MI.json`](QUS150MI.json) |
| **`QUS151MI`** | Salespersons connected to sales managers | 14 | `ConnSalesperson, Dlt, Get, Lst, LstByManager...` | [`QUS151MI.json`](QUS151MI.json) |
| **`QUS160MI`** | Target Margin | 14 | `AddTargetMargin, ChgTargetMargin, DltTargetMargin, GetTargetMargin, LstTargetMargin...` | [`QUS160MI.json`](QUS160MI.json) |
| **`QUS200MI`** | Equipment search interface | 10 | `SearchEquipment, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS200MI.json`](QUS200MI.json) |
| **`QUS210MI`** | Item search interface | 10 | `SearchItem, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS210MI.json`](QUS210MI.json) |
| **`QUS260MI`** | Quotation deal review interface | 10 | `LstDealReview, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS260MI.json`](QUS260MI.json) |
| **`QUS300MI`** | Quotation fulfillment interface | 10 | `LstFulfillment, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`QUS300MI.json`](QUS300MI.json) |
| **`REFFLDMI`** | Reference field interface | 11 | `Get, LstValueMap, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`REFFLDMI.json`](REFFLDMI.json) |
| **`RGS300MI`** | Financial Report Header | 21 | `Add, AddLngTxt, Cpy, CrtFile, CrtProposal...` | [`RGS300MI.json`](RGS300MI.json) |
| **`RGS301MI`** | Financial Report Sections | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS301MI.json`](RGS301MI.json) |
| **`RGS305MI`** | Financial Report Group Run Header | 19 | `Add, AddLngTxt, Cpy, CrtFiles, CrtProposals...` | [`RGS305MI.json`](RGS305MI.json) |
| **`RGS306MI`** | Financial Report Group Run Details | 14 | `Add, Dlt, Get, Lst, Upd...` | [`RGS306MI.json`](RGS306MI.json) |
| **`RGS307MI`** | Financial Report Purchase Invoice Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS307MI.json`](RGS307MI.json) |
| **`RGS308MI`** | Financial Report Sales Invoice Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS308MI.json`](RGS308MI.json) |
| **`RGS309MI`** | Financial Report Sales Invoice Charges | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS309MI.json`](RGS309MI.json) |
| **`RGS310MI`** | Financial Report Payment Receipt Documents | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS310MI.json`](RGS310MI.json) |
| **`RGS311MI`** | Financial Report Chart Of Accounts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS311MI.json`](RGS311MI.json) |
| **`RGS312MI`** | Financial Report Customer Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS312MI.json`](RGS312MI.json) |
| **`RGS313MI`** | Financial Report Supplier Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS313MI.json`](RGS313MI.json) |
| **`RGS314MI`** | Financial Report Item Master Table | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS314MI.json`](RGS314MI.json) |
| **`RGS315MI`** | Financial Report Unit Of Measure | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS315MI.json`](RGS315MI.json) |
| **`RGS316MI`** | Financial Report VAT Codes And Percentages | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS316MI.json`](RGS316MI.json) |
| **`RGS317MI`** | Financial Report Inventory Value | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS317MI.json`](RGS317MI.json) |
| **`RGS318MI`** | Financial Report Fixed Assets | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS318MI.json`](RGS318MI.json) |
| **`RGS319MI`** | Financial Report Bank Accounts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS319MI.json`](RGS319MI.json) |
| **`RGS320MI`** | Financial Report General Ledger | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS320MI.json`](RGS320MI.json) |
| **`RGS321MI`** | Financial Report Stock Transactions | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS321MI.json`](RGS321MI.json) |
| **`RGS322MI`** | Financial Report Purchase Invoice Header | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS322MI.json`](RGS322MI.json) |
| **`RGS323MI`** | Financial Report Payments | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS323MI.json`](RGS323MI.json) |
| **`RGS324MI`** | Financial Report Sales Invoice Header | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS324MI.json`](RGS324MI.json) |
| **`RGS325MI`** | Financial Report Withholding Tax Transactions | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS325MI.json`](RGS325MI.json) |
| **`RGS326MI`** | Financial Report Fixed Asset History | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS326MI.json`](RGS326MI.json) |
| **`RGS327MI`** | Financial Report Payment Receipts | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RGS327MI.json`](RGS327MI.json) |
| **`RGS900MI`** | Financial Report Header Specification | 17 | `Add, AddLngTxt, Cpy, CrtXmlStruct, Dlt...` | [`RGS900MI.json`](RGS900MI.json) |
| **`RGS901MI`** | Financial Report Section Specification | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`RGS901MI.json`](RGS901MI.json) |
| **`RGS905MI`** | Financial Report Group Header Specification | 16 | `Add, AddLngTxt, Cpy, Dlt, Get...` | [`RGS905MI.json`](RGS905MI.json) |
| **`RGS906MI`** | Financial Report Group Detail Specification | 13 | `Add, Dlt, Get, Lst, FpwVersion...` | [`RGS906MI.json`](RGS906MI.json) |
| **`RMS120MI`** | Future rate agreements | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`RMS120MI.json`](RMS120MI.json) |
| **`RMS440MI`** | Tickler notes | 16 | `AddTickleNote, CopyTickleNote, DltTickleNote, GetTickleNote, LstTickleNote...` | [`RMS440MI.json`](RMS440MI.json) |
| **`RPS040MI`** | Inventory Build-Up Interface | 15 | `Add, Clc, Dlt, Get, Lst...` | [`RPS040MI.json`](RPS040MI.json) |
| **`RPS045MI`** | Planning Entity Interface | 22 | `Add, AddAttribute, AddItem, Del, DelItem...` | [`RPS045MI.json`](RPS045MI.json) |
| **`RPS070MI`** | MRP Versions | 11 | `GetMrpVer, LstMrpVer, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`RPS070MI.json`](RPS070MI.json) |
| **`RPS080MI`** | Point Of Time Table | 10 | `LstPointOfTime, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS080MI.json`](RPS080MI.json) |
| **`RPS090MI`** | Sourcing Rule Interface | 14 | `AddSourcingRule, DltSourcingRule, GetSourcingRule, LstSourcingRule, UpdSourcingRule...` | [`RPS090MI.json`](RPS090MI.json) |
| **`RPS120MI`** | Demand Order Type | 10 | `GetDEOType, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS120MI.json`](RPS120MI.json) |
| **`RPS170MI`** | Demand Order Interface | 17 | `GenDEOStat, GetDEORel, GetDEOStat, LstDEONo, LstDEORel...` | [`RPS170MI.json`](RPS170MI.json) |
| **`RPS180MI`** | Planning Template | 14 | `AddPLT, ChangePLT, CopyPLT, DeletePLT, ListPLT...` | [`RPS180MI.json`](RPS180MI.json) |
| **`RPS185MI`** | Planning Template Rules | 14 | `AddPLTRule, ChangePLTRule, CopyPLTRule, DeletePLTRule, ListPLTRule...` | [`RPS185MI.json`](RPS185MI.json) |
| **`RPS195MI`** | Priority Rule Interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`RPS195MI.json`](RPS195MI.json) |
| **`RPS200MI`** | Manage Supply Chain Order | 10 | `ReGenSupChain, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`RPS200MI.json`](RPS200MI.json) |
| **`RPS300MI`** | Transfer Macro Orders To Fashion Planner | 19 | `GenDetSevMac, GetMacroHead, ListHeader, ListMaterials, ListOperations...` | [`RPS300MI.json`](RPS300MI.json) |
| **`RPS675MI`** | Surplus Return | 19 | `AddSurplHead, AddSurplLine, DltSurplHead, DltSurplLine, GetSurplRec...` | [`RPS675MI.json`](RPS675MI.json) |
| **`RPS680MI`** | Inventory Sharing | 16 | `GetItem, LstItems, LstItemsByFaci, LstItemsBySts, LstItemsBySup...` | [`RPS680MI.json`](RPS680MI.json) |
| **`RSS110MI`** | Customer delivery schedule interface | 30 | `AddAddress, AddCumQuantity, AddDeliveryNote, AddHeader, AddInstruction...` | [`RSS110MI.json`](RSS110MI.json) |
| **`SAS018MI`** | STR Rates:Contract Item Price | 14 | `AddServPrcList, DelServPrcList, GetServPrcList, LstServPrcList, UpdServPrcList...` | [`SAS018MI.json`](SAS018MI.json) |
| **`SAS100MI`** | Api: Agreement Head | 13 | `DelServiceAgrmt, GetServiceAgrmt, LstServiceAgrmt, UpdServiceAgrmt, FpwVersion...` | [`SAS100MI.json`](SAS100MI.json) |
| **`SAS110MI`** | Api: Agreement locations | 13 | `DelAgrmtCusSite, GetAgrmtCusSite, LstAgrmtCusSite, UpdAgrmtCusSite, FpwVersion...` | [`SAS110MI.json`](SAS110MI.json) |
| **`SAS120MI`** | Api: Agreement Item Lines | 13 | `DelAgreementLn, GetAgreementLn, LstAgreementLn, UpdAgreementLn, FpwVersion...` | [`SAS120MI.json`](SAS120MI.json) |
| **`SAS460MI`** | Manages the SARPIT table - Contract item per item | 14 | `AddContractItem, DltContractItem, GetContractItem, LstContractItem, UpdContractItem...` | [`SAS460MI.json`](SAS460MI.json) |
| **`SES120MI`** | Field Audit Trail Access | 13 | `HasDeleted, LstAuditFields, LstDeleted, LstFieldInfo, FpwVersion...` | [`SES120MI.json`](SES120MI.json) |
| **`SES300MI`** | Manages the Keystore in CKEYST table | 15 | `AddKeyStore, DltKeyStore, GetKeyStore, LstKeyStoreData, LstKeyStores...` | [`SES300MI.json`](SES300MI.json) |
| **`SES400MI`** | Manages the Permission Setup | 16 | `Add, ChkRoleFnc, Dlt, Get, Lst...` | [`SES400MI.json`](SES400MI.json) |
| **`SES403MI`** | Functions per Role | 17 | `Activate, Add, Cpy, Deactivate, Dlt...` | [`SES403MI.json`](SES403MI.json) |
| **`SES405MI`** | Manages the MI Transaction Security Option | 13 | `CrtDefValues, Get, Lst, Upd, FpwVersion...` | [`SES405MI.json`](SES405MI.json) |
| **`SES410MI`** | eSign Program Interface | 12 | `GetProgram, LstPrograms, UpdProgram, FpwVersion, GetCurrentUser...` | [`SES410MI.json`](SES410MI.json) |
| **`SES411MI`** | Manages the Object to use E-Signature | 14 | `AddObject, DltObject, GetObject, LstObjects, UpdObject...` | [`SES411MI.json`](SES411MI.json) |
| **`SES414MI`** | E-Signature object group | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`SES414MI.json`](SES414MI.json) |
| **`SES415MI`** | Manages the Signatory in E-Signature process | 14 | `AddSignatory, DltSignatory, GetSignatory, LstSignatories, UpdSignatory...` | [`SES415MI.json`](SES415MI.json) |
| **`SES440MI`** | Manages the E-Signature Records | 11 | `GetEsignRecord, LstEsignRecords, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES440MI.json`](SES440MI.json) |
| **`SES450MI`** | Manage e-signature | 14 | `GetEsignature, LstBySignatory, LstEsignatures, PrcEsignature, RejEsignature...` | [`SES450MI.json`](SES450MI.json) |
| **`SES490MI`** | Manages the E-Sign Error Log | 11 | `GetErrorLog, LstErrorLogs, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES490MI.json`](SES490MI.json) |
| **`SES510MI`** | Security Audit Interface | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SES510MI.json`](SES510MI.json) |
| **`SHS010MI`** | Manage the job schedule entries | 14 | `DltExternalJob, ExecuteJob, GetExternalJob, LstExtJobs, SchedXM3Job...` | [`SHS010MI.json`](SHS010MI.json) |
| **`SOS001MI`** | Item Complement | 14 | `AddItem, DltItem, GetItem, LstItem, UpdItem...` | [`SOS001MI.json`](SOS001MI.json) |
| **`SOS050MI`** | Brands | 14 | `Add, Chg, Del, Get, Lst...` | [`SOS050MI.json`](SOS050MI.json) |
| **`SOS100MI`** | Service order interface | 55 | `AddIndItem, AddLine, AddMtrReading, ChgAssignm, ChgAssignmSts...` | [`SOS100MI.json`](SOS100MI.json) |
| **`SOS200MI`** | Service order inquiry interface | 40 | `AddIndItemText, AddSOText, GetServInfo, LstAddnlSts, LstAgrText...` | [`SOS200MI.json`](SOS200MI.json) |
| **`SOS300MI`** | Batch order entry Service order | 21 | `AddSOLine, AddServBatchAdr, AddServBatchLin, AddServBatchTxt, ChgFixedPrAssig...` | [`SOS300MI.json`](SOS300MI.json) |
| **`SOS350MI`** | Service order invoice interface | 24 | `GetCashDiscount, GetDelHead, GetDelLine, GetInvHead, GetInvLine...` | [`SOS350MI.json`](SOS350MI.json) |
| **`SOS400MI`** | Service order inquiry interface | 24 | `AddAssignStsHis, DelAssignStsHis, LstAgrLocation, LstAgrMtrPrDet, LstAgrMtrPrHd...` | [`SOS400MI.json`](SOS400MI.json) |
| **`SOS408MI`** | Service item identity | 14 | `Add, Del, Get, Lst, Upd...` | [`SOS408MI.json`](SOS408MI.json) |
| **`SOS500MI`** | Service order entry interface | 13 | `GetFixedPrAssig, LstAssignSOText, LstAssignmPerSO, LstFixedPrAssig, FpwVersion...` | [`SOS500MI.json`](SOS500MI.json) |
| **`SOS550MI`** | List and Get Transactions | 11 | `GetRntlEquipmnt, LstRntlEquipmnt, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SOS550MI.json`](SOS550MI.json) |
| **`SOS600MI`** | Service order entry - Charges | 13 | `GetAssignmChrg, GetSOLineChrg, LstAssignmChrg, LstSOLineChrg, FpwVersion...` | [`SOS600MI.json`](SOS600MI.json) |
| **`SOS800MI`** | Discount Model Interface | 15 | `AddDiscModel, CpyDiscModel, DltDiscModel, GetDiscModel, LstDiscModels...` | [`SOS800MI.json`](SOS800MI.json) |
| **`SOS805MI`** | Discount Number Interface | 15 | `AddDiscNumber, CpyDiscNumber, DltDiscNumber, GetDiscNumber, LstDiscNumbers...` | [`SOS805MI.json`](SOS805MI.json) |
| **`SOS811MI`** | Discount Matrix Interface | 15 | `AddDiscMatrix, CpyDiscMatrix, DltDiscMatrix, GetDiscMatrix, LstDiscMatrixs...` | [`SOS811MI.json`](SOS811MI.json) |
| **`SPS020MI`** | Supply Chain Node Interface | 11 | `SndCoordinates, UpdCoordinates, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SPS020MI.json`](SPS020MI.json) |
| **`SPS100MI`** | SCP Versions Interface | 11 | `Select, SelectYOP, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`SPS100MI.json`](SPS100MI.json) |
| **`SPS101MI`** | SCP Basic Data Interface | 24 | `BuildSelection, DeleteMOP, DeletePOP, DisAndImpINV, DisAndImpMDS...` | [`SPS101MI.json`](SPS101MI.json) |
| **`SPS300MI`** | Manages SCP business area | 23 | `AddBSARWhs, AddBusinessArea, AddFieldSel, DelBSARWhs, DelBusinessArea...` | [`SPS300MI.json`](SPS300MI.json) |
| **`STS012MI`** | Price list table interface | 16 | `AddPriceLstMtrx, DltPriceLstMtrx, GetPriceLstMtrx, LstObjConTable, LstPriceLstMtrx...` | [`STS012MI.json`](STS012MI.json) |
| **`STS017MI`** | Rental Price List | 14 | `AddPrcLstHead, DelPriceList, GetPriceList, LstPriceLstHead, UpdPriceList...` | [`STS017MI.json`](STS017MI.json) |
| **`STS020MI`** | Agreement order type | 15 | `AddAgrOrderType, CpyAgrOrderType, DltAgrOrderType, GetAgrOrderType, LstAgrOrderType...` | [`STS020MI.json`](STS020MI.json) |
| **`STS030MI`** | Rental depot | 14 | `AddDepot, DltDepot, GetDepot, LstDepots, UpdDepot...` | [`STS030MI.json`](STS030MI.json) |
| **`STS040MI`** | Cost and Revenue Allocation rules | 14 | `AddAllocRules, DelAllocRules, GetAllocRules, LstAllocRules, UpdAllocRules...` | [`STS040MI.json`](STS040MI.json) |
| **`STS045MI`** | Generic item management | 14 | `AddGenericItem, CpyGenericItem, DltGenericItem, GetGenericItem, LstGenericItems...` | [`STS045MI.json`](STS045MI.json) |
| **`STS046MI`** | Generic Item. Connect Equipment - STR | 16 | `AddGenItem, DelGenItem, GetGenItem, LstGenItemWhs, RevAgrToGenItem...` | [`STS046MI.json`](STS046MI.json) |
| **`STS060MI`** | Reason code interface | 14 | `AddReasonCode, DelReasonCode, GetReasonCode, LstReasonCode, UpdReasonCode...` | [`STS060MI.json`](STS060MI.json) |
| **`STS100MI`** | Agreement Head - Short term rental | 20 | `AddRentalAgree, DltRentalAgree, GetRentalAgree, LstAgreeByAOTP, LstAgreeByCUOR...` | [`STS100MI.json`](STS100MI.json) |
| **`STS101MI`** | API: Short term rental agreement Line | 15 | `AddRentalLine, DltRentalLine, GetRentalLine, LstRentActivity, LstRentalLine...` | [`STS101MI.json`](STS101MI.json) |
| **`STS103MI`** | Additional charges (STR) | 16 | `AddAddChrg, ChgAddChrg, ChkInAddChrg, ChkOutAddChrg, DelAddChrg...` | [`STS103MI.json`](STS103MI.json) |
| **`STS105MI`** | Agreement Head. Simulate Totals | 10 | `SimulateTotals, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS105MI.json`](STS105MI.json) |
| **`STS106MI`** | Calculate Leasing | 12 | `AddCalcRPO, DelRPO, UpdCalcRPO, FpwVersion, GetCurrentUser...` | [`STS106MI.json`](STS106MI.json) |
| **`STS107MI`** | Simulate Rental Price | 10 | `SimRentalPrc, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS107MI.json`](STS107MI.json) |
| **`STS109MI`** | STR Agreement - Create | 10 | `CrtRentalAgrmnt, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS109MI.json`](STS109MI.json) |
| **`STS110MI`** | STR Agreement - Deposit | 14 | `AddDeposit, ChgDeposit, DelDeposit, GetDeposit, LstDeposit...` | [`STS110MI.json`](STS110MI.json) |
| **`STS112MI`** | Rental Agreement- invoice in advance | 14 | `AddAdvanceInv, DelAdvanceInv, GetAdvanceInv, LstAdvanceInv, UpdAdvanceInv...` | [`STS112MI.json`](STS112MI.json) |
| **`STS117MI`** | Rental agreement line charges | 14 | `AddLineChrg, ChgLineChrg, DelLineChrg, GetLineChrg, LstLineChrg...` | [`STS117MI.json`](STS117MI.json) |
| **`STS118MI`** | Rental Agr Stand down period | 14 | `Add, Del, Get, Lst, Upd...` | [`STS118MI.json`](STS118MI.json) |
| **`STS119MI`** | STR Agreement - Contact person | 13 | `Add, Del, Get, Lst, FpwVersion...` | [`STS119MI.json`](STS119MI.json) |
| **`STS120MI`** | Price list lines (STR) | 15 | `AddPrcLstLines, DelPrcLstLines, GetPrcLstLines, GetPrcLstLines2, LstPrclistLines...` | [`STS120MI.json`](STS120MI.json) |
| **`STS121MI`** | Rental meter price schedule | 10 | `UpdMeterPrice, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS121MI.json`](STS121MI.json) |
| **`STS122MI`** | Rental Price List Description Language | 14 | `AddNamePerLng, DelNamePerLng, GetNamePerLng, LstNamePerLng, UpdNamePerLng...` | [`STS122MI.json`](STS122MI.json) |
| **`STS123MI`** | Rates: Stepped Price | 14 | `AddSteppedPrice, DelSteppedPrice, GetSteppedPrice, LstSteppedPrice, UpdSteppedPrice...` | [`STS123MI.json`](STS123MI.json) |
| **`STS124MI`** | STR Rates, Meter Prices | 15 | `AddMeterPrice, DelMeterPrice, GetMeterPrice, GetMeterPrice2, LstMeterPrice...` | [`STS124MI.json`](STS124MI.json) |
| **`STS125MI`** | STR Rates: Enter Package Price | 14 | `AddPckgRate, DelPckgRate, GetPckgRate, LstPckgRate, UpdPckgRate...` | [`STS125MI.json`](STS125MI.json) |
| **`STS127MI`** | Service price management | 14 | `AddServPrice, DltServPrice, GetServPrice, LstServPrices, UpdServPrice...` | [`STS127MI.json`](STS127MI.json) |
| **`STS128MI`** | Block code on rental agreement | 12 | `GetAgreeStop, LstAgreeStop, UpdAgreeStop, FpwVersion, GetCurrentUser...` | [`STS128MI.json`](STS128MI.json) |
| **`STS129MI`** | Rental Rates, Meters Price | 14 | `AddMeterPrice, DelMeterPrice, GetMeterPrice, LstMeterPrice, UpdMeterPrice...` | [`STS129MI.json`](STS129MI.json) |
| **`STS136MI`** | Cash flow component interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`STS136MI.json`](STS136MI.json) |
| **`STS137MI`** | Cash flow price list interface | 17 | `Add, Dlt, Get, LstPerAgreem, LstPerComp...` | [`STS137MI.json`](STS137MI.json) |
| **`STS138MI`** | Cash flow curve interface | 12 | `Get, Lst, Upd, FpwVersion, GetCurrentUser...` | [`STS138MI.json`](STS138MI.json) |
| **`STS140MI`** | Rental Logistic Toolbox | 17 | `ConfirmIssues, DispatchTech, GetToolboxStat, LstByStatus, ReturnTech...` | [`STS140MI.json`](STS140MI.json) |
| **`STS177MI`** | Change Customer Site | 10 | `UpdCustSite, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS177MI.json`](STS177MI.json) |
| **`STS201MI`** | Short term rental agreement Line | 21 | `AddRentalLine, CrtExchange, DltRentalLine, DownUpRent, GetRentalLine...` | [`STS201MI.json`](STS201MI.json) |
| **`STS205MI`** | Rental sales line stock return interface | 10 | `Create, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS205MI.json`](STS205MI.json) |
| **`STS225MI`** | Rental partial termination | 13 | `DltPartialTerm, GetPartialTerm, LstPartialTerms, UpdPartialTerm, FpwVersion...` | [`STS225MI.json`](STS225MI.json) |
| **`STS300MI`** | Equipment search interface | 11 | `AggregSearch, DetailedSearch, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`STS300MI.json`](STS300MI.json) |
| **`STS350MI`** | Short Term Rental invoice interface | 14 | `GetInvHead, ListInvHistLine, LslInvHistDet, LstInvHistPrItm, LstInvPerPayer...` | [`STS350MI.json`](STS350MI.json) |
| **`STS455MI`** | STR Package Structure Header | 14 | `Add, Del, Get, Lst, Upd...` | [`STS455MI.json`](STS455MI.json) |
| **`STS456MI`** | STR Package Structure Lines | 14 | `Add, Del, Get, Lst, Upd...` | [`STS456MI.json`](STS456MI.json) |
| **`STS465MI`** | Rental Alias number | 14 | `AddAlias, DltAlias, GetAlias, LstAlias, UpdAlias...` | [`STS465MI.json`](STS465MI.json) |
| **`STS490MI`** | Short term rental transactions | 12 | `LstByFleetNo, LstBySerialNo, LstByWarehouse, FpwVersion, GetCurrentUser...` | [`STS490MI.json`](STS490MI.json) |
| **`STS495MI`** | Rental planning board interface | 13 | `LstAvailGeneric, LstAvailability, LstEquipment, LstGenericItem, FpwVersion...` | [`STS495MI.json`](STS495MI.json) |
| **`STS590MI`** | Management of additional charges connected to items | 14 | `AddAdChargItem, DltAdChargItem, GetAdChargItem, LstAdChargItems, UpdAdChargItem...` | [`STS590MI.json`](STS590MI.json) |
| **`STS610MI`** | Print Rental Agr | 10 | `PrintRentalAgr, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`STS610MI.json`](STS610MI.json) |
| **`STS675MI`** | Fleet value | 12 | `GenFleetValue, GetFleetValue, LstFleetValues, FpwVersion, GetCurrentUser...` | [`STS675MI.json`](STS675MI.json) |
| **`STS940MI`** | Rental Counter Settings | 12 | `GetSetting, LstAgrOrdTypes, SetSetting, FpwVersion, GetCurrentUser...` | [`STS940MI.json`](STS940MI.json) |
| **`TAS010MI`** | Time accounting pricelist head | 15 | `AddPrcLstHead, CpyPrcLstHead, DltPrcLstHead, GetPrcLstHead, LstPrcLstHead...` | [`TAS010MI.json`](TAS010MI.json) |
| **`TAS011MI`** | Time accounting pricelist line | 15 | `AddPrcLstLine, CpyPrcLstLine, DltPrcLstLine, GetPrcLstLine, LstPrcLstLines...` | [`TAS011MI.json`](TAS011MI.json) |
| **`TAS100MI`** | Time accounting head | 16 | `AddTimeAcctHead, CompTimeReport, DltTimeAcctHead, GetTimeAcctHead, LstTimeAcctHead...` | [`TAS100MI.json`](TAS100MI.json) |
| **`TAS101MI`** | Time reports interface | 16 | `AddExpense, AddTimeTranWeek, AddTimeTrans, DltTimeTrans, GetTimeTrans...` | [`TAS101MI.json`](TAS101MI.json) |
| **`TAS110MI`** | Approve time reports | 14 | `ApproveReport, GetTimeReport, LstPerApprover, LstPerEmployee, RejectReport...` | [`TAS110MI.json`](TAS110MI.json) |
| **`TAS111MI`** | Approve time repot lines | 16 | `ApproveAllLines, GetLine, HoldLine, LstLinesEmpl, LstLinesProj...` | [`TAS111MI.json`](TAS111MI.json) |
| **`TAS115MI`** | Manage authorization of time reports | 16 | `ApproveAllLines, ApproveLine, GetLine, HoldLine, LstLines...` | [`TAS115MI.json`](TAS115MI.json) |
| **`TAS120MI`** | Transfer time transactions | 15 | `CreateAndUpdate, CreateProposal, DeleteProposal, GetSelection, LstProposalRec...` | [`TAS120MI.json`](TAS120MI.json) |
| **`TEMPLATEMI`** | MI Component template | 14 | `Add, Delete, Get, List, Update...` | [`TEMPLATEMI.json`](TEMPLATEMI.json) |
| **`TMS006MI`** | Time and Attendance | 35 | `ChgCostCenter, DelTimeTrans, FixedTime, GetEmpStat, In...` | [`TMS006MI.json`](TMS006MI.json) |
| **`TMS200MI`** | Absence stamps | 15 | `AddAbsence, CpyAbsence, DltAbsence, GetAbsence, LstAbsence...` | [`TMS200MI.json`](TMS200MI.json) |
| **`TMS800MI`** | Payroll Transaction | 12 | `DltPayTrans, LstCalTrans, LstPayTrans, FpwVersion, GetCurrentUser...` | [`TMS800MI.json`](TMS800MI.json) |
| **`TXAT30MI`** | Austrian Intrastat Declarations | 11 | `GetHead, LstLine, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXAT30MI.json`](TXAT30MI.json) |
| **`TXBR10MI`** | CBS/IBS Classification Code | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR10MI.json`](TXBR10MI.json) |
| **`TXBR11MI`** | IS classification code management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR11MI.json`](TXBR11MI.json) |
| **`TXBR12MI`** | CBS/IBS Tax Rate management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR12MI.json`](TXBR12MI.json) |
| **`TXBR13MI`** | Classification code priority management | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXBR13MI.json`](TXBR13MI.json) |
| **`TXBR14MI`** | Classification code selection management | 16 | `Add, Cpy, Dlt, Get, GetRplClssifCd...` | [`TXBR14MI.json`](TXBR14MI.json) |
| **`TXIT40MI`** | Electronic VAT report - White List | 12 | `GetVATHead, LstVATDetailsAg, LstVATDetailsAl, FpwVersion, GetCurrentUser...` | [`TXIT40MI.json`](TXIT40MI.json) |
| **`TXS003MI`** | VAT Registration Number Validation Policy | 15 | `AddVATRegNoVali, CpyVATRegNoVali, DltVATRegNoVali, GetVATRegNoVali, LstVATRegNoVali...` | [`TXS003MI.json`](TXS003MI.json) |
| **`TXS005MI`** | VAT report template | 43 | `AddElReportTemp, AddTempColumSel, AddTempColumn, AddTempLine, AddTempLineSel...` | [`TXS005MI.json`](TXS005MI.json) |
| **`TXS011MI`** | VAT Registration Number Validation Policy - Local Exception | 15 | `AddValidPolicy, CpyValidPolicy, DltValidPolicy, GetValidPolicy, LstValidPolicy...` | [`TXS011MI.json`](TXS011MI.json) |
| **`TXS030MI`** | Fiscal Representative | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS030MI.json`](TXS030MI.json) |
| **`TXS031MI`** | VAT rate rule interface | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS031MI.json`](TXS031MI.json) |
| **`TXS035MI`** | EU Sales/Purchase Additional Field | 15 | `AddAddField, CpyAddField, DltAddField, GetAddField, LstBaseCountry...` | [`TXS035MI.json`](TXS035MI.json) |
| **`TXS040MI`** | VAT registration number for supplier cash purchase | 10 | `GetVATRegNoInfo, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`TXS040MI.json`](TXS040MI.json) |
| **`TXS070MI`** | VAT Registration Number | 17 | `AddVATRegNo, CpyVATRegNo, DltVATRegNo, GetVATRegNo, LstVATRegNo...` | [`TXS070MI.json`](TXS070MI.json) |
| **`TXS071MI`** | VAT Registration Number Validation Status | 14 | `AddVATRegStatus, DltVATRegStatus, GetVATRegStatus, LstVATRegStatus, UpdVATRegStatus...` | [`TXS071MI.json`](TXS071MI.json) |
| **`TXS072MI`** | VAT Registration Number Validation Log | 11 | `GetVATRegNoLog, LstVATRegNoLog, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS072MI.json`](TXS072MI.json) |
| **`TXS080MI`** | Item Related Tax ID | 15 | `AddID, CpyID, DltID, GetID, LstID...` | [`TXS080MI.json`](TXS080MI.json) |
| **`TXS081MI`** | Item Related Tax ID Lines | 15 | `AddLine, CpyLine, DltLine, GetLine, LstLine...` | [`TXS081MI.json`](TXS081MI.json) |
| **`TXS082MI`** | Item Related Tax ID Column Specification | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS082MI.json`](TXS082MI.json) |
| **`TXS083MI`** | Item Related Tax ID Limit Connection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS083MI.json`](TXS083MI.json) |
| **`TXS085MI`** | Item Related Tax ID Item Connection | 15 | `Add, Cpy, Dlt, Get, Lst...` | [`TXS085MI.json`](TXS085MI.json) |
| **`TXS090MI`** | Tax Invoice Settings | 15 | `AddTaxInvSet, CpyTaxInvSet, DelTaxInvSet, GetTaxInvSet, LstTaxInvSet...` | [`TXS090MI.json`](TXS090MI.json) |
| **`TXS091MI`** | Tax Invoice Settings - Customer Exemptions | 15 | `AddTaxInvCusEx, CpyTaxInvCusEx, DelTaxInvCusEx, GetTaxInvCusEx, LstTaxInvCusEx...` | [`TXS091MI.json`](TXS091MI.json) |
| **`TXS095MI`** | Tax Invoice Agent Settings | 15 | `AddTaxAgentSet, CpyTaxAgentSet, DelTaxAgentSet, GetTaxAgentSet, LstTaxAgentSet...` | [`TXS095MI.json`](TXS095MI.json) |
| **`TXS100MI`** | Electronic VAT report | 19 | `GetHeadInfo, GetVATRunID, LstVATDetails, LstVATInvPerLn, LstVATInvoice...` | [`TXS100MI.json`](TXS100MI.json) |
| **`TXS130MI`** | EU Sales/Purchase Proposal | 12 | `GetHeadInfo, LstAmountEUSale, LstInvEUSale, FpwVersion, GetCurrentUser...` | [`TXS130MI.json`](TXS130MI.json) |
| **`TXS140MI`** | Annual VAT Report | 13 | `GetHeadInfo, LstCusSupVATLin, LstTotalPerInv, LstVATRegNoLine, FpwVersion...` | [`TXS140MI.json`](TXS140MI.json) |
| **`TXS170MI`** | Item Related Tax Report Header | 14 | `Dlt, Get, Lst, RestartProposal, Upd...` | [`TXS170MI.json`](TXS170MI.json) |
| **`TXS171MI`** | Item Related Tax Report Lines | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS171MI.json`](TXS171MI.json) |
| **`TXS172MI`** | Item Related Tax Report Details | 11 | `Get, Lst, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS172MI.json`](TXS172MI.json) |
| **`TXS174MI`** | Item Related Tax Report Creation | 10 | `CreateProposals, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`TXS174MI.json`](TXS174MI.json) |
| **`TXS175MI`** | Item Related Tax Transaction Creation | 11 | `Add, AddSingleItem, FpwVersion, GetCurrentUser, GetFieldHeading...` | [`TXS175MI.json`](TXS175MI.json) |
| **`TXS300MI`** | Intrastat Declarations | 14 | `GetHead, GetHeadAddress, LstLine, SearchIntTrans, UpdSuppression...` | [`TXS300MI.json`](TXS300MI.json) |
| **`TXS905MI`** | AR Tax Invoice | 16 | `Approve, Confirm, GetDefTaxInv, GetPrelTaxInv, LstDefTaxInv...` | [`TXS905MI.json`](TXS905MI.json) |
| **`TXS910MI`** | AP Tax Invoice | 12 | `Add, Get, List, FpwVersion, GetCurrentUser...` | [`TXS910MI.json`](TXS910MI.json) |
| **`XBR001MI`** | Basic data information for Brazil | 35 | `GetCFOP, GetCOAddress, GetCountry, GetCustAddress, GetCustInvLine...` | [`XBR001MI.json`](XBR001MI.json) |
| **`XFI100MI`** | Get invoice reference in Finland | 10 | `GetReference, FpwVersion, GetCurrentUser, GetFieldHeading, GetFixLevel...` | [`XFI100MI.json`](XFI100MI.json) |
