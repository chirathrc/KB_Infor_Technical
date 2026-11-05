# Sample mapping inventory (80 mappings)

Classified by integration pattern. `F/L/API` = functions / loops+ifs / M3 API calls. CP = agreement control properties defined in the map.

| Family | Pattern | Count |
|---|---|---|
| F1 | MBM-triggered bank payment file out (EventData → ISO 20022 pain.001 / bank format) | 16 |
| F2 | MBM re-detector (classify event → raise new MBM via MNS260MI for a 2nd agreement) | 1 |
| F3 | Bank status report in (pain.002 → custom notification BOD for ION email) | 2 |
| F6 | Custom inbound Process BOD + Error Acknowledge (Process<Noun> → Acknowledge<Noun>) | 6 |
| F5 | Infor standard BOD (copied/versioned → custom) | 11 |
| F4 | Custom outbound from M3 event (EventData → custom Sync BOD / XML for ION workflow, e-invoice) | 9 |
| F7 | Custom XML request → M3 APIs → XML response (weighbridge / logistics) | 24 |
| F8 | BESTMIX formulation in (FormulationML/Envelope → PDS001/PDS002 updates + response) | 5 |
| F9 | Request-driven BOD out (Envelope request → M3 lists → Sync BOD reply) | 3 |
| F10 | Uploaded file → validated M3 batch APIs → status/notification output | 3 |

## F1 — MBM-triggered bank payment file out (EventData → ISO 20022 pain.001 / bank format)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3FTD_GC_CN_SCB_ACH_OUT_Custom` | 1.2 | EventData → Document | 45/9/13 | - |
| `M3FTD_GC_CN_SCB_BT_OUT_Custom` | 1.2 | EventData → Document | 44/8/12 | - |
| `M3FTD_GC_CN_SCB_RTGS_OUT_Custom` | 1.2 | EventData → Document | 45/9/13 | - |
| `M3FTD_GC_CN_SCB_TT_OUT_Custom` | 1.2 | EventData → Document | 44/8/12 | - |
| `M3FTD_GC_ID_HSBC_FAST_OUT_Custom` | 1.1 | EventData → Document | 39/7/12 | - |
| `M3FTD_GC_ID_HSBC_HVP_OUT_Custom` | 1.1 | EventData → Document | 42/7/13 | - |
| `M3FTD_GC_ID_HSBC_LVP_OUT_Custom` | 1.1 | EventData → Document | 42/7/14 | - |
| `M3FTD_GC_MY_HSBC_DTN_OUT_Custom` | 1.4 | EventData → Document | 50/9/14 | - |
| `M3FTD_GC_MY_HSBC_HVP_OUT_Custom` | 1.0 | EventData → Document | 38/7/11 | - |
| `M3FTD_GC_MY_HSBC_LVP_OUT_Custom` | 1.7 | EventData → Document | 51/8/16 | - |
| `M3FTD_GC_SG_HSBC_FAST_OUT_Custom` | 1.0 | EventData → Document | 37/7/10 | - |
| `M3FTD_GC_SG_HSBC_HVP_OUT_Custom` | 1.0 | EventData → Document | 36/7/9 | - |
| `M3FTD_GC_SG_HSBC_LVP_OUT_Custom` | 1.5 | EventData → Document | 49/8/14 | - |
| `M3FTD_GC_SG_HSBC_PP_OUT_Custom` | 1.4 | EventData → Document | 43/11/11 | - |
| `M3FTD_GC_VN_HSBC_FTR_OUT_Custom` | 1.7 | EventData → Document | 49/13/15 | - |
| `M3FTD_GC_VN_HSBC_LTR_OUT_Custom` | 1.6 | EventData → Document | 49/13/15 | - |

M3 APIs used in this family: APS130MI.GetHead (16), APS130MI.GetHead2 (16), APS130MI.GetHeadAddress (16), APS130MI.LstInvByPayee (16), APS130MI.LstPayeeTotals (16), APS130MI.LstPayeeTotals2 (16), CMS100MI.LstDBTADDRESS, CRS235MI.Lst, CRS620MI.GetBasicData (9), CRS620MI.GetSupplierRef (15), CRS620MI.LstAddresses (2), CRS690MI.GetBasicData (8), CRS881MI.GetTranslData (8), CRS980MI.GetTextID (16), CRS980MI.SltTxtBlock (16), CUSEXTMI.AddFieldValue (3), CUSEXTMI.ChgFieldValue (3), CUSEXTMI.GetFieldValue (7)

