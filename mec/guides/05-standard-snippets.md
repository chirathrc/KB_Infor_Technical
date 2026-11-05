# 05 — Canonical template functions (verbatim from the samples)

Copied from the sample mappings so generated maps reuse proven, Cloud-whitelist-compliant code. `in`/`out` lines show the parameter and what it was linked to in the source map (`IN:`/`OUT:` = schema path, `$x` = variable, `F.p` = another function's parameter, `CONST`).

## A. Outbound BOD from an M3 event (EventData → Sync/Process BOD)

Source: `M3BOD_PurchaseOrder_Sync_Out_2_14_3`

### InitEventData  `[UV]`

```java
// Please implement me
eventData = new java.util.HashMap<String, String>();

// Create hash map UserDefFieldsName
UserDefFieldsName = new java.util.HashMap<String, String>();

// Create hash map UserDefFieldsValDesc
UserDefFieldsValDesc = new java.util.HashMap<String, String>();

// Create hash map POCharges
POCharges = new java.util.HashMap<String, java.util.List<String[]>>();

LstLine = new java.util.ArrayList<String[]>(); //MION-17951
TEDL_MAP = new java.util.HashMap<String, String[]>();
```

### GetEventData  `[UV]`

```text
in  String iNAME <- IN:/EventData/Document/ElementData/Name
in  String iVALUE <- IN:/EventData/Document/ElementData/Value
```

```java
if (iNAME != null) {
    if (iNAME.equals("CONO") || iNAME.equals("DIVI")) {
        eventData.put(iNAME, IONToolbox.rightTrim((iVALUE == null ? "" : iVALUE)));
    } else if (iNAME.equals("PUNO") || iNAME.equals("IVPUNO")) {
        eventData.put("PUNO", IONToolbox.rightTrim((iVALUE == null ? "" : iVALUE)));
    } else if (iNAME.equals("FACI") || iNAME.equals("IAFACI")) {
        eventData.put("FACI", (iVALUE == null ? "" : iVALUE.trim()));
    } else if (iNAME.equals("WHLO") || iNAME.equals("IAWHLO")) {
        eventData.put("WHLO", (iVALUE == null ? "" : iVALUE.trim()));
    } else if (iNAME.equals("CHID") || iNAME.equals("IVCHID")) {
        eventData.put("CHID", (iVALUE == null ? "" : iVALUE.trim()));
    } else if (iNAME.equals("IVLMDT")) {
        eventData.put("LMDT", (iVALUE == null ? "" : iVALUE.trim()));
    } else if (iNAME.equals("MAE_ItemMaster")){
        // set global parameter ItemMaster_MAE from event value
        ItemMaster_MAE = Boolean.parseBoolean(iVALUE);
    } else if (iNAME.equals("MAE_SupplierPartyMaster")) {
        // set global parameter SupplierPartyMaster_MAE from event value
         SupplierPartyMaster_MAE = Boolean.parseBoolean(iVALUE);
     } else if (iNAME.equals("MAE_ShipFromPartyMaster")) {
        // set global parameter ShipFromPartyMaster_MAE from event value
         ShipFromPartyMaster_MAE = Boolean.parseBoolean(iVALUE);
     } else if (iNAME.equals("MAE_RemitToPartyMaster")) {
        // set global parameter RemitToPartyMaster_MAE from event value
         RemitToPartyMaster_MAE = Boolean.parseBoolean(iVALUE);
    } else {
        eventData.put(iNAME, (iVALUE == null ? "" : iVALUE.trim()));
    }
}
```

### ManageEventData  `[UV]`

```text
out String oCONO -> $CONO
out String oPUNO -> $PUNO
out String oDIVI -> $DIVI
out String oWHLO -> $WHLO
out String oLMTS -> $LMTS
out String oCHID -> $CHID
out String oLMDT -> $LMDT
```

```java
oCONO = eventData.get("CONO");
oPUNO = eventData.get("PUNO");
oDIVI = eventData.get("DIVI");
oWHLO = eventData.get("WHLO");
oLMTS = eventData.get("LMTS");
oCHID = eventData.get("CHID");
oLMDT = eventData.get("LMDT");
```

### GetCONO_DIVI_AE  `[UV]`

```text
in  String iCONO <- $CONO
in  String iDIVI <- $DIVI
out String oCONO -> $CONO
out String oDIVI -> $DIVI
out String oAE -> $bodAE
out String oMasterAE -> $masterAE
```

```java
// Get CONO
oCONO = IONToolbox.formatCompany(iCONO);

// Get DIVI
oDIVI = IONToolbox.formatDivision(iDIVI);

// Get AccountingEntityId
oMasterAE = IONToolbox.getAccountingEntityId(oCONO, null); // set ae as master ae from M3 company only
oAE = IONToolbox.getAccountingEntityId(oCONO, oDIVI); // set ae as local ae from M3 company and division
```

### Init  `[UV]`

```text
in  String iCONO <- $CONO
in  String iTenantId <- IN:/EventData/TenantId
```

```java
// Trim CONO:
iCONO = iCONO == null?"":iCONO.trim();

// Instantiate generic DataTranslator
String blankDIVI = "";
dtGen = new DataTranslator(getManifestMap(), iCONO, blankDIVI, "ION", "1", "Generic");

String tempm3beShipToPreferenceIndicator = getManifestInfo("agr:m3beShipToPreferenceIndicator");
if (!IONToolbox.isEmpty(tempm3beShipToPreferenceIndicator) && tempm3beShipToPreferenceIndicator.equalsIgnoreCase("true")) {
    isShipToPreferenceIndicator = true;
}

 // Set tenant id
if (iTenantId == null) {
    // On-premise: Translate M3 BE company to tenant id
    tenantID = dtGen.toMessage("Generic", "TenantID", iCONO, "", "", "CMNCMP", "CONO");
    setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, tenantID);
}
```

### SetOutboxHeaderData  `[UV]`

```java
// BODType, hard coded here
setManifestInfo(ManifestConstants.MAP_ION_BOD_TYPE, "Sync.PurchaseOrder"); // "map:ionBODType"

// AccountingEntityID
setManifestInfo(ManifestConstants.MAP_ION_ACCOUNTING_ENTITY, bodAE); // "map:ionAccountingEntity"

// ToLogicalId, set from event - only needed in Show-mappings
// Added in both Sync- and Show mappings for consistency (dev process is to copy Sync mapping to Show mapping )
if (!IONToolbox.isEmpty(eventData.get("ToLogicalId"))) {
    setManifestInfo(ManifestConstants.MAP_ION_TO_LOGICAL_ID, eventData.get("ToLogicalId")); // "map:ionToLogicalId"
}
```

### SetHeader  `[UV]`

```text
in  String iCONO <- $CONO
in  String iLANC <- GetUserInfo.ZDLANC
in  String iSentTimestamp <- IN:/EventData/SentTimestamp
in  String iBODID <- (unlinked)
out String oReleaseID -> OUT:/SyncPurchaseOrder[@releaseID]
out String oVersionID -> OUT:/SyncPurchaseOrder[@versionID]
out String oSystemEnvironmentCode -> OUT:/SyncPurchaseOrder[@systemEnvironmentCode]
out String oLanguageCode -> OUT:/SyncPurchaseOrder[@languageCode]
out String oLogicalID -> OUT:/SyncPurchaseOrder/ApplicationArea/Sender/LogicalID, $LogicalID
out String oLogicalID_schemeVersionID -> OUT:/SyncPurchaseOrder/ApplicationArea/Sender/LogicalID[@schemeVersionID]
out String oComponentID -> OUT:/SyncPurchaseOrder/ApplicationArea/Sender/ComponentID
out String oComponentID_schemeVersionID -> OUT:/SyncPurchaseOrder/ApplicationArea/Sender/ComponentID[@schemeVersionID]
out String oConfirmationCode -> OUT:/SyncPurchaseOrder/ApplicationArea/Sender/ConfirmationCode
out String oCreationDateTime -> OUT:/SyncPurchaseOrder/ApplicationArea/CreationDateTime
out String oBODID -> OUT:/SyncPurchaseOrder/ApplicationArea/BODID
```

```java
// Set OAGIS release
oReleaseID = "9.2";

// Set version of the given BOD definition
oVersionID = "2.14.3";

// Set "Test" or "Production" (default) mode
oSystemEnvironmentCode = getSystemEnvironmentCode();

// Set language for the contents of the BOD
if (iLANC != null) {
    oLanguageCode = dtGen.toMessage("Generic", "languageCode", iLANC, "", "", "CSYTAB","LNCD");
}

// Set from logical ID
oLogicalID = getFromLogicalID();

// Set MEC mapping version
oLogicalID_schemeVersionID = getMappingVersion();

// Set business application that issued the BOD
oComponentID = "M3BE";

// Set M3 BE version
oComponentID_schemeVersionID = getBEVersion();

// Set date time stamp that the given instance of the BOD was created (UTC)
oCreationDateTime = IONToolbox.normalizeXMLDateTime(iSentTimestamp);

// Set GUID that will make each BOD instance uniquely identifiable, default MEC message UUID
if (iBODID != null) {
    oBODID = iBODID;
} else {
    oBODID = getMapUUID(); // Example: "bf941e3f-c28a-4411-9a31-067d4d26c686"
}
// Set ConfirmationCode
oConfirmationCode = "OnError";
```

### SetSync  `[UV]`

```text
in  String iCONO <- $CONO
in  String iOperation <- IN:/EventData/Operation
in  String iDIVI <- (unlinked)
in  String iFACI <- (unlinked)
in  String iWHLO <- $WHLO
out String oAccountingEntityID -> OUT:/SyncPurchaseOrder/DataArea/Sync/AccountingEntityID
out String oLocationID -> OUT:/SyncPurchaseOrder/DataArea/Sync/LocationID
out String oActionCode -> OUT:/SyncPurchaseOrder/DataArea/Sync/ActionCriteria/ActionExpression[@actionCode]
```

```java
// Set accounting entity id
oAccountingEntityID = (!IONToolbox.isEmpty(bodAE)) ? bodAE : "";

// Set location ID
oLocationID = (iWHLO != null) ? iWHLO.trim() : "";


// Set action code
oActionCode = IONToolbox.createSyncActionCode(iOperation);
```

## B. Inbound Process BOD (Process → Acknowledge, synchronous)

Source: `M3BOD_ReceiveDelivery_Process_In_2_12_1`

### SetCorrelationID  `[UV]`

```text
out String oCorrelationID -> $CorrelationID, GetProcessHeader.iCorrelationID
out String oCorrelationIDsub1 -> $CorrelationIDsub1
out String oCorrelationIDsub2 -> $CorrelationIDsub2
out String oCorrelationIDsub3 -> $CorrelationIDsub3
```

```java
// Creates an UUID to be used as an M3 internal correlation ID for BODs
oCorrelationID = getMapUUID();

// Split CorrelationID into substrings
oCorrelationIDsub1 = oCorrelationID.substring(0, 15);
oCorrelationIDsub2 = oCorrelationID.substring(15, 30);
oCorrelationIDsub3 = oCorrelationID.substring(30, 36);
```

### GetProcessHeader  `[UV]`

```text
in  String iCorrelationID <- SetCorrelationID.oCorrelationID
in  String iLogicalID <- IN:/ProcessReceiveDelivery/ApplicationArea/Sender/LogicalID
in  String iLogicalID_schemeVersionID <- IN:/ProcessReceiveDelivery/ApplicationArea/Sender/LogicalID[@schemeVersionID]
in  String iComponentID <- IN:/ProcessReceiveDelivery/ApplicationArea/Sender/ComponentID
in  String iComponentID_schemeVersionID <- IN:/ProcessReceiveDelivery/ApplicationArea/Sender/ComponentID[@schemeVersionID]
in  String iCreationDateTime <- IN:/ProcessReceiveDelivery/ApplicationArea/CreationDateTime
in  String iBODID <- IN:/ProcessReceiveDelivery/ApplicationArea/BODID
in  String ida_AccountingEntityID <- IN:/ProcessReceiveDelivery/DataArea/Process/AccountingEntityID
in  String iID <- IN:/ProcessReceiveDelivery/DataArea/ReceiveDelivery/ReceiveDeliveryHeader/DocumentID/ID
in  String iID_accountingEntity <- IN:/ProcessReceiveDelivery/DataArea/ReceiveDelivery/ReceiveDeliveryHeader/DocumentID/ID[@accountingEntity]
in  String iAlternateDocumentID <- IN:/ProcessReceiveDelivery/DataArea/ReceiveDelivery/ReceiveDeliveryHeader/AlternateDocumentID/ID
out String oComponentID -> $ComponentID
out String oLogicalID -> $SenderLogicalID
```

```java
// Set M3 BE version for ConfirmBOD
setManifestInfo(ManifestConstants.MAP_M3BE_VERSION,
        getBEVersion()); // "map:m3beVersion"

// Save internal correlation ID
setManifestInfo("map:correlationID", iCorrelationID);

// Save original ApplicationArea for Acknowledge BOD
IONApplicationArea aa = new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID);
aa.putValue("Sender/LogicalID", iLogicalID);
aa.putValue("Sender/LogicalID@schemeVersionID", iLogicalID_schemeVersionID);
aa.putValue("Sender/ComponentID", iComponentID);
aa.putValue("Sender/ComponentID@schemeVersionID", iComponentID_schemeVersionID);
aa.putValue("CreationDateTime", iCreationDateTime);
aa.putValue("BODID", iBODID);

//Get ae from either DataArea/Process or ID attribute
if (!IONToolbox.isEmpty(ida_AccountingEntityID)) {
    bodAE = ida_AccountingEntityID.trim(); //from DataArea/Process/AccountingEntityID
} else if (!IONToolbox.isEmpty(iID_accountingEntity)) {
    bodAE = iID_accountingEntity.trim(); // from IDs/ID@accountingEntity
} else {
    bodAE = "";
}

aa.putValue("DataArea/ReceiveDelivery/ReceiveDeliveryHeader/DocumentID/ID", iID);
// Save original DataArea/Process/AccountingEntityID for Acknowledge BOD
aa.putValue("DataArea/Process/AccountingEntityID", bodAE);
aa.putValue("DataArea/ReceiveDelivery/ReceiveDeliveryHeader/AlternateDocumentID/ID", iAlternateDocumentID);
aa.save();

oComponentID = (iComponentID == null) ? "" : iComponentID;

// Check logical id for null or blank, and assign to global variable SenderLogicalID
if (!iLogicalID.isEmpty()) {
    oLogicalID = iLogicalID.trim();
} else {
    throw new MeCError("The BOD must populate the LogicalID element - mapping aborted");
}
```

### GetCONO_DIVI  `[UV]`

```text
in  String iAccountingEntityID <- IN:/ProcessReceiveDelivery/DataArea/Process/AccountingEntityID
out String oCONO -> $CONO, M3 Settings.Company
out String oDIVI -> $DIVI, M3 Settings.Division
```

```java
// Get CONO
oCONO = IONToolbox.getCompanyFromAccountingEntityId(iAccountingEntityID);
if (iAccountingEntityID != null && iAccountingEntityID.length() > 3) {
    // Get DIVI
    oDIVI = IONToolbox.getDivisionFromAccountingEntityId(iAccountingEntityID);
}
```

### GetProcess  `[UV]`

```text
in  String iLocationID <- IN:/ProcessReceiveDelivery/DataArea/Process/LocationID
in  String iactionCode <- IN:/ProcessReceiveDelivery/DataArea/Process/ActionCriteria/ActionExpression[@actionCode]
out String oWHLO -> $WHLO
out String oactionCode -> $actionCode
```

```java
if (iLocationID != null) {
    oWHLO = IONToolbox.rightTrim(iLocationID);
}
if (iactionCode != null) {
    oactionCode = iactionCode.trim();
}
```

### SetGlobals  `[UV]`

```text
in  String iLogicalID <- $SenderLogicalID
out String oProcessFlag -> $ProcessFlag
out String oPartner -> $Partner
out String oMessageType -> $MessageType
```

```java
/*  Set Process Flag, M3 BE field PRFL
Valid options are
 - blank -Data is added and validated. Execution is done manually in MHS850.
 - *EXE - Execution online. Data is validated and, if there are no validation errors, imported to M3.
 - *AUT – Execution is done via an auto start job, MHS855, instead of interactively.
The value is set in MEC Partner Agreement for the BOD, control property m3beWarehouseInterfaceProcessFlag
-----------------------------*/
oProcessFlag = getManifestInfo("agr:m3beWarehouseInterfaceProcessFlag");

/*---------------------------
Set Item Data Interface Partner, M3 BE field E0PA
use the second part of sending systems logical id and convert to upper case
E.g:
logical id is: "infor.m3be.orbit"
the partner will then be "M3BE"
-----------------------------*/
String s[] = iLogicalID.split("\\."); // split the logical id into sub-parts at the dot character (".") and put into array
oPartner = s[1].toUpperCase(); // use second part and convert to upper case
// Check if sending application makes use of Internal Stock Transactions (MMS850MI)
String tempStockTransactionType = dt.toMovex("Sender", "LogicalID", oPartner, "", "", "MMIPPT", "E0PA");
if (dt.translated() && tempStockTransactionType.equalsIgnoreCase("Internal Stock Transactions")) {
    isInternalStockTransaction = true;
} else if (dt.translated() && tempStockTransactionType.equalsIgnoreCase("OrderStockTransactions")) {
    isOrderStockTransaction = true;
}

// Set Item Data Interface Message type to "BOD", M3 BE field E065
oMessageType = "BOD";

defaultReqOrderType = getManifestInfo("agr:m3beDefaultRequisitionOrderType");
String tempHasReferenceDoc = getManifestInfo("agr:m3beReference");
if (isOrderStockTransaction && !IONToolbox.isEmpty(tempHasReferenceDoc) && tempHasReferenceDoc.equalsIgnoreCase("true")) {
    hasReferenceDoc = true;
} else {
    hasReferenceDoc = false;
}
```

### SetHeader  `[UV]`

```text
in  String iCONO <- $CONO
in  String iLANC <- $LANC
in  String iSentTimestamp <- (unlinked)
in  String iBODID <- (unlinked)
out String oReleaseID -> OUT:/AcknowledgeReceiveDelivery[@releaseID]
out String oVersionID -> OUT:/AcknowledgeReceiveDelivery[@versionID]
out String oSystemEnvironmentCode -> OUT:/AcknowledgeReceiveDelivery[@systemEnvironmentCode]
out String oLanguageCode -> OUT:/AcknowledgeReceiveDelivery[@languageCode]
out String oLogicalID -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/Sender/LogicalID
out String oLogicalID_schemeVersionID -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/Sender/LogicalID[@schemeVersionID]
out String oComponentID -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/Sender/ComponentID
out String oComponentID_schemeVersionID -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/Sender/ComponentID[@schemeVersionID]
out String oCreationDateTime -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/CreationDateTime
out String oBODID -> OUT:/AcknowledgeReceiveDelivery/ApplicationArea/BODID
```

```java
// Set OAGIS release
oReleaseID = "9.2";

// Set version of the given BOD definition
oVersionID = "2.12.1";

// Set "Test" or "Production" (default) mode
oSystemEnvironmentCode = getSystemEnvironmentCode();


// Set language for the contents of the BOD
if (iLANC != null) {
    oLanguageCode = dtGen.toMessage("Generic", "languageCode", iLANC, "", "", "CSYTAB","LNCD");
}

// Set from logical ID
oLogicalID = getFromLogicalID();

// Set MEC mapping version
oLogicalID_schemeVersionID = getMappingVersion();

// Set business application that issued the BOD
oComponentID = "M3BE";

// Set M3 BE version
oComponentID_schemeVersionID = getBEVersion();

// Set date time stamp that the given instance of the BOD was created (UTC) or now
oCreationDateTime = (IONToolbox.isEmpty(iSentTimestamp)) ? IONToolbox.createNormalizedXMLDateTime() : IONToolbox.normalizeXMLDateTime(iSentTimestamp);

// Set GUID that will make each BOD instance uniquely identifiable, default MEC message UUID
oBODID = (iBODID != null) ? iBODID : getMapUUID(); // Example: "bf941e3f-c28a-4411-9a31-067d4d26c686"
```

### SetOutboxHeaderData  `[UV]`

```java
// BODType, hard coded here
setManifestInfo(ManifestConstants.MAP_ION_BOD_TYPE, "Acknowledge.ReceiveDelivery"); // "map:ionBODType"
// TenantId, set using the value from ION Inbox: com:ionTenantId from message manifest
setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, getManifestInfo("com:ionTenantId")); // "map:ionTenantId"
// AccountingEntityID
setManifestInfo(ManifestConstants.MAP_ION_ACCOUNTING_ENTITY, bodAE); // "map:ionAccountingEntity"
```

### SetAcknowledge  `[UV]`

```text
in  String iFACI <- (unlinked)
in  String iWHLO <- (unlinked)
in  String iCorrelationID <- $CorrelationID
in  String iActionCode <- CONST ACTION_CODE_ACCEPTED=IONToolbox.ACTION_CODE_ACCEPTED
out String oAccountingEntityID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/AccountingEntityID
out String oLocationID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/LocationID
out String oLogicalID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/Sender/LogicalID
out String oLogicalID_schemeVersionID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/Sender/LogicalID[@schemeVersionID]
out String oComponentID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/Sender/ComponentID
out String oComponentID_schemeVersionID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/Sender/ComponentID[@schemeVersionID]
out String oCreationDateTime -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/CreationDateTime
out String oBODID -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/OriginalApplicationArea/BODID
out String oActionCode -> OUT:/AcknowledgeReceiveDelivery/DataArea/Acknowledge/ResponseCriteria/ResponseExpression[@actionCode]
```

```java
// Set accounting entity ID
if (!IONToolbox.isEmpty(bodAE)) {
    oAccountingEntityID = bodAE;
}
// Set location ID
oLocationID = IONToolbox.createLocationID(iFACI, iWHLO);
// Set original ApplicationArea
IONApplicationArea aa = new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID);
aa.getIONManifestMap();
oLogicalID = aa.getValue("Sender/LogicalID");
oLogicalID_schemeVersionID = aa.getValue("Sender/LogicalID@schemeVersionID");
oComponentID = aa.getValue("Sender/ComponentID");
oComponentID_schemeVersionID = aa.getValue("Sender/ComponentID@schemeVersionID");
oCreationDateTime = aa.getValue("CreationDateTime");
oBODID = aa.getValue("BODID");

aa.remove();

// Set action code
oActionCode = iActionCode;
```

## C. Error Acknowledge (ConfirmBOD → Acknowledge, actionCode Rejected)

Source: `M3BOD_EAMItemMaster_Acknowledge_Error_Out_2_13_2`

### SetHeader  `[UV]`

```text
in  String iBODID <- (unlinked)
in  String iLANC <- (unlinked)
in  String iSentTimestamp <- (unlinked)
out String oReleaseID -> OUT:/AcknowledgeEAMItemMaster[@releaseID]
out String oVersionID -> OUT:/AcknowledgeEAMItemMaster[@versionID]
out String oSystemEnvironmentCode -> OUT:/AcknowledgeEAMItemMaster[@systemEnvironmentCode]
out String oLanguageCode -> OUT:/AcknowledgeEAMItemMaster[@languageCode]
out String oLogicalID -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/Sender/LogicalID
out String oLogicalID_schemeVersionID -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/Sender/LogicalID[@schemeVersionID]
out String oComponentID -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/Sender/ComponentID
out String oComponentID_schemeVersionID -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/Sender/ComponentID[@schemeVersionID]
out String oConfirmationCode -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/Sender/ConfirmationCode
out String oCreationDateTime -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/CreationDateTime
out String oBODID -> OUT:/AcknowledgeEAMItemMaster/ApplicationArea/BODID
```

```java
// Set OAGIS release
oReleaseID = "9.2";

// Set version of the given BOD definition
oVersionID = "2.13.2";

// Set "Test" or "Production" (default) mode
oSystemEnvironmentCode = getSystemEnvironmentCode();

// Set language for the contents of the BOD
//if (iLANC != null) {
//    oLanguageCode = dtGen.toMessage("Generic", "languageCode", iLANC, "", "", "CSYTAB","LNCD");
//}
oLanguageCode = "en-US";

// Set from logical ID
oLogicalID = getFromLogicalID();

// Set MEC mapping version
oLogicalID_schemeVersionID = getMappingVersion();

// Set business application that issued the BOD
oComponentID = "M3BE";

// Set M3 BE version
//oComponentID_schemeVersionID = getBEVersion();

// Set ConfirmationCode
oConfirmationCode = "OnError";

// Set date time stamp that the given instance of the BOD was created (UTC)
if (!IONToolbox.isEmpty(iSentTimestamp)) {
    oCreationDateTime = IONToolbox.normalizeXMLDateTime(iSentTimestamp);
} else {
    oCreationDateTime = IONToolbox.createNormalizedXMLDateTime(); // now
}

// Set GUID that will make each BOD instance uniquely identifiable, default MEC message UUID
oBODID = (iBODID != null) ? iBODID : getMapUUID(); // Example: "bf941e3f-c28a-4411-9a31-067d4d26c686"
```

### SetAcknowledge  `[UV]`

```text
in  String iCorrelationID <- (unlinked)
in  String iActionCode <- CONST ActionCodeRejected=IONToolbox.ACTION_CODE_REJECTED
out String oAccountingEntityID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/AccountingEntityID, $AccountingEntityID
out String oLogicalID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/Sender/LogicalID, $LogicalID
out String oLogicalID_schemeVersionID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/Sender/LogicalID[@schemeVersionID]
out String oComponentID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/Sender/ComponentID
out String oComponentID_schemeVersionID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/Sender/ComponentID[@schemeVersionID]
out String oCreationDateTime -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/CreationDateTime
out String oBODID -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/OriginalApplicationArea/BODID
out String oActionCode -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/ResponseCriteria/ResponseExpression[@actionCode]
out String oITNE -> $ITNE
out String oItemType -> $ItemType
```

```java
if (iCorrelationID == null) {
    // Get internal correlation ID
    iCorrelationID = getManifestInfo("map:correlationID");
}
// Get original ApplicationArea
IONApplicationArea aa = new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID);
setManifestInfo(aa.getIONManifestMap());

// Set AccountingEntity from incoming Process BOD
oAccountingEntityID = aa.getValue("DataArea/Process/AccountingEntityID");
bodAE = oAccountingEntityID;
ItemID = aa.getValue("DataArea/ItemMaster/ItemMasterHeader/ItemID/ID");
GeneratedItemID = aa.getValue("GeneratedITNO");
oITNE = aa.getValue("DataArea/ItemMaster/ItemMasterHeader/DisplayID"); //MION-23748
oItemType = aa.getValue("ItemType"); //MION-23925

// Set original ApplicationArea
oLogicalID = aa.getValue("Sender/LogicalID");
oLogicalID_schemeVersionID = aa.getValue("Sender/LogicalID@schemeVersionID");
oComponentID = aa.getValue("Sender/ComponentID");
oComponentID_schemeVersionID = aa.getValue("Sender/ComponentID@schemeVersionID");
oCreationDateTime = aa.getValue("CreationDateTime");
oBODID = aa.getValue("BODID");
String tempDeleteIONApplicationAreaIndicator = aa.getValue("DeleteIONApplicationAreaIndicator");
aa.remove();

// Initialize list ItemIDs
ItemIDs = new java.util.ArrayList<String[]>();

String s[] = {ItemID, "test"};
ItemIDs.add(s);
if (!IONToolbox.isEmpty(GeneratedItemID)) {
    String s1[] = {GeneratedItemID, null};
    ItemIDs.add(s1);
}

if (!IONToolbox.isEmpty(tempDeleteIONApplicationAreaIndicator) && tempDeleteIONApplicationAreaIndicator.equalsIgnoreCase("NotSet")) {
    // Resave original ApplicationArea for Acknowledge BOD with DeleteIONApplicationAreaIndicator
    IONApplicationArea aa1 = new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID);
    aa1.putValue("Sender/LogicalID", oLogicalID);
    aa1.putValue("Sender/LogicalID@schemeVersionID", oLogicalID_schemeVersionID);
    aa1.putValue("Sender/ComponentID", oComponentID);
    aa1.putValue("Sender/ComponentID@schemeVersionID", oComponentID_schemeVersionID);
    aa1.putValue("CreationDateTime", oCreationDateTime);
    aa1.putValue("BODID", oBODID);
    aa1.putValue("DataArea/Process/AccountingEntityID", oAccountingEntityID);
    aa1.putValue("DataArea/ItemMaster/ItemMasterHeader/ItemID/ID", ItemID);
    // Since the current value is NotSet instead of Error, it means Asynchronous Acknowledge is not yet executed since it has not set the value to Error.
    // Therefore, record must be added to IONApplicationArea with DeleteIONApplicationAreaIndicator set to Asynchronous (to be used and deleted in Asynchronous Acknowledge).
    aa1.putValue("DeleteIONApplicationAreaIndicator", "Asynchronous");
    aa1.save();
}

// Set action code
oActionCode = iActionCode;
```

### SetOutboxHeaderData  `[UV]`

```java
// BODType, hard coded here
setManifestInfo(ManifestConstants.MAP_ION_BOD_TYPE, "Acknowledge.EAMItemMaster"); // "map:ionBODType"
// TenantId, set using the value from ION Inbox: com:ionTenantId from message manifest
setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, getManifestInfo("com:ionTenantId")); // "map:ionTenantId"
// AccountingEntityID
setManifestInfo(ManifestConstants.MAP_ION_ACCOUNTING_ENTITY, bodAE); // "map:ionAccountingEntity"
```

### SetReason  `[UV]`

```text
in  String iDescription <- IN:/ConfirmBOD/DataArea/BOD/BODFailureMessage/ErrorProcessMessage/Description
out String oReason -> OUT:/AcknowledgeEAMItemMaster/DataArea/Acknowledge/ResponseCriteria/ChangeStatus/Reason
```

```java
oReason = iDescription.indexOf('\n') > 0 ? iDescription.substring(0, iDescription.indexOf('\n')) : iDescription;
//oReason = IONToolbox.getReasonFromStackTrace(iDescription);
```

## D. Custom BOD outbound — tenant/AE helpers used in custom maps

Source: `M3BOD_PurchaseRequisitionWF_Sync_Out_1_0_0_GC_Custom`

### GetCONO_DIVI_AE  `[UV]`

```text
in  String iCONO <- $CONO
in  String iDIVI <- (unlinked)
out String oCONO -> M3 Settings.Company, SetGlobals.iCONO
out String oDIVI -> M3 Settings.Division
out String oAE -> $bodAE
```

```java
/****** REMOVE START ******/
// Get CONO
if (iCONO == null) {
    throw new MeCError("Company number is missing");
}
oCONO = iCONO.trim();
int i = 0;
try {
    i = Integer.parseInt(oCONO);
    if (i < 0 || i > 999) {
        throw new MeCError("Company number " + i + " must be between 0 and 999");
    }
} catch (NumberFormatException e) {
    throw new MeCError("Illegal Company number " + oCONO, e);
}
oCONO = String.valueOf(1000 + i).substring(1);

// Get DIVI
oDIVI = iDIVI != null ? iDIVI : "";
if (oDIVI.length() > 3) {
    throw new MeCError("Division " + oDIVI + " must be max 3 characters long");
}
oDIVI = (oDIVI + "   ").substring(0, 3);

// Get AccountingEntityId
oAE = (oCONO + '_' + oDIVI).trim();
dtAE = new MECDataTranslator(getManifestMap(), "lid://infor.m3", "", "", "", "Generic", "Generic", "Generic",
        'O');
oAE = dtAE.translate("Generic", "AccountingEntityID", oAE, "", "", "<CONO>_<DIVI> to Accounting Entity Id");
```

### SetGlobals  `[UV]`

```text
in  String iCONO <- GetCONO_DIVI_AE.oCONO
in  String iTenantId <- CONST cInfor="Infor"
```

```java
// Instantiate generic DataTranslator
String blankDIVI = "";
dtGen = new DataTranslator(getManifestMap(), iCONO, blankDIVI, "ION", "1", "Generic");

// Set tenant id
if (iTenantId == null) {
    // On-premise: Translate M3 BE company to tenant id
    tenantID = dtGen.toMessage("Generic", "TenantID", iCONO, "", "", "CMNCMP", "CONO");
    setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, tenantID);
}
```

### setAgreementName  `[UV]`

```java
// Please implement me
String agreement = getManifestInfo("cmn:agreement");

setManifestInfo("map:altAgreement", agreement + " "+PLPN);
```

## E. MBM-triggered FTD (EventData from MNS260/MBM → flat/XML file)

Source: `M3FTD_GC_SG_HSBC_PP_OUT_Custom`

### GetElementData  `[UV]`

```text
in  String iName <- IN:/EventData/Document/ElementData/Name
in  String iValue <- IN:/EventData/Document/ElementData/Value
```

```java
iName = (iName == null) ? "" : iName.trim();
iValue = (iValue == null) ? "" : iValue.trim();
if (iName != null) {
    if (iName.equals("MessageCopy") || iName.equals("Time") || iName.equals("Date")
            || iName.equals("MessageKey1_Value") || iName.equals("MessageKey2_Value")
            || iName.equals("MessageKey3_Value") || iName.equals("MessageKey4_Value")
            || iName.equals("MessageKey5_Value") || iName.equals("MessageKey6_Value")) {
        ElementData.put(iName, iValue);
    }
}
```

### SetMBMInit  `[UV]`

```text
out String oMessageCopy -> MBMInit.iMessageCopy
out String oMessageDate -> MBMInit.iMessageDate
out String oMessageTime -> MBMInit.iMessageTime
out String oMessageKey1 -> MBMInit.iMessageKey1
out String oMessageKey2 -> MBMInit.iMessageKey2
out String oMessageKey3 -> MBMInit.iMessageKey3
out String oMessageKey4 -> MBMInit.iMessageKey4
```

```java
oMessageCopy = ElementData.get("MessageCopy");
oMessageDate = ElementData.get("Date");
oMessageTime = ElementData.get("Time");
oMessageKey1 = ElementData.get("MessageKey1_Value");
oMessageKey2 = ElementData.get("MessageKey2_Value");
oMessageKey3 = ElementData.get("MessageKey3_Value");
oMessageKey4 = ElementData.get("MessageKey4_Value");
```

### MBMInit  `[UV]`

```text
in  String iMessageCopy <- SetMBMInit.oMessageCopy
in  String iMessageDate <- SetMBMInit.oMessageDate
in  String iMessageTime <- SetMBMInit.oMessageTime
in  String iMessageKey1 <- SetMBMInit.oMessageKey1
in  String iMessageKey2 <- SetMBMInit.oMessageKey2
in  String iMessageKey3 <- SetMBMInit.oMessageKey3
in  String iMessageKey4 <- SetMBMInit.oMessageKey4
in  String iMessageKey5 <- (unlinked)
in  String iMessageKey6 <- (unlinked)
out String oMsgCopy -> (unlinked)
out String oMsgDate -> $MsgDate
out String oMsgTime -> $MsgTime
out String oCONO -> $CONO
out String oDIVI -> $DIVI
out String oPRPN -> $PRPN
out String oPYON -> $PYON
out String oCurrentDateTime -> (unlinked)
```

```java
//*** MBMInit ***


logDebug("  [:] ********  HSBC PP Detected  **********");



if (iMessageCopy == null) iMessageCopy = "";
if (iMessageDate == null) iMessageDate = "";
if (iMessageTime == null) iMessageTime = "";
if (iMessageKey1 == null) iMessageKey1 = "";
if (iMessageKey2 == null) iMessageKey2 = "";
if (iMessageKey3 == null) iMessageKey3 = "";
if (iMessageKey4 == null) iMessageKey4 = "";
if (iMessageKey5 == null) iMessageKey5 = "";
if (iMessageKey6 == null) iMessageKey6 = "";
oMsgCopy = iMessageCopy.trim();
oMsgDate = iMessageDate.trim();
oMsgTime = iMessageTime.trim();
oCONO = iMessageKey1.trim();
oDIVI = iMessageKey2.trim();
oPRPN = iMessageKey3.trim();
oPYON = iMessageKey4.trim();
// Instantiate StringReplacer for this map
//strRep = new StringReplacer(myMap);
java.text.DecimalFormatSymbols otherSymbols = new java.text.DecimalFormatSymbols();
otherSymbols.setDecimalSeparator('.');
df = new java.text.DecimalFormat("0.00", otherSymbols);

logDebug("  [:] GC SG HSBC PP=" + iMessageCopy + "iMessageKey1=" + iMessageKey1 + "iMessageKey2=" + iMessageKey2 + "Message5=" + iMessageKey5 + "Message6=" + iMessageKey6);
logDebug("  [:] End=");
```

### F_Set_Manifest_Info  `[UV]`

```java
// Please implement me
String timeStamp = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());

String fileName = "HSBC_" + MsgId + "_" + timeStamp + "";

String PartnerName = "HSBC_" + MsgId;
logDebug("  [:] *************>> fileName=" + fileName);
setManifestInfo("map:FileName", fileName);
setManifestInfo(ManifestConstants.MAP_ION_CUSTOM + "FileName", fileName);
setManifestInfo(ManifestConstants.MAP_PARTNER, PartnerName);
```

## F. MBM re-detect (classify, then raise a new MBM for a second agreement)

Source: `M3FTD_SCB_HSBC_Payment_MBM_ReDetector_Custom`

### GetCONO_DIVI_AE  `[UV]`

```text
in  String iCONO <- $CONO
in  String iDIVI <- $DIVI
out String oCONO -> $CONO
out String oDIVI -> $DIVI
out String oAE -> $fbmAE
```

```java
iCONO = (iCONO == null) ? "" : iCONO.trim();
iDIVI = (iDIVI == null) ? "" : iDIVI.trim();

oCONO = IONToolbox.formatCompany(iCONO);
oDIVI = IONToolbox.formatDivision(iDIVI);
oAE = IONToolbox.getAccountingEntityId(oCONO, oDIVI);
```

### F_Set_MBM_OUT  `[UV]`

```text
in  String iMessageCopy <- $MsgCopy
in  String iDate <- $MsgDate
in  String iTime <- $MsgTime
in  String iMK1 <- $CONO
in  String iMK2 <- $DIVI
in  String iMK3 <- $PRPN
in  String iMK4 <- $PYON
in  String iMK5 <- $LITX
in  String iMK6 <- $TransactionType
in  String iMK7 <- $MapType
out String oMessageCopy -> (unlinked)
out String oDate -> (unlinked)
out String oTime -> (unlinked)
out String oMK1 -> (unlinked)
out String oMK2 -> (unlinked)
out String oMK3 -> AddMBMInit.DONO
out String oMK4 -> AddMBMInit.MKV4
out String oMK5 -> AddMBMInit.MKV5
out String oMK6 -> AddMBMInit.MKV6
out String oMK7 -> AddMBMInit.MKV7
```

```java
// Please implement me
oMessageCopy = iMessageCopy;

oDate = iDate;
oTime = iTime;
oMK1 = iMK1;
oMK2 = iMK2;
oMK3 = iMK3;
oMK4 = iMK4;
oMK5 = iMK5;
oMK6 = iMK6;
oMK7 = iMK7;
```

### F_Set_ManifestInfo  `[UV]`

```java
// Please implement me

String timeStamp = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());

String fileName = "HSBC_SCB_PreDetect_" + MapType + "_" + timeStamp + "";

String PartnerName = "MBM - " + CONO + "_" + DIVI + "_" + MapType + " - " + PRPN;
logWarn("  [:] *************>> PartnerName=" + PartnerName);
logWarn("  [:] *************>> MBM ID =" + BMIN);
logWarn("  [:] *************>> fileName=" + fileName);
setManifestInfo("map:FileName", fileName);
setManifestInfo(ManifestConstants.MAP_ION_CUSTOM + "FileName", fileName);
setManifestInfo(ManifestConstants.MAP_PARTNER, PartnerName);
```

## G. Custom XML in → M3 API → XML response (weighbridge style)

Source: `M3FTD_GC_WB_DO_Mapping_Update_Custom`

### DataConvertion  `[UV]`

```text
in  String i_DeliveryNo <- IN:/WeibridgeInboundInput/LineRecord/DeliveryNumber
in  String i_netweight <- IN:/WeibridgeInboundInput/LineRecord/NetWeight
in  String i_itemNumber <- IN:/WeibridgeInboundInput/LineRecord/ItemNumber
in  String i_primaryKey <- IN:/WeibridgeInboundInput/LineRecord/WeighbridgePrimaryKey
in  String i_ContainerNumber <- IN:/WeibridgeInboundInput/LineRecord/ContainerNumber
in  String i_transactionType <- IN:/WeibridgeInboundInput/LineRecord/TransactionType
out String o_DeliveryNo -> $g_DeliveryNoInput
out String o_primaryKey -> $g_PrimaryKeyInput
out String o_TransactionType -> $g_TransactionType
out String o_netweight -> $g_NetWeightInput
out String o_itemNuber -> $g_ItemNumberInput
out String o_ContainerNumber -> $g_ContainerNumberInput
```

```java
logDebug("*****************Inside data conversion");
        logDebug(i_DeliveryNo);
        o_DeliveryNo = (i_DeliveryNo != null) ? i_DeliveryNo.trim() : "" ;
        o_primaryKey = (i_primaryKey != null) ? i_primaryKey.trim() : "" ;
        o_TransactionType = (i_transactionType != null) ? i_transactionType.trim() : "" ;
        o_ContainerNumber = (i_ContainerNumber != null) ? i_ContainerNumber.trim() : "" ;
        o_itemNuber = (i_itemNumber != null) ? i_itemNumber.trim() : "" ;
        o_netweight = (i_netweight != null) ? i_netweight.trim() : "" ;

        String[] values = o_primaryKey.split(":");
        g_Mill = values[0];
        g_PrimaryKey_ = values[1];


        logDebug("*****************Returned Delivery NO is = " + o_DeliveryNo);

//        // Retrieve connection details from properties
//        cat.info("Retreaving data from M3");
//
//        String centralFileFolder = com.intentia.ec.server.DocServer
//                .getEcProperties().getProperty("mec.central.file.path");
//
//        String PropertiesFile = centralFileFolder + "/sqlconn";
//
//        cat.info(strUUID + "[:] PropertiesFile: '" + PropertiesFile + "'");
//
//        // Read properties file if it exists
//        boolean propertiesOK = false;
//        java.util.Properties properties = new java.util.Properties();
//        try {
//            properties.load(new java.io.FileInputStream(PropertiesFile
//                    + ".properties"));
//            propertiesOK = true;
//        } catch (java.io.IOException ioe) {
//
//
//            cat.info("IO Error occurred reading properties file for "
//                    + getClass() + ".\n");
//        }
//
//        // If properties ok then get each one
//        if (propertiesOK) {
//
//
//            g_Company = properties.getProperty("Conn.cmp");
//
//            cat.info("connection info read success");
//        }
        g_Company = getManifestInfo("agr:Company");

        logDebug("  [:] g_Company=" + g_Company);
```

### SetOutput  `[UV]`

```text
out String o_Message -> OUT:/WeibridgeInboundOutput/LineRecord/OutputMessage
out String o_ToleranceMessage -> OUT:/WeibridgeInboundOutput/LineRecord/ToleranceMessage
```

```java
logDebug("o_ToleranceMessage :: " + g_message);
logDebug("o_Message :: " + g_printMessage);

if(g_message != null && !g_message.trim().equals(""))
{
    o_ToleranceMessage = g_message;
}
o_Message = g_printMessage;
```

### OutputFileNameSetter  `[UV]`

```java
java.util.Date date= new java.util.Date();

String fileName = g_Mill + "_DISTRIBUTION_2_OUT_" + g_PrimaryKey_ + "_" + date.getTime() + ".xml";
String PartnerName = g_Mill + "_DISTRIBUTION_2_OUT_" + g_PrimaryKey_;
logDebug("  [:] *************>> fileName=" + fileName);
setManifestInfo("map:FileName", fileName);
setManifestInfo(ManifestConstants.MAP_ION_CUSTOM + "FileName", fileName);
setManifestInfo(ManifestConstants.MAP_PARTNER, PartnerName);
setManifestInfo(ManifestConstants.AGR_ION_DOCUMENT_ID, PartnerName);
```

## H. Collect-then-emit iterator pattern + API error capture

Source: `M3BOD_StockCountUpload_Process_In_GC_Custom`

### ValidateMMS301MIUpdateStockTake  `[UV]`

```text
in  String iSTQI <- setUpdateAPIInputs.oSTQI
in  String iSTBT <- setUpdateAPIInputs.oSTBT
in  String iSTRN <- setUpdateAPIInputs.oSTRN
```

```java
if(isLastAPICallOK()){
            logWarn("MMS301MI UpdateStockTake API Ran Successfully!");
        }else{


            logWarn("MMS301MI UpdateStockTake API Failed! Message: " + getLastAPIMessage());
            //String error = "CONO: " + gCONO + ", UpdateWHLO:" + gUpdateWHLO + ", UpdateSTNB: " + gUpdateSTNB + ", STRN: " + iSTRN + ", STQI: " + iSTQI + ", iSTBT: " + iSTBT;
            String gErrorTable = "CONO: " + gCONO + ", UpdateWHLO:" + gUpdateWHLO + ", UpdateSTNB: " + gUpdateSTNB + ", STRN: " + iSTRN + ", STQI: " + iSTQI + ", iSTBT: " + iSTBT;
//            gErrorTable = "<table border = \"1\"><tr style=\"color: white; background: black;\"><th>Line Detail</th><th>Validation</th></tr>"
//                    +"<tr><td>"+ error +"</td><td>" + getLastMIProgram() +"." + getLastTransaction() + " => " + getLastAPIMessage() + "</td></tr></table>";


            String GErrorTableMessage = getLastMIProgram() +"." + getLastTransaction() + " => " + getLastAPIMessage();

            String [] errorlist = {gErrorTable,GErrorTableMessage };
            ErrorDetails.add(errorlist);


            gIsError = true;
        }
        gIndexUpdate++;
```

### SetIetrator  `[UV]`

```text
out String oStatus -> (unlinked)
```

```java
// Please implement me
//        logWarn("gIsError::" + gIsError);
//        if (!gIsError) {
//            oStatus = "Success";
//        }
//        else {
//
//            oStatus = "Failure";
//        }

        ErrorListIterator = ErrorDetails.iterator();
```

### ErrorDetailsCondition  `[UB]`

```java
// Please implement me

return ErrorListIterator.hasNext();
```

### GetError  `[UV]`

```text
out String oLineDetails -> OUT:/AcknowledgeStockCountUpload/DataArea/StockCountUpload/ErrorDetails/LineDetails
out String oValidation -> OUT:/AcknowledgeStockCountUpload/DataArea/StockCountUpload/ErrorDetails/Validation
```

```java
// Please implement me


String[] details = (String[]) ErrorListIterator.next();

oLineDetails = details[0];
oValidation = details[1];
```

