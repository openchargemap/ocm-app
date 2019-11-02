import { POIManager } from './../../services/POIManager';
import { AppManager } from './../../services/AppManager';
import { SearchSettings } from './../../model/SearchSettings';
import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { OperatorInfo, UsageType, StatusType, ConnectionType, Country } from '../../model/CoreDataModel';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {


  operators: Array<OperatorInfo>;
  usageTypes: Array<UsageType>;
  statusTypes: Array<StatusType>;
  connectionTypes: Array<ConnectionType>;
  countries: Array<Country>;

  searchSettings: SearchSettings;

  languages: any;
  powerRange = { lower: 0, upper: 500 };

  constructor(
    public appManager: AppManager,
    public poiManager: POIManager,
    private modalController: ModalController,
    private events: Events
  ) {

    this.searchSettings = appManager.searchSettings;
  }

  async ngOnInit() {
    if (this.searchSettings.MinPowerKW != null) this.powerRange.lower = this.searchSettings.MinPowerKW;
    if (this.searchSettings.MaxPowerKW != null) this.powerRange.upper = this.searchSettings.MaxPowerKW;
    if (this.powerRange.upper == 0) this.powerRange.upper = 500;

    await this.populateReferenceData();

    this.appManager.analytics.viewEvent('Settings');
  }

  async populateReferenceData() {
    this.countries = this.appManager.referenceDataManager.getCountries();

    let useFilteredOptions: boolean = false;
    if (this.searchSettings.FilterOptionsByCountryId) {
      useFilteredOptions = true;

      await this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, { CountryIds: [this.searchSettings.FilterOptionsByCountryId] });
      this.operators = this.appManager.referenceDataManager.getNetworkOperators(useFilteredOptions);
      this.connectionTypes = this.appManager.referenceDataManager.getConnectionTypes(useFilteredOptions);
    } else {

      this.operators = this.appManager.referenceDataManager.getNetworkOperators(useFilteredOptions);
      this.connectionTypes = this.appManager.referenceDataManager.getConnectionTypes(useFilteredOptions);
    }

    this.usageTypes = this.appManager.referenceDataManager.getUsageTypes(useFilteredOptions);
    this.statusTypes = this.appManager.referenceDataManager.getStatusTypes(useFilteredOptions);

    this.languages = this.appManager.getLanguages();
  }

  ionViewWillLeave() {
    if (this.searchSettings.Language != null) {
      this.appManager.setLanguage(this.searchSettings.Language);
    }

    this.searchSettings.MinPowerKW = this.powerRange.lower;
    this.searchSettings.MaxPowerKW = this.powerRange.upper;

    if (this.searchSettings.MinPowerKW == 1) this.searchSettings.MinPowerKW = null;
    if (this.searchSettings.MaxPowerKW == 500) this.searchSettings.MaxPowerKW = null;

    // save search settings
    this.appManager.searchSettings = this.searchSettings;
    this.appManager.saveSearchSettings();

    // publish event to refresh results based on new criteria
    this.events.publish("ocm:poiList:cleared");

  }

  onLanguageChange() {
    //update UI language
    this.appManager.setLanguage(this.searchSettings.Language);
  }

  async onCountryChange() {
    await this.populateReferenceData();
  }

  close() {
    this.modalController.dismiss();
  }
}