## F2 — MBM re-detector (classify event → raise new MBM via MNS260MI for a 2nd agreement)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3FTD_SCB_HSBC_Payment_MBM_ReDetector_Custom` | 1.1 | EventData → n/a | 14/1/4 | PRF1, PRF2, Program |

M3 APIs used in this family: APS130MI.GetHeadAddress, MNS260MI.AddMBMInit, MNS260MI.DelMBMInit, MNS260MI.PrcMBMInit

## F3 — Bank status report in (pain.002 → custom notification BOD for ION email)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `GC_CN_SCBACK2_IN` | 1.0.0 | Document → SyncSyncCNSCBAck2 | 21/5/5 | - |
| `GC_SCBACK1_IN` | 1.0.0 | Document → SyncSyncCNSCBAck1 | 26/5/5 | - |

M3 APIs used in this family: APS130MI.GetHead2 (2), APS130MI.GetHeadAddress (2), APS130MI.LstPayeeTotals2 (2), CRS881MI.GetTranslData (2), MNS100MI.GetBasicData (2)

## F6 — Custom inbound Process BOD + Error Acknowledge (Process<Noun> → Acknowledge<Noun>)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3BOD_BMPDSCleanUpAutomation_Acknowledge_Error_Out_GC_Custom` | 1.0 | ConfirmBOD → AcknowledgeBMPDSCleanUpAutomation | 4/0/0 | - |
| `M3BOD_BMPDSCleanUpAutomation_Process_In_GC_Custom` | 1.1 | ProcessBMPDSCleanUpAutomation → AcknowledgeBMPDSCleanUpAutomation | 22/4/3 | ITTY |
| `M3BOD_HSBCACKIN_Acknowledge_Error_Out_GC_Custom` | 1.0 | ConfirmBOD → AcknowledgeDocument | 4/0/0 | - |
| `M3BOD_HSBCACKIN_Process_In_GC_Custom` | 1.3 | ProcessHSBCACKIN → AcknowledgeHSBCACKIN | 30/14/5 | - |
| `M3BOD_StockCountUpload_Acknowledge_Error_Out_GC_Custom` | 1.0 | ConfirmBOD → AcknowledgeStockCountUpload | 4/0/0 | - |
| `M3BOD_StockCountUpload_Process_In_GC_Custom` | 1.0 | ProcessStockCountUpload → AcknowledgeStockCountUpload | 27/9/3 | - |

M3 APIs used in this family: APS130MI.GetHead2, APS130MI.GetHeadAddress, APS130MI.LstPayeeTotals2, CMS100MI.LstPDSMaterial, CMS100MI.LstStockLine, CRS881MI.GetTranslData, MMS301MI.LstStockTakeDet, MMS301MI.UpdStockTake, MNS100MI.GetBasicData, MNS150MI.GetUserInfo, PDS002MI.Delete

