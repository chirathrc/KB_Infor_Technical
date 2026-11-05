# M3 MI API catalog harvested from sample mappings

269 transactions across 93 MI programs. Full field metadata (position, length, type, mandatory) is in `mi_catalog.json`; this index lists each transaction, its mandatory inputs, how it was used (AV* single / AR* repeating, suffix M/L/I = exit map / exit loop / ignore on NOK), and how many sample maps use it.

## APS130MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetHead | DIVI, PRPN, PYON | 4/56 | AVM×16 | 16 |
| GetHead2 | PRPN, PYON | 3/62 | AVI×3, AVM×16 | 19 |
| GetHeadAddress | DIVI, PRPN, PYON | 4/32 | AVI×2, AVM×18 | 20 |
| GetUserInfo | - | 0/13 | AVM×1 | 1 |
| LstInvByPayee | - | 6/81 | ARM×16 | 16 |
| LstPayeeTotals | - | 6/51 | ARM×32 | 16 |
| LstPayeeTotals2 | - | 6/53 | ARI×3, ARM×16 | 19 |

## APS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetCashDiscInfo | YEA4, JRNO, JSNO | 5/28 | AVI×1 | 1 |
| GetInvTotInfo | DIVI, SPYN, SINO, INYR, SUNO | 5/67 | AVI×2 | 2 |
| GetInvoice | YEA4, JRNO, JSNO | 5/45 | AVI×1 | 1 |
| GetUniqueKey | SUNO, SINO, IVDT, INYR, TRCD | 7/5 | AVM×1 | 1 |
| SearchSupInvoic | SQRY | 1/12 | ARI×1 | 1 |

## APS251MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetInfo | YEA4, JRNO, JSNO | 6/3 | AVI×1 | 1 |
| GetInvInfo | SPYN, SUNO, SINO, INYR | 7/3 | AVI×5 | 1 |

## ARS120MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetInvHead | CINO, INYR | 3/73 | AVM×1 | 1 |
| LstInvLines | - | 8/38 | ARM×1 | 1 |

## ARS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetInvTotInfo | PYNO, CINO, INYR, CUNO | 5/85 | AVM×3 | 2 |
| GetInvoice | YEA4, JRNO, JSNO | 5/55 | AVI×1, AVM×1 | 1 |

## ATS101MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstAttributes | - | 5/56 | ARM×1 | 1 |
| SetAttrValue | - | 13/0 | AVM×5 | 5 |

## CMS082MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstFields | - | 3/18 | ARL×2 | 1 |

## CMS083MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstValues | - | 4/10 | ARL×2 | 1 |

## CMS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstBMForecast | MFWHLO, MFCYP6 | 3/10 | ARM×1 | 1 |
| LstBMItemWH | MBWHLO | 6/6 | ARI×3, ARM×1 | 2 |
| LstBMPriceFC | KOFACI, KOITNO | 7/10 | ARI×1 | 1 |
| LstBMPriceFC3 | KOFACI, KOITNO, KOSTRT, KOPCTP | 7/8 | ARM×1 | 1 |
| LstBMPricePO | MOWHLO, MOITNO, MOORCA | 9/14 | ARI×1 | 1 |
| LstBMStockPO | MOWHLO | 7/7 | ARI×1 | 1 |
| LstCLWFAging | ESDIVI | 6/3 | ARI×2, ARM×10 | 1 |
| LstCLWFGSales | UACUNO | 8/11 | ARM×1 | 1 |
| LstCLWFLstpaydt | ESCUNO, ESDIVI, ESPYNO | 4/5 | ARM×1 | 1 |
| LstCLWFPDChq30 | FYDIVI, FYPYNO | 4/2 | ARM×1 | 1 |
| LstCLWFPDChqVal | FYDIVI, FYPYNO | 2/2 | ARM×1 | 1 |
| LstCLWFSaleList | BSDIVI, BSPYNO | 5/4 | ARM×2 | 1 |
| LstCLWFTOTALOD | ESDIVI, ESPYNO | 4/3 | ARM×2 | 1 |
| LstCurrencyRate | CUDIVI, CULOCD, CUCUCD, CUCRTP | 5/6 | ARM×6 | 2 |
| LstCusCL | CCDIVI, CCPYNO | 2/8 | ARM×1 | 1 |
| LstCustDetails | OKCUNO | 1/5 | ARM×3 | 3 |
| LstDBTADDRESS | - | 2/5 | ARM×1 | 1 |
| LstDelLines | UBDIVI, UBYEA4, UBORNO, UBEXIN | 6/17 | ARM×1 | 1 |
| LstDoDetails | URDLIX, URRORC | 3/15 | ARM×3 | 1 |
| LstFcr040 | ACDIVI, ACSUNO, ACSINO, ACINYR | 5/5 | ARM×1 | 1 |
| LstGLErrors | DBDIVI, DBKEY1, DBINTN | 5/6 | ARI×2 | 1 |
| LstGls840Key | FHDIVI, FHINTN, FHKEY1 | 3/4 | ARI×2 | 1 |
| LstIntInvLines | CWFDIV, CWIINV, CWINYR | 7/15 | ARM×1 | 1 |
| LstPDSMaterial | - | 11/9 | ARM×1 | 1 |
| LstPOHead | IAPUNO | 1/13 | ARM×1 | 1 |
| LstPOLast | IBITNO, IBWHLO | 5/14 | ARM×2 | 2 |
| LstPOLine | IBPUNO | 3/10 | ARM×1 | 1 |
| LstPRDetail | POPLPN | 3/15 | ARM×2 | 1 |
| LstROLineDetail | - | 7/9 | ARM×1 | 1 |
| LstRecipeFeed | MMDIM1 | 4/4 | ARM×1 | 1 |
| LstSers | CTSTCO, CTSTKY | 4/6 | ARI×1 | 1 |
| LstStockLine | SDITNO, SDBANO, SDWHLO, SDWHSL | 7/14 | ARM×1 | 1 |
| LstVatRate | CVDIVI, CVVTCD | 5/9 | ARM×3 | 2 |
| SetLstMaxRec | MRCD | 1/0 | AVM×2 | 2 |

