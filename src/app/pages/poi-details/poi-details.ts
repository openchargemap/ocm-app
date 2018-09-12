import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
    templateUrl: 'poi-details.html'
})

export class POIDetailsPage {

    poi: any;
    hasNavbar: boolean = false;

    constructor(
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.poi = this.navParams.get('item');
    }

    close() {
        // FIXME: this.nav.goBack();
    }
}
