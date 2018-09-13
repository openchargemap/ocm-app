import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       // this language will be used as a fallback when a translation isn't found in the current language
       this.translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
     this.translate.use('en');

      this.translate.get('ocm.search.performSearch').toPromise().then(v => {
        console.log('TRANSLATE:' + v);
      });

    });
  }
}
