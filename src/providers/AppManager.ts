import { Logging, LogLevel } from './Logging';
/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import { APIClient } from './APIClient';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events, NavController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { JwtHelper } from 'angular2-jwt';
import { UserProfile, SubmissionType, SearchSettings, Journey, WayPoint, GeoLatLng } from '../model/AppModels'
import { SubmissionQueue } from './SubmissionQueue';
import { ReferenceDataManager } from './ReferenceDataManager';
import { JourneyManager } from './JourneyManager';

@Injectable()
export class AppManager {
    jwtHelper = new JwtHelper();
    enableSubmissionQueue: boolean;

    public searchSettings: SearchSettings;
    public platformMode: string;
    public journeys: Array<Journey>;

    private loading: Loading;
    public isDebugMode: boolean;

    public clientWidth: number;
    public clientHeight: number;

    public isRequestInProgress: boolean = false;

    constructor(
        public http: Http,
        public events: Events,
        public api: APIClient,
        public submissionQueue: SubmissionQueue,
        public platform: Platform,
        public referenceDataManager: ReferenceDataManager,
        public journeyManager: JourneyManager,
        public translateService: TranslateService,
        public toastController: ToastController,
        public loadingController: LoadingController,
        public logging: Logging
    ) {

        this.api.clientName = "ocm.app.ionic.v6_0_0";
        this.isDebugMode = false;
        this.enableSubmissionQueue = false;
        this.submissionQueue.setAppManager(this);

        if (platform.is("cordova")) {
            this.platformMode = "cordova";
        } else {
            this.platformMode = "web";
        }

        // this.referenceDataManager = new ReferenceDataManager(http);

        // this.poiManager = new POIManager(this);

        this.searchSettings = new SearchSettings();

        this.loadSearchSettings();


        //this.journeyManager.setupTestJourneys();
        this.journeyManager.loadJourneys();
    }

    /**
     * Load search filter settings from local storage
     */
    public loadSearchSettings() {
        if (localStorage.getItem('searchSettings') != null) {
            try {
                this.searchSettings = JSON.parse(localStorage.getItem('searchSettings'));
            } catch (ex) {
                this.searchSettings = new SearchSettings();
            }
        }
    }

    /**
     * Save search settings to local storage
     */
    public saveSearchSettings() {
        this.searchSettings.CheckForActiveFilters();
        localStorage.setItem('searchSettings', JSON.stringify(this.searchSettings));
    }
    public getLanguages(): Array<string> {
        return this.translateService.getLangs();
    }
    public setLanguage(languageCode: string) {
        this.logging.log("Changing language: " + languageCode);
        this.translateService.use(languageCode);
    }
    public initAppManager() {
        this.initAuthFromStorage();

        //if user authenticated and submission queue active and pending then start processing queue again        
        if (this.isUserAuthenticated()) {
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
        //check if valid user auth already in local storage
        var jwtString = localStorage.getItem("authResponse");

        if (jwtString != null) {
            let jwt = JSON.parse(jwtString);
            if (jwt.Data != null && jwt.Data.access_token != null) {
                var decodedToken = this.jwtHelper.decodeToken(jwt.Data.access_token);
                if (this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
                    localStorage.removeItem("authResponse");
                } else {
                    this.api.authResponse = jwt;
                    this.logging.log("User has valid auth token in local storage", LogLevel.VERBOSE);
                }
            }
        }
    }

    public isUserAuthenticated(): boolean {
        if (this.api.authResponse != null) {
            let jwt = this.api.authResponse;
            if (!this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
                return true;
            }
        }

        return false;
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
        localStorage.removeItem("authResponse");
        this.api.authResponse = null;
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

    public showToastNotification(nav: NavController, msg: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 3000,

        });

        toast.onDidDismiss(() => {
            this.logging.log('Dismissed toast');
        });

        toast.present();
    }

    public showLoadingProgress(nav: NavController, msg: string) {
        this.loading = this.loadingController.create({
            content: msg,
            dismissOnPageChange: true
        });

        this.loading.present();
    }
    public dismissLoadingProgress(): Promise<any> {
        return this.loading.dismiss();
    }

    /**
     * Launch an OCM resource URL with optional authentication token
     */
    public launchOCMWebPage(url: string) {
        if (this.isUserAuthenticated) {
            if (url.indexOf("?") == -1) {
                url += "?";
            }
            url += "&auth=" + this.getCurrentAuthToken();

        }

        url = "http://openchargemap.org/site" + url;
        window.open(url, '_system');
    }

    public launchWebPage(url: string) {
        window.open(url, '_system');
    }

    public isPlatform(platformName: string) {
        return this.platform.is(platformName);
    }
}