## CMS474MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetUdefContent | UDFT, CFMG, CFMF | 13/6 | AVI×1 | 1 |

## CRS008MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | FACI | 2/32 | AVI×2, AVM×7 | 7 |

## CRS030MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBasicData | VTCD | 1/11 | AVI×3 | 3 |

## CRS045MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBasicData | CSCD | 2/19 | AVI×1 | 1 |

## CRS055MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstRtPerPeriod | CUCD, CRTP, FPER, TPER, DAYN | 6/12 | ARM×1 | 1 |
| SelExchangeRate | CRTP, CUTD | 8/11 | ARM×1 | 1 |

## CRS065MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetDelyTerm | - | 2/14 | AVI×2 | 1 |

## CRS075MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | TEPY | 2/14 | AVM×1 | 1 |

## CRS111MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | EMTP, EMKY | 2/3 | AVI×4 | 4 |

## CRS175MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetGeneralCode | STCO, STKY | 6/7 | AVI×6 | 2 |
| GetItemFreeFlds | - | 1/12 | AVM×3 | 1 |

## CRS235MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | ADTH | 4/26 | AVM×2 | 1 |
| Lst | ADTH | 4/26 | ARM×1 | 1 |

## CRS610MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBasicData | CUNO | 2/52 | AVI×10, AVM×5 | 11 |
| GetFinancial | CUNO | 3/69 | AVI×1, AVM×5 | 4 |
| GetOrderInfo | CUNO | 3/75 | AVM×3 | 2 |
| GetServerTime | - | 0/3 | AVM×1 | 1 |

## CRS620MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetAddrPerDate | SUNO, ADTE, ADID, DAT1 | 4/34 | AVI×3 | 2 |
| GetBasicData | SUNO | 2/107 | AVI×8, AVM×10 | 16 |
| GetSupplierRef | SUNO, RFTY, RFID | 3/10 | AVI×15 | 15 |
| LstAddresses | SUNO | 1/26 | ARM×2 | 2 |

## CRS630MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetAccountID | AITP, AITM | 3/76 | AVI×5 | 1 |

## CRS690MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBasicData | - | 3/32 | AVI×3, AVM×5 | 8 |

## CRS692MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBankAccount | BKTP | 9/27 | AVI×1 | 1 |

## CRS881MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetTranslData | TRQF, MSTD, MVRS, BMSG, IBOB, ELMP, ELMD | 13/2 | AVI×12, AVM×17 | 17 |
| LstTranslData | - | 1/16 | ARM×4 | 4 |
| LstTranslDataOB | TRQF, MSTD, MVRS, BMSG, ELMP | 13/16 | ARM×1 | 1 |

## CRS886MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| CnvPtr | - | 7/6 | AVI×1 | 1 |

## CRS912MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetSeason | SEA1 | 1/9 | AVI×1 | 1 |

## CRS980MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddTxtBlockHead | TXID, FILE, KFLD, USID, TFIL | 12/0 | AVM×1 | 1 |
| AddTxtBlockLine | TXID, TFIL, FILE | 9/1 | AVM×1 | 1 |
| GetTextID | - | 18/1 | AVI×1, AVM×15 | 16 |
| RtvNewTextID | FILE | 7/1 | AVM×1 | 1 |
| SetTextID | - | 18/0 | AVM×1 | 1 |
| SltTxtBlock | TXID, TFIL | 7/2 | ARI×7, ARM×12 | 18 |

## CUSEXTMI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddFieldValue | FILE, PK01 | 32/0 | AVM×3 | 3 |
| ChgFieldValue | FILE, PK01 | 33/0 | AVM×3 | 3 |
| GetFieldValue | FILE, PK01 | 9/39 | AVI×7 | 7 |

## DRS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| CloseShipment | CONN | 1/2 | AVM×1 | 1 |
| ConnectShipment | CONN | 1/0 | AVM×1 | 1 |
| RptShipmentPick | CONN | 1/0 | AVM×1 | 1 |
| Update | CONN | 29/0 | AVM×1 | 1 |

## EXPORTMI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Select | QERY | 3/1 | ARI×2, ARM×1 | 1 |

## GLS015MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetServerTime | - | 0/3 | AVM×1 | 1 |

## GLS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetVoucherLine | DIVI, YEA4, VONO, JRNO, JSNO | 7/77 | AVI×1, AVM×1 | 2 |
| LstVoucherLines | DIVI, YEA4, VONO | 6/77 | ARI×1, ARM×1 | 2 |

## GLS840MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddBatchHead | CONO, KEY1, INTN, DESC | 6/3 | AVI×1, AVM×1 | 2 |
| AddBatchLine | CONO, KEY1, LINE, PARM | 5/1 | AVI×1, AVM×1 | 2 |
| CtrlBatch | CONO, KEY1 | 3/1 | AVI×1 | 1 |
| UpdBatch | CONO, KEY1 | 3/1 | AVI×1, AVM×1 | 2 |

## MDBREADMI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetMBMTRD00 | - | 5/14 | AVM×2 | 1 |
| GetMHDISH00 | INOU, DLIX | 2/3 | AVI×1 | 1 |
| GetMHDISHV8 | INOU, WHLO, DLIX | 3/2 | AVI×1 | 1 |
| GetMITAUN00 | - | 3/4 | AVL×4, AVM×7 | 10 |
| GetMITAUN21 | - | 3/5 | AVM×4 | 4 |
| GetMWOHED55 | - | 3/7 | AVM×3 | 3 |
| GetODHEAD42 | DIVI, YEA4, PYNO, EXIN, ORNO | 5/1 | AVM×1 | 1 |
| SelMBMTRD00 | - | 4/14 | ARI×1 | 1 |

## MHS001MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntItmMst | - | 117/1 | AVM×1 | 1 |
| ChgIntItmMst | E0PA, E065, IFIN | 104/0 | AVM×2 | 1 |
| GetIntItmMst | - | 3/97 | AVI×5 | 1 |
| LstIntItmViaItm | - | 3/96 | ARM×1 | 1 |

## MHS002MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntItmWhs | - | 85/0 | AVM×1 | 1 |
| ChgIntItmWhs | - | 89/0 | AVM×1 | 1 |
| GetIntItmWhs | - | 4/76 | AVI×1 | 1 |

## MHS003MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntItmFac | - | 21/0 | AVM×1 | 1 |
| ChgIntItmFac | - | 24/0 | AVM×1 | 1 |
| GetIntItmFac | - | 4/26 | AVI×1 | 1 |

## MHS015MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntItmAum | E0PA, E065, IFIN, AUTP, ALUN | 29/0 | AVM×1 | 1 |
| ChgIntItmAum | E0PA, E065, IFIN, AUTP, ALUN | 32/0 | AVM×1 | 1 |

## MHS025MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntItmAli | E0PA, E065, ALWT, IFIN, POPN | 23/0 | AVM×1 | 1 |

## MHS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddIntSku | E0PA, E065, IFIN | 15/3 | AVM×1 | 1 |
| ChgIntStyle | - | 25/0 | AVM×2 | 1 |

