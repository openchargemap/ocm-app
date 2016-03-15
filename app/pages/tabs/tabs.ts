import {Page} from 'ionic-angular';
import {SearchPage} from '../search/search';
import {JourneysPage} from '../journeys/journeys';
import {SettingsPage} from '../settings/settings';
import {ProfilePage} from '../profile/profile';


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    tabSearch: any;
    tabJourneys: any;
    tabSettings: any;
    tabProfile: any;

    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabSearch = SearchPage;
        this.tabJourneys = JourneysPage;
        this.tabSettings = SettingsPage;
        this.tabProfile = ProfilePage;

    }
}