## F5 — Infor standard BOD (copied/versioned → custom)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3BOD_EAMItemMaster_Acknowledge_Error_Out_2_13_2` | 1.0 | ConfirmBOD → AcknowledgeEAMItemMaster | 17/4/0 | - |
| `M3BOD_EAMItemMaster_Acknowledge_Out_2_13_2` | 2.0 | EventData → AcknowledgeEAMItemMaster | 19/3/1 | - |
| `M3BOD_EAMItemMaster_Process_In_2_13_4` | 2.4 | ProcessEAMItemMaster → AcknowledgeEAMItemMaster | 154/53/40 | IDTR, INSC, Supplier, WHSY, WHTY, m3beCustomerDefinedFields, m3beIgnoreAltUMDeletion, m3beItemInterfaceProcessFlag, m3beItemType, m3beLotControlMethod, m3beRetrieveSPUCfromTemplate |
| `M3BOD_InventoryAdjustment_Process_In_2_12_1` | 16.0.0.010 | ProcessInventoryAdjustment → AcknowledgeInventoryAdjustment | 43/14/5 | m3beWarehouseInterfaceProcessFlag |
| `M3BOD_PurchaseOrder_Sync_Out_2_14_3` | 16.0.0.100 | EventData → SyncPurchaseOrder | 272/72/53 | m3beEnableAttributes, m3beShipToPreferenceIndicator |
| `M3BOD_ReceiveDelivery_Process_In_2_12_1` | 17.0 | ProcessReceiveDelivery → AcknowledgeReceiveDelivery | 100/31/18 | m3beDefaultRequisitionOrderType, m3beReference, m3beWarehouseInterfaceProcessFlag |
| `M3BOD_ReceiveDelivery_Sync_In_2_15_0` | 16.0.0.050 | SyncReceiveDelivery → n/a | 126/43/40 | m3beInspectCustomerReturn, m3beReceivePackageLine, m3beWarehouseInterfaceProcessFlag |
| `M3BOD_Requisition_Process_In_2_12_1` | 16.0.0.017 | ProcessRequisition → AcknowledgeRequisition | 49/13/7 | m3beDirectPurchaseOrderType, m3beFixedAssetOrderType, m3beStatusOverride |
| `M3BOD_Shipment_Process_In_2_14_3` | 17.0 | ProcessShipment → AcknowledgeShipment | 150/63/31 | m3beDefaultDistributionOrderType, m3beDefaultReplenishmentOrderType, m3beDefaultRequisitionOrderType, m3beRTSOrderType, m3beReference, m3beRejectionReason, m3beWarehouseInterfaceProcessFlag |
| `M3BOD_Shipment_Sync_In_2_9_0` | 16.0.0.035 | SyncShipment → n/a | 143/61/30 | m3beDockLocation, m3bePackLocation, m3beWarehouseInterfaceProcessFlag |
| `M3BOD_SupplierInvoice_Sync_Out_2_13_0` | 16.0.0.023 | EventData → SyncSupplierInvoice | 99/14/25 | - |

M3 APIs used in this family: APS130MI.GetUserInfo, APS200MI.GetCashDiscInfo, APS200MI.GetInvTotInfo, APS200MI.GetInvoice, APS200MI.GetUniqueKey, APS200MI.SearchSupInvoic, APS251MI.GetInvInfo, ATS101MI.LstAttributes, ATS101MI.SetAttrValue, CMS082MI.LstFields, CMS083MI.LstValues, CMS474MI.GetUdefContent, CRS030MI.GetBasicData (2), CRS045MI.GetBasicData, CRS065MI.GetDelyTerm, CRS111MI.Get, CRS175MI.GetGeneralCode (2), CRS175MI.GetItemFreeFlds, CRS620MI.GetAddrPerDate (2), CRS620MI.GetBasicData (2), CRS886MI.CnvPtr, CRS912MI.GetSeason, CRS980MI.AddTxtBlockHead, CRS980MI.AddTxtBlockLine, CRS980MI.RtvNewTextID, CRS980MI.SetTextID, DRS100MI.CloseShipment, DRS100MI.ConnectShipment, DRS100MI.RptShipmentPick, DRS100MI.Update, GLS200MI.GetVoucherLine, GLS200MI.LstVoucherLines, MDBREADMI.GetMBMTRD00, MHS001MI.AddIntItmMst, MHS001MI.ChgIntItmMst, MHS001MI.GetIntItmMst, MHS001MI.LstIntItmViaItm, MHS002MI.AddIntItmWhs, MHS002MI.ChgIntItmWhs, MHS002MI.GetIntItmWhs, MHS003MI.AddIntItmFac, MHS003MI.ChgIntItmFac, MHS003MI.GetIntItmFac, MHS015MI.AddIntItmAum, MHS015MI.ChgIntItmAum, MHS025MI.AddIntItmAli, MHS200MI.AddIntSku, MHS200MI.ChgIntStyle, MHS850MI.AddAttribute, MHS850MI.AddCOReturn, MHS850MI.AddDO (2), MHS850MI.AddDOReceipt, MHS850MI.AddMOReceipt, MHS850MI.AddMOReqIssue, MHS850MI.AddPOClose (2), MHS850MI.AddPOReceipt, MHS850MI.AddPickViaPack, MHS850MI.AddPickViaRepNo, MHS850MI.AddSubLine, MHS850MI.AddWhsHead (4), MHS850MI.AddWhsLine (4), MHS850MI.AddWhsPack (4), MHS850MI.ChgWhsLineX (2), MHS850MI.ChgWhsPack (2), MHS850MI.GetUserInfo (3), MHS850MI.GetWhsPack, MHS850MI.PrcWhsTran (4), MMS005MI.GetWarehouse (5), MMS006MI.Get, MMS008MI.GetPlace, MMS010MI.ListLocations (3), MMS015MI.Get, MMS017MI.Add, MMS017MI.Delete, MMS017MI.List, MMS025MI.DltAlias, MMS025MI.GetAlias, MMS025MI.LstAlias, MMS030MI.Add, MMS100MI.GetLine, MMS200MI.DltItmWhs, MMS200MI.Get (3), MMS200MI.GetItmWhsBasic, MMS200MI.GetUserInfo, MMS200MI.LstItmAltUnitMs, MMS200MI.LstItmWhsByItm, MMS200MI.UpdItmWhs, MMS470MI.AddPackStk, MMS850MI.AddAdjust (3), MMS850MI.GetUserInfo, MNS100MI.GetBasicData, MNS150MI.GetUserData (2), MWS070MI.LstTransBalID, MWS121MI.LstDmdByAcqOrd, MWS410MI.GetHead, MWS411MI.LstDelLnByOrd, MWS418MI.Approve, MWS418MI.Reject, MWS418MI.UpdGovAppAct, MWS419MI.AddGovAppLog, MWS419MI.DltGovAppLog, MWS419MI.LstGovAppLog, MWS422MI.LstPickDetail, MWS423MI.LstPackDel, OIS100MI.GetLine, OIS100MI.GetOrderHead (3), OIS155MI.Approve, OIS155MI.ListDeliveries, OIS155MI.UpdateQty, PDS050MI.Get, PMS090MI.UpdCoProdReport, PPS001MI.GetHeadBasic, PPS040MI.GetItemSupplier, PPS095MI.GetOrderType, PPS170MI.CrtPOP, PPS200MI.GetAddresses, PPS200MI.GetDelAddress, PPS200MI.GetHead, PPS200MI.GetLine, PPS200MI.GetLineX, PPS200MI.GetUserInfo, PPS200MI.LstHeadTxt, PPS200MI.LstLine, PPS200MI.LstLine2, PPS200MI.LstLineTxt, PPS215MI.LstPOCharges, PPS280MI.GetElement, PPS330MI.DelPOTrans (2), PPS330MI.ListPOTrans (2), PPS360MI.GetDetail, PPS360MI.GetPackage, PPS360MI.LstDetailByPack, PPS360MI.ReceivePkgLine, PPS360MI.StagePackage, PPS360MI.UpdPackageLine, PPS390MI.AddClaimHead, PPS390MI.AddClaimLine, PPSEPRMI.GetUserInfo, TXS035MI.GetAddField

## F4 — Custom outbound from M3 event (EventData → custom Sync BOD / XML for ION workflow, e-invoice)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3BOD_AutomationofPositiveRO_Sync_Out_Custom` | 1.0 | EventData → SyncAutomationofPositiveROEN | 22/5/3 | - |
| `M3BOD_CreditLimitApproveWF_Sync_Out_1_0_0` | 2.1 | EventData → SyncCreditLimitApproveWF | 101/38/48 | - |
| `M3BOD_EInvoiceIntegrationCustomerOrderInvoices_Sync_Out_1_0_0` | 3.0.2 | EventData → SyncEInvoice | 44/13/18 | STATID2, STATID3, STATRPA |
| `M3BOD_EInvoiceIntegrationDeliveryNote_Sync_Out_1_0_0` | 2.1.0 | EventData → SyncEInvoice | 29/6/11 | - |
| `M3BOD_EInvoiceInvoiceReversalAndInternalInvoice_Sync_Out_1_0_0` | 2.0.1 | EventData → SyncEInvoice | 33/9/13 | - |
| `M3BOD_EInvoiceManualInvoicesFixedAssets_Sync_Out_1_0_0` | 3.0.3 | EventData → SyncEInvoice | 35/9/14 | FNCNList, STATID16, STATID2, STATID3, SleepSeconds |
| `M3BOD_PurchaseOrderWF_Sync_Out_1_0_0_GC_Custom` | 2.1 | EventData → SyncPurchaseOrderWF | 42/16/13 | - |
| `M3BOD_PurchaseRequisitionWF_Sync_Out_1_0_0_GC_Custom` | 1.6 | EventData → SyncPurchaseRequisitionWF | 45/17/11 | - |
| `M3FTD_EHubPaymentConfirmation_Custom` | 1.0.0 | EventData → EHubPaymentConfirmation | 8/2/2 | - |

