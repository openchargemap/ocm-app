import { Logging, LogLevel } from './Logging';
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/
import { APIClient } from './APIClient';
import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UserProfile, SubmissionType, SearchSettings, Journey, WayPoint, GeoLatLng, Language } from '../model/AppModels';
import { SubmissionQueue } from './SubmissionQueue';
import { ReferenceDataManager } from './ReferenceDataManager';
import { JourneyManager } from './JourneyManager';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platforms } from '@ionic/core';
import { Analytics } from './Analytics';
import { environment } from '../../environments/environment';
import { Events } from './Events';

@Injectable({
  providedIn: 'root',
})
export class AppManager {

  enableSubmissionQueue: boolean;

  public searchSettings: SearchSettings;
  public platformMode: string;
  public journeys: Array<Journey>;

  public isDebugMode: boolean;

  public clientWidth: number;
  public clientHeight: number;

  public isRequestInProgress: boolean = false;

  public title: string = "Open Charge Map";

  public _isUserAuthenticated?: boolean = null;

  public isEmbeddedMode: boolean = false;
  public isOffline: boolean = false;

  constructor(
    public http: HttpClient,
    public events: Events,
    public api: APIClient,
    public submissionQueue: SubmissionQueue,
    public platform: Platform,
    public referenceDataManager: ReferenceDataManager,
    public journeyManager: JourneyManager,
    public translateService: TranslateService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public jwtHelper: JwtHelperService,
    public logging: Logging,
    public analytics: Analytics
  ) {

    this.api.clientName = 'ocm.app.ionic.' + environment.version;
    this.isDebugMode = false;
    this.enableSubmissionQueue = false;
    this.submissionQueue.setAppManager(this);

    if (platform.is('cordova')) {
      this.platformMode = 'cordova';
    } else {
      this.platformMode = 'web';
    }

    this.initAppManager();

    this.searchSettings = new SearchSettings();

    this.loadSearchSettings();

    // optionally set search filters from URL (such as operator)
    this.applyURLQueryStringOptions();

    this.searchSettings.CheckForActiveFilters();

    // this.journeyManager.setupTestJourneys();
    this.journeyManager.loadJourneys();
  }

  /**
   * Load search filter settings from local storage
   */
  public loadSearchSettings() {
    if (localStorage.getItem('searchSettings') != null) {
      this.searchSettings = new SearchSettings();
      try {
        let settings = JSON.parse(localStorage.getItem('searchSettings'));

        // clone settings into SearchSettings instance
        Object.assign(this.searchSettings, settings);
      } catch (ex) {
        // failed to load settings
      }
    }
  }

  savePushRegistration(token: string) {
    localStorage.setItem("_pushToken", token.toString());
  }

  getPushRegistration() {
    localStorage.getItem("_pushToken");
  }

  getQueryVariable(variable): Array<any> {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');

      if (decodeURIComponent(pair[0]) == variable) {
        let valueList = pair[1].split(',');
        let decodedValues = valueList.map((v) =>
          decodeURIComponent(v)
        );
        return decodedValues;
      }
    }
    return null;
  }

  /**
   * If any query string parameters passed in the URL, apply them here
   */
  public applyURLQueryStringOptions() {

    if (this.getQueryVariable('mode')) {
      let mode = this.getQueryVariable('mode')[0];

      if (mode == 'embedded') {
        this.isEmbeddedMode = true;
      }
    }

    if (this.getQueryVariable('operatorid')) {
      let values = this.getQueryVariable('operatorid');
      for (let v of values) {
        this.searchSettings.OperatorList.unshift(parseInt(v, 10));
      }

    }

    if (this.getQueryVariable('latitude') && this.getQueryVariable('longitude')) {
      let latitude = this.getQueryVariable('latitude')[0];
      let longitude = this.getQueryVariable('longitude')[0];

      this.searchSettings.StartSearchPosition = new GeoLatLng(parseFloat(latitude), parseFloat(longitude));
    }

    if (this.getQueryVariable('title')) {
      this.title = this.getQueryVariable('title')[0];
    }

    if (this.getQueryVariable('languagecode')) {
      this.setLanguage(this.getQueryVariable('languagecode')[0])
    }

    if (this.getQueryVariable('id')) {
      // load POI for view/edit
      this.searchSettings.StartViewPoiId = this.getQueryVariable('id')[0];
    }
  }
  /**
   * Save search settings to local storage
   */
  public saveSearchSettings() {
    this.searchSettings.CheckForActiveFilters();
    localStorage.setItem('searchSettings', JSON.stringify(this.searchSettings));
  }

  public getLanguages(): Array<Language> {
    let languages = [
      { 'code': 'ar', 'title': 'العربية / Arabic' },
      { 'code': 'bg', 'title': 'Bulgarian / Български' },
      { 'code': 'cs', 'title': 'Czech / Čeština' },
      { 'code': 'de', 'title': 'German / Deutsch' },
      { 'code': 'el', 'title': 'Greek / Ελληνική' },
      { 'code': 'en', 'title': 'English' },
      { 'code': 'es', 'title': 'Spanish / Español' },
      { 'code': 'et', 'title': 'Estonian / Eesti' },
      { 'code': 'fi', 'title': 'Finnish / Suomi' },
      { 'code': 'fr', 'title': 'French / Français' },
      { 'code': 'fy', 'title': 'West Frisian / Frysk' },
      { 'code': 'hu', 'title': 'Hungarian / Magyar' },
      { 'code': 'it', 'title': 'Italian / Italiano' },
      { 'code': 'ja', 'title': 'Japanese / 日本語' },
      { 'code': 'lt', 'title': 'Lithuanian / Lietuvių' },
      { 'code': 'nl', 'title': 'Dutch / Nederlands' },
      { 'code': 'pt', 'title': 'Portuguese / português' },
      { 'code': 'ro', 'title': 'Romanian / Română' },
      { 'code': 'ru', 'title': 'Russian / Pусский' },
      { 'code': 'sk', 'title': 'Slovak / Slovenčina' },
      { 'code': 'tr', 'title': 'Turkish / Türkçe' },
      { 'code': 'zh', 'title': 'Chinese / 中国的' },
    ];
    return languages;
  }

  public setLanguage(languageCode: string) {
    if (languageCode == null || languageCode == "") {
      languageCode = "en";
    }

    this.logging.log('Changing language: ' + languageCode);
    this.translateService.use(languageCode);
  }

  public initAppManager() {
    this.initAuthFromStorage();

    // if user authenticated and submission queue active and pending then start processing queue again
    if (this.isUserAuthenticated(true)) {
      if (this.enableSubmissionQueue) {
        if (this.submissionQueue != null) {
          if (this.submissionQueue.hasPendingItems()) {
            this.submissionQueue.processNextQueueItem();
          }
        }
      }
    }
  }

  public initAuthFromStorage() {
    // check if valid user auth already in local storage
    let jwtString = localStorage.getItem('authResponse');

    if (jwtString != null) {
      let jwt = JSON.parse(jwtString);
      if (jwt?.Data != null && jwt?.Data?.access_token != null) {
        const decodedToken = this.jwtHelper.decodeToken(jwt.Data.access_token);
        if (this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
          localStorage.removeItem('authResponse');
        } else {
          this.api.authResponse = jwt;
          this.logging.log('User has valid auth token in local storage', LogLevel.VERBOSE);
        }
      } else {
        this.logging.log('User has invalid auth token in local storage', LogLevel.VERBOSE);
        localStorage.removeItem('authResponse');
      }
    }
  }

  public isUserAuthenticated(recheckAuth: boolean = false): boolean {

    if (recheckAuth === false && this._isUserAuthenticated != null) { return this._isUserAuthenticated; }

    this._isUserAuthenticated = false;

    if (this.api.authResponse != null) {
      const jwt = this.api.authResponse;
      if (!this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
        this._isUserAuthenticated = true;
      }
    }

    return this._isUserAuthenticated;
  }

  public getCurrentAuthToken(): string {
    if (this.api.authResponse != null) {
      return this.api.authResponse.Data.access_token;
    } else {
      return null;
    }
  }

  public getUserProfile(): UserProfile {
    if (this.api.authResponse != null) {
      return this.api.authResponse.Data.UserProfile;
    }

    return null;
  }

  public signOutCurrentUser() {
    localStorage.removeItem('authResponse');
    this.api.authResponse = null;
    this._isUserAuthenticated = false;
  }

  public submitComment(data: any) {
    if (this.enableSubmissionQueue) {
      this.submissionQueue.add(SubmissionType.Comment, data);
      this.submissionQueue.processNextQueueItem();
    } else {
      return this.api.performSubmission(SubmissionType.Comment, data);
    }
  }

  public submitMediaItem(data: any) {
    if (this.enableSubmissionQueue) {
      this.submissionQueue.add(SubmissionType.Media, data);
      this.submissionQueue.processNextQueueItem();
    } else {
      return this.api.performSubmission(SubmissionType.Media, data);
    }
  }

  public submitPOI(data: any) {
    if (this.enableSubmissionQueue) {
      this.submissionQueue.add(SubmissionType.POI, data);
      this.submissionQueue.processNextQueueItem();
    } else {
      return this.api.performSubmission(SubmissionType.POI, data);
    }
  }

  public async showToastNotification(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });

    await toast.present();

  }

  public async showLoadingProgress(msg: string) {

    let p = await this.loadingController.create({
      message: msg
    });

    await p.present();
  }

  public async dismissLoadingProgress(): Promise<any> {
    return this.loadingController.dismiss();
  }

  /**
   * Launch an OCM resource URL with optional authentication token
   */
  public launchOCMWebPage(url: string) {
    if (this.isUserAuthenticated(true)) {
      if (url.indexOf('?') === -1) {
        url += '?';
      }
      url += '&auth=' + this.getCurrentAuthToken();

    }

    url = 'https://openchargemap.org/site' + url;
    window.open(url, '_system');
  }

  public launchWebPage(url: string) {
    window.open(url, '_system');
  }

  public isPlatform(platformName: Platforms) {
    return this.platform.is(platformName);
  }
}
