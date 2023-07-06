import { POIManager } from './../../services/POIManager';
import { AppManager } from './../../services/AppManager';
import { SearchSettings, MAX_POWER } from './../../model/SearchSettings';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Utils } from '../../core/Utils';
import { Mapping } from '../../services/mapping/Mapping';
import { Events } from '../../services/Events';
import { OperatorInfo } from '../../model/CoreDataModel';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  searchSettings: SearchSettings;
  maxPower = MAX_POWER;

  public powerRange = { lower: 0, upper: this.maxPower };

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
    if (this.searchSettings.MinPowerKW != null) { this.powerRange.lower = this.searchSettings.MinPowerKW; }
    if (this.searchSettings.MaxPowerKW != null) { this.powerRange.upper = this.searchSettings.MaxPowerKW; }
    if (this.powerRange.upper == 0) { this.powerRange.upper = this.maxPower; }

    this.appManager.analytics.viewEvent('Settings');

    if (this.useFilteredOptions) {
      await this.onCountryChange();
    }
  }

  get useFilteredOptions(): boolean {

    if (this.searchSettings.FilterOptionsByCountryId > 0) {
      return true;
    } else {
      return false;
    }
  }

  clearFilters() {
    this.searchSettings.ClearActiveFilters();
    this.powerRange = { lower: 0, upper: this.maxPower };

    this.searchSettings.CheckForActiveFilters();
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

  _languages = [];
  get languages() {
    if (this._languages.length > 0) {
      return this._languages;
    } else {
      this._languages = this.appManager.getLanguages();
    }
    return this._languages;
  }

  ionViewWillLeave() {
    if (this.searchSettings.Language != null) {
      this.appManager.setLanguage(this.searchSettings.Language);
    }

    this.searchSettings.MinPowerKW = this.powerRange.lower;
    this.searchSettings.MaxPowerKW = this.powerRange.upper;

    if (this.searchSettings.MinPowerKW == 1) { this.searchSettings.MinPowerKW = null; }
    if (this.searchSettings.MaxPowerKW == this.maxPower) { this.searchSettings.MaxPowerKW = null; }

    // save search settings
    this.appManager.searchSettings = this.searchSettings;
    this.appManager.saveSearchSettings();

    // publish event to refresh results based on new criteria
    this.events.publish("ocm:poiList:cleared");

  }

  onLanguageChange() {

    // update UI language
    if (this.searchSettings.Language != null && this.searchSettings.Language != "") {
      this.appManager.setLanguage(this.searchSettings.Language);
    }
  }

  async onCountryChange() {
    this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, { CountryIds: [this.searchSettings.FilterOptionsByCountryId] });
  }

  async onMapTypeChange() {
    this.mapping.setMapType(this.searchSettings.MapType);
  }

  async onOperatorSelected(operatorInfo: OperatorInfo = null) {

    if (operatorInfo != null) {
      if (!this.searchSettings.OperatorList.find(f => f == operatorInfo.ID)) {
        this.searchSettings.OperatorList.push(operatorInfo.ID);
      }
    }

  }

  async onOperatorRemoved(operatorId: number) {
    this.searchSettings.OperatorList = this.searchSettings.OperatorList.filter(f => f != operatorId);
  }

  close() {
    this.modalController.dismiss();
  }
}
