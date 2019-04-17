import { Logging, LogLevel } from './Logging';
import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Analytics {
    constructor(private ga: GoogleAnalytics, private logger:Logging)
    {

    }

    async init(analyticsId:string){
        try {
        await this.ga.startTrackerWithId(analyticsId);


        } catch(err){
            this.logger.log("Could not initialise analytics");
        }

    }

    async setAppVersion(version:string){
        return this.ga.setAppVersion(version);
    }

    async appEvent(category:string, evt:string){
        return this.ga.trackEvent(category, evt);
    }

    async viewEvent(v:string){
        return this.ga.trackView(v);
    }
}