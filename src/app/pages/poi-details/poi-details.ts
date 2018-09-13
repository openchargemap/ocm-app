import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    templateUrl: 'poi-details.html'
})

export class POIDetailsPage {

    poi: any;
    hasNavbar: boolean = false;

    constructor(
        public modalController: ModalController,
        public navParams: NavParams
    ) {
        this.poi = this.navParams.get('item');
    }

    close() {
        this.modalController.dismiss();
    }
}
