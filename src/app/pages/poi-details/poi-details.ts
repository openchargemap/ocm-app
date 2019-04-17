import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppManager } from '../../services/AppManager';

@Component({
    templateUrl: 'poi-details.html',
    styleUrls: ['./poi-details.scss']
})

export class POIDetailsPage {

    poi: any;
    hasNavbar: boolean = false;

    constructor(
        public modalController: ModalController,
        public navParams: NavParams,
        private appManager: AppManager
    ) {
        this.poi = this.navParams.get('item');

        this.appManager.analytics.viewEvent('POIDetails');
    }

    close() {
        this.modalController.dismiss();
    }
}
