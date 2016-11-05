import { AppManager } from './../../providers/AppManager';
import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { SearchPage } from '../search/search';
import { JourneysPage } from '../journeys/journeys';
import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tabSearch: any;
    tabJourneys: any;
    tabSettings: any;
    tabProfile: any;

    tabSearchTitle: string="";
    tabJourneysTitle: string="";
    tabSettingsTitle: string="";
    tabProfileTitle: string="";

    constructor(public appManager: AppManager, public translate: TranslateService) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabSearch = SearchPage;
        this.tabJourneys = JourneysPage;
        this.tabSettings = SettingsPage;
        this.tabProfile = ProfilePage;

        this.translate.get("ocm.journeys.sectionTitle").toPromise().then((val) => {
            this.tabJourneysTitle = val;
        });

        this.translate.get("ocm.search.sectionTitle").subscribe((val) => {
            this.tabSearchTitle = val;
        });
        this.translate.get("ocm.general.settings").subscribe((val) => {
            this.tabSettingsTitle = val;
        });

        this.translate.get("ocm.navigation.profile.sectionTitle").subscribe((val) => {
            this.tabProfileTitle = val;
        });

    }

    get settingsTabBadge(): string {
        if (this.appManager != null && this.appManager.searchSettings != null) {
            if (this.appManager.searchSettings.HasActiveFilters) {
                return "!";
            } else {
                return "";
            }
        }
        else {
            return "";
        }
    }

}
