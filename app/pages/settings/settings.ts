import {Component} from '@angular/core';
import {AppManager} from '../../core/ocm/services/AppManager';
import {POIManager} from '../../core/ocm/services/POIManager';
import {SearchSettings} from '../../core/ocm/model/AppModels';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {NullableTranslatePipe} from '../../core/ocm/pipes/NullableTranslatePipe';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
  pipes:[TranslatePipe, NullableTranslatePipe]
})
export class SettingsPage {


  operators: Array<any>;
  usageTypes: Array<any>;
  statusTypes: Array<any>;
  connectionTypes: Array<any>;

  searchSettings: SearchSettings;
  filterByCountryPref: boolean = true;
  languages:any;
  constructor(public appManager: AppManager, public poiManager: POIManager) {

    this.searchSettings = new SearchSettings();

    this.operators = this.appManager.referenceDataManager.getNetworkOperators(this.filterByCountryPref);
    this.usageTypes = this.appManager.referenceDataManager.getUsageTypes(this.filterByCountryPref);
    this.statusTypes = this.appManager.referenceDataManager.getStatusTypes(this.filterByCountryPref);
    this.connectionTypes = this.appManager.referenceDataManager.getConnectionTypes(this.filterByCountryPref);

this.languages= this.appManager.getLanguages();
    //TODO reference data manager with filtered versions of reference type lists
   // 
  }
  
  ionViewWillLeave() {

    this.appManager.setLanguage(this.searchSettings.Language);

    //save search settings
    this.appManager.searchSettings=this.searchSettings;
    this.appManager.saveSearchSettings();
    
    //TODO: publish event to refresh results based on new criteria
    this.poiManager.clearResults();
  }
}
