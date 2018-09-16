import { FavouriteEditorPage } from './../../pages/journeys/favourite-editor';
import { MediaUploadPage } from './../../pages/mediaupload/mediaupload';
import { CommentPage } from './../../pages/comment/comment';
import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../core/AppConfig';


@Component({
  selector: 'poi-details',
  templateUrl: 'poi-details.html',
  styleUrls: ['./poi-details.scss']
})

export class PoiDetails implements OnInit {

  @Input() poi: any;
  selectedTab: string;
  json: string;

  hasNavBar: boolean = false;

  constructor(
    public appManager: AppManager,
    public nav: NavController,
    public translate: TranslateService,
    public logging: Logging,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.logging.log('In ngOnChanges of POI Details');


    if (this.poi == null || this.poi.AddressInfo == null) {
      alert('Got null POI');
      return;
    }
    this.selectedTab = 'location';

    // create temporary properties for view model
    if (this.poi.MediaItems != null && this.poi.MediaItems.length > 0) {
      this.poi._hasPhotos = true;
      for (let i of this.poi.MediaItems) {
        i.ItemMediumURL = i.ItemThumbnailURL.replace('.thmb.', '.medi.');
      }
    } else {
      this.poi._hasPhotos = false;
    }

    if (this.poi.UserComments != null && this.poi.UserComments.length > 0) {
      this.poi._hasComments = true;
    } else {
      this.poi._hasComments = false;
    }
  }

  ngOnInit() {

    this.logging.log('In ngInit of POI Details');

  }


  get staticMapURL(): string {

    // scale=2 for retina
    return 'https://maps.googleapis.com/maps/api/staticmap?key=' + new AppConfig().mapsAPIKey + '&center='
      + this.poi.AddressInfo.Latitude + ',' + this.poi.AddressInfo.Longitude + '&zoom=13&scale=2&size='
      + this.staticMapSize + '&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:%7C'
      + this.poi.AddressInfo.Latitude + ',' + this.poi.AddressInfo.Longitude;
  }

  get staticMapSize(): string {
    if (this.appManager.clientWidth === 0) {
      return '240x100';
    }
    if (this.appManager.clientWidth >= 800) {
      return '640x100';
    }
    if (this.appManager.clientWidth >= 400) {
      return '400x100';
    }
    // default
    return '240x100';
  }

  async addComment() {

    if (this.appManager.isUserAuthenticated()) {
      const modal = await this.modalController.create({
        component: CommentPage, componentProps: {
          id: this.poi.ID,
          poi: this.poi
        }
      });
      await modal.present();

    } else {
      this.appManager.showToastNotification(this.nav, 'Please Sign In (see Profile tab)');
    }
  }

  async addMedia() {
    if (this.appManager.isUserAuthenticated()) {

      const modal = await this.modalController.create({
        component: MediaUploadPage, componentProps: {
          id: this.poi.ID,
          poi: this.poi
        }
      });

      await modal.present();

    } else {
      this.appManager.showToastNotification(this.nav, 'Please Sign In (see Profile tab)');
    }

  }

  async addFavourite() {
    // TODO: add/remove favourite from journeys/favourites

    /*
     let modal= Modal.create(FavouriteEditorPage,{

        poi: this.poi
    });
    this.nav.present(modal);*/


    // show action sheet to decide what to do with new favourite
    const actionSheet = await this.actionSheetController.create({
      header: 'Add Favourite',
      buttons: [
        {
          text: 'Add to Journey',

          handler: () => {
            // show add to journey modal
            this.modalController.create({
              component: FavouriteEditorPage, componentProps: {
                poi: this.poi
              }
            }).then(modal => modal.present());

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // cancelled
          }
        }
      ]
    });

    await actionSheet.present();

  }

  launchNavigation() {

    if (this.appManager.isPlatform('ios')) {
      const appleMapsURL = 'https://maps.apple.com/?ll=' + this.poi.AddressInfo.Latitude + ',' + this.poi.AddressInfo.Longitude;
      this.appManager.launchWebPage(appleMapsURL);
    } else {
      const googleMapsURL = 'https://maps.google.com/?q=' + this.poi.AddressInfo.Latitude + ',' + this.poi.AddressInfo.Longitude;
      this.appManager.launchWebPage(googleMapsURL);
    }

  }

  launchURL(url) {
    this.appManager.launchWebPage(url);
  }

  edit() {
    this.appManager.launchOCMWebPage('/poi/edit/' + this.poi.ID);
  }
}