M3 APIs used in this family: APS251MI.GetInfo, ARS120MI.GetInvHead, ARS120MI.LstInvLines, ARS200MI.GetInvTotInfo (2), ARS200MI.GetInvoice, CMS100MI.LstCLWFAging, CMS100MI.LstCLWFGSales, CMS100MI.LstCLWFLstpaydt, CMS100MI.LstCLWFPDChq30, CMS100MI.LstCLWFPDChqVal, CMS100MI.LstCLWFSaleList, CMS100MI.LstCLWFTOTALOD, CMS100MI.LstCurrencyRate (2), CMS100MI.LstCusCL, CMS100MI.LstCustDetails (3), CMS100MI.LstDelLines, CMS100MI.LstDoDetails, CMS100MI.LstIntInvLines, CMS100MI.LstPOHead, CMS100MI.LstPOLast (2), CMS100MI.LstPOLine, CMS100MI.LstPRDetail, CMS100MI.LstROLineDetail, CMS100MI.LstVatRate (2), CMS100MI.SetLstMaxRec (2), CRS055MI.LstRtPerPeriod, CRS075MI.Get, CRS111MI.Get (3), CRS235MI.Get, CRS610MI.GetBasicData (4), CRS610MI.GetFinancial (4), CRS610MI.GetOrderInfo (2), CRS610MI.GetServerTime, CRS881MI.GetTranslData (5), CRS881MI.LstTranslDataOB, CRS980MI.SltTxtBlock (2), EXPORTMI.Select, GLS015MI.GetServerTime, GLS200MI.GetVoucherLine, GLS200MI.LstVoucherLines, MDBREADMI.GetODHEAD42, MHS850MI.AddROReceipt, MMS005MI.GetWarehouse, MMS100MI.GetHead, MMS200MI.Get, MMS200MI.GetItmBasic, MMS200MI.GetUserInfo (3), MNS100MI.GetBasicData, MNS150MI.GetUserInfo, MWS410MI.GetAdr, MWS410MI.GetServerTime, OIS100MI.GetHead, OIS100MI.GetLine, OIS100MI.GetOrderHead (2), OIS100MI.GetOrderValue, OIS100MI.GetServerTime, OIS100MI.LstConnCOCharge, OIS100MI.LstLine, OIS120MI.GetCOStopInfo, OIS350MI.GetInvHead, PPS170MI.LstPlannedPO, PPS200MI.GetHead, PPS200MI.LstLine

