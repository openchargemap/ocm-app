/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {APIClient} from './APIClient';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Events, NavController} from 'ionic-angular';
import {Base, LogLevel} from '../Base';
import {JwtHelper} from 'angular2-jwt';
import {UserProfile} from '../../../ocm-model'
@Injectable()

export class AppManager extends Base {
    jwtHelper = new JwtHelper();

    constructor(public http: Http, public events: Events, public api: APIClient) {
        super();
        this.api.clientName = "ocm.app.ionic";// TODO: version
    }

    public initAppManager() {
        this.initAuthFromStorage();
    }

    public initAuthFromStorage() {
        //check if valid user auth already in local storage
        var jwt = localStorage.getItem("authResponse");

        if (jwt != null) {
            jwt = JSON.parse(jwt);

            var decodedToken = this.jwtHelper.decodeToken(jwt.Data.access_token);
            if (this.jwtHelper.isTokenExpired(jwt.Data.access_token)) {
                localStorage.removeItem("authResponse");
            } else {
                this.api.authResponse = jwt;
                this.log("User has valid auth token in local storage", LogLevel.VERBOSE);
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
}