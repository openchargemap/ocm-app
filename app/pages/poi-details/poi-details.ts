import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Modal, ActionSheet} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {DatePipe} from '@angular/common';
import {PoiDetails} from '../../components/poi-details/poi-details';

@Component({
    templateUrl: 'build/pages/poi-details/poi-details.html',
    directives:[PoiDetails],
    pipes: [TranslatePipe, DatePipe]
})

export class POIDetailsPage {

    private poi: any;

    constructor(private nav: NavController, private navParams: NavParams) {
        this.poi = this.navParams.get('item');
    }

    close() {
        this.nav.pop();
    }


}