## MHS850MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddAttribute | MSGN, PACN, MSLN, ATID | 7/16 | AVM×3 | 1 |
| AddCOPick | WHLO, E0PA, E065, CUNO, RIDN, RIDL, PLSX | 50/4 | AVM×28 | 4 |
| AddCOReturn | - | 32/2 | AVM×1 | 1 |
| AddDO | WHLO, E0PA, E0PB, E065, TRTP, RESP | 60/2 | AVM×2 | 2 |
| AddDOPick | WHLO, E0PA, E065, RIDN, RIDL, RIDI, PLSX | 48/4 | AVM×28 | 4 |
| AddDOReceipt | - | 40/2 | AVI×10, AVM×1 | 5 |
| AddMOReceipt | WHLO, E0PA, E065, RIDN | 44/2 | AVM×1 | 1 |
| AddMOReqIssue | - | 24/4 | AVM×1 | 1 |
| AddPOClose | WHLO, E0PA, E065, RIDN | 16/2 | AVM×2 | 2 |
| AddPOReceipt | - | 39/2 | AVM×1 | 1 |
| AddPickViaPack | WHLO, E0PA, E065, DLIX | 21/4 | AVM×1 | 1 |
| AddPickViaRepNo | WHLO, E0PA, E065, PLRN | 39/4 | AVM×1 | 1 |
| AddROPick | WHLO, E0PA, E065, RIDN, RIDL, RIDI, PLSX | 48/4 | AVM×28 | 4 |
| AddROReceipt | WHLO, E0PA, E065, QTY, RIDN, RIDL, RIDI | 36/2 | AVI×1 | 1 |
| AddSubLine | MSGN, PACN, MSLN | 10/4 | AVM×2 | 1 |
| AddWhsHead | WHLO, QLFR, E0PA, E0PB, E065 | 83/2 | AVM×5 | 4 |
| AddWhsLine | WHLO, MSGN, PACN, QLFR | 99/4 | AVM×16 | 4 |
| AddWhsPack | WHLO, MSGN, QLFR | 68/3 | AVM×9 | 4 |
| ChgWhsLineX | MSGN, PACN, MSLN | 16/0 | AVM×5 | 2 |
| ChgWhsPack | WHLO, MSGN, PACN | 67/0 | AVM×2 | 2 |
| GetUserInfo | - | 0/13 | AVM×3 | 3 |
| GetWhsPack | MSGN, PACN | 3/67 | AVI×1 | 1 |
| PrcWhsTran | MSGN | 5/0 | AVM×9 | 4 |

## MMS005MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetWarehouse | WHLO | 1/56 | AVI×8, AVM×14 | 13 |

## MMS006MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | - | 1/6 | AVI×1 | 1 |

## MMS008MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetPlace | EDES | 1/4 | AVI×1 | 1 |

## MMS010MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| ListLocations | - | 3/49 | ARI×1, ARL×2 | 3 |

## MMS015MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | ITNO, AUTP, ALUN | 3/23 | AVI×5 | 3 |

## MMS017MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Add | - | 4/0 | AVM×2 | 1 |
| Delete | - | 4/0 | AVI×2 | 1 |
| List | - | 4/7 | ARL×2 | 1 |

## MMS025MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| DltAlias | ALWT, ALWQ, ITNO, POPN | 8/0 | AVM×1 | 1 |
| GetAlias | ALWT, ITNO, ALWQ | 6/24 | AVI×2 | 1 |
| LstAlias | ITNO | 3/24 | ARL×1 | 1 |

## MMS030MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Add | ITNO, LNCD, ITDS | 5/0 | AVM×1 | 1 |

## MMS060MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | WHLO, ITNO | 7/53 | AVM×12 | 4 |

## MMS080MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| SelPOHBalance | PLDT, APIP, FWLO, TWLO | 7/7 | ARI×1 | 1 |

## MMS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetHead | TRNR | 1/27 | AVM×1 | 1 |
| GetLine | TRNR, PONR | 3/54 | AVI×2 | 1 |

## MMS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| DltItmWhs | - | 3/0 | AVM×1 | 1 |
| Get | ITNO | 2/126 | AVI×7, AVM×12 | 15 |
| GetItmBasic | ITNO | 4/125 | AVM×1 | 1 |
| GetItmFac | FACI, ITNO | 4/79 | AVI×1, AVM×1 | 1 |
| GetItmWhsBasic | - | 4/133 | AVI×6 | 6 |
| GetUserInfo | - | 0/13 | AVM×7 | 7 |
| LstItmAltUnitMs | FITN, TITN | 7/27 | ARL×1 | 1 |
| LstItmWhsByItm | - | 4/112 | ARL×1 | 1 |
| UpdItmWhs | WHLO, ITNO | 165/0 | AVI×1 | 1 |

