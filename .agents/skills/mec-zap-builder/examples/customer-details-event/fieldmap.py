# (BOD element, MI field) pairs per section. Source: mec/mi-reference catalog (CRS610MI).
H = [  # CRS610MI/GetBasicData -> CustomerHeader
 ("CustomerNumber","CUNO"),("Name","CUNM"),("Address1","CUA1"),("Address2","CUA2"),("Address3","CUA3"),("Address4","CUA4"),
 ("PostalCode","PONO"),("City","TOWN"),("CountryCode","CSCD"),("AreaState","ECAR"),("CountyID","FRCO"),("County","TXCO"),
 ("Phone1","PHNO"),("Phone2","PHN2"),("Fax","TFNO"),("Email","MAIL"),("CustomerType","CUTP"),("SearchKey","ALCU"),
 ("YourReference1","YREF"),("YourReference2","YRE2"),("Status","STAT"),("Currency","CUCD"),("Language","LNCD"),
 ("Division","DIVI"),("CustomerOrderNumberMandatory","MCOS"),("OurSupplierNumberAtCustomer","CUSU"),("EANLocation","EALO"),
 ("FreeField1","CFC1"),("FreeField2","CFC2"),("FreeField3","CFC3"),("FreeField4","CFC4"),("FreeField5","CFC5"),
 ("FreeField6","CFC6"),("FreeField7","CFC7"),("FreeField8","CFC8"),("FreeField9","CFC9"),("FreeField10","CFC0"),
 ("EntryDate","RGDT"),("ChangeDate","LMDT"),("ChangeNumber","CHNO"),
]
F = [  # CRS610MI/GetFinancial -> Financial
 ("OrganizationNumber1","CORG"),("OrganizationNumber2","COR2"),("VATCode","VTCD"),("VATRegistrationNumber","VRNO"),
 ("CreditLimit1","CRLM"),("CreditLimit2","CRL2"),("CreditLimit3","CRL3"),("CreditLimit4MaxDays","ODUD"),
 ("OverdueInvoiceAmount","TDIN"),("OutstandingInvoiceAmount","TOIN"),("OrderValueNotInvoiced","TBLG"),("OverdueDays","ODUE"),
 ("TaxApplicable","TXAP"),("TaxCode","TAXC"),("TaxExemptionContractNumber","TECN"),("TaxExemptionExpiryDate","TEEC"),
 ("InvoiceRecipient","INRC"),("CustomerStop","BLCD"),("ExchangeRateType","CRTP"),("CashDiscountTerm","TECD"),
 ("PaymentMethodAR","PYCD"),("PaymentInstruction","PYDI"),("Collection","CLCD"),("PaymentReminderCode","BLPR"),
 ("PaymentReminderRule","RMCT"),("StatementRule","STMR"),("InterestInvoicing","BLII"),("InterestRule","IICT"),
 ("CompanyGroupCustomer","CCUS"),("GroupPayer","PYGR"),("DueDateBase","DUCD"),("CashCustomer","CASC"),
 ("CreditDepartmentReference","CDRC"),
]
O = [  # CRS610MI/GetOrderInfo -> OrderInfo
 ("CustomerGroup","CUCL"),("OurReference","OREF"),("Salesperson","SMCD"),("District","SDST"),("CustomerOrderType","ORTP"),
 ("ServiceModel","EXCD"),("ChargeModel","CHSY"),("TermsOfDelivery","TEDL"),("DeliveryMethod","MODL"),("Warehouse","WHLO"),
 ("Facility","FACI"),("DiscountModel","DISY"),("DiscountGroup","DIGC"),("DiscountPercent","DIPC"),("TermsOfPayment","TEPY"),
 ("Payer","PYNO"),("InvoicingGroup","IVGP"),("DeliveryAddressNumber","ADID"),("ShipVia","ADVI"),("PriceListTable","PLTB"),
 ("SummaryInvoice","AICD"),("SeparateInvoices","ADBO"),("VATIncluded","TINC"),("DocumentGroup","DOGR"),("Responsible","RESP"),
 ("StatisticsCustomer","CUST"),("Priority","PRIO"),("BackOrder","BCKO"),("PartialDelivery","PADL"),("CommissionGroup","PRVG"),
 ("BonusGroup","BGRP"),("TradeAgreementModel","TAGY"),("SupplyModel","SPLM"),
]
A = [  # CRS610MI/LstAddresses -> Address (repeating)
 ("AddressType","ADRT"),("AddressNumber","ADID"),("Name","CUNM"),("Address1","CUA1"),("Address2","CUA2"),("Address3","CUA3"),
 ("Address4","CUA4"),("PostalCode","PONO"),("City","TOWN"),("CountryCode","CSCD"),("AreaState","ECAR"),("CountyID","FRCO"),
 ("County","TXCO"),("Phone1","PHNO"),("Fax","TFNO"),("YourReference","YREF"),("DeliveryMethod","MODL"),("TermsOfDelivery","TEDL"),
 ("TaxCode","TAXC"),("VATRegistrationNumber","VRNO"),("ViaAddress","ADVI"),("Route","ROUT"),("RouteDeparture","RODN"),
 ("UnloadingZone","ULZO"),("ValidFrom","FVDT"),("ValidTo","LVDT"),("AddressCategory","ADCG"),("Priority","PRIO"),("EANLocation","EALO"),
]
DATES = {"RGDT","LMDT","TEEC","FVDT","LVDT"}
