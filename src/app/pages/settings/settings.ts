import { AppManager } from './../../services/AppManager';
import { SearchSettings } from './../../model/SearchSettings';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular/lazy';
import { Mapping } from '../../services/mapping/Mapping';

@Component({
    templateUrl: 'settings.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SettingsPage implements OnInit {

  searchSettings: SearchSettings;

  constructor(
    public appManager: AppManager,
    public mapping: Mapping,
    private modalController: ModalController
  ) {

    this.searchSettings = appManager.searchSettings;
  }

  async ngOnInit() {
    this.appManager.analytics.viewEvent('Settings');
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

  }

  onLanguageChange() {

    // update UI language
    if (this.searchSettings.Language != null && this.searchSettings.Language != "") {
      this.appManager.setLanguage(this.searchSettings.Language);
    }
  }

  async onMapTypeChange() {
    this.mapping.setMapType(this.searchSettings.MapType);
  }

  close() {
    this.modalController.dismiss();
  }
}
