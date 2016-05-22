/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {APIClient} from './APIClient';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Events, NavController, Platform, Toast, Loading} from 'ionic-angular';
import {Base, LogLevel} from '../Base';
import {JwtHelper} from 'angular2-jwt';
import {UserProfile, SubmissionType, SearchSettings} from '../model/AppModels'
import {SubmissionQueue} from './SubmissionQueue';
import {ReferenceDataManager} from './ReferenceDataManager';
import {POIManager} from './POIManager';

@Injectable()

export class AppManager extends Base {
    jwtHelper = new JwtHelper();
    enableSubmissionQueue: boolean;

    public referenceDataManager: ReferenceDataManager;
    public poiManager: POIManager;
    public searchSettings: SearchSettings;
    public platformMode: string;

    private loading: Loading;
    public isDebugMode:boolean;
    
    public clientWidth:number;
    public clientHeight:number;

    constructor(public http: Http, public events: Events, public api: APIClient, public submissionQueue: SubmissionQueue, private platform: Platform) {
        super();
        this.api.clientName = "ocm.app.ionic.v6_0_0";
        this.isDebugMode=false;
        this.enableSubmissionQueue = false;
        this.submissionQueue.setAppManager(this);

        if (platform.is("cordova")) {
            this.platformMode = "cordova";
        } else {
            this.platformMode = "web";
        }

        this.referenceDataManager = new ReferenceDataManager(http);
        this.poiManager = new POIManager(this);

        this.searchSettings = new SearchSettings();

        this.loadSearchSettings();
    }

    /**
     * Load search filter settings from local storage
     */
    public loadSearchSettings() {
        if (localStorage.getItem('searchSettings') != null) {
            this.searchSettings = JSON.parse(localStorage.getItem('searchSettings'));
        }
    }

    /**
     * Save search settings to local storage
     */
    public saveSearchSettings() {
        this.searchSettings.CheckForActiveFilters();
        localStorage.setItem('searchSettings', JSON.stringify(this.searchSettings));
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
        var jwt = localStorage.getItem("authResponse");

        if (jwt != null) {
            jwt = JSON.parse(jwt);
            if (jwt.Data != null && jwt.Data.access_token != null) {
                var decodedToken = this.jwtHelper.decodeToken(jwt.Data.access_token);
                if (this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
                    localStorage.removeItem("authResponse");
                } else {
                    this.api.authResponse = jwt;
                    this.log("User has valid auth token in local storage", LogLevel.VERBOSE);
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
        let toast = Toast.create({
            message: msg,
            duration: 3000,

        });

        toast.onDismiss(() => {
            this.log('Dismissed toast');
        });

        nav.present(toast);
    }

    public showLoadingProgress(nav: NavController, msg: string) {
        this.loading = Loading.create({
            content: msg,
            dismissOnPageChange: true
        });

        nav.present(this.loading);
    }
    public dismissLoadingProgress(){
        this.loading.dismiss();
    }

}