import { Mapping } from './../providers/mapping/Mapping';
import { Utils } from './../core/Utils';
import { Logging } from './../providers/Logging';
import { AppManager } from './../providers/AppManager';
import { Component, OnInit } from '@angular/core';
import { Platform, Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp implements OnInit{
  rootPage = TabsPage;
  debouncedPublishResizeEvent: any;
  
  constructor(public platform: Platform, public events: Events, public translate: TranslateService, public appManager: AppManager,public mapping:Mapping, public logger: Logging) {

    this.initTranslation();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
    });
  }

   ngOnInit() {
        //startup
        this.debouncedPublishResizeEvent = Utils.debounce(this.publishWindowResizeEvent, 300, false)
        //notify subscribers of window resizes (map etc)
        window.addEventListener("resize", () => { this.debouncedPublishResizeEvent(); });

        this.appManager.initAuthFromStorage();
        this.publishWindowResizeEvent(); //inform app of initial client size
    }

  initTranslation() {
    //init translation
    //this.translate.useStaticFilesLoader('lang', '.json');
    var defaultLang = "it";
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(it|en|sk)/gi.test(userLang) ? userLang : defaultLang;
    //userLang="sk";
    // optional, default is "en"
    this.translate.setDefaultLang(defaultLang);
    // the lang to use, if the lang isn't available, it will use the current loader to get them

    this.logger.log("[translate] " + navigator.language + ":: using language:" + userLang);
    this.translate.use(userLang).subscribe(() => {
      this.logger.log("Testing translation");

      this.translate.get('ocm.general.shortDescription', {value: 'world'}).subscribe((res: string) => {
    console.log(res);
    //=> 'hello world'
}, (err)=>{
  console.log("Translation error:"+err);
});
      var test = this.translate.get("ocm.general.shortDescription").subscribe(data => {
        this.logger.log("Translation test:" + data);
      });
    });

    /*
      var test2 = this.translate.get("ocm.general.shortDescription");
                test2.subscribe(data => { 
                    this.log("Translation test2:" + data);    
                });   
    */

    //translate.getTranslation(userLang);
  }
  publishWindowResizeEvent() {
        var winWidth: number;
        var winHeight: number;
        if (typeof (window.innerWidth) == 'number') {
            winWidth = window.innerWidth;
            winHeight = window.innerHeight;
        } else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                winWidth = document.documentElement.clientWidth;
                winHeight = document.documentElement.clientHeight;
            } else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    winWidth = document.body.clientWidth;
                    winHeight = document.body.clientHeight;
                }
            }
        }

        this.appManager.clientWidth = winWidth;
        this.appManager.clientHeight = winHeight;
        this.events.publish('ocm:window:resized', { width: winWidth, height: winHeight });
    }
}
