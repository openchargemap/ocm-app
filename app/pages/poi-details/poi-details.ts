import {IonicApp, Page, NavController, NavParams} from 'ionic-framework/ionic';



@Page({
    templateUrl: 'build/pages/poi-details/poi-details.html',
})

export class POIDetailsPage {
    poi: any;
    nav: NavController;
    
    constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
        this.nav = nav;
        // If we navigated to this page, we will have an item available as a nav param
        this.poi = navParams.get('item');
    }
}
