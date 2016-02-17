import {Page} from 'ionic-framework/ionic';
import {SearchPage} from '../search/search';
import {JourneysPage} from '../journeys/journeys';
import {SettingsPage} from '../settings/settings';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    tabSearch: any;
    tabJourneys: any;
    tabSettings: any;
    
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabSearch = SearchPage;
    this.tabJourneys = JourneysPage;
    this.tabSettings = SettingsPage;
   
  }
}
