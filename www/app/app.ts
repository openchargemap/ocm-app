
import {App, Platform, Events} from 'ionic-framework/ionic';
import {Search} from './pages/search/search';
import {Journeys} from './pages/journeys/journeys';
import {Page3} from './pages/page3/page3';
import {POIDetailsPage} from './pages/poi-details/poi-details';

declare var plugin: any;

@App({
    templateUrl: 'app/app.html'
})
export class MyApp {
    
    tabSearchRoot: any;
    tabJourneyRoot: any;
    tabSettingsRoot: any;

    constructor(platform: Platform, events: Events) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabSearchRoot = Search;
        this.tabJourneyRoot = Journeys;
        this.tabSettingsRoot = Page3;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
            console.log("cordova/ionic platform ready");

            //check for native maps
            if ((<any>window).plugin) {
               
            }
        });
    }
}