import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'poi-details.html'
})

export class POIDetailsPage {

    private poi: any;

    constructor(
        public nav: NavController, 
        public navParams: NavParams,  
        public view: ViewController
        ) {
        this.poi = this.navParams.get('item');
    }

    close() {
        this.view.dismiss();
    }


}
