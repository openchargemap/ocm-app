import { CoreReferenceData } from './../model/CoreReferenceData';
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Logging, LogLevel } from './Logging';
import { ReferenceDataManager } from './ReferenceDataManager';
import { Injectable } from '@angular/core';

import { Observable, lastValueFrom } from 'rxjs';

import { POISearchParams, SubmissionType, GeoLatLng, PlaceSearchResult } from '../model/AppModels';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ReferenceDataFilters } from '../model/ReferenceDataFilters';

@Injectable({
  providedIn: 'root',
})
export class APIClient {
  public serviceBase: string = 'https://api.openchargemap.io';
  public serviceBaseURL: string = this.serviceBase + '/v4';
  public hasAuthorizationError: boolean = false;

  public ATTRIBUTION_METADATAFIELDID = 4;

  public authResponse: any;
  public clientName: string = 'ocm.api.default';

  public authorizationErrorCallback: any;
  public generalErrorCallback: any;
  public allowMirror: boolean = false;

  private lastPOIApiCallURL = '';

  constructor(public http: HttpClient, public refData: ReferenceDataManager, public logging: Logging) {

    this.serviceBaseURL = environment.apiBase + '/v3';
  }

  getNumberListString(numberList: Array<number>): string {
    let output = '';
    for (let i = 0; i < numberList.length; i++) {
      output += numberList[i];
      if (i < numberList.length) {
        output += ',';
      }
    }
    return output;
  }

  async fetchPOIListByParam(params: POISearchParams): Promise<Array<any>> {
    const serviceURL = this.serviceBaseURL + '/poi/?client=' +
      this.clientName + (this.allowMirror ? ' &allowmirror=true' : '')
      + '&verbose=false&output=json';

    params.compact = true;
    let serviceParams = '';
    // tslint:disable
    if (params.countryCode != null) serviceParams += '&countrycode=' + params.countryCode;
    if (params.latitude != null) serviceParams += '&latitude=' + params.latitude;
    if (params.longitude != null) serviceParams += '&longitude=' + params.longitude;
    if (params.distance != null) serviceParams += '&distance=' + params.distance;
    if (params.distanceUnit != null) serviceParams += '&distanceunit=' + params.distanceUnit;
    if (params.includeComments != null) serviceParams += '&includecomments=' + params.includeComments;
    if (params.maxResults != null) serviceParams += '&maxresults=' + params.maxResults;
    if (params.countryIdList != null) serviceParams += '&countryid=' + this.getNumberListString(params.countryIdList);
    if (params.levelIdList != null) serviceParams += '&levelid=' + this.getNumberListString(params.levelIdList);
    if (params.connectionTypeIdList != null && params.connectionTypeIdList.length > 0) serviceParams += '&connectiontypeid=' + this.getNumberListString(params.connectionTypeIdList);
    if (params.operatorIdList != null && params.operatorIdList.length > 0) serviceParams += '&operatorid=' + this.getNumberListString(params.operatorIdList);
    if (params.usageTypeIdList != null && params.usageTypeIdList.length > 0) serviceParams += '&usagetypeid=' + this.getNumberListString(params.usageTypeIdList);
    if (params.statusTypeIdList != null && params.statusTypeIdList.length > 0) serviceParams += '&statustypeid=' + this.getNumberListString(params.statusTypeIdList);
    if (params.locationTitle != null) serviceParams += '&locationtitle=' + params.locationTitle;
    if (params.minPowerKW != null && params.minPowerKW > 0) serviceParams += '&minpowerkw=' + params.minPowerKW;
    if (params.maxPowerKW != null && params.maxPowerKW > 0) serviceParams += '&maxpowerkw=' + params.maxPowerKW;
    if (params.submissionStatusTypeIdList != null) serviceParams += '&submissionstatustypeid=' + this.getNumberListString(params.submissionStatusTypeIdList);
    if (params.poiIdList != null && params.poiIdList.length > 0) serviceParams += '&chargepointid=' + this.getNumberListString(params.poiIdList);

    if (params.enableCaching == false) serviceParams += '&enablecaching=false';
    if (params.compact != null) serviceParams += '&compact=' + params.compact;
    if (params.levelOfDetail > 1) serviceParams += '&levelofdetail=' + params.levelOfDetail;
    if (params.polyline != null) serviceParams += '&polyline=' + params.polyline;
    if (params.boundingbox != null) serviceParams += '&boundingbox=' + params.boundingbox;
    if (params.additionalParams != null) serviceParams += '&' + params.additionalParams;

    // tslint:enable

    const apiCallURL = serviceURL + serviceParams;

    if (this.lastPOIApiCallURL !== apiCallURL || params.enableCaching == false) {

      this.lastPOIApiCallURL = apiCallURL;

      this.logging.log('API Call:' + apiCallURL, LogLevel.VERBOSE);

      try {
        let result = await this.http
          .get(apiCallURL, this.getHttpRequestOptions()).toPromise();

        let poiResults = this.refData.hydrateCompactPOIList(<Array<any>>result);
        return poiResults;
      } catch (error) {
        const errMsg = error.message || 'Could not fetch POI list from server.';
        this.logging.log('API Client: ' + JSON.stringify(error), LogLevel.ERROR);
        throw (errMsg);
      }
    } else {
      this.logging.log('Skipped API call due to same query being repeated.');
      return [];
    }
  }

