/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {APIClient} from './APIClient';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Events} from 'ionic-angular';
import {Base, LogLevel} from '../Base';
import {JwtHelper} from 'angular2-jwt';

@Injectable()

export class AppManager extends Base {

    constructor(public http: Http, public events: Events, public api: APIClient) {
        super();

        this.http = http;
        this.api = api;
        this.events = events;

        this.api.clientName = "ocm.app.ionic";// TODO: version
    }

    public initAuthFromStorage() {
        //check if valid user auth already in local storage
        var jwt = localStorage.getItem("authResponse");

        if (jwt != null) {
            jwt = JSON.parse(jwt);
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(jwt.Data.access_token);
            if (jwtHelper.isTokenExpired(jwt.Data.access_token)) {
                localStorage.removeItem("authResponse");
            } else {
                this.api.authResponse = jwt;
                this.log("User has valid auth token in local storage", LogLevel.VERBOSE);
            }
        }
    }
}