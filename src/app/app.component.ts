import { Component } from "@angular/core";

import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { Mapping } from "./services/mapping/Mapping";
import { RoutePlannerPage } from "./pages/route-planner/route-planner";

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
    },
    {
      title: "Journeys",
      url: "/journeys",
      icon: "map"
    },
    {
      title: "Sign In",
      url: "/signin",
      icon: "person"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public mapping: Mapping,
    public modalController: ModalController
  ) {
    this.initializeApp();
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
}
