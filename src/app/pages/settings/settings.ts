import { POIManager } from './../../services/POIManager';
import { AppManager } from './../../services/AppManager';
import { SearchSettings } from './../../model/SearchSettings';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {


  operators: Array<any>;
  usageTypes: Array<any>;
  statusTypes: Array<any>;
  connectionTypes: Array<any>;

  searchSettings: SearchSettings;
  filterByCountryPref: boolean = true;
  languages: any;
  powerRange = { lower: 0, upper: 500 };

  constructor(
    public appManager: AppManager, 
    public poiManager: POIManager, 
    private modalController:ModalController
    ) {

    this.searchSettings = appManager.searchSettings;

    this.operators = this.appManager.referenceDataManager.getNetworkOperators(this.filterByCountryPref);
    this.usageTypes = this.appManager.referenceDataManager.getUsageTypes(this.filterByCountryPref);
    this.statusTypes = this.appManager.referenceDataManager.getStatusTypes(this.filterByCountryPref);
    this.connectionTypes = this.appManager.referenceDataManager.getConnectionTypes(this.filterByCountryPref);

    this.languages = this.appManager.getLanguages();
    //TODO reference data manager with filtered versions of reference type lists
    //
    if (this.searchSettings.MinPowerKW != null) this.powerRange.lower = this.searchSettings.MinPowerKW;
    if (this.searchSettings.MaxPowerKW != null) this.powerRange.upper = this.searchSettings.MaxPowerKW;
    if (this.powerRange.upper == 0) this.powerRange.upper = 500;
  }

  ionViewWillLeave() {
    if (this.searchSettings.Language != null) {
      this.appManager.setLanguage(this.searchSettings.Language);
    }

    this.searchSettings.MinPowerKW = this.powerRange.lower;
    this.searchSettings.MaxPowerKW = this.powerRange.upper;

    if (this.searchSettings.MinPowerKW == 1) this.searchSettings.MinPowerKW = null;
    if (this.searchSettings.MaxPowerKW == 500) this.searchSettings.MaxPowerKW = null;

    //save search settings
    this.appManager.searchSettings = this.searchSettings;
    this.appManager.saveSearchSettings();

    //TODO: publish event to refresh results based on new criteria
    this.poiManager.clearResults();
  }

  onLanguageChange() {
    //update UI language
   this.appManager.setLanguage(this.searchSettings.Language);
  }

  close(){
    this.modalController.dismiss();
  }
}
