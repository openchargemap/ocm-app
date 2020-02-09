import { Logging, LogLevel } from './Logging';
// import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class Analytics {
    isCordova: boolean = false;
    ga: any = null;

    constructor(private logger: Logging, private platform: Platform) {
        // private ga: GoogleAnalytics, 

        if (platform.is("cordova") || platform.is("capacitor")) {
            this.isCordova = true;
        } else {
            this.isCordova = false;
        }
    }

    async init(analyticsId: string) {
        if (this.isCordova && this.ga) {
            await this.ga.startTrackerWithId(analyticsId);
        } else {
            this.logger.log("Could not initialise analytics");
        }
    }

    async setAppVersion(version: string) {
        if (this.isCordova && this.ga) {
            return this.ga.setAppVersion(version);
        } else {
            this.logger.log(version);
        }
    }

    async appEvent(category: string, evt: string) {
        if (this.isCordova && this.ga) {
            return this.ga.trackEvent(category, evt);
        } else {
            this.logger.log(evt);
        }
    }

    async viewEvent(v: string) {
        if (this.isCordova && this.ga) {
            return this.ga.trackView(v);
        } else {
            this.logger.log(v);
        }
    }
}