  private getHttpRequestOptions(useJsonContentType: boolean = true): Object {

    // attach auth header if we have auth info for client api
    let headers = new HttpHeaders();

    // set content type if required
    if (useJsonContentType) {
      headers = headers.append('Content-Type', 'application/json');
    }

    // set auth header (if required)
    if (this.authResponse && this.authResponse.Data && this.authResponse.Data.access_token) {
      headers = headers.append('Authorization', 'Bearer ' + this.authResponse.Data.access_token);
    }

    headers = headers.append('X-API-Key', environment.apiKey);
    let options = { headers: headers };

    return options;
  }

  /**
   * fetch core reference data such as Connector Types, Countries, Network Operators etc, optionally filtered by country usage
   */
  fetchCoreReferenceData(filters: ReferenceDataFilters): Observable<any> {

    let serviceURL = this.serviceBaseURL + '/referencedata/?client='
      + this.clientName + '&output=json' + (this.allowMirror ? '&allowmirror=true' : '') + '&verbose=false&compact=true';

    if (filters != null && filters.CountryIds != null) {
      serviceURL += '&countryid=' + this.getNumberListString(filters.CountryIds);
    }

    this.logging.log('API Call:' + serviceURL, LogLevel.VERBOSE);

    return this.http.get<CoreReferenceData>(serviceURL, this.getHttpRequestOptions());
  }

  performSignIn(email: string, password: string): Promise<any> {

    const serviceURL = this.serviceBaseURL + '/profile/authenticate/';

    const data = { 'emailaddress': email, 'password': password };

    // observable result is wrapper in a Promise for API consumer to handle result/rejection etc

    return this.http.post(serviceURL, JSON.stringify(data), this.getHttpRequestOptions())
      .toPromise()
      .then(response => {
        this.authResponse = response;
        return this.authResponse;
      });
  }

  
  performRegister(username: string, email:string, password: string): Promise<any> {

    const serviceURL = this.serviceBaseURL + '/profile/register/';

    const data = {'username':username, 'emailaddress': email, 'password': password };

    // observable result is wrapper in a Promise for API consumer to handle result/rejection etc

    return this.http.post(serviceURL, JSON.stringify(data), this.getHttpRequestOptions())
      .toPromise()
      .then(response => {
        this.authResponse = response;
        return this.authResponse;
      });
  }

  performSubmission(type: SubmissionType, data: any): Promise<any> {
    if (type === SubmissionType.POI) {
      return this.submitPOI(data);
    }
    if (type === SubmissionType.Comment) {
      return this.submitUserComment(data);
    }
    if (type === SubmissionType.Media) {
      return this.submitMediaItem(data);
    }
  }

  submitUserComment(data): Promise<any> {
    const jsonString = JSON.stringify(data);

    this.logging.log('[api] Submitting user comment');

    return this.http.post(this.serviceBaseURL + '/comment/', jsonString, this.getHttpRequestOptions())
      .toPromise();
  }

  submitMediaItem(data): Promise<any> {
    const jsonString = JSON.stringify(data);

    return this.http.post(this.serviceBaseURL + '/mediaitem/', jsonString, this.getHttpRequestOptions())
      .toPromise();
  }

  submitPOI(data): Promise<any> {
    const jsonString = JSON.stringify(data);

    return this.http.post(this.serviceBaseURL + '/poi/', jsonString, this.getHttpRequestOptions())
      .toPromise();
  }

  getPanoramioLocationPhotos(pos: GeoLatLng): Promise<any> {
    //
    return new Promise(resolve => {

      const padding = 0.001;
      const url = 'https://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=2&minx='
        + (pos.longitude - padding) + '&miny=' + (pos.latitude - padding) + '&maxx='
        + (pos.longitude + padding) + 'maxy=' + (pos.latitude + padding) + '&size=medium&mapfilter=true&callback=?';
      console.log(url);

      return this.http.get(url).toPromise();
    });
  }

  fetchReverseGeocodeResult(latitude: number, longitude: number): Promise<PlaceSearchResult> {

    let serviceURL = this.serviceBaseURL + '/geocode/?client=' + this.clientName + '&output=json&camelcase=false&latitude=' + latitude + "&longitude=" + longitude;
    return this.http.get<PlaceSearchResult>(serviceURL, this.getHttpRequestOptions()).toPromise();
  }

  isLocalStorageAvailable() {
    return typeof window.localStorage !== 'undefined';
  }

  setCachedDataObject(itemName, itemValue) {
    if (this.isLocalStorageAvailable()) {
      if (typeof itemValue === 'undefined') { itemValue = null; }
      if (itemValue === null) {
        localStorage.removeItem(itemName);
      } else {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
      }
    }
  }

  getCachedDataObject(itemName) {
    if (this.isLocalStorageAvailable()) {
      const val = localStorage.getItem(itemName);
      if (val != null && val.length > 0) {
        return JSON.parse(val);
      }
    }
    return null;
  }
}
