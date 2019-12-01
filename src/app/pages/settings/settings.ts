import { POIManager } from './../../services/POIManager';
import { AppManager } from './../../services/AppManager';
import { SearchSettings } from './../../model/SearchSettings';
import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { OperatorInfo, UsageType, StatusType, ConnectionType, Country } from '../../model/CoreDataModel';
import { environment } from '../../../environments/environment';
import { Utils } from '../../core/Utils';
import { Mapping } from '../../services/mapping/Mapping';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  searchSettings: SearchSettings;
  powerRange = { lower: 0, upper: 500 };

  constructor(
    public appManager: AppManager,
    public poiManager: POIManager,
    public mapping: Mapping,
    private modalController: ModalController,
    private events: Events
  ) {

    this.searchSettings = appManager.searchSettings;
  }

  async ngOnInit() {
    if (this.searchSettings.MinPowerKW != null) this.powerRange.lower = this.searchSettings.MinPowerKW;
    if (this.searchSettings.MaxPowerKW != null) this.powerRange.upper = this.searchSettings.MaxPowerKW;
    if (this.powerRange.upper == 0) this.powerRange.upper = 500;

    this.appManager.analytics.viewEvent('Settings');
  }

  get useFilteredOptions(): boolean {

    if (this.searchSettings.FilterOptionsByCountryId) {
      return true;
    } else {
      return false;
    }
  }

  get operators() {
    return this.appManager.referenceDataManager.getNetworkOperators(this.useFilteredOptions);
  }

  get connectionTypes() {
    return this.appManager.referenceDataManager.getConnectionTypes(this.useFilteredOptions);
  }

  get usageTypes() {
    return this.appManager.referenceDataManager.getUsageTypes(this.useFilteredOptions);
  }

  get statusTypes() {
    return this.appManager.referenceDataManager.getStatusTypes(this.useFilteredOptions);
  }

  get countries() {
    return this.appManager.referenceDataManager.getCountries(this.useFilteredOptions);
  }

  get isCountryFilterFeatureEnabled(): boolean {
    return Utils.isFeatureEnabled('FILTER_OPTIONS_BY_COUNTRY');
  }

  get languages() {
    return this.appManager.getLanguages();
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
    this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, { CountryIds: [this.searchSettings.FilterOptionsByCountryId] });
  }

  async onMapTypeChange() {
    this.mapping.setMapType(this.searchSettings.MapType);
  }

  close() {
    this.modalController.dismiss();
  }
}
