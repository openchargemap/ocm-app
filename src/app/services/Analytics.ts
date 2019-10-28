import { Logging, LogLevel } from './Logging';
import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";
import { Injectable } from '@angular/core';
import { logging } from 'selenium-webdriver';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class Analytics {
    isCordova: boolean = false;
    constructor(private ga: GoogleAnalytics, private logger: Logging, private platform: Platform) {
        if (platform.is("cordova")) {
            this.isCordova = true;
        } else {
            this.isCordova = false;
        }
    }

    async init(analyticsId: string) {
        if (this.isCordova) {
            await this.ga.startTrackerWithId(analyticsId);
        } else {
            this.logger.log("Could not initialise analytics");
        }
    }

    async setAppVersion(version: string) {
        if (this.isCordova) {
            return this.ga.setAppVersion(version);
        } else {
            this.logger.log(version);
        }
    }

    async appEvent(category: string, evt: string) {
        if (this.isCordova) {
            return this.ga.trackEvent(category, evt);
        } else {
            this.logger.log(evt);
        }
    }

    async viewEvent(v: string) {
        if (this.isCordova) {
            return this.ga.trackView(v);
        } else {
            this.logger.log(v);
        }
    }
}