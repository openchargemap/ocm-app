import {Page} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  refData: any;
  constructor( public appManager: AppManager) {
    this.refData = appManager.referenceData;
  }
}
