import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { Mapping } from "./services/mapping/Mapping";
import { RoutePlannerPage } from "./pages/route-planner/route-planner";
import { SignInPage } from "./pages/signin/signin";
import { JourneysPage } from "./pages/journeys/journeys";
import { AppManager } from "./services/AppManager";
import { ProfilePage } from "./pages/profile/profile";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Search",
      url: "/search",
      icon: "home"
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public mapping: Mapping,
    public modalController: ModalController,
    public appManager: AppManager
  ) {
    this.initializeApp();
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang("en");

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use("en");

      this.translate
        .get("ocm.search.performSearch")
        .toPromise()
        .then(v => {
          console.log("TRANSLATE:" + v);
        });
    });
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

  async signIn() {
    this.mapping.unfocusMap();

    const modal = await this.modalController.create({
      component: SignInPage
    });

    modal.onDidDismiss().then(data => {
      // focus map again..
      this.mapping.focusMap();
    });

    await modal.present();
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

  
}
