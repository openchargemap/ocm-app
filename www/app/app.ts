
import {OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {App, Platform, Events, Translate, TranslatePipe} from 'ionic-framework/ionic';
import {SearchPage} from './pages/search/search';
import {JourneysPage} from './pages/journeys/journeys';
import {SettingsPage} from './pages/settings/settings';
import {POIDetailsPage} from './pages/poi-details/poi-details';
import {POIManager} from './core/ocm/services/POIManager'
import {APIClient} from './core/ocm/services/APIClient';

declare var plugin: any;

@App({
    templateUrl: 'app/app.html',
    providers: [POIManager, APIClient, Events]
})

export class MyApp implements OnInit {

    tabSearchRoot: any;
    tabJourneyRoot: any;
    tabSettingsRoot: any;

    poiManager: POIManager;

    constructor(platform: Platform, events: Events, trans: Translate) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabSearchRoot = SearchPage;
        this.tabJourneyRoot = JourneysPage;
        this.tabSettingsRoot = SettingsPage;

        //trans.setLanguage("zh");
        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
            console.log("cordova/ionic platform ready");

            //check for native maps
            if ((<any>window).plugin) {
                //we can switch over to Native Maps API
            }
        });
    }
    
    ngOnInit() {
        //startup
    }
}