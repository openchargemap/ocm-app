import { Component } from "@angular/core";
import { Platform, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Mapping } from "./services/mapping/Mapping";
import { RoutePlannerPage } from "./pages/route-planner/route-planner";
import { SignInPage } from "./pages/signin/signin";
import { JourneysPage } from "./pages/journeys/journeys";
import { AppManager } from "./services/AppManager";
import { ProfilePage } from "./pages/profile/profile";
import { Logging, LogLevel } from "./services/Logging";
import { environment } from "../environments/environment";
import { PoiEditorPage } from "./pages/poi-editor/poi-editor.page";
import { Analytics } from "./services/Analytics";
import { GeoLatLng } from "./model/AppModels";
import { Utils } from "./core/Utils";
import { AboutPage } from "./pages/about/about.page";
import { LayerEditorPage } from "./pages/layer-editor/layer-editor.page";

import {
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed
} from '@capacitor/push-notifications';
import { StatusBar } from "@capacitor/status-bar";
import { Events } from "./services/Events";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";

//const { PushNotifications, SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {

  public enabledFeatures: string[];

  constructor(
    private platform: Platform,
    public translate: TranslateService,
    public mapping: Mapping,
    public modalController: ModalController,
    public appManager: AppManager,
    public logger: Logging,
    public analytics: Analytics,
    public events: Events
  ) {

    this.logger.log("Environment: " + environment.name);

    this.initializeApp();

    this.enabledFeatures = environment.enabledFeatures;
    if (appManager.searchSettings.EnableAdvancedEditorFeatures != true) {
      this.enabledFeatures = this.enabledFeatures.filter(f => f != 'LAYERS');
    }
  }



  configurePushNotifications() {

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        this.logger.log('Push registration success, token: ' + token.value);
        this.appManager.savePushRegistration(token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        this.logger.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.logger.log('Push received: ' + JSON.stringify(notification), LogLevel.INFO);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.logger.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  isUserAuthenticated() {
    return this.appManager.isUserAuthenticated();
  }

  getUserName() {
    let profile = this.appManager.getUserProfile();
    if (profile) {
      return profile.EmailAddress ? profile.EmailAddress : profile.Username;
    } else {
      return "Not Signed In";
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platform.is("capacitor")) {
        StatusBar.show();
        SplashScreen.hide();
      }

      this.translate.addLangs(this.appManager.getLanguages().map(l => l.code));
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang("en");

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      if (this.appManager.searchSettings.Language != null) {
        this.translate.use(this.appManager.searchSettings.Language);
      } else {
        if (!this.translate.currentLang) {
          this.translate.use("en");
        }
      }

      this.translate
        .get("ocm.search.performSearch")
        .toPromise()
        .then(v => {
          //
        });

      this.analytics.init(environment.analyticsId)
        .then(() => {
          this.analytics.setAppVersion(environment.version);
          this.analytics.appEvent('Startup', 'App Loaded');

        })
        .catch(e => this.logger.log("Error starting analytics"));


      this.events.subscribe('ocm:mapping:addpoi', async (pos) => {
        if (Utils.isFeatureEnabled('ADD_POI')) {
          this.add(pos);
        }
      });

      if (this.platform.is("ios") || this.platform.is("android")) {
        this.configurePushNotifications();

        this.checkForAppOpenUrl();
      }
    });
  }

  async checkForAppOpenUrl() {
    // app opened via url while app already open
    App.addListener('appUrlOpen', (data: any) => {
      alert('App (re)opened with URL: ' + data.url);
    });

    let ret = await App.getLaunchUrl();
    if (ret && ret.url) {
      alert('App opened with URL: ' + ret.url);
    }
  }

  async openRoutePlannerModal() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: RoutePlannerPage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();
  }

  async continueAdd(pos?: GeoLatLng) {
    const modal = await this.modalController.create({
      component: PoiEditorPage, componentProps: { startPos: pos }
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();
  }

  async add(pos?: GeoLatLng) {
    this.mapping.unfocusMap();
    if (this.appManager.isUserAuthenticated(true)) {

      await this.continueAdd(pos);

    } else {
      const modal = await this.modalController.create({
        component: SignInPage
      });

      modal.onDidDismiss().then(async data => {
        // focus map again..
        this.mapping.focusMap();
        if (this.appManager.isUserAuthenticated(true)) {
          await this.continueAdd(pos);
        }
      });

      return await modal.present();
    }

  }

  async signIn() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: SignInPage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
      this.appManager.isUserAuthenticated(true);
    });

    return await modal.present();
  }

  async signOut() {
    this.appManager.signOutCurrentUser();
  }

  async profile() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: ProfilePage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();
  }

  async journeys() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: JourneysPage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();

  }

  async addLayer() {
    const modal = await this.modalController.create({
      component: LayerEditorPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.mapping.addPOILayer(data);
    }

  }

  async about() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: AboutPage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();
  }

}
