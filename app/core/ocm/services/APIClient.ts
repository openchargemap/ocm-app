/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {POISearchParams} from './POIManager';
import {AsyncResult, SubmissionType} from '../model/AppModels';


@Injectable()
export class APIClient {
    public serviceBaseURL: string = "https://api.openchargemap.io/v3";
    public serviceBaseURL_Standard: string = "https://api.openchargemap.io/v3";
    public serviceBaseURL_Sandbox: string = "https://sandbox.api.openchargemap.io/v2";
    public serviceBaseURL_LocalDev: string = "http://localhost:8080/v3";

    public hasAuthorizationError: boolean = false;

    public ATTRIBUTION_METADATAFIELDID = 4;
    public referenceData: any;
    public authResponse: any;
    public clientName: string = "ocm.api.default";

    public authorizationErrorCallback: any;
    public generalErrorCallback: any;
    public allowMirror: boolean = false;

    http: Http;

    constructor(http: Http) {
        this.http = http;
        this.serviceBaseURL = this.serviceBaseURL_Standard;
        this.loadCachedRefData();
        
    }
    loadCachedRefData(){
        let cachedRefData = localStorage.getItem("referenceData");
        if (cachedRefData!=null){
            this.referenceData=JSON.parse(cachedRefData);
        }
    }
cacheRefData(){
    if (this.referenceData!=null){
        localStorage.setItem("referenceData", JSON.stringify(this.referenceData));
    }
}
    fetchPOIListByParam(params: POISearchParams) {
        var serviceURL = this.serviceBaseURL + "/poi/?client=" + this.clientName + (this.allowMirror ? " &allowmirror=true" : "") + "&verbose=false&output=json";

        var serviceParams = "";
        if (params.countryCode != null) serviceParams += "&countrycode=" + params.countryCode;
        if (params.latitude != null) serviceParams += "&latitude=" + params.latitude;
        if (params.longitude != null) serviceParams += "&longitude=" + params.longitude;
        if (params.distance != null) serviceParams += "&distance=" + params.distance;
        if (params.distanceUnit != null) serviceParams += "&distanceunit=" + params.distanceUnit;
        if (params.includeComments != null) serviceParams += "&includecomments=" + params.includeComments;
        if (params.maxResults != null) serviceParams += "&maxresults=" + params.maxResults;
        if (params.countryID != null) serviceParams += "&countryid=" + params.countryID;
        if (params.levelID != null) serviceParams += "&levelid=" + params.levelID;
        if (params.connectionTypeID != null) serviceParams += "&connectiontypeid=" + params.connectionTypeID;
        if (params.operatorID != null) serviceParams += "&operatorid=" + params.operatorID;
        if (params.usageTypeID != null) serviceParams += "&usagetypeid=" + params.usageTypeID;
        if (params.statusTypeID != null) serviceParams += "&statustypeid=" + params.statusTypeID;
        if (params.locationTitle != null) serviceParams += "&locationtitle=" + params.locationTitle;
        if (params.minPowerKW != null) serviceParams += "&minpowerkw=" + params.minPowerKW;
        if (params.submissionStatusTypeID != null) serviceParams += "&submissionstatustypeid=" + params.submissionStatusTypeID;

        if (params.enableCaching == false) serviceParams += "&enablecaching=false";
        if (params.compact != null) serviceParams += "&compact=" + params.compact;
        if (params.levelOfDetail > 1) serviceParams += "&levelofdetail=" + params.levelOfDetail;
        if (params.polyline != null) serviceParams += "&polyline=" + params.polyline;
        if (params.boundingbox != null) serviceParams += "&boundingbox=" + params.boundingbox;
        if (params.additionalParams != null) serviceParams += "&" + params.additionalParams;

        // if (!errorcallback) errorcallback = this.handleGeneralAjaxError;

        var apiCallURL = serviceURL + serviceParams;
        //+ "&polyline=u`lyH|iW{}D|dHweCboEasA|x@_gAupBs}A{yE}n@ydG}bBi~FybCsnBmeCse@otLm{BshGscAw`E|nDawLykJq``@flAqbRczR";

        if (console) {
            console.log("API Call:" + apiCallURL);
        }

        /*var ajaxSettings: JQueryAjaxSettings = {
            type: "GET",
            url: apiCallURL + "&callback=" + callbackname,
            jsonp: "false",
            contentType: "application/json;",
            dataType: "jsonp",
            crossDomain: true,
            error: errorcallback
        };

        $.ajax(ajaxSettings);*/

        //this.http.get(serviceURL).subscribe((res:Response) => doSomething(res));


        return new Promise(resolve => {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            this.http.get(apiCallURL).subscribe(res => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                let poiResults = this.hydrateCompactPOIList(res.json());
                resolve(poiResults);
            });
        });
    }

    getHttpRequestOptions(): RequestOptions {

        //attach auth header if we have auth info for client api        

        if (this.authResponse && this.authResponse.Data && this.authResponse.Data.access_token) {
            let headers = new Headers();
            headers.set('Authorization', 'Bearer ' + this.authResponse.Data.access_token);
            let options = new RequestOptions({ headers: headers });

            return options;
        } else {
            //no auth present
            return null;

        }
    }

    fetchCoreReferenceData(authSessionInfo) {

        var serviceURL = this.serviceBaseURL + "/referencedata/?client=" + this.clientName + "&output=json" + (this.allowMirror ? "&allowmirror=true" : "") + "&verbose=false&";

        return new Promise(resolve => {
            this.http.get(serviceURL).subscribe(res => {
                this.referenceData = res.json();
this.cacheRefData();
                resolve(this.referenceData);
            });
        });
    }

    performSignIn(username: string, password: string) {

        var serviceURL = this.serviceBaseURL + "/profile/signin/";

        var data = { "emailaddress": username, "password": password };

        //observable result is wrapper in a Promise for API consumer to handle result/rejection etc        
        return new Promise((resolve, reject) => {
            this.http.post(serviceURL, JSON.stringify(data)).subscribe(res => {
                if (res.status >= 300) {
                    reject(new AsyncResult(null, true, "LoginFailed", res));
                } else {
                    this.authResponse = res.json();
                    resolve(this.authResponse);
                }
            });
        });
    }

    performSubmission(type: SubmissionType, data: any): Promise<any> {
        if (type == SubmissionType.POI) {
            //return this.submitPOI(data);
        }
        if (type == SubmissionType.Comment) {
            return this.submitUserComment(data);
        }
        if (type == SubmissionType.Media) {
            this.submitMediaItem(data);
        }
    }

    submitUserComment(data) {
        var jsonString = JSON.stringify(data);

        return new Promise(resolve => {
            this.http.post(this.serviceBaseURL + "/comment/?action=comment_submission&format=json", jsonString, this.getHttpRequestOptions()).subscribe(res => {
                resolve(res.json());
            });
        });

    }

    submitMediaItem(data) {
        var jsonString = JSON.stringify(data);

        return new Promise(resolve => {
            this.http.post(this.serviceBaseURL + "/comment/?action=mediaitem_submission&format=json", jsonString, this.getHttpRequestOptions()).subscribe(res => {
                resolve(res.json());
            });
        });

    }

    /* fetchLocationById(id, callbackname, errorcallback, disableCaching) {
         var serviceURL = this.serviceBaseURL + "/poi/?client=" + this.clientName + "&output=json&includecomments.=true&chargepointid=" + id;
         if (disableCaching) serviceURL += "&enablecaching=false";
         if (!errorcallback) errorcallback = this.handleGeneralAjaxError;
 
         var ajaxSettings: JQueryAjaxSettings = {
             type: "GET",
             url: serviceURL + "&callback=" + callbackname,
             jsonp: "false",
             contentType: "application/json;",
             dataType: "jsonp",
             crossDomain: true,
             error: errorcallback
         };
 
         $.ajax(ajaxSettings);
     }
 
     fetchGeocodeResult(address, successCallback, authSessionInfo, errorCallback) {
         var authInfoParams = this.getAuthParamsFromSessionInfo(authSessionInfo);
 
         var ajaxSettings: JQueryAjaxSettings = {
             type: "GET",
             url: this.serviceBaseURL + "/geocode/?client=" + this.clientName + "&address=" + address + "&output=json&verbose=false&camelcase=true&" + authInfoParams,
             contentType: "application/json;",
             dataType: "jsonp",
             crossDomain: true,
             success: successCallback,
             error: (errorCallback != null ? errorCallback : this.handleGeneralAjaxError)
         };
 
         $.ajax(ajaxSettings);
     }
 
    
 
     submitLocation(data, authSessionInfo, completedCallback, failureCallback) {
         var authInfoParams = this.getAuthParamsFromSessionInfo(authSessionInfo);
 
         var jsonString = JSON.stringify(data);
 
         var ajaxSettings: JQueryAjaxSettings = {
             type: "POST",
             url: this.serviceBaseURL + "/?client=" + this.clientName + "&action=cp_submission&format=json" + authInfoParams,
             data: jsonString,
             complete: function(jqXHR, textStatus) { completedCallback(jqXHR, textStatus); },
             crossDomain: true,
             error: this.handleGeneralAjaxError
         };
 
         $.ajax(ajaxSettings);
     }
 
     submitUserComment(data, authSessionInfo, completedCallback, failureCallback) {
         var authInfoParams = this.getAuthParamsFromSessionInfo(authSessionInfo);
 
         var jsonString = JSON.stringify(data);
 
         $.ajax({
             type: "POST",
             url: this.serviceBaseURL + "/?client=" + this.clientName + "&action=comment_submission&format=json" + authInfoParams,
             data: jsonString,
             success: function(result, textStatus, jqXHR) { completedCallback(jqXHR, textStatus); },
             crossDomain: true,
             error: failureCallback
         });
     }
 
     submitMediaItem(data, authSessionInfo, completedCallback, failureCallback, progressCallback) {
         var authInfoParams = this.getAuthParamsFromSessionInfo(authSessionInfo);
 
         $.ajax({
             url: this.serviceBaseURL + "/?client=" + this.clientName + "&action=mediaitem_submission" + authInfoParams,
             type: 'POST',
             xhr: function() {  // custom xhr
                 var myXhr = $.ajaxSettings.xhr();
                 if (myXhr.upload) { // check if upload property exists
                     myXhr.upload.addEventListener('progress', progressCallback, false); // for handling the progress of the upload
                 }
                 return myXhr;
             },
             success: function(result, textStatus, jqXHR) { completedCallback(jqXHR, textStatus); },
             error: (failureCallback == null ? this.handleGeneralAjaxError : failureCallback),
             data: data,
             cache: false,
             contentType: false,
             processData: false,
             crossDomain: true
         });
     }
     */

    getRefDataByID(refDataList, id) {
        if (id != "") id = parseInt(id);

        if (refDataList != null) {
            for (var i = 0; i < refDataList.length; i++) {
                if (refDataList[i].ID == id) {
                    return refDataList[i];
                }
            }
        }
        return null;
    }

    sortCoreReferenceData() {
        //sort reference data lists
        this.sortReferenceData(this.referenceData.ConnectionTypes);
        this.sortReferenceData(this.referenceData.Countries);
        this.sortReferenceData(this.referenceData.Operators);
        this.sortReferenceData(this.referenceData.DataProviders);
        this.sortReferenceData(this.referenceData.UsageTypes);
        this.sortReferenceData(this.referenceData.StatusTypes);
        this.sortReferenceData(this.referenceData.CheckinStatusTypes);
    }

    sortReferenceData(sourceList) {
        sourceList.sort(this.sortListByTitle);
    }

    getMetadataValueByMetadataFieldID(metadataValues, id) {
        if (id != "") id = parseInt(id);

        if (metadataValues != null) {
            for (var i = 0; i < metadataValues.length; i++) {
                if (metadataValues[i].ID == id) {
                    return metadataValues[i];
                }
            }
        }
        return null;
    }

    sortListByTitle(a, b) {
        if (a.Title < b.Title) return -1;
        if (a.Title > b.Title) return 1;
        if (a.Title == b.Title) return 0;

        return 0;
    }

    hydrateCompactPOI(poi: any): Array<any> {
        if (poi.DataProviderID != null && poi.DataProvider == null) {
            poi.DataProvider = this.getRefDataByID(this.referenceData.DataProviders, poi.DataProviderID);
        }
        if (poi.OperatorID != null && poi.OperatorInfo == null) {
            poi.OperatorInfo = this.getRefDataByID(this.referenceData.Operators, poi.OperatorID);
        }
        if (poi.UsageTypeID != null && poi.UsageType == null) {
            poi.UsageType = this.getRefDataByID(this.referenceData.UsageTypes, poi.UsageTypeID);
        }
        if (poi.AddressInfo.CountryID != null && poi.AddressInfo.Country == null) {
            poi.AddressInfo.Country = this.getRefDataByID(this.referenceData.Countries, poi.AddressInfo.CountryID);
        }
        if (poi.StatusTypeID != null && poi.StatusType == null) {
            poi.StatusType = this.getRefDataByID(this.referenceData.StatusTypes, poi.StatusTypeID);
        }
        if (poi.SubmissionStatusTypeID != null && poi.SubmissionStatusType == null) {
            poi.SubmissionStatusType = this.getRefDataByID(this.referenceData.SubmissionStatusTypes, poi.SubmissionStatusTypeID);
        }

        //TODO:  MediaItems,
        if (poi.Connections != null) {
            for (var c = 0; c < poi.Connections.length; c++) {
                var conn = poi.Connections[c];
                if (conn.ConnectionTypeID != null && conn.ConnectionType == null) {
                    conn.ConnectionType = this.getRefDataByID(this.referenceData.ConnectionTypes, conn.ConnectionTypeID);
                }
                if (conn.LevelID != null && conn.Level == null) {
                    conn.Level = this.getRefDataByID(this.referenceData.ChargerTypes, conn.LevelID);
                }
                if (conn.CurrentTypeID != null && conn.CurrentTypeID == null) {
                    conn.CurrentType = this.getRefDataByID(this.referenceData.CurrentTypes, conn.CurrentTypeID);
                }
                if (conn.StatusTypeID != null && conn.StatusTypeID == null) {
                    conn.StatusTypeID = this.getRefDataByID(this.referenceData.StatusTypes, conn.StatusTypeID);
                }

                poi.Connections[c] = conn;
            }
        }

        if (poi.UserComments != null) {
            for (var c = 0; c < poi.UserComments.length; c++) {
                var comment = poi.UserComments[c];
                if (comment.CommentType != null && comment.CommentTypeID == null) {
                    comment.CommentType = this.getRefDataByID(this.referenceData.CommentTypes, conn.CommentTypeID);
                }
                if (comment.CheckinStatusType != null && comment.CheckinStatusTypeID == null) {
                    comment.CheckinStatusTypeID = this.getRefDataByID(this.referenceData.CheckinStatusTypes, conn.CheckinStatusTypeID);
                }
                poi.UserComments[c] = comment;
            }
        }

        return poi;
    }

    // for a given list of POIs expand navigation properties (such as AddresssInfo.Country, Connection[0].ConnectionType etc)
    hydrateCompactPOIList(poiList: Array<any>) {
        for (var i = 0; i < poiList.length; i++) {
            poiList[i] = this.hydrateCompactPOI(poiList[i]);
        }
        return poiList;
    }

    isLocalStorageAvailable() {
        return typeof window.localStorage != 'undefined';
    }

    setCachedDataObject(itemName, itemValue) {
        if (this.isLocalStorageAvailable()) {
            if (typeof itemValue === 'undefined') itemValue = null;
            if (itemValue === null) {
                localStorage.removeItem(itemName);
            }
            else {
                localStorage.setItem(itemName, JSON.stringify(itemValue));
            }
        }
    }

    getCachedDataObject(itemName) {
        if (this.isLocalStorageAvailable()) {
            var val = localStorage.getItem(itemName);
            if (val != null && val.length > 0) {
                return JSON.parse(val);
            }
        }
        return null;
    }
}
