import { FavouriteEditorPage } from './../../pages/journeys/favourite-editor';
import { MediaUploadPage } from './../../pages/mediaupload/mediaupload';
import { CommentPage } from './../../pages/comment/comment';
import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../core/AppConfig';
import { POIManager } from '../../services/POIManager';
import { SignInPage } from '../../pages/signin/signin';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { PoiEditorPage } from '../../pages/poi-editor/poi-editor.page';
import { Utils } from '../../core/Utils';


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

  backdropImage: string;
  avgRating: number;
  connectionSummary: string;

  constructor(
    public appManager: AppManager,
    public nav: NavController,
    public translate: TranslateService,
    public logging: Logging,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public poiManager: POIManager,
    private router: Router
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.logging.log('In ngOnChanges of POI Details');


    if (this.poi == null || this.poi.AddressInfo == null) {
      // alert('Got null POI');
      return;
    }
    this.selectedTab = 'location';

    // create temporary properties for view model
    if (this.poi.MediaItems != null && this.poi.MediaItems.length > 0) {
      this.poi._hasPhotos = true;
      for (let i of this.poi.MediaItems) {
        i.ItemMediumURL = i.ItemThumbnailURL.replace('.thmb.', '.medi.');
      }
      this.backdropImage = this.poi.MediaItems[this.poi.MediaItems.length - 1].ItemThumbnailURL.replace('.thmb.', '.medi.');
    } else {
      this.poi._hasPhotos = false;
      this.backdropImage = null;
    }

    if (this.poi.UserComments != null && this.poi.UserComments.length > 0) {
      this.poi._hasComments = true;

      try {
        let ratings = this.poi.UserComments.filter(u => u.Rating > 0);
        if (ratings.length > 0) {
          let sum = 0;

          for (let r of ratings) { sum += r.Rating; }

          this.avgRating = sum / ratings.length;
        } else {
          this.avgRating = null;
        }
      } catch { }


    } else {
      this.poi._hasComments = false;
    }

    if (this.poi.Connections && this.poi.Connections.length > 0) {
      let summary = "";
      for (let c of this.poi.Connections) {
        if (summary.indexOf(c.ConnectionType.Title) == -1) {
          summary += (summary != "" ? ", " : "") + c.ConnectionType.Title;

        }
      }
      this.connectionSummary = summary;

    }
  }

  ngOnInit() {

    this.logging.log('In ngInit of POI Details');

  }


  get staticMapURL(): string {

    // scale=2 for retina
    return 'https://maps.googleapis.com/maps/api/staticmap?key=' + new AppConfig().googleMapsAPIKey + '&center='
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

  async continueAddComment() {

    const modal = await this.modalController.create({
      component: CommentPage, componentProps: {
        id: this.poi.ID,
        poi: this.poi
      }
    });

    // refresh poi after dismiss
    setTimeout(() => {
      this.refresh();
    }, 1000);

    await modal.present();
  }

  async addComment() {
    if (this.appManager.isUserAuthenticated(true)) {

      await this.continueAddComment();

    } else {
      // user needs to sign in first
      const modal = await this.modalController.create({
        component: SignInPage
      });

      modal.onDidDismiss().then(async () => {
        if (this.appManager.isUserAuthenticated(true)) {
          await this.continueAddComment();
        }

      });

      await modal.present();
    }
  }


  async continueAddMedia() {
    const modal = await this.modalController.create({
      component: MediaUploadPage, componentProps: {
        id: this.poi.ID,
        poi: this.poi
      }
    });

    modal.onDidDismiss().then(() => {
      // refresh poi after dismiss
      setTimeout(() => {
        this.refresh();
      }, 1000);

    });
    await modal.present();
  }

  async addMedia() {
    if (this.appManager.isUserAuthenticated(true)) {

      await this.continueAddMedia();

    } else {
      // user needs to sign in first
      const modal = await this.modalController.create({
        component: SignInPage
      });

      modal.onDidDismiss().then(async () => {
        if (this.appManager.isUserAuthenticated(true)) {
          await this.continueAddMedia();
        }

      });

      await modal.present();
    }
  }

  async addFavourite() {

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

  async edit() {
    if (Utils.isFeatureEnabled('EDIT_POI')) {

      const modal = await this.modalController.create({
        component: PoiEditorPage, componentProps: { id: this.poi.ID }
      });

      modal.onDidDismiss().then(data => {
        this.refresh();
      });

      await modal.present();

    } else {
      this.appManager.launchOCMWebPage('/poi/edit/' + this.poi.ID);
    }

  }

  refresh() {
    if (this.poi) {
      this.poiManager.getPOIById(this.poi.ID, true, true).then(p => {
        if (p) {
          this.poi = p;
          this.ngOnChanges(null);
        }
      });
    }
  }
}
