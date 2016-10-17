import { Logging, LogLevel } from './Logging';
import { ReferenceDataManager } from './ReferenceDataManager';
/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs'
import {AsyncResult, SubmissionType, POISearchParams, GeoLatLng} from '../model/AppModels';
import {POIManager} from '../services/POIManager';

@Injectable()
export class APIClient {
    public serviceBaseURL: string = "https://api.openchargemap.io/v3";
    public serviceBaseURL_Standard: string = "https://api.openchargemap.io/v3";
    public serviceBaseURL_Sandbox: string = "https://sandbox.api.openchargemap.io/v2";
    public serviceBaseURL_LocalDev: string = "http://localhost:8080/v3";

    public hasAuthorizationError: boolean = false;

    public ATTRIBUTION_METADATAFIELDID = 4;

    public authResponse: any;
    public clientName: string = "ocm.api.default";

    public authorizationErrorCallback: any;
    public generalErrorCallback: any;
    public allowMirror: boolean = false;

    private lastPOIApiCallURL = "";

    constructor(public http: Http, public refData:ReferenceDataManager, public logging:Logging) {

        this.serviceBaseURL = this.serviceBaseURL_Standard;
        //this.serviceBaseURL = this.serviceBaseURL_LocalDev;
    }

    getNumberListString(numberList: Array<number>): string {
        var output = "";
        for (var i = 0; i < numberList.length; i++) {
            output += numberList[i];
            if (i < numberList.length) output += ",";
        }
        return output;
    }

    fetchPOIListByParam(params: POISearchParams): Observable<any> {
        var serviceURL = this.serviceBaseURL + "/poi/?client=" + this.clientName + (this.allowMirror ? " &allowmirror=true" : "") + "&verbose=false&compact=true&output=json";

        var serviceParams = "";
        if (params.countryCode != null) serviceParams += "&countrycode=" + params.countryCode;
        if (params.latitude != null) serviceParams += "&latitude=" + params.latitude;
        if (params.longitude != null) serviceParams += "&longitude=" + params.longitude;
        if (params.distance != null) serviceParams += "&distance=" + params.distance;
        if (params.distanceUnit != null) serviceParams += "&distanceunit=" + params.distanceUnit;
        if (params.includeComments != null) serviceParams += "&includecomments=" + params.includeComments;
        if (params.maxResults != null) serviceParams += "&maxresults=" + params.maxResults;
        if (params.countryIdList != null) serviceParams += "&countryid=" + this.getNumberListString(params.countryIdList);
        if (params.levelIdList != null) serviceParams += "&levelid=" + this.getNumberListString(params.levelIdList);
        if (params.connectionTypeIdList != null) serviceParams += "&connectiontypeid=" + this.getNumberListString(params.connectionTypeIdList);
        if (params.operatorIdList != null) serviceParams += "&operatorid=" + this.getNumberListString(params.operatorIdList);
        if (params.usageTypeIdList != null) serviceParams += "&usagetypeid=" + this.getNumberListString(params.usageTypeIdList);
        if (params.statusTypeIdList != null) serviceParams += "&statustypeid=" + this.getNumberListString(params.statusTypeIdList);
        if (params.locationTitle != null) serviceParams += "&locationtitle=" + params.locationTitle;
        if (params.minPowerKW != null) serviceParams += "&minpowerkw=" + params.minPowerKW;
        if (params.maxPowerKW != null) serviceParams += "&maxpowerkw=" + params.maxPowerKW;
        if (params.submissionStatusTypeIdList != null) serviceParams += "&submissionstatustypeid=" + this.getNumberListString(params.submissionStatusTypeIdList);
        if (params.poiIdList != null) serviceParams += "&chargepointid=" + this.getNumberListString(params.poiIdList);

        if (params.enableCaching == false) serviceParams += "&enablecaching=false";
        if (params.compact != null) serviceParams += "&compact=" + params.compact;
        if (params.levelOfDetail > 1) serviceParams += "&levelofdetail=" + params.levelOfDetail;
        if (params.polyline != null) serviceParams += "&polyline=" + params.polyline;
        if (params.boundingbox != null) serviceParams += "&boundingbox=" + params.boundingbox;
        if (params.additionalParams != null) serviceParams += "&" + params.additionalParams;


        var apiCallURL = serviceURL + serviceParams;
        //+ "&polyline=u`lyH|iW{}D|dHweCboEasA|x@_gAupBs}A{yE}n@ydG}bBi~FybCsnBmeCse@otLm{BshGscAw`E|nDawLykJq``@flAqbRczR";

        if (this.lastPOIApiCallURL != apiCallURL) {


            this.lastPOIApiCallURL = apiCallURL;

            this.logging.log("API Call:" + apiCallURL, LogLevel.VERBOSE);


            return this.http.get(apiCallURL)
                .map((res) => {
                    let poiResults = this.refData.hydrateCompactPOIList(res.json());
                    return poiResults;
                })
                .catch((error) => {
                    let errMsg = error.message || 'Could not fetch POI list from server.';
                    this.logging.log("API Client: " + JSON.stringify(error), LogLevel.ERROR);
                    return Observable.throw(errMsg);
                });
        } else {
            this.logging.log("Skipped API call due to same query being repeated.");
            Observable.throw("Duplicate POI Query.");
        }
    }

    /** 
     * get request options including authorization headers for use in api requests 
     * */
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

    /**
     * fetch core reference data such as Connector Types, Countries, Network Operators etc, optionally filtered by country usage
     */
    fetchCoreReferenceData(filters): Observable<any> {

        var serviceURL = this.serviceBaseURL + "/referencedata/?client=" + this.clientName + "&output=json" + (this.allowMirror ? "&allowmirror=true" : "") + "&verbose=false&compact=true";

        if (filters != null && filters.countryIdList != null) {
            serviceURL += "&countryid=" + this.getNumberListString(filters.countryIdList);
        }


        this.logging.log("API Call:" + serviceURL, LogLevel.VERBOSE);

        return this.http.get(serviceURL)
            .map((res) => {
                let refData = res.json();
                return refData;
            })
            .catch((error) => {
                let errMsg = error.message || 'Could not fetch reference data from server.';
                this.logging.log("API Client: " + errMsg, LogLevel.ERROR);

                return Observable.throw(errMsg);
            });

    }

    performSignIn(username: string, password: string): Promise<any> {

        var serviceURL = this.serviceBaseURL + "/profile/authenticate/";

        var data = { "emailaddress": username, "password": password };

        //observable result is wrapper in a Promise for API consumer to handle result/rejection etc        

        return this.http.post(serviceURL, JSON.stringify(data)).map(res => {
            this.authResponse = res.json();
            return this.authResponse;
        }).toPromise();
    }

    performSubmission(type: SubmissionType, data: any): Promise<any> {
        if (type == SubmissionType.POI) {
            //return this.submitPOI(data);
        }
        if (type == SubmissionType.Comment) {
            return this.submitUserComment(data);
        }
        if (type == SubmissionType.Media) {
            return this.submitMediaItem(data);
        }
    }

    submitUserComment(data): Promise<any> {
        var jsonString = JSON.stringify(data);

        this.logging.log("[api] Submitting user comment");

        return this.http.post(this.serviceBaseURL + "/comment/", jsonString, this.getHttpRequestOptions())
            .map(res => {
                return res.json();
            }).toPromise();
    }

    submitMediaItem(data): Promise<any> {
        var jsonString = JSON.stringify(data);

        return this.http.post(this.serviceBaseURL + "/mediaitem/", jsonString, this.getHttpRequestOptions())
            .map(res => {
                res.json();
            }).toPromise();
    }

    getPanoramioLocationPhotos(pos: GeoLatLng): Promise<any> {
        //
        return new Promise(resolve => {

            let padding = 0.001;
            var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=2&minx=" + (pos.longitude - padding) + "&miny=" + (pos.latitude - padding) + "&maxx=" + (pos.longitude + padding) + "maxy=" + (pos.latitude + padding) + "&size=medium&mapfilter=true&callback=?";
            console.log(url);
            this.http.get(url).subscribe(res => {
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
    
     */


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
