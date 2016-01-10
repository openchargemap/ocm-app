/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {APIClient} from './APIClient';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Events} from 'ionic-framework/ionic';

export class POISearchParams {
    constructor() { }
    public countryCode: string = null;
    public latitude: number = null;
    public longitude: number = null;
    public locationTitle: string = null;
    public distance: number = null;
    public distanceUnit: string = null;
    public connectionTypeID: number = null;
    public operatorID: number = null;
    public levelID: number = null;
    public countryID: number = null;
    public usageTypeID: number = null;
    public statusTypeID: number = null;
    public minPowerKW: number = null;

    public submissionStatusTypeID: number = null;

    public maxResults: number = 1000;
    public additionalParams: string = null;
    public includeComments: boolean = false;
    public compact: boolean = true;
    public enableCaching: boolean = true; //FIXME: need way for user to override cached data
    public levelOfDetail: number = 1; //if supplied, will return a random sample of matching results, higher number return less results
    public polyline: string = null; //(lat,lng),(lat,lng),(lat,lng),(lat,lng) or encoded polyline
    public boundingbox: string = null;//(lat,lng),(lat,lng),(lat,lng),(lat,lng)
}

export interface ConnectionInfo {
    ID: number;
    Reference: string;
    ConnectionType: any;
    StatusType: any;
    Level: any;
    CurrentType: any;
    Amps: number;
    Voltage: number;
    PowerKW: number;
    Quantity: number;
    Comments?: string;
};

@Injectable()

export class POIManager {
    poiList: any;
    http: Http;
    api: APIClient;
    events: Events;

    constructor(http: Http, events: Events, api: APIClient) {
        this.http = http;
        this.api = api;
        this.events = events;

        //this.populateTestData();

    }

    fetchCoreReferenceData() {
        return this.api.fetchCoreReferenceData(null);

    }
    fetchPOIList(searchParams: POISearchParams) {


        var r = this.api.fetchPOIListByParam(searchParams).then((results) => {

            this.poiList = results;

            console.log("ocm:poiList:updated");
            this.events.publish('ocm:poiList:updated');
        });
        
        
        /*.then(
            // Log the fulfillment value
            function(val) {
                console.log(val);
               
            })
            .catch(
            // Log the rejection reason
            function(reason) {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
            */
    }

    populateTestData() {
        this.poiList = [
            {
                "ID": 52224,
                "UUID": "2980B2C2-BC72-4643-9433-1D3A37D227F6",
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
                "OperatorID": 216,
                "OperatorInfo": {
                    "WebsiteURL": "http://www.enspirion.pl/?page_id=728",
                    "Comments": null,
                    "PhonePrimaryContact": "+48 58 888 88 00",
                    "PhoneSecondaryContact": "+48 785 888 805",
                    "IsPrivateIndividual": false,
                    "AddressInfo": null,
                    "BookingURL": null,
                    "ContactEmail": "biuro@enspirion.pl",
                    "FaultReportEmail": null,
                    "IsRestrictedEdit": false,
                    "ID": 216,
                    "Title": "Enspirion"
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
                    "ID": 52570,
                    "Title": "Urząd Miasta Gdańsk",
                    "AddressLine1": "Nowe Ogrody 7",
                    "AddressLine2": null,
                    "Town": "Gdańsk",
                    "StateOrProvince": "pomorskie",
                    "Postcode": "80-802",
                    "CountryID": 179,
                    "Country": {
                        "ISOCode": "PL",
                        "ContinentCode": "EU",
                        "ID": 179,
                        "Title": "Poland"
                    },
                    "Latitude": 54.351450063074,
                    "Longitude": 18.6400079793152,
                    "ContactTelephone1": "+48 58 888 88 00",
                    "ContactTelephone2": "+48 785 888 805",
                    "ContactEmail": "biuro@enspirion.pl",
                    "AccessComments": "Gratis, Free charge, Free parking.",
                    "RelatedURL": "http://www.enspirion.pl/?page_id=728",
                    "Distance": null,
                    "DistanceUnit": 0
                },
                "NumberOfPoints": 1,
                "GeneralComments": "With cables, operator - Enspirion",
                "DatePlanned": null,
                "DateLastConfirmed": null,
                "StatusTypeID": 50,
                "StatusType": {
                    "IsOperational": true,
                    "IsUserSelectable": true,
                    "ID": 50,
                    "Title": "Operational"
                },
                "DateLastStatusUpdate": "2015-12-25T15:46:00Z",
                "DataQualityLevel": 1,
                "DateCreated": "2015-08-24T19:28:00Z",
                "SubmissionStatusTypeID": 200,
                "SubmissionStatus": {
                    "IsLive": true,
                    "ID": 200,
                    "Title": "Submission Published"
                },
                "UserComments": [
                    {
                        "ID": 8305,
                        "ChargePointID": 52224,
                        "CommentTypeID": 10,
                        "CommentType": {
                            "ID": 10,
                            "Title": "General Comment"
                        },
                        "UserName": "PatrykS",
                        "Comment": "2015-12-25 10:30 Successfully charged Opel Ampera with J1772 cable.",
                        "Rating": 5,
                        "RelatedURL": null,
                        "DateCreated": "2015-12-25T15:46:03.333Z",
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "CheckinStatusTypeID": 10,
                        "CheckinStatusType": {
                            "IsPositive": true,
                            "IsAutomatedCheckin": false,
                            "ID": 10,
                            "Title": "Charged Successfully"
                        }
                    },
                    {
                        "ID": 8280,
                        "ChargePointID": 52224,
                        "CommentTypeID": 10,
                        "CommentType": {
                            "ID": 10,
                            "Title": "General Comment"
                        },
                        "UserName": "PatrykS",
                        "Comment": "Successfully charged Opel Ampera with J1772 cable. This time Enspirion card was needed.",
                        "Rating": 5,
                        "RelatedURL": null,
                        "DateCreated": "2015-12-21T18:59:39.323Z",
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "CheckinStatusTypeID": 10,
                        "CheckinStatusType": {
                            "IsPositive": true,
                            "IsAutomatedCheckin": false,
                            "ID": 10,
                            "Title": "Charged Successfully"
                        }
                    },
                    {
                        "ID": 8123,
                        "ChargePointID": 52224,
                        "CommentTypeID": 10,
                        "CommentType": {
                            "ID": 10,
                            "Title": "General Comment"
                        },
                        "UserName": "PatrykS",
                        "Comment": "Mitsubishi Outlander PHEV was charging - so I saw occupied charging spot in GdaÅ„sk for the first time :-)",
                        "Rating": null,
                        "RelatedURL": null,
                        "DateCreated": "2015-12-02T10:08:14.25Z",
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "CheckinStatusTypeID": 100,
                        "CheckinStatusType": {
                            "IsPositive": true,
                            "IsAutomatedCheckin": false,
                            "ID": 100,
                            "Title": "Charging Spot In Use (Other EV Parked)"
                        }
                    },
                    {
                        "ID": 6609,
                        "ChargePointID": 52224,
                        "CommentTypeID": 10,
                        "CommentType": {
                            "ID": 10,
                            "Title": "General Comment"
                        },
                        "UserName": "PatrykS",
                        "Comment": "Successfully charged Opel Ampera using Mode 3 Type 1 SAE J1772-2009 cable/connector (32A, 240V AC, 1 phase, 7.4kW)",
                        "Rating": 5,
                        "RelatedURL": null,
                        "DateCreated": "2015-09-27T21:29:55.907Z",
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "CheckinStatusTypeID": 10,
                        "CheckinStatusType": {
                            "IsPositive": true,
                            "IsAutomatedCheckin": false,
                            "ID": 10,
                            "Title": "Charged Successfully"
                        }
                    }
                ],
                "PercentageSimilarity": null,
                "Connections": [
                    {
                        "ID": 64851,
                        "ConnectionTypeID": 25,
                        "ConnectionType": {
                            "FormalName": "IEC 62196-2 Type 2",
                            "IsDiscontinued": false,
                            "IsObsolete": false,
                            "ID": 25,
                            "Title": "Mennekes (Type 2)"
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
                        "Voltage": 400,
                        "PowerKW": 22.0,
                        "CurrentTypeID": 20,
                        "CurrentType": {
                            "Description": "Alternating Current - Three Phase",
                            "ID": 20,
                            "Title": "AC (Three-Phase)"
                        },
                        "Quantity": 1,
                        "Comments": null
                    },
                    {
                        "ID": 68385,
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
                        "Voltage": 230,
                        "PowerKW": 7.4,
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
                        "ID": 3289,
                        "ChargePointID": 52224,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.orig.2015092721105431.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.thmb.2015092721105431.jpg",
                        "Comment": "Charging Opel Ampera with 7,2kW cable/plug",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "DateCreated": "2015-09-27T20:11:00Z"
                    },
                    {
                        "ID": 3290,
                        "ChargePointID": 52224,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.orig.2015092722035210.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.thmb.2015092722035210.jpg",
                        "Comment": "Mode 3 Type 1: SAE J1772-2009 cable/connector, 32A, 240V AC, 1 phase, compatible with Opel/Vauxhall Ampera, Chevrolet Volt and Nissan Leaf (between others)",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "DateCreated": "2015-09-27T21:04:00Z"
                    },
                    {
                        "ID": 3291,
                        "ChargePointID": 52224,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.orig.2015092722052285.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.thmb.2015092722052285.jpg",
                        "Comment": "IEC Type 2 \"Mennekes\" cable/connector, 32A, 400V AC, 22kW",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "DateCreated": "2015-09-27T21:06:00Z"
                    },
                    {
                        "ID": 3657,
                        "ChargePointID": 52224,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.orig.2015122515441513.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.thmb.2015122515441513.jpg",
                        "Comment": "",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "DateCreated": "2015-12-25T15:44:00Z"
                    },
                    {
                        "ID": 3658,
                        "ChargePointID": 52224,
                        "ItemURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.orig.2015122515445720.jpg",
                        "ItemThumbnailURL": "https://ocm.blob.core.windows.net/images/PL/OCM52224/OCM-52224.thmb.2015122515445720.jpg",
                        "Comment": "Charging station made by Garo",
                        "IsEnabled": true,
                        "IsVideo": false,
                        "IsFeaturedItem": false,
                        "IsExternalResource": false,
                        "MetadataValue": null,
                        "User": {
                            "ID": 6418,
                            "IdentityProvider": null,
                            "Identifier": null,
                            "CurrentSessionToken": null,
                            "Username": "PatrykS",
                            "Profile": null,
                            "Location": null,
                            "WebsiteURL": null,
                            "ReputationPoints": 90,
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
                        "DateCreated": "2015-12-25T15:45:00Z"
                    }
                ],
                "MetadataValues": null,
                "IsRecentlyVerified": true,
                "DateLastVerified": "2015-12-25T15:46:03.333Z"
            }
        ];
    }
    populateTestData2() {

        this.poiList = [

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