## MMS301MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstStockTakeDet | WHLO | 13/55 | ARM×1 | 1 |
| UpdStockTake | STNB, STRN, WHLO, STQI, STBT | 17/2 | AVI×1 | 1 |

## MMS310MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Update | WHLO, ITNO, WHSL | 20/0 | AVM×8 | 4 |

## MMS470MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddPackStk | PACT | 5/1 | AVM×2 | 1 |

## MMS850MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddAdjust | E0PA, E065, WHLO | 36/4 | AVM×6 | 3 |
| GetUserInfo | - | 0/13 | AVM×1 | 1 |

## MNS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetBasicData | - | 2/154 | AVI×3, AVM×3 | 6 |
| GetServerTime | - | 0/3 | AVM×1 | 1 |

## MNS150MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetUserData | USID | 1/32 | AVI×2 | 2 |
| GetUserInfo | - | 0/13 | AVM×2 | 2 |

## MNS260MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddMBMInit | DONR, PRF1, PRTF, OBJC, DONO | 18/1 | AVM×1 | 1 |
| DelMBMInit | BMIN | 1/0 | AVM×1 | 1 |
| PrcMBMInit | BMIN | 1/0 | AVM×1 | 1 |

## MRS001MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| SetLstMaxRec | MRCD | 1/0 | AVM×1 | 1 |

## MWS070MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstTransBalID | TTYP | 13/37 | ARM×1 | 1 |

## MWS121MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstDmdByAcqOrd | AOCA, ARDN | 9/17 | ARL×1 | 1 |

## MWS410MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetAdr | - | 3/21 | AVM×2 | 1 |
| GetHead | - | 5/126 | AVI×4, AVM×21 | 5 |
| GetServerTime | - | 0/3 | AVM×1 | 1 |
| RelForPick | - | 3/0 | AVM×4 | 4 |

## MWS411MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstDelLnByOrd | - | 4/34 | ARL×1 | 1 |
| LstDeliveryLine | DLIX | 2/34 | ARI×4, ARM×4 | 6 |

## MWS418MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Approve | INOU, DLIX | 10/0 | AVM×2 | 1 |
| Reject | INOU, DLIX | 10/0 | AVM×1 | 1 |
| UpdGovAppAct | - | 15/0 | AVM×1 | 1 |

## MWS419MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddGovAppLog | INOU, DLIX, GVDT, GVTM | 7/0 | AVM×1 | 1 |
| DltGovAppLog | INOU, DLIX, GVDT, GVTM, SEQN | 5/0 | AVI×1 | 1 |
| LstGovAppLog | INOU | 5/7 | ARI×1 | 1 |

## MWS420MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Confirm | DLIX, PLSX | 2/0 | AVI×4, AVM×9 | 4 |
| PrtDocuments | DLIX | 7/0 | AVM×11 | 4 |

## MWS422MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstPickDetail | DLIX | 2/64 | ARI×8, ARL×6, ARM×8 | 13 |

## MWS423MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstPackDel | - | 6/52 | ARL×1 | 1 |

## OIS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddBatchHead | CUNO | 71/1 | AVI×1 | 1 |
| AddBatchLine | ORNO, ITNO | 90/3 | AVI×1 | 1 |
| Confirm | ORNO | 3/2 | AVM×1 | 1 |
| GetHead | ORNO | 2/80 | AVM×1 | 1 |
| GetLine | ORNO, PONR | 5/122 | AVI×2, AVM×1 | 2 |
| GetOrderHead | - | 1/128 | AVI×11, AVM×3 | 11 |
| GetOrderValue | ORNO | 2/26 | AVM×1 | 1 |
| GetServerTime | - | 0/3 | AVM×1 | 1 |
| LstConnCOCharge | ORNO | 3/26 | ARM×2 | 1 |
| LstLine | ORNO | 5/159 | ARM×5 | 5 |

## OIS120MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetCOStopInfo | ORNO | 1/28 | AVM×1 | 1 |

## OIS155MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Approve | ORNO, WHLO, DLIX, TEPY, APBY | 7/0 | AVM×1 | 1 |
| ListDeliveries | FACI | 2/24 | ARL×1 | 1 |
| UpdateQty | ORNO, WHLO, DLIX, TEPY, PONR | 8/0 | AVM×1 | 1 |

## OIS350MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetInvHead | YEA4, IVNO | 6/36 | AVM×1 | 1 |

## PDS001MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Add | FACI, PRNO, STRT | 69/2 | AVI×4 | 2 |
| Copy | - | 11/1 | AVI×12 | 3 |
| Delete | - | 4/0 | AVI×6 | 3 |
| List | - | 4/65 | ARM×7 | 5 |
| Update | FACI, PRNO, STRT | 68/1 | AVI×13, AVM×1 | 3 |

## PDS002MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddComponent | - | 62/2 | AVI×8 | 4 |
| AddOperation | - | 77/1 | AVI×4 | 3 |
| Delete | - | 10/1 | AVI×7 | 5 |
| LstComponent | FACI | 7/67 | ARI×8 | 4 |
| LstOperation | FACI, PRNO | 8/79 | ARI×4, ARM×1 | 3 |
| UpdateComponent | - | 59/2 | AVI×1, AVM×2 | 2 |

## PDS050MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| Get | - | 3/9 | AVI×2 | 1 |

## PMS050MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| RptReceipt | - | 61/7 | AVM×4 | 4 |

## PMS090MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| UpdCoProdReport | FACI, MFNO, OPNO, CPNO | 25/0 | AVM×1 | 1 |

## PMS100MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstByRORN | - | 5/7 | ARM×4 | 4 |

## PPS001MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetHeadBasic | PUNO | 2/29 | AVM×1 | 1 |
| NotifyLine | - | 16/0 | AVI×4 | 4 |

## PPS040MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetItemSupplier | ITNO, SUNO | 4/54 | AVI×1 | 1 |

## PPS095MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetOrderType | ORTY | 1/83 | AVI×1 | 1 |

## PPS170MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| CrtPOP | WHLO, ITNO, SUNO, PLDT, PPQT, PSTS | 39/2 | AVM×1 | 1 |
| LstPlannedPO | PLPN | 2/67 | ARM×2 | 1 |

## PPS200MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetAddresses | PUNO | 2/44 | AVI×1 | 1 |
| GetDelAddress | PUNO, PNLI | 3/25 | AVI×1 | 1 |
| GetHead | PUNO | 2/85 | AVM×2 | 2 |
| GetLine | PUNO | 4/127 | AVI×1 | 1 |
| GetLineX | PUNO | 4/7 | AVI×1 | 1 |
| GetUserInfo | - | 0/13 | AVM×1 | 1 |
| LstHeadTxt | PUNO | 3/10 | ARI×1 | 1 |
| LstLine | PUNO | 2/127 | ARI×1, ARL×7, ARM×9 | 10 |
| LstLine2 | PUNO | 2/23 | ARL×1 | 1 |
| LstLineTxt | PUNO, PNLI, PNLS | 5/11 | ARI×1, ARL×1 | 1 |

## PPS215MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| LstPOCharges | - | 9/25 | ARL×1 | 1 |

## PPS280MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetElement | CEID | 1/35 | AVI×1 | 1 |

## PPS330MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| DelPOTrans | PUNO, PNLI, PUOS | 5/0 | AVM×2 | 2 |
| ListPOTrans | PUNO | 5/39 | ARL×2 | 2 |

## PPS360MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetDetail | WHLO, SUNO, SUTY, SUDO, PACN, ITNO, RIDN, RIDL, AGNB, BANO | 13/40 | AVM×1 | 1 |
| GetPackage | WHLO, SUNO, SUTY, SUDO, DNDT, PACN | 7/30 | AVI×1 | 1 |
| LstDetailByPack | PACN | 5/31 | ARM×1 | 1 |
| ReceivePkgLine | WHLO, SUNO, SUDO, DNDT, PACN, ITNO, RIDN, RIDL, RVQA | 21/2 | AVM×1 | 1 |
| StagePackage | - | 5/11 | AVM×1 | 1 |
| UpdPackageLine | WHLO, SUNO, SUDO, DNDT, PACN, ITNO, RIDN, RIDL, RIDX | 17/0 | AVM×1 | 1 |

## PPS390MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| AddClaimHead | FACI, WHLO, RTOT, SUNO | 23/1 | AVM×1 | 1 |
| AddClaimLine | CLAN, ITNO, CLIS, RJQA | 29/0 | AVM×1 | 1 |

## PPSEPRMI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetUserInfo | - | 0/13 | AVM×1 | 1 |

## TXS035MI

| Transaction | Mandatory inputs | #in/#out | Used as | Maps |
|---|---|---|---|---|
| GetAddField | DIVI, ESAF, BSCD | 5/2 | AVI×1 | 1 |