## F7 — Custom XML request → M3 APIs → XML response (weighbridge / logistics)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3FTD_GC_WB_CN_DO_Mapping_Receiving_Custom` | 1.2 | WeibridgeInboundInput → WeibridgeInboundOutput | 13/3/3 | Company |
| `M3FTD_GC_WB_CN_DO_Mapping_Receiving_Update_Custom` | 1.0 | WeibridgeInboundInput → WeibridgeInboundOutput | 36/13/7 | Company |
| `M3FTD_GC_WB_CN_POReceivingTicket_Mapping_Custom` | 1.2 | POReceivingTicketNew → POReceivingTicketOut | 23/13/5 | Company |
| `M3FTD_GC_WB_CN_POReceiving_Custom` | 1.7 | PurchaseOrderReceiving2 → POOut | 16/5/3 | Company |
| `M3FTD_GC_WB_CN_WBOutbound_1_V1_Custom` | 1.4 | WBOutbound_1 → WBOutbound_1_Out | 9/2/1 | Company |
| `M3FTD_GC_WB_CN_WBOutbound_2_V1_Custom` | 2.6 | OutboundLogistics_2 → OutboundLogistic_2_Output | 199/96/56 | - |
| `M3FTD_GC_WB_DO_Mapping_Custom` | 1.1 | WeibridgeInboundInput → WeibridgeInboundOutput | 13/3/3 | Company |
| `M3FTD_GC_WB_DO_Mapping_Update_Custom` | 1.2 | WeibridgeInboundInput → WeibridgeInboundOutput | 25/5/7 | - |
| `M3FTD_GC_WB_ID_DO_Mapping_Receiving_Custom` | 1.2 | WeibridgeInboundInput → WeibridgeInboundOutput | 13/3/3 | Company |
| `M3FTD_GC_WB_ID_DO_Mapping_Receiving_Update_Custom` | 1.0 | WeibridgeInboundInput → WeibridgeInboundOutput | 33/13/7 | Company |
| `M3FTD_GC_WB_ID_Outbound_Mapping_1_Custom` | 1.0 | WBOutbound_1 → WBOutbound_1_Out | 21/5/6 | - |
| `M3FTD_GC_WB_ID_Outbound_Mapping_2_Custom` | 2.0 | OutboundLogistics_2 → OutboundLogistic_2_Output | 179/78/53 | - |
| `M3FTD_GC_WB_ID_POReceivingTicket_Mapping_Custom` | 1.2 | POReceivingTicketNew → POReceivingTicketOut | 23/13/5 | Company |
| `M3FTD_GC_WB_ID_POReceiving_Custom` | 1.7 | PurchaseOrderReceiving2 → POOut | 16/5/3 | Company |
| `M3FTD_GC_WB_POReceivingTicket_Custom` | 1.2 | POReceivingTicketNew → POReceivingTicketOut | 23/13/5 | Company |
| `M3FTD_GC_WB_POReceiving_Custom` | 1.6 | PurchaseOrderReceiving2 → POOut | 14/4/2 | Company |
| `M3FTD_GC_WB_VN_DO_Mapping_Receiving_Custom` | 1.2 | WeibridgeInboundInput → WeibridgeInboundOutput | 13/3/3 | Company |
| `M3FTD_GC_WB_VN_DO_Mapping_Receiving_Update_Custom` | 1.0 | WeibridgeInboundInput → WeibridgeInboundOutput | 33/13/7 | - |
| `M3FTD_GC_WB_VN_POReceivingTicket_Mapping_Custom` | 1.2 | POReceivingTicketNew → POReceivingTicketOut | 23/13/5 | - |
| `M3FTD_GC_WB_VN_POReceiving_Mapping_Custom` | 1.7 | PurchaseOrderReceiving2 → POOut | 16/5/3 | Company |
| `M3FTD_GC_WB_VN_WBOutbound_1_V1_Custom` | 1.4 | WBOutbound_1 → WBOutbound_1_Out | 9/2/1 | Company |
| `M3FTD_GC_WB_VN_WBOutbound_2_V1_Custom` | 2.5 | OutboundLogistics_2 → OutboundLogistic_2_Output | 197/94/56 | - |
| `M3FTD_GC_WB_WBOutbound_1_V1_Custom` | 1.3 | WBOutbound_1 → WBOutbound_1_Out | 20/5/6 | - |
| `M3FTD_GC_WB_WBOutbound_2_V1_Custom` | 2.5 | OutboundLogistics_2 → OutboundLogistic_2_Output | 166/71/50 | - |

M3 APIs used in this family: ATS101MI.SetAttrValue (4), CRS008MI.Get (6), CRS610MI.GetBasicData (6), CRS620MI.GetBasicData (4), MDBREADMI.GetMHDISH00, MDBREADMI.GetMHDISHV8, MDBREADMI.GetMITAUN00 (10), MDBREADMI.GetMITAUN21 (4), MDBREADMI.GetMWOHED55 (3), MHS850MI.AddCOPick (4), MHS850MI.AddDOPick (4), MHS850MI.AddDOReceipt (4), MHS850MI.AddROPick (4), MMS005MI.GetWarehouse (5), MMS015MI.Get (2), MMS060MI.Get (4), MMS200MI.Get (10), MMS310MI.Update (4), MWS410MI.GetHead (4), MWS410MI.RelForPick (4), MWS411MI.LstDeliveryLine (6), MWS420MI.Confirm (4), MWS420MI.PrtDocuments (4), MWS422MI.LstPickDetail (12), OIS100MI.GetOrderHead (6), OIS100MI.LstLine (4), PMS050MI.RptReceipt (4), PMS100MI.LstByRORN (4), PPS001MI.NotifyLine (4), PPS200MI.LstLine (8)

