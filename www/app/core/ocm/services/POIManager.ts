/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

export class POIManager {
    poiList: Array<any>;
    constructor(){
        this.populateTestData();
    }

    populateTestData() {

        this.poiList = [
            {
                "ID": 57617,
                "UUID": "95D11738-387C-4B8F-A50B-6BE31ADD8A60",
                "ParentChargePointID": null,
                "DataProviderID": 1,
                "DataProvider": {
                    "WebsiteURL": "http://openchargemap.org",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 1,
                        "Title": "Manual Data Entry"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "Licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
                    "DateLastImported": null,
                    "ID": 1,
                    "Title": "Open Charge Map Contributors"
                },
                "DataProvidersReference": null,
                "OperatorID": 45,
                "OperatorInfo": {
                    "WebsiteURL": null,
                    "Comments": "For use when the operator of the equipment is a single business owner connected to the location and equipment is not part of a larger network",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 45,
                    "Title": "(Business Owner at Location)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": "Free",
                "AddressInfo": {
                    "ID": 57963,
                    "Title": "Bal Harbor Shopping Center Ground Blue Parking Garage",
                    "AddressLine1": "9700 Collins Ave",
                    "AddressLine2": "Ground level parking Blue C and Blue E",
                    "Town": "Bal Harbor",
                    "StateOrProvince": "FL",
                    "Postcode": "33154",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 25.8879326708319,
                    "Longitude": -80.1255816221237,
                    "ContactTelephone1": null,
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Paid parking lot Ground Level Blue C and Blue E by entrance to mall.",
                    "RelatedURL": null,
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": 2,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": 50,
                "StatusType": {
                    "IsOperational": true,
                    "IsUserSelectable": true,
                    "ID": 50,
                    "Title": "Operational"
                },
                "DateLastStatusUpdate": "2015-12-10T05:39:00Z",
                "DataQualityLevel": 1,
                "DateCreated": "2015-12-10T00:07:00Z",
                "SubmissionStatusTypeID": 200,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 200,
                    "Title": "Submission Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72853,
                        "ConnectionTypeID": 30,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": false,
                            "IsObsolete": false,
                            "ID": 30,
                            "Title": "Tesla (Model S onwards)"
                        },
                        "Reference": null,
                        "StatusTypeID": 0,
                        "StatusType": {
                            "IsOperational": null,
                            "IsUserSelectable": true,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 80,
                        "Voltage": 200,
                        "PowerKW": 19.2,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 72855,
                        "ConnectionTypeID": 30,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": false,
                            "IsObsolete": false,
                            "ID": 30,
                            "Title": "Tesla (Model S onwards)"
                        },
                        "Reference": null,
                        "StatusTypeID": 50,
                        "StatusType": {
                            "IsOperational": true,
                            "IsUserSelectable": true,
                            "ID": 50,
                            "Title": "Operational"
                        },
                        "LevelID": null,
                        "Level": null,
                        "Amps": 80,
                        "Voltage": 200,
                        "PowerKW": 19.2,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": [
                    {
                        "ID": 3575,
                        "ChargePointID": 57617,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.orig.2015121005210387.jpeg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.thmb.2015121005210387.jpeg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 4648,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "dennis_p",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 98,
                            "Permissions": null,
                            "PermissionsRequested": null,
                            "DateCreated": null,
                            "DateLastLogin": null,
                            "IsProfilePublic": null,
                            "IsEmergencyChargingProvider": null,
                            "IsPublicChargingProvider": null,
                            "Latitude": null,
                            "Longitude": null,
                            "EmailAddress": null,
                            "EmailHash": null,
                            "IsCurrentSessionTokenValid": null,
                            "APIKey": null,
                            "SyncedSettings": null
                        },
                        "DateCreated": "2015-12-10T05:21:00Z"
                    },
                    {
                        "ID": 3576,
                        "ChargePointID": 57617,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.orig.2015121005212847.jpeg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.thmb.2015121005212847.jpeg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 4648,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "dennis_p",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 98,
                            "Permissions": null,
                            "PermissionsRequested": null,
                            "DateCreated": null,
                            "DateLastLogin": null,
                            "IsProfilePublic": null,
                            "IsEmergencyChargingProvider": null,
                            "IsPublicChargingProvider": null,
                            "Latitude": null,
                            "Longitude": null,
                            "EmailAddress": null,
                            "EmailHash": null,
                            "IsCurrentSessionTokenValid": null,
                            "APIKey": null,
                            "SyncedSettings": null
                        },
                        "DateCreated": "2015-12-10T05:22:00Z"
                    },
                    {
                        "ID": 3578,
                        "ChargePointID": 57617,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.orig.2015121005304382.jpeg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.thmb.2015121005304382.jpeg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 4648,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "dennis_p",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 98,
                            "Permissions": null,
                            "PermissionsRequested": null,
                            "DateCreated": null,
                            "DateLastLogin": null,
                            "IsProfilePublic": null,
                            "IsEmergencyChargingProvider": null,
                            "IsPublicChargingProvider": null,
                            "Latitude": null,
                            "Longitude": null,
                            "EmailAddress": null,
                            "EmailHash": null,
                            "IsCurrentSessionTokenValid": null,
                            "APIKey": null,
                            "SyncedSettings": null
                        },
                        "DateCreated": "2015-12-10T05:31:00Z"
                    },
                    {
                        "ID": 3579,
                        "ChargePointID": 57617,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.orig.2015121005310399.jpeg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/US/OCM57617/OCM-57617.thmb.2015121005310399.jpeg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 4648,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "dennis_p",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 98,
                            "Permissions": null,
                            "PermissionsRequested": null,
                            "DateCreated": null,
                            "DateLastLogin": null,
                            "IsProfilePublic": null,
                            "IsEmergencyChargingProvider": null,
                            "IsPublicChargingProvider": null,
                            "Latitude": null,
                            "Longitude": null,
                            "EmailAddress": null,
                            "EmailHash": null,
                            "IsCurrentSessionTokenValid": null,
                            "APIKey": null,
                            "SyncedSettings": null
                        },
                        "DateCreated": "2015-12-10T05:31:00Z"
                    }
                ],
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-12-10T00:07:00Z"
            },
            {
                "ID": 57525,
                "UUID": "5966E302-91F3-4BB8-82B1-273BD982E8C7",
                "ParentChargePointID": null,
                "DataProviderID": 1,
                "DataProvider": {
                    "WebsiteURL": "http://openchargemap.org",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 1,
                        "Title": "Manual Data Entry"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "Licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
                    "DateLastImported": null,
                    "ID": 1,
                    "Title": "Open Charge Map Contributors"
                },
                "DataProvidersReference": null,
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": "free",
                "AddressInfo": {
                    "ID": 57871,
                    "Title": "Blake St Parking Lot, Park New Haven",
                    "AddressLine1": "944 CT-63 ",
                    "AddressLine2": null,
                    "Town": "New Haven",
                    "StateOrProvince": "Connecticut ",
                    "Postcode": null,
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3277987835123,
                    "Longitude": -72.9604813456535,
                    "ContactTelephone1": null,
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24/7 ",
                    "RelatedURL": null,
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": 2,
                "GeneralComments": "Free Charging in public parking lot $1/hr",
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": 50,
                "StatusType": {
                    "IsOperational": true,
                    "IsUserSelectable": true,
                    "ID": 50,
                    "Title": "Operational"
                },
                "DateLastStatusUpdate": "2015-12-02T22:24:00Z",
                "DataQualityLevel": 1,
                "DateCreated": "2015-12-02T05:36:00Z",
                "SubmissionStatusTypeID": 200,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 200,
                    "Title": "Submission Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72696,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": 50,
                        "StatusType": {
                            "IsOperational": true,
                            "IsUserSelectable": true,
                            "ID": 50,
                            "Title": "Operational"
                        },
                        "LevelID": null,
                        "Level": null,
                        "Amps": null,
                        "Voltage": null,
                        "PowerKW": null,
                        "CurrentTypeID": null,
                        "CurrentType": null,
                        "Quantity": null,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-12-02T05:36:00Z"
            },
            {
                "ID": 57524,
                "UUID": "FD7CC056-3A48-41A1-B46E-C31833564514",
                "ParentChargePointID": null,
                "DataProviderID": 1,
                "DataProvider": {
                    "WebsiteURL": "http://openchargemap.org",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 1,
                        "Title": "Manual Data Entry"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "Licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
                    "DateLastImported": null,
                    "ID": 1,
                    "Title": "Open Charge Map Contributors"
                },
                "DataProvidersReference": null,
                "OperatorID": 31,
                "OperatorInfo": {
                    "WebsiteURL": null,
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 31,
                    "Title": "Clipper Creek"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": "0",
                "AddressInfo": {
                    "ID": 57870,
                    "Title": "Mammoth Hot Springs Hotel, Yellowstone National Park",
                    "AddressLine1": "2 Mammoth Hotel Hot Springs Ave. (at junction with Juniper St.)",
                    "AddressLine2": "Yellowstone National Park",
                    "Town": "Mammoth Hot Springs",
                    "StateOrProvince": "WY",
                    "Postcode": "82190",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.976715352831,
                    "Longitude": -110.702553428134,
                    "ContactTelephone1": "307-344-5204",
                    "ContactTelephone2": "307-344-5566",
                    "ContactEmail": "dhoffman@xanterra.com",
                    "AccessComments": "We are thrilled to announce that our first dedicated public electric vehicle charging station has been installed at Mammoth Hot Springs and is ready to be used!  This Level II charging station is located outside of the Mammoth Hot Springs Hotel and was made possible with grant money obtained through a partnership with Yellowstone-Teton Clean Cities, Yellowstone, and Grand Teton National Parks.  To learn more about the Clean Cities National Park Initiative see https://cleancities.energy.gov/national-parks. \r\n\r\nThe is currently a publicly accessible, FREE charging station with 2 reserved parking spaces and 2 charging units from 1 pedestal. The system is a Clipper Creek CS-40 Level II station that works with all J1772 compliant vehicles. Access is first come-first serve. ",
                    "RelatedURL": "https://www.yellowstonenationalparklodges.com/environment",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": 2,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": 50,
                "StatusType": {
                    "IsOperational": true,
                    "IsUserSelectable": true,
                    "ID": 50,
                    "Title": "Operational"
                },
                "DateLastStatusUpdate": "2015-12-02T22:23:00Z",
                "DataQualityLevel": 1,
                "DateCreated": "2015-12-01T23:54:00Z",
                "SubmissionStatusTypeID": 200,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 200,
                    "Title": "Submission Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72695,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": 50,
                        "StatusType": {
                            "IsOperational": true,
                            "IsUserSelectable": true,
                            "ID": 50,
                            "Title": "Operational"
                        },
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 32,
                        "Voltage": 240,
                        "PowerKW": 7.7,
                        "CurrentTypeID": null,
                        "CurrentType": null,
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": [
                    {
                        "ID": 3541,
                        "ChargePointID": 57524,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/US/OCM57524/OCM-57524.orig.2015120123561461.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/US/OCM57524/OCM-57524.thmb.2015120123561461.jpg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6650,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "RebeccaOwens",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 1,
                            "Permissions": null,
                            "PermissionsRequested": null,
                            "DateCreated": null,
                            "DateLastLogin": null,
                            "IsProfilePublic": null,
                            "IsEmergencyChargingProvider": null,
                            "IsPublicChargingProvider": null,
                            "Latitude": null,
                            "Longitude": null,
                            "EmailAddress": null,
                            "EmailHash": null,
                            "IsCurrentSessionTokenValid": null,
                            "APIKey": null,
                            "SyncedSettings": null
                        },
                        "DateCreated": "2015-12-01T23:56:00Z"
                    }
                ],
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-12-01T23:54:00Z"
            },
            {
                "ID": 57346,
                "UUID": "AC0F5332-D855-45DF-A8DE-DE4C555884C7",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71040",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57692,
                    "Title": "3RD AVE PARKING",
                    "AddressLine1": "749-799 Railroad St",
                    "AddressLine2": null,
                    "Town": "Holdrege",
                    "StateOrProvince": "NE",
                    "Postcode": "68949",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.436606,
                    "Longitude": -99.37044,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72448,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57347,
                "UUID": "E8931FE7-7835-4D4E-8C86-14406877B125",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71019",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57693,
                    "Title": "COLO STATE UNIV",
                    "AddressLine1": "2400 Research Blvd",
                    "AddressLine2": null,
                    "Town": "Fort Collins",
                    "StateOrProvince": "CO",
                    "Postcode": "80526",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.5566596,
                    "Longitude": -105.0866778,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72449,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57348,
                "UUID": "66BC24F9-210B-491A-A55D-F5FFA6EB98E2",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71147",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57694,
                    "Title": "Canton Harvester Inn",
                    "AddressLine1": "150 N Main St",
                    "AddressLine2": null,
                    "Town": "Canton",
                    "StateOrProvince": "IL",
                    "Postcode": "61520",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.5577937,
                    "Longitude": -90.0354748,
                    "ContactTelephone1": "309-357-5820  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72450,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57349,
                "UUID": "70DBE958-CB0F-454B-8221-401635E92B32",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71234",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 2,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": null,
                    "ID": 2,
                    "Title": "Private - Restricted Access"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57695,
                    "Title": "Colorado State University - Facilities Service Center South",
                    "AddressLine1": "East Dr",
                    "AddressLine2": null,
                    "Town": "Fort Collins",
                    "StateOrProvince": "CO",
                    "Postcode": "80523",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.570085,
                    "Longitude": -105.080217,
                    "ContactTelephone1": "",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72451,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57350,
                "UUID": "25F6CD85-93B1-4981-9EBB-F5EB1DF77104",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71270",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57696,
                    "Title": "CARL'S JR.",
                    "AddressLine1": "833 E Cypress Ave",
                    "AddressLine2": null,
                    "Town": "Redding",
                    "StateOrProvince": "CA",
                    "Postcode": "96002",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.570572,
                    "Longitude": -122.3563502,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72452,
                        "ConnectionTypeID": 32,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": false,
                            "IsObsolete": false,
                            "ID": 32,
                            "Title": "SAE Combo (DC Fast Charge J1772)"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57351,
                "UUID": "B50FCAAB-6AC5-4AF0-8AAF-4043AA5D72AF",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71342",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57697,
                    "Title": "Montage Deer Valley - Tesla",
                    "AddressLine1": "9100 Marsac Ave",
                    "AddressLine2": null,
                    "Town": "Park City",
                    "StateOrProvince": "UT",
                    "Postcode": "84060",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.6158839,
                    "Longitude": -111.5109588,
                    "ContactTelephone1": "435-604-1300  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72453,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 4,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57352,
                "UUID": "9CFE52E1-6D8B-4E84-98BD-81FD2937403A",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71345",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57698,
                    "Title": "Stein Eriksen Lodge - Tesla",
                    "AddressLine1": "7700 Stein Way",
                    "AddressLine2": null,
                    "Town": "Park City",
                    "StateOrProvince": "UT",
                    "Postcode": "84060",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.6221159,
                    "Longitude": -111.4909371,
                    "ContactTelephone1": "435-649-3700  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72454,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57353,
                "UUID": "00126402-2395-460A-877F-A1F2742CD3D9",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71239",
                "OperatorID": 39,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.semacharge.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 39,
                    "Title": "SemaCharge Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57699,
                    "Title": "Bear River Hotel",
                    "AddressLine1": "11 Bear Paws Way",
                    "AddressLine2": null,
                    "Town": "Loleta",
                    "StateOrProvince": "CA",
                    "Postcode": "95551",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.627386,
                    "Longitude": -124.207966,
                    "ContactTelephone1": "800-663-5633",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MO: 12:00am-12:00am; TU: 12:00am-12:00am; WE: 12:00am-12:00am; TH: 12:00am-12:00am; FR: 12:00am-12:00am; SA: 12:00am-12:00am; SU: 12:00am-12:00am",
                    "RelatedURL": "http://www.semacharge.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72455,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57354,
                "UUID": "8EC1D58B-A937-4251-A580-EDD807ADC5BD",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71165",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57700,
                    "Title": "CORNERSTONE",
                    "AddressLine1": "2750 E Cottonwood Pkwy",
                    "AddressLine2": null,
                    "Town": "Cottonwood Heights",
                    "StateOrProvince": "UT",
                    "Postcode": "84121",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.631908,
                    "Longitude": -111.814646,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72456,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 8,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57355,
                "UUID": "B2168DA5-DE99-4660-A607-B5223D776677",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71340",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57701,
                    "Title": "Hotel Pak City - Tesla",
                    "AddressLine1": "2001 Park Ave",
                    "AddressLine2": null,
                    "Town": "Park City",
                    "StateOrProvince": "UT",
                    "Postcode": "84060",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.6621927,
                    "Longitude": -111.5133249,
                    "ContactTelephone1": "435-200-2000  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72457,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57356,
                "UUID": "E9C508A3-58B8-48C6-9F88-C59EF93ECBC1",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71363",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57702,
                    "Title": "REI - Salt Lake City",
                    "AddressLine1": "3285 E 3300 S",
                    "AddressLine2": null,
                    "Town": "Salt Lake City",
                    "StateOrProvince": "UT",
                    "Postcode": "84109",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.7006301879883,
                    "Longitude": -111.800926208496,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72458,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57357,
                "UUID": "7A85A4C9-D27C-499D-986D-E60BBD037A7B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70957",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57703,
                    "Title": "PARKING LOT",
                    "AddressLine1": "43 Olympia Dr",
                    "AddressLine2": null,
                    "Town": "Newark",
                    "StateOrProvince": "NJ",
                    "Postcode": "07114",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.7098571,
                    "Longitude": -74.1534233,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72459,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57358,
                "UUID": "A8C1AC54-37D6-4180-AE3B-8A053B70E616",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70534",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57704,
                    "Title": "Costco",
                    "AddressLine1": "1818 S 300 W",
                    "AddressLine2": null,
                    "Town": "Salt Lake City",
                    "StateOrProvince": "UT",
                    "Postcode": "84115",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.7311204,
                    "Longitude": -111.9012431,
                    "ContactTelephone1": "801-485-9715",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Store business hours",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72460,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 6,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57359,
                "UUID": "64DC985F-15F9-48C3-92BB-90E95F3AB71B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71236",
                "OperatorID": 9,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.blinknetwork.com/",
                    "Comments": "Membership based charging network, part of Car Charging Group, inc.",
                    "PhonePrimaryContact": "888.998.BLINK (2546)",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": "https://prod.blinknetwork.com/membership.html",
                    "ContactEmail": "support@blinknetwork.com",
                    "FaultReportEmail": "support@blinknetwork.com",
                    "IsRestrictedEdit": false,
                    "ID": 9,
                    "Title": "Blink Network/ECOtality"
                },
                "OperatorsReference": null,
                "UsageTypeID": 2,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": null,
                    "ID": 2,
                    "Title": "Private - Restricted Access"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57705,
                    "Title": "Star Parking Newark",
                    "AddressLine1": "25-33 Edison Place",
                    "AddressLine2": null,
                    "Town": "Newark",
                    "StateOrProvince": "NJ",
                    "Postcode": "07102",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.734664,
                    "Longitude": -74.171096,
                    "ContactTelephone1": "888-998-2546",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MON: 24 hours | TUE: 24 hours | WED: 24 hours | THU: 24 hours | FRI: 24 hours | SAT: 24 hours | SUN: 24 hours",
                    "RelatedURL": "http://www.blinknetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72461,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57337,
                "UUID": "305FEDF1-0024-40AB-B51F-A3C7CDE67F7B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71360",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57683,
                    "Title": "KEW REALTY",
                    "AddressLine1": "8901 N Harlan St",
                    "AddressLine2": null,
                    "Town": "Westminster",
                    "StateOrProvince": "CO",
                    "Postcode": "80031",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 39.8582636,
                    "Longitude": -105.0648458,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72439,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57360,
                "UUID": "17AE79A7-D61F-4859-8C29-0F9EA40735EC",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71341",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57706,
                    "Title": "Meditrina Small Plates and Wine Bar - Tesla",
                    "AddressLine1": "1394 SW Temple",
                    "AddressLine2": null,
                    "Town": "Salt Lake City",
                    "StateOrProvince": "UT",
                    "Postcode": "94115",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.73939,
                    "Longitude": -111.8942297,
                    "ContactTelephone1": "801-485-2055  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72462,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57361,
                "UUID": "583AB2A7-06B9-4079-B974-79E36E935527",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71339",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57707,
                    "Title": "Grand America Hotel - Tesla",
                    "AddressLine1": "555 S Main St",
                    "AddressLine2": null,
                    "Town": "Salt Lake City",
                    "StateOrProvince": "UT",
                    "Postcode": "84111",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.7574479,
                    "Longitude": -111.890297,
                    "ContactTelephone1": "801-258-6000  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72463,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57362,
                "UUID": "3BB75E42-CB35-4336-AAC9-B88F9BF404D3",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70933",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57708,
                    "Title": "LASH  WHITE PLA",
                    "AddressLine1": "376 Tarrytown Rd",
                    "AddressLine2": null,
                    "Town": "White Plains",
                    "StateOrProvince": "NY",
                    "Postcode": "10607",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.0430009,
                    "Longitude": -73.796297,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72464,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57363,
                "UUID": "27BEFC31-3A77-408A-A452-2C903C200771",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71167",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57709,
                    "Title": "DOUBLETREEHOTEL",
                    "AddressLine1": "455 S Broadway",
                    "AddressLine2": null,
                    "Town": "Tarrytown",
                    "StateOrProvince": "NY",
                    "Postcode": "10591",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.0614105,
                    "Longitude": -73.8628291,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72465,
                        "ConnectionTypeID": 32,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": false,
                            "IsObsolete": false,
                            "ID": 32,
                            "Title": "SAE Combo (DC Fast Charge J1772)"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57364,
                "UUID": "8355EC48-DB70-41AA-8162-FFEAEFB14612",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71276",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57710,
                    "Title": "Ridgeway Lower Level Parking Garage",
                    "AddressLine1": "2202 Bedford Street",
                    "AddressLine2": null,
                    "Town": "Stamford",
                    "StateOrProvince": "CT",
                    "Postcode": "06905",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.0686492919922,
                    "Longitude": -73.5459823608398,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72466,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57365,
                "UUID": "E0425FB2-A0F7-4DD9-A614-F5011F3AABB9",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71256",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57711,
                    "Title": "Green Farms",
                    "AddressLine1": "1460 Post Road",
                    "AddressLine2": null,
                    "Town": "East Westport",
                    "StateOrProvince": "CT",
                    "Postcode": "06820",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.1392135620117,
                    "Longitude": -73.3121795654297,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72467,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57366,
                "UUID": "95BB5575-31A0-44F9-B145-A92276A9F490",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71259",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57712,
                    "Title": "Walmart S1894",
                    "AddressLine1": "4141 Pearl Road",
                    "AddressLine2": null,
                    "Town": "Medina",
                    "StateOrProvince": "OH",
                    "Postcode": "44256",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.1617965698242,
                    "Longitude": -81.8600616455078,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72468,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 72469,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57367,
                "UUID": "7878CAC2-EB84-48EF-AAE7-2DF0A662D1FA",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71030",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57713,
                    "Title": "Walmart S2323",
                    "AddressLine1": "3250 Hudson Drive",
                    "AddressLine2": null,
                    "Town": "Stow",
                    "StateOrProvince": "OH",
                    "Postcode": "44224",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.165210723877,
                    "Longitude": -81.4791107177734,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72470,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 72471,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57368,
                "UUID": "6272940E-E396-4518-BA8F-9A9FB092D36E",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71253",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57714,
                    "Title": "The Dock - Rail Side",
                    "AddressLine1": "200 East Main Street",
                    "AddressLine2": null,
                    "Town": "Stamford",
                    "StateOrProvince": "CT",
                    "Postcode": "06614",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.2027702331543,
                    "Longitude": -73.1175231933594,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72472,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57369,
                "UUID": "95ADBFBF-3D01-4EED-88D4-FD8C319ADC21",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71031",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57715,
                    "Title": "Walmart S2313",
                    "AddressLine1": "8585 Pearl Road",
                    "AddressLine2": null,
                    "Town": "Strongsville",
                    "StateOrProvince": "OH",
                    "Postcode": "44136",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.2519798278809,
                    "Longitude": -81.3619384765625,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72473,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57370,
                "UUID": "8388C3B8-7D52-4281-AC85-A7E9766B694F",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71292",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57716,
                    "Title": "Village Commons",
                    "AddressLine1": "186 Katonah Avenue",
                    "AddressLine2": null,
                    "Town": "Katonah",
                    "StateOrProvince": "NY",
                    "Postcode": "10536",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.2565231323242,
                    "Longitude": -73.6842727661133,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72474,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57371,
                "UUID": "C4008A29-3E11-4346-91BD-47C01A2F969F",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71314",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57717,
                    "Title": "Ocean House - Tesla",
                    "AddressLine1": "1 Bluff Ave",
                    "AddressLine2": null,
                    "Town": "Watch Hill",
                    "StateOrProvince": "RI",
                    "Postcode": "02891",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3103108,
                    "Longitude": -71.8534852,
                    "ContactTelephone1": "401-584-7043  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72475,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57372,
                "UUID": "4C0F2CE6-BB77-433D-9CC7-679158DFF5DF",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71315",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57718,
                    "Title": "The Weekapaug Inn - Tesla",
                    "AddressLine1": "25 Spray Rock Rd",
                    "AddressLine2": null,
                    "Town": "Westerly",
                    "StateOrProvince": "RI",
                    "Postcode": "02891",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.33052,
                    "Longitude": -71.7503909,
                    "ContactTelephone1": "401-637-7600  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72476,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57373,
                "UUID": "EFDB7EFD-794A-434E-9EDD-C5717AE8203E",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71057",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57719,
                    "Title": "Walmart S2266",
                    "AddressLine1": "8585 Pearl Road",
                    "AddressLine2": null,
                    "Town": "Strongsville",
                    "StateOrProvince": "OH",
                    "Postcode": "44136",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3455657958984,
                    "Longitude": 81.8208312988281,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72477,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57374,
                "UUID": "FE81C2D6-35BE-402D-9ABD-08F645BDC3C1",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71174",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57720,
                    "Title": "Walmart S4255",
                    "AddressLine1": "100 Chestnut Commons Dr.",
                    "AddressLine2": null,
                    "Town": "Elyria",
                    "StateOrProvince": "OH",
                    "Postcode": "44305",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3504409790039,
                    "Longitude": -82.0677947998047,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72478,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 72479,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57375,
                "UUID": "04A27935-1A90-4CDA-8FD8-6F621E602B43",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71231",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57721,
                    "Title": "Walmart S3250",
                    "AddressLine1": "7235 Market Place Drive",
                    "AddressLine2": null,
                    "Town": "Aurora",
                    "StateOrProvince": "OH",
                    "Postcode": "44202",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3510589599609,
                    "Longitude": -81.389778137207,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72480,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 72481,
                        "ConnectionTypeID": 2,
                        "ConnectionType": {
                            "FormalName": null,
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 2,
                            "Title": "CHAdeMO"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 3,
                        "Level": {
                            "Comments": "40KW and Higher",
                            "IsFastChargeCapable": true,
                            "ID": 3,
                            "Title": "Level 3:  High (Over 40kW)"
                        },
                        "Amps": 100,
                        "Voltage": 400,
                        "PowerKW": 40.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57376,
                "UUID": "1390CABB-2192-4BB3-B0C0-7F625B20C172",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71213",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57722,
                    "Title": "A109AC1/ 211 Carnegie Center",
                    "AddressLine1": "211 Carnegie Center",
                    "AddressLine2": null,
                    "Town": "Princeton",
                    "StateOrProvince": "NJ",
                    "Postcode": "08540",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.3768081665039,
                    "Longitude": -91.23046875,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72482,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57377,
                "UUID": "FF183A0F-7D0B-4BBD-BDCE-60B7C4F7B66B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71029",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57723,
                    "Title": "HDPARK",
                    "AddressLine1": "3851 Youngs Rd",
                    "AddressLine2": null,
                    "Town": "Channahon",
                    "StateOrProvince": "IL",
                    "Postcode": "60410",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.4510674,
                    "Longitude": -88.1813087,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72483,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57378,
                "UUID": "F63FD978-85F8-489C-933E-136F286DFDD4",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70966",
                "OperatorID": 39,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.semacharge.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 39,
                    "Title": "SemaCharge Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57724,
                    "Title": "Shiverick  1 and 2",
                    "AddressLine1": "11 School Street",
                    "AddressLine2": null,
                    "Town": "Woods Hole",
                    "StateOrProvince": "MA",
                    "Postcode": "02543",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.524349,
                    "Longitude": -70.668498,
                    "ContactTelephone1": "800-663-5633",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MO: Not Specified; TU: Not Specified; WE: Not Specified; TH: Not Specified; FR: Not Specified; SA: Not Specified; SU: Not Specified",
                    "RelatedURL": "http://www.semacharge.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72484,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57379,
                "UUID": "FCA4FF18-FE04-41E5-ADE6-5224510D21AB",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70934",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57725,
                    "Title": "VALENTI MOTORS",
                    "AddressLine1": "600 Straits Turnpike",
                    "AddressLine2": null,
                    "Town": "Watertown",
                    "StateOrProvince": "CT",
                    "Postcode": "06795",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.57525,
                    "Longitude": -73.1005139,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72485,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57380,
                "UUID": "BF2B0EF5-29FC-4B8C-ACC3-31B6FFA3EF8B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70531",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57726,
                    "Title": "Highland Park Market",
                    "AddressLine1": "317 Highland St",
                    "AddressLine2": null,
                    "Town": "Manchester",
                    "StateOrProvince": "CT",
                    "Postcode": "06040",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.7660072,
                    "Longitude": -72.4902715,
                    "ContactTelephone1": "860-646-4277",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72486,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57381,
                "UUID": "6C37426A-5935-4CCB-B751-19F71FFC305E",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71181",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57727,
                    "Title": "College of DuPage",
                    "AddressLine1": "425 Fawell Blvd",
                    "AddressLine2": null,
                    "Town": "Glen Ellyn",
                    "StateOrProvince": "IL",
                    "Postcode": "60317",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.840341,
                    "Longitude": -88.072369,
                    "ContactTelephone1": "630-942-4440",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72487,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57382,
                "UUID": "C8826F41-22E9-49C3-94FF-B48AF1777116",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71155",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57728,
                    "Title": "The Herrington Inn and Spa - Tesla",
                    "AddressLine1": "15 S River Ln",
                    "AddressLine2": null,
                    "Town": "Geneva",
                    "StateOrProvince": "IL",
                    "Postcode": "60134",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.8866912,
                    "Longitude": -88.3034889,
                    "ContactTelephone1": "630-208-7433  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72488,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57383,
                "UUID": "A92E2559-19A1-4BB1-9144-A45283EF4C67",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71154",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57729,
                    "Title": "The Guesthouse Hotel - Tesla",
                    "AddressLine1": "4872 N Clark St",
                    "AddressLine2": null,
                    "Town": "Chicago",
                    "StateOrProvince": "IL",
                    "Postcode": "60640",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.9709481,
                    "Longitude": -87.6679862,
                    "ContactTelephone1": "773-564-9568  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72489,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57384,
                "UUID": "7C3BA34F-C265-44E4-9929-BA9B4749FA77",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71152",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57730,
                    "Title": "Loews - Tesla",
                    "AddressLine1": "5300 N River Rd",
                    "AddressLine2": null,
                    "Town": "Rosemont",
                    "StateOrProvince": "IL",
                    "Postcode": "60018",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 41.9741785,
                    "Longitude": -87.8633316,
                    "ContactTelephone1": "847-544-5300  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72490,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 3,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57385,
                "UUID": "EB588B25-ED10-4B98-A8C1-020742F853AB",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71022",
                "OperatorID": 39,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.semacharge.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 39,
                    "Title": "SemaCharge Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57731,
                    "Title": "Tower Square C",
                    "AddressLine1": "1500 Main ST\n\nParking Level C",
                    "AddressLine2": null,
                    "Town": "Springfield",
                    "StateOrProvince": "MA",
                    "Postcode": "01115",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.102386956217,
                    "Longitude": -72.592183312442,
                    "ContactTelephone1": "800-663-5633",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MO: Not Specified; TU: Not Specified; WE: Not Specified; TH: Not Specified; FR: Not Specified; SA: Not Specified; SU: Not Specified",
                    "RelatedURL": "http://www.semacharge.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72491,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 4,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57386,
                "UUID": "DBA4C5E9-9F09-4705-B76F-71F9D267423D",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71146",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57732,
                    "Title": "Amy Home Services - Tesla",
                    "AddressLine1": "39 N Western Ave",
                    "AddressLine2": null,
                    "Town": "Carpentersville",
                    "StateOrProvince": "IL",
                    "Postcode": "60110",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.1096049,
                    "Longitude": -88.2963137,
                    "ContactTelephone1": "847-742-6523  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72492,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57387,
                "UUID": "CAC5F061-FC8E-4731-BC1F-EF0576F95A69",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71148",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57733,
                    "Title": "Chestnut Mountain Resort - Tesla",
                    "AddressLine1": "8700 Chestnut Mountain Rd",
                    "AddressLine2": null,
                    "Town": "Galena",
                    "StateOrProvince": "IL",
                    "Postcode": "61036",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.3189093,
                    "Longitude": -90.3938998,
                    "ContactTelephone1": "800-397-1320  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72493,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57388,
                "UUID": "53D240CB-5065-4596-978E-C7F2E10417CC",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71150",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57734,
                    "Title": "Goldmoor Inn & Resort - Tesla",
                    "AddressLine1": "90001 N Sand Hill Rd",
                    "AddressLine2": null,
                    "Town": "Galena",
                    "StateOrProvince": "IL",
                    "Postcode": "61036",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.3339007,
                    "Longitude": -90.3965512,
                    "ContactTelephone1": "815-777-3925  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72494,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57389,
                "UUID": "026889EC-C583-4900-82FA-9F2101F4E56D",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70942",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57735,
                    "Title": "PILGRIM PARKING",
                    "AddressLine1": "99 Kneeland Street",
                    "AddressLine2": null,
                    "Town": "Boston",
                    "StateOrProvince": "MA",
                    "Postcode": "02111",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.3500878,
                    "Longitude": -71.0601936,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72495,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57390,
                "UUID": "C944A812-9AE4-4355-91C3-053DC8D25A31",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71168",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57736,
                    "Title": "MFR AIRPORT",
                    "AddressLine1": "1000 Terminal Loop Parkway",
                    "AddressLine2": null,
                    "Town": "Medford",
                    "StateOrProvince": "OR",
                    "Postcode": "97504",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.3691114,
                    "Longitude": -122.8764881,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72496,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57391,
                "UUID": "3AEB53C6-0027-4DCA-80CC-C7DD1811A843",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71027",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57737,
                    "Title": "MONOGRAM RES",
                    "AddressLine1": "22 Water St",
                    "AddressLine2": null,
                    "Town": "Cambridge",
                    "StateOrProvince": "MA",
                    "Postcode": "02141",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.3725774,
                    "Longitude": -71.0778735,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72497,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 4,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57392,
                "UUID": "61977BBE-E4BA-4139-A7C0-3FF5C94D9101",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70936",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57738,
                    "Title": "FLYNN VW",
                    "AddressLine1": "600 Merrill Rd",
                    "AddressLine2": null,
                    "Town": "Pittsfield",
                    "StateOrProvince": "MA",
                    "Postcode": "01201",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.4641667,
                    "Longitude": -73.2058333,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72498,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57393,
                "UUID": "68FC356F-6088-42E9-AA35-446868301E81",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71024",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57739,
                    "Title": "SUNY ONEONTA",
                    "AddressLine1": "24-26 Ravine Pkwy N",
                    "AddressLine2": null,
                    "Town": "Oneonta",
                    "StateOrProvince": "NY",
                    "Postcode": "13820",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.4689577,
                    "Longitude": -75.0658663,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72499,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57394,
                "UUID": "8D31DC87-58A1-41E0-9493-2E02472F18A1",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71071",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57740,
                    "Title": "Residence Inn East Lansing",
                    "AddressLine1": "2841 Hannah Blvd",
                    "AddressLine2": null,
                    "Town": "East Lansing",
                    "StateOrProvince": "MI",
                    "Postcode": "48823",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.718325,
                    "Longitude": -84.456427,
                    "ContactTelephone1": "517-657-2875",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72500,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57395,
                "UUID": "F5B14BDB-BD1D-4247-A048-BA89EB7928B4",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70941",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57741,
                    "Title": "FEST FOODS",
                    "AddressLine1": "2233 Humes RD",
                    "AddressLine2": null,
                    "Town": "Janesville",
                    "StateOrProvince": "WI",
                    "Postcode": "53545",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.7208275,
                    "Longitude": -88.9937034,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72501,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57396,
                "UUID": "B224F2BA-73D1-4C09-9916-19C2EC73C206",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71293",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57742,
                    "Title": "2894 on Main Cafe - Tesla",
                    "AddressLine1": "2894 Main St",
                    "AddressLine2": null,
                    "Town": "East Troy",
                    "StateOrProvince": "WI",
                    "Postcode": "53120",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.7857538,
                    "Longitude": -88.4057449,
                    "ContactTelephone1": "262-642-9600  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72502,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57397,
                "UUID": "22F9A568-AF69-466C-8886-72EFDC49C78F",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71351",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57743,
                    "Title": "STATE & HARRIS",
                    "AddressLine1": "98 State St",
                    "AddressLine2": null,
                    "Town": "Newburyport",
                    "StateOrProvince": "MA",
                    "Postcode": "01950",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.8082624,
                    "Longitude": -70.8713921,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72503,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57398,
                "UUID": "DA22F611-A516-4011-9109-3B8F8665CB38",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70935",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57744,
                    "Title": "SCHENECTADY",
                    "AddressLine1": "17 Broadway",
                    "AddressLine2": null,
                    "Town": "Schenectady",
                    "StateOrProvince": "NY",
                    "Postcode": "12305",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 42.8154058,
                    "Longitude": -73.9407109,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72504,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57399,
                "UUID": "A1474050-7602-4782-8846-161FFCACD076",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71074",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57745,
                    "Title": "Stratham Mitsubishi",
                    "AddressLine1": "50 Portsmouth Ave",
                    "AddressLine2": null,
                    "Town": "Stratham",
                    "StateOrProvince": "NH",
                    "Postcode": "03885",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.004063,
                    "Longitude": -70.9187416,
                    "ContactTelephone1": "603-772-9378",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Dealership business hours",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72505,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57400,
                "UUID": "9E7B085C-93D4-4369-8AC4-D01B8A463AFD",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71303",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57746,
                    "Title": "Hilton Milwaukee City Center - Tesla",
                    "AddressLine1": "509 W Wisconsin Ave",
                    "AddressLine2": null,
                    "Town": "Milwaukee",
                    "StateOrProvince": "WI",
                    "Postcode": "53203",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.0383781,
                    "Longitude": -87.9178448,
                    "ContactTelephone1": "414-271-7250  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72506,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57401,
                "UUID": "B981872C-647C-4433-8321-A56D26CB02C0",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71310",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57747,
                    "Title": "The Pfister Hotel - Tesla",
                    "AddressLine1": "424 E Wisconsin Ave",
                    "AddressLine2": null,
                    "Town": "Milwaukee",
                    "StateOrProvince": "WI",
                    "Postcode": "53202",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.03936,
                    "Longitude": -87.905682,
                    "ContactTelephone1": "414-273-8222  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72507,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 3,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57402,
                "UUID": "A77B7355-068C-4FE4-87FC-DC761831907C",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71305",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57748,
                    "Title": "InterContinental Milwaukee - Tesla",
                    "AddressLine1": "139 E Kilbourn Ave",
                    "AddressLine2": null,
                    "Town": "Milwaukee",
                    "StateOrProvince": "WI",
                    "Postcode": "53202",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.0419025,
                    "Longitude": -87.9108266,
                    "ContactTelephone1": "414-276-8686  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72508,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57403,
                "UUID": "2C78D2DB-7C82-4F71-B73A-78954AAA8194",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71302",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57749,
                    "Title": "Hilton Madison Monona Terrace",
                    "AddressLine1": "9 E Wilson St",
                    "AddressLine2": null,
                    "Town": "Madison",
                    "StateOrProvince": "WI",
                    "Postcode": "53703",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.0727965,
                    "Longitude": -89.380426,
                    "ContactTelephone1": "608-255-5100  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for guest use only; see valet for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72509,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 3,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57404,
                "UUID": "DC710F1C-01E6-48B5-9F01-108A320D80BE",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "62991",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57750,
                    "Title": "UW",
                    "AddressLine1": "975 University Ave",
                    "AddressLine2": null,
                    "Town": "Madison",
                    "StateOrProvince": "WI",
                    "Postcode": "53706",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.0728483,
                    "Longitude": -89.4019744,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72510,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57405,
                "UUID": "832110A0-1C71-48FF-AAA4-1A6773318D25",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71103",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57751,
                    "Title": "BASIL VW",
                    "AddressLine1": "6179 S Transit Rd",
                    "AddressLine2": null,
                    "Town": "Lockport",
                    "StateOrProvince": "NY",
                    "Postcode": "14094",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.122587,
                    "Longitude": -78.695547,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72511,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57406,
                "UUID": "FB7ABDB8-7DE2-486E-91E1-218800AA3DBD",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71157",
                "OperatorID": 39,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.semacharge.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 39,
                    "Title": "SemaCharge Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57752,
                    "Title": "Zoey's Double Hex Restaurant",
                    "AddressLine1": "1614 Depot Street",
                    "AddressLine2": null,
                    "Town": "Manchester",
                    "StateOrProvince": "VT",
                    "Postcode": "05255",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.173882,
                    "Longitude": -73.0282218,
                    "ContactTelephone1": "800-663-5633",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MO: Not Specified; TU: Not Specified; WE: Not Specified; TH: Not Specified; FR: Not Specified; SA: Not Specified; SU: Not Specified",
                    "RelatedURL": "http://www.semacharge.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72512,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 6,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57407,
                "UUID": "37CA6D46-75CB-4610-BEA5-A4089714052B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71311",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57753,
                    "Title": "Washington House Inn",
                    "AddressLine1": "W62 N573 Washington Ave",
                    "AddressLine2": null,
                    "Town": "Cedarburg",
                    "StateOrProvince": "WI",
                    "Postcode": "53012",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.2965002,
                    "Longitude": -87.9877665,
                    "ContactTelephone1": "262-375-3550  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72513,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57408,
                "UUID": "5767DB6D-9FDE-4C53-9046-E2B3B009FD09",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71301",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57754,
                    "Title": "Hidden Serenity Bed and Breakfast - Tesla",
                    "AddressLine1": "1876 Shalom Dr",
                    "AddressLine2": null,
                    "Town": "West Bend",
                    "StateOrProvince": "WI",
                    "Postcode": "53090",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.486082,
                    "Longitude": -88.129818,
                    "ContactTelephone1": "262-623-0148  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72514,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57409,
                "UUID": "B3CF1021-D593-4E61-93E5-FAC6CC36B3E5",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71309",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57755,
                    "Title": "The Audubon Inn and NOLA North Grille",
                    "AddressLine1": "45 N Main St",
                    "AddressLine2": null,
                    "Town": "Mayville",
                    "StateOrProvince": "WI",
                    "Postcode": "53050",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.496558,
                    "Longitude": -88.544893,
                    "ContactTelephone1": "920-387-5858  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72515,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 3,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57410,
                "UUID": "39E2C753-DD61-4966-A4F2-4511624F14FC",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71206",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57756,
                    "Title": "Town of Fair Haven VT",
                    "AddressLine1": "South Park Place",
                    "AddressLine2": null,
                    "Town": "Fair Haven",
                    "StateOrProvince": "VT",
                    "Postcode": "05743",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.5928764343262,
                    "Longitude": -73.2665023803711,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72516,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57411,
                "UUID": "33E38620-5719-43B7-8E52-30C426BE8F50",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71297",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57757,
                    "Title": "Cedar Lodge and Settlement - Tesla",
                    "AddressLine1": "E11232 Hillside Dr",
                    "AddressLine2": null,
                    "Town": "Wisconsin Dells",
                    "StateOrProvince": "WI",
                    "Postcode": "53965",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.6020961,
                    "Longitude": -89.7603096,
                    "ContactTelephone1": "608-253-6080  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72517,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57412,
                "UUID": "71690DA2-1DA9-4B8D-8149-75B0403A7099",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71308",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57758,
                    "Title": "Sandrift Resort - Tesla",
                    "AddressLine1": "1080 E Hiawatha Dr",
                    "AddressLine2": null,
                    "Town": "Wisconsin Dells",
                    "StateOrProvince": "WI",
                    "Postcode": "53965",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.607312,
                    "Longitude": -89.782515,
                    "ContactTelephone1": "608-253-4411  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72518,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57413,
                "UUID": "5ADFED76-6C37-4615-9A88-456559D6B2DD",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71295",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57759,
                    "Title": "Best Western Ambassador Inn and Suites - Tesla",
                    "AddressLine1": "610 Frontage Rd",
                    "AddressLine2": null,
                    "Town": "Wisconsin Dells",
                    "StateOrProvince": "WI",
                    "Postcode": "53935",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.6221114,
                    "Longitude": -89.7950775,
                    "ContactTelephone1": "608-254-4477  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72519,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57336,
                "UUID": "B054E48F-BBE6-4B8B-844A-AFAEB4E53C46",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71209",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57682,
                    "Title": "551 King Ave",
                    "AddressLine1": "551 King Ave",
                    "AddressLine2": null,
                    "Town": "Indianapolis",
                    "StateOrProvince": "IN",
                    "Postcode": "46222",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 39.7756004333496,
                    "Longitude": -86.2034301757812,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72438,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57414,
                "UUID": "D09BDA8B-B4BF-4AB2-A871-D813B9F85FC2",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "65443",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57760,
                    "Title": "City of South Portland - Planning & Development",
                    "AddressLine1": "496 Ocean St",
                    "AddressLine2": null,
                    "Town": "South Portland",
                    "StateOrProvince": "ME",
                    "Postcode": "04106",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.6252009,
                    "Longitude": -70.2500397,
                    "ContactTelephone1": "207-767-7602",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72520,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57415,
                "UUID": "02662D2F-4AC8-4A47-833E-902EED2D3C5D",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "69093",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57761,
                    "Title": "Spring Street Parking Garage",
                    "AddressLine1": "45 Spring St",
                    "AddressLine2": null,
                    "Town": "Portland",
                    "StateOrProvince": "ME",
                    "Postcode": "04101",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.6546995,
                    "Longitude": -70.2597204,
                    "ContactTelephone1": "207-874-2842",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Garage business hours",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72521,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57416,
                "UUID": "17D1F29A-5EBB-4CEF-AEB6-AC585F75CDA2",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "69094",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57762,
                    "Title": "Temple Street Parking Garage",
                    "AddressLine1": "11 Temple St",
                    "AddressLine2": null,
                    "Town": "Portland",
                    "StateOrProvince": "ME",
                    "Postcode": "04101",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.6577123,
                    "Longitude": -70.256167,
                    "ContactTelephone1": "207-772-5762",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Garage business hours",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72522,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57417,
                "UUID": "B090E4E6-3D44-45C4-A9E2-C4A2B8B734A9",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71300",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57763,
                    "Title": "Heidel House Resort and Spa - Tesla",
                    "AddressLine1": "643 Illinois Ave",
                    "AddressLine2": null,
                    "Town": "Green Lake",
                    "StateOrProvince": "WI",
                    "Postcode": "54941",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.8354906,
                    "Longitude": -88.9479217,
                    "ContactTelephone1": "800-444-2812  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72523,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57418,
                "UUID": "EDAC3162-7045-460F-B99B-ADCF8F1663CB",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "69096",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57764,
                    "Title": "Raymond Town Hall",
                    "AddressLine1": "401 Webbs Mills Rd",
                    "AddressLine2": null,
                    "Town": "Raymond",
                    "StateOrProvince": "ME",
                    "Postcode": "04071",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 43.935164,
                    "Longitude": -70.44159,
                    "ContactTelephone1": "207-655-4742",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72524,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57419,
                "UUID": "06D6DFFA-69EA-4771-B290-341CB2A7D33D",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71077",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57765,
                    "Title": "Weather Discovery Center",
                    "AddressLine1": "2779 White Mountain Hwy",
                    "AddressLine2": null,
                    "Town": "North Conway",
                    "StateOrProvince": "NH",
                    "Postcode": "03860",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.0553684,
                    "Longitude": -71.1291899,
                    "ContactTelephone1": "603-356-2137",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72525,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57420,
                "UUID": "A867675D-BD95-4A12-A2AB-E89E077124A9",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71043",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57766,
                    "Title": "CABOT CREAMERY",
                    "AddressLine1": "Home Farm Way",
                    "AddressLine2": null,
                    "Town": "Waitsfield",
                    "StateOrProvince": "VT",
                    "Postcode": "05673",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.2268982,
                    "Longitude": -72.7899047,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72526,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57421,
                "UUID": "F5F8E5D6-E45B-43BF-A9B6-EC6C91AC6A15",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71044",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57767,
                    "Title": "HARWOOD SCHOOL",
                    "AddressLine1": "458 VT-100",
                    "AddressLine2": null,
                    "Town": "Moretown",
                    "StateOrProvince": "VT",
                    "Postcode": "05660",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.25396,
                    "Longitude": -72.78688,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72527,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57422,
                "UUID": "0D7C5BE6-9CF5-4FFE-B22C-C188E1E733FE",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71041",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57768,
                    "Title": "EAST MONTPELIER",
                    "AddressLine1": "US Route 2 park&ride;",
                    "AddressLine2": null,
                    "Town": "Montpelier",
                    "StateOrProvince": "VT",
                    "Postcode": "05660",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.27197,
                    "Longitude": -72.48559,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72528,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57423,
                "UUID": "0DC9E520-C541-4A8D-B7C7-4624AA4CD61B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71042",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57769,
                    "Title": "EXIT 9",
                    "AddressLine1": "Route 2",
                    "AddressLine2": null,
                    "Town": "Middlesex",
                    "StateOrProvince": "VT",
                    "Postcode": "05602",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.2975,
                    "Longitude": -72.68698,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72529,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57424,
                "UUID": "F7C0D477-4E75-4497-96D9-2CC9F16D443B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71045",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57770,
                    "Title": "RUMNEY SCHOOL",
                    "AddressLine1": "433 Shady Rill Rd",
                    "AddressLine2": null,
                    "Town": "Middlesex",
                    "StateOrProvince": "VT",
                    "Postcode": "05602",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.351158,
                    "Longitude": -72.602592,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72530,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57425,
                "UUID": "7F76CD14-468C-4550-96D5-50B19F1B4421",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71211",
                "OperatorID": 15,
                "OperatorInfo": {
                    "WebsiteURL": "https://www.evgonetwork.com/",
                    "Comments": "Imported by ADFC import",
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 15,
                    "Title": "eVgo Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57771,
                    "Title": "GMP, Vermont Teddy Bear, Shelburne, VT",
                    "AddressLine1": "6655 Shelburne Rd",
                    "AddressLine2": null,
                    "Town": "Shelburne",
                    "StateOrProvince": "VT",
                    "Postcode": "05482",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.3613128662109,
                    "Longitude": -73.2300109863281,
                    "ContactTelephone1": "877-455-3833",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; EVgo network subscription and key fob required",
                    "RelatedURL": "https://www.evgonetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72531,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57426,
                "UUID": "7938297E-6243-4233-9AA0-EFB3AB0D593B",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70948",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57772,
                    "Title": "Heritage Toyota",
                    "AddressLine1": "1620 Shelburne Rd",
                    "AddressLine2": null,
                    "Town": "South Burlington",
                    "StateOrProvince": "VT",
                    "Postcode": "05403",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.428788,
                    "Longitude": -73.210218,
                    "ContactTelephone1": "802-865-8200",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72532,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57427,
                "UUID": "6BA38430-5DC1-46F8-B27D-09B3DD901CA1",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71294",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57773,
                    "Title": "Aloft Hotel - Tesla",
                    "AddressLine1": "465 Pilgrim Way",
                    "AddressLine2": null,
                    "Town": "Green Bay",
                    "StateOrProvince": "WI",
                    "Postcode": "54304",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.4782902,
                    "Longitude": -88.0525458,
                    "ContactTelephone1": "920-593-6002  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72533,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57428,
                "UUID": "88DF19F3-D223-4ACF-AACC-ABC371C30D69",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70949",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57774,
                    "Title": "University of Vermont Medical Center - Fanny Allen Campus",
                    "AddressLine1": "802 College Pkwy",
                    "AddressLine2": null,
                    "Town": "Colchester",
                    "StateOrProvince": "VT",
                    "Postcode": "05446",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.4968,
                    "Longitude": -73.155889,
                    "ContactTelephone1": "802-847-6441",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for employee and visitor use only",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72534,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57429,
                "UUID": "E0A072E3-05AE-4F77-A307-0D1CE81444FD",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71307",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57775,
                    "Title": "Midwest Renewable Energy Association - Tesla",
                    "AddressLine1": "7558 Deer Rd",
                    "AddressLine2": null,
                    "Town": "Custer",
                    "StateOrProvince": "WI",
                    "Postcode": "54423",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.5098,
                    "Longitude": -89.4071,
                    "ContactTelephone1": "715-592-6595  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72535,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57430,
                "UUID": "DEB230D8-BD4E-476E-A7A2-48397CE90D28",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71304",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57776,
                    "Title": "Hotel Marshfield - Tesla",
                    "AddressLine1": "2700 S Central Ave",
                    "AddressLine2": null,
                    "Town": "Marshfield",
                    "StateOrProvince": "WI",
                    "Postcode": "54449",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.6435465,
                    "Longitude": -90.1807406,
                    "ContactTelephone1": "715-387 2700  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72536,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57431,
                "UUID": "1D44FCED-35B4-4D41-B629-5BA0FADAA827",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71298",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57777,
                    "Title": "Courtyard Wausau - Tesla",
                    "AddressLine1": "1000 S 22nd Ave",
                    "AddressLine2": null,
                    "Town": "Wausau",
                    "StateOrProvince": "WI",
                    "Postcode": "54401",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 44.95031,
                    "Longitude": -89.664981,
                    "ContactTelephone1": "715-849-2124  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72537,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57432,
                "UUID": "73A2D85A-FDBC-4B8E-9303-47CD2BF36E7F",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71296",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57778,
                    "Title": "Blacksmith Inn on the Shore",
                    "AddressLine1": "8152 Highway 57",
                    "AddressLine2": null,
                    "Town": "Baileys Harbor",
                    "StateOrProvince": "WI",
                    "Postcode": "54202",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 45.0667177,
                    "Longitude": -87.1239315,
                    "ContactTelephone1": "800-769-8619  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72538,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57433,
                "UUID": "AB9725AE-1DAE-4F77-AD9E-3D47131F208C",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "69732",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57779,
                    "Title": "Laurel Ridge Winery",
                    "AddressLine1": "13301 NE Kuelene Rd",
                    "AddressLine2": null,
                    "Town": "Carlton",
                    "StateOrProvince": "OR",
                    "Postcode": "97111",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 45.3130517,
                    "Longitude": -123.093042,
                    "ContactTelephone1": "503-852-7050",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "11am-5pm daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72539,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57434,
                "UUID": "A14FB53F-3D33-4782-966A-A22DED196389",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71306",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 7,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": false,
                    "IsAccessKeyRequired": false,
                    "ID": 7,
                    "Title": "Public - Notice Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57780,
                    "Title": "Kevin's Auto",
                    "AddressLine1": "301 Traffic Ave N",
                    "AddressLine2": null,
                    "Town": "Frederic",
                    "StateOrProvince": "WI",
                    "Postcode": "54837",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 45.6613563,
                    "Longitude": -92.4685792,
                    "ContactTelephone1": "715-327-4900  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "Business hours",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72540,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57435,
                "UUID": "9BF7EA28-A03B-44E7-BF05-440508252982",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71076",
                "OperatorID": null,
                "OperatorInfo": null,
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57781,
                    "Title": "Greenbridge",
                    "AddressLine1": "9828 7th Ave SW",
                    "AddressLine2": null,
                    "Town": "Seattle",
                    "StateOrProvince": "WA",
                    "Postcode": "98106",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 47.5153914,
                    "Longitude": -122.3441352,
                    "ContactTelephone1": "206-574-1100",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72541,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57436,
                "UUID": "9BBCCCBC-10E4-40AF-BE60-A8E50B044731",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71159",
                "OperatorID": 39,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.semacharge.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 39,
                    "Title": "SemaCharge Network"
                },
                "OperatorsReference": null,
                "UsageTypeID": 4,
                "UsageType": {
                    "IsPayAtLocation": false,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": true,
                    "ID": 4,
                    "Title": "Public - Membership Required"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57782,
                    "Title": "Walgreens - Bainbridge Island, WA #15673",
                    "AddressLine1": "700 - 1802 High School Rd",
                    "AddressLine2": null,
                    "Town": "Bainbridge Island",
                    "StateOrProvince": "WA",
                    "Postcode": "98110",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 47.6357914,
                    "Longitude": -122.5148321,
                    "ContactTelephone1": "800-663-5633",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MO: 12:00am-12:00am; TU: 12:00am-12:00am; WE: 12:00am-12:00am; TH: 12:00am-12:00am; FR: 12:00am-12:00am; SA: 12:00am-12:00am; SU: 12:00am-12:00am",
                    "RelatedURL": "http://www.semacharge.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72542,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 2,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57338,
                "UUID": "63850F4C-9545-432E-9169-98ACD27391C0",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "70972",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57684,
                    "Title": "PPA AIRPORT EV",
                    "AddressLine1": "1 Arrivals Rd",
                    "AddressLine2": null,
                    "Town": "Philadelphia",
                    "StateOrProvince": "PA",
                    "Postcode": "19153",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 39.8778654,
                    "Longitude": -75.2445431,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72440,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 8,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57341,
                "UUID": "59366765-1A24-430C-ADF5-951C9F8747FF",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71014",
                "OperatorID": 9,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.blinknetwork.com/",
                    "Comments": "Membership based charging network, part of Car Charging Group, inc.",
                    "PhonePrimaryContact": "888.998.BLINK (2546)",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": "https://prod.blinknetwork.com/membership.html",
                    "ContactEmail": "support@blinknetwork.com",
                    "FaultReportEmail": "support@blinknetwork.com",
                    "IsRestrictedEdit": false,
                    "ID": 9,
                    "Title": "Blink Network/ECOtality"
                },
                "OperatorsReference": null,
                "UsageTypeID": 2,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": true,
                    "IsAccessKeyRequired": null,
                    "ID": 2,
                    "Title": "Private - Restricted Access"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57687,
                    "Title": "Lankenau Medical Center Parking Garage A",
                    "AddressLine1": "100 East Lancaster Avenue",
                    "AddressLine2": null,
                    "Town": "Wynnewood",
                    "StateOrProvince": "PA",
                    "Postcode": "19096",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 39.993309,
                    "Longitude": -75.265914,
                    "ContactTelephone1": "888-998-2546",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "MON: 24 hours | TUE: 24 hours | WED: 24 hours | THU: 24 hours | FRI: 24 hours | SAT: 24 hours | SUN: 24 hours",
                    "RelatedURL": "http://www.blinknetwork.com/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72443,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57339,
                "UUID": "DC91A02A-9599-4C16-B32B-7885B9CE5A0D",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71420",
                "OperatorID": 5,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.chargepoint.net/",
                    "Comments": null,
                    "PhonePrimaryContact": "1-888-758-4389",
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "support@coulombtech.com",
                    "FaultReportEmail": "support@coulombtech.com",
                    "IsRestrictedEdit": null,
                    "ID": 5,
                    "Title": "ChargePoint (Coulomb Technologies)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57685,
                    "Title": "PPA AIRPORT EV",
                    "AddressLine1": "4400 Island Ave",
                    "AddressLine2": null,
                    "Town": "Philadelphia",
                    "StateOrProvince": "PA",
                    "Postcode": "19153",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 39.8891434,
                    "Longitude": -75.2334974,
                    "ContactTelephone1": "888-758-4389",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily",
                    "RelatedURL": "http://www.mychargepoint.net/",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72441,
                        "ConnectionTypeID": 1,
                        "ConnectionType": {
                            "FormalName": "SAE J1772-2009",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 1,
                            "Title": "J1772"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 4,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            },
            {
                "ID": 57343,
                "UUID": "FB605AD7-2763-4EB5-810A-7CF8EF3B30E4",
                "ParentChargePointID": null,
                "DataProviderID": 2,
                "DataProvider": {
                    "WebsiteURL": "http://www.afdc.energy.gov/",
                    "Comments": null,
                    "DataProviderStatusType": {
                        "IsProviderEnabled": true,
                        "ID": 20,
                        "Title": "Automated Import"
                    },
                    "IsRestrictedEdit": false,
                    "IsOpenDataLicensed": true,
                    "IsApprovedImport": true,
                    "License": "This data is provided by the National Renewable Energy Laboratory (\"NREL\"), which is operated by the Alliance for Sustainable Energy, LLC (\"Alliance\"), for the U.S. Department of Energy (\"DOE\"), and may be used for any purpose whatsoever.",
                    "DateLastImported": "2015-11-30T11:50:13.91Z",
                    "ID": 2,
                    "Title": "afdc.energy.gov"
                },
                "DataProvidersReference": "71343",
                "OperatorID": 23,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.teslamotors.com",
                    "Comments": null,
                    "PhonePrimaryContact": null,
                    "PhoneSecondaryContact": null,
                    "IsPrivateIndividual": null,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": null,
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": null,
                    "ID": 23,
                    "Title": "Tesla Motors (Worldwide)"
                },
                "OperatorsReference": null,
                "UsageTypeID": 1,
                "UsageType": {
                    "IsPayAtLocation": null,
                    "IsMembershipRequired": null,
                    "IsAccessKeyRequired": null,
                    "ID": 1,
                    "Title": "Public"
                },
                "UsageCost": null,
                "AddressInfo": {
                    "ID": 57689,
                    "Title": "Provo Marriott Hotel and Conference Center - Tesla",
                    "AddressLine1": "101 W 100 N",
                    "AddressLine2": null,
                    "Town": "Provo",
                    "StateOrProvince": "UT",
                    "Postcode": "84601",
                    "CountryID": 2,
                    "Country": {
                        "ISOCode": "US",
                        "ContinentCode": "NA",
                        "ID": 2,
                        "Title": "United States"
                    },
                    "Latitude": 40.2347017,
                    "Longitude": -111.6611239,
                    "ContactTelephone1": "801-377-4700  877-798-3752",
                    "ContactTelephone2": null,
                    "ContactEmail": null,
                    "AccessComments": "24 hours daily; for Tesla use only; for guest use only; see front desk for access",
                    "RelatedURL": "http://www.teslamotors.com/supercharger",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": null,
                "GeneralComments": null,
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": null,
                "StatusType": null,
                "DateLastStatusUpdate": "2015-11-30T11:50:00Z",
                "DataQualityLevel": 3,
                "DateCreated": "2015-11-30T11:50:00Z",
                "SubmissionStatusTypeID": 100,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 100,
                    "Title": "Imported and Published"
                },
                "UserComments": null,
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 72445,
                        "ConnectionTypeID": 0,
                        "ConnectionType": {
                            "FormalName": "Not Specified",
                            "IsDiscontinued": null,
                            "IsObsolete": null,
                            "ID": 0,
                            "Title": "Unknown"
                        },
                        "Reference": null,
                        "StatusTypeID": null,
                        "StatusType": null,
                        "LevelID": 2,
                        "Level": {
                            "Comments": "Over 2 kW, usually non-domestic socket type",
                            "IsFastChargeCapable": false,
                            "ID": 2,
                            "Title": "Level 2 : Medium (Over 2kW)"
                        },
                        "Amps": 16,
                        "Voltage": 230,
                        "PowerKW": 3.0,
                        "CurrentTypeID": 10,
                        "CurrentType": {
                            "Description": "Alternating Current - Single Phase",
                            "ID": 10,
                            "Title": "AC (Single-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    }
                ],
                "MediaItems": null,
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-11-30T11:50:00Z"
            }
        ];


    }
}