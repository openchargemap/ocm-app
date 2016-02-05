import {App, Platform, Config, Events} from 'ionic-framework/ionic';
import {Http, ConnectionBackend} from 'angular2/http';
import {bootstrap} from 'angular2/bootstrap';
import {OnInit} from 'angular2/core';

import {POIManager} from './core/ocm/services/POIManager'
import {APIClient} from './core/ocm/services/APIClient';
import {Base} from './core/ocm/Base';
import {TabsPage} from './pages/tabs/tabs';

import {Utils} from './core/ocm/Utils';
import {TranslateService, TranslatePipe, Parser} from 'ng2-translate/ng2-translate';

declare var plugin: any;
declare var Connection: any;


@App({
    template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
    providers: [POIManager, APIClient, Events, TranslateService],
    // Check out the config API docs for more info
    // http://ionicframework.com/docs/v2/api/config/Config/
    config: {}
})


export class MyApp extends Base implements OnInit {


    events: Events;
    root: any;
    debouncedPublishResizeEvent: any;
    translate: TranslateService;
    http: Http;
   
    
    constructor(platform: Platform, events: Events, translate: TranslateService, http:Http) {
        super();
        this.events = events;
        this.root = TabsPage;
        this.translate = translate;
        this.http = http;
        
        //trans.setLanguage("zh");
        
        /*this.translate.translations('de', {
         'Location': 'lage',
         'ocm.test.key': 'wibble'
     });

     //this.translate.setLanguage('de');

     console.log("trans: " + this.translate.translate('Location')); // Shows 'Location'
     console.log("trans: " + this.translate.translate('ocm.test.key')); // Shows 'Location'
 
     ///
     */


        this.translate = translate;
        this.initTranslation();
        
        
        //actions to perform when platform is ready
        
        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
            if (console) console.log("cordova/ionic platform ready");

            //check for native maps
            if ((<any>window).plugin) {
                //we can switch over to Native Maps API
            }
            
            
            var networkState = (<any>navigator).connection.type;
 
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
 
            alert(states[networkState]);
            
        });
    }



    
    initTranslation() {
        //init translation
        this.translate.useStaticFilesLoader('lang', '.json');

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(it|en)/gi.test(userLang) ? userLang : 'en';

        // optional, default is "en"
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);
     
   
        var test = this.translate.get("ocm.general.shortDescription");
        test.subscribe(data => { 
            this.log("Translation test:" + data);    
        });
        
        /*
          var test2 = this.translate.get("ocm.general.shortDescription");
                    test2.subscribe(data => { 
                        this.log("Translation test2:" + data);    
                    });   
        */
       
        //translate.getTranslation(userLang);
    }

    
    ngOnInit() {
        //startup
        this.debouncedPublishResizeEvent = Utils.debounce(this.publishWindowResizeEvent, 300, false)
        //notify subscribers of window resizes (map etc)
        window.addEventListener("resize", () => { this.debouncedPublishResizeEvent(); });
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

        this.events.publish('ocm:window:resized', { width: winWidth, height: winHeight });
    }
}