## F8 — BESTMIX formulation in (FormulationML/Envelope → PDS001/PDS002 updates + response)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3FTD_GC_BESTMIX_In_FeedFormulaItemUpdate_Custom` | 1.0 | FormulationML → FormulationML | 51/19/12 | - |
| `M3FTD_GC_BESTMIX_In_FormulaRecipeCurrentPeriod_Custom` | 1.0 | Envelope → FormulationML | 102/38/32 | - |
| `M3FTD_GC_BESTMIX_In_FormulaRecipeFuturePeriods_Custom` | 2.0 | Envelope → FormulationML | 33/13/6 | - |
| `M3FTD_GC_BESTMIX_In_PremixRecipeCurrentPeriod_Custom` | 2.0 | Envelope → FormulationML | 93/37/31 | - |
| `M3FTD_GC_BESTMIX_In_PremixRecipeFuturePeriods_Custom` | 2.0 | Envelope → FormulationML | 32/13/6 | - |

M3 APIs used in this family: CMS100MI.LstRecipeFeed, CRS881MI.LstTranslData (4), MMS200MI.GetItmWhsBasic (5), PDS001MI.Add (2), PDS001MI.Copy (3), PDS001MI.Delete (3), PDS001MI.List (5), PDS001MI.Update (3), PDS002MI.AddComponent (4), PDS002MI.AddOperation (3), PDS002MI.Delete (4), PDS002MI.LstComponent (4), PDS002MI.LstOperation (3), PDS002MI.UpdateComponent (2)

## F9 — Request-driven BOD out (Envelope request → M3 lists → Sync BOD reply)

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3BODs_BMFormulaForecastLst_Sync_Out_GC_Custom` | 1.2 | Envelope → SyncBMFormulaForecastLst | 45/7/5 | - |
| `M3BODs_BMIngredientStockLst_Sync_Out_GC_Custom` | 1.2 | Envelope → SyncBMIngredientStockLst | 44/10/5 | - |
| `M3BODs_BMMaterialPriceLst_Sync_Out_GC_Custom` | 1.4 | Envelope → SyncBMIngredientPriceLst | 71/22/13 | - |

M3 APIs used in this family: CMS100MI.LstBMForecast, CMS100MI.LstBMItemWH (2), CMS100MI.LstBMPriceFC, CMS100MI.LstBMPriceFC3, CMS100MI.LstBMPricePO, CMS100MI.LstBMStockPO, CRS008MI.Get, CRS055MI.SelExchangeRate, MMS005MI.GetWarehouse (2), MMS080MI.SelPOHBalance, MMS200MI.Get, MMS200MI.GetItmFac, MMS200MI.GetUserInfo (3), MNS100MI.GetBasicData, MNS100MI.GetServerTime, MRS001MI.SetLstMaxRec

## F10 — Uploaded file → validated M3 batch APIs → status/notification output

| Mapping | Ver | In → Out | F/L/API | Control props |
|---|---|---|---|---|
| `M3FTD_EHubInvoicetoM3_Custom` | 1.0.0 | EHubInvoice → EHubInvoiceAcknowledge | 54/18/16 | - |
| `M3FTD_GC_CreditNoteDiscountUploadME` | 1.3 | CreditNoteDiscountUpload → CreditNoteDiscountUploadStatus | 40/16/6 | - |
| `M3FTD_GC_GLDiscountUpload` | 2.1 | GLDiscount → GLDiscountUploadStatus | 43/14/6 | - |

M3 APIs used in this family: APS200MI.GetInvTotInfo, CMS100MI.LstFcr040, CMS100MI.LstGLErrors, CMS100MI.LstGls840Key, CMS100MI.LstSers, CRS030MI.GetBasicData, CRS610MI.GetBasicData, CRS620MI.GetBasicData, CRS630MI.GetAccountID, CRS692MI.GetBankAccount, CRS881MI.GetTranslData, GLS840MI.AddBatchHead (2), GLS840MI.AddBatchLine (2), GLS840MI.CtrlBatch, GLS840MI.UpdBatch (2), MDBREADMI.SelMBMTRD00, OIS100MI.AddBatchHead, OIS100MI.AddBatchLine, OIS100MI.Confirm

