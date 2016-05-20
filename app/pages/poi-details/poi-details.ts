import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {AppManager} from '../../core/ocm/services/AppManager';
import {MediaUploadPage} from '../mediaupload/mediaupload';
import {CommentPage} from '../comment/comment';


@Page({
    templateUrl: 'build/pages/poi-details/poi-details.html',
    pipes: [TranslatePipe]
})

export class POIDetailsPage {
    poi: any;
    selectedTab: string;
    json: string;

    constructor(private appManager: AppManager, private nav: NavController, navParams: NavParams, private translate: TranslateService) {

        // If we navigated to this page, we will have an item available as a nav param
        this.poi = navParams.get('item');
        this.selectedTab = "location";

        //create temporary properties for view model
        if (this.poi.MediaItems != null && this.poi.MediaItems.length > 0) {
            this.poi._hasPhotos = true;
            for (let i of this.poi.MediaItems) {
                i.ItemMediumURL = i.ItemThumbnailURL.replace(".thmb.", ".medi.");
            }
        } else {
            this.poi._hasPhotos = false;
        }
        this.json = JSON.stringify(this.poi, null, 1);
    }
    get staticMapURL():string{
       
       //scale=2 for retina
        return "https://maps.googleapis.com/maps/api/staticmap?center="
        +this.poi.AddressInfo.Latitude+","+this.poi.AddressInfo.Longitude+"&zoom=13&scale=2&size="
        +this.staticMapSize+"&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:%7C"
        +this.poi.AddressInfo.Latitude+","+this.poi.AddressInfo.Longitude;
    }
    get staticMapSize(): string {
        if (this.appManager.clientWidth == 0) {
            return "240x100";
        }
        if (this.appManager.clientWidth >= 800) {
            return "640x100";
        }
        if (this.appManager.clientWidth >= 400) {
            return "400x100";
        }
        //default
        return "240x100";
    }
    addComment() {

        this.nav.push(CommentPage, {
            id: this.poi.ID,
            poi: this.poi
        });
    }

    addMedia() {
        this.nav.push(MediaUploadPage, {
            id: this.poi.ID,
            poi: this.poi
        });
    }

    toggleFavourite() {
        //TODO: add/remove favourite from journeys/favourites
    }

    edit() {
        //TODO: edit
    }


}
