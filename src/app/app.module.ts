import { RoutePlanner } from './../components/route-planner/route-planner';
import { PoiDetails } from './../components/poi-details/poi-details';
import { PlaceSearch } from './../components/place-search/place-search';
import { SignInPage } from './../pages/signin/signin';
import { SearchPage } from './../pages/search/search';
import { SettingsPage } from './../pages/settings/settings';
import { RoutePlannerPage } from './../pages/route-planner/route-planner';
import { FavouriteEditorPage } from './../pages/journeys/favourite-editor';
import { POIDetailsPage } from './../pages/poi-details/poi-details';
import { ProfilePage } from './../pages/profile/profile';
import { MediaUploadPage } from './../pages/mediaupload/mediaupload';
import { JourneysPage } from './../pages/journeys/journeys';
import { CommentPage } from './../pages/comment/comment';
import { JourneyManager } from './../providers/JourneyManager';
import { GoogleMapsDirections } from './../providers/GoogleMapsDirections';
import { ReferenceDataManager } from './../providers/ReferenceDataManager';
import { SubmissionQueue } from './../providers/SubmissionQueue';
import { APIClient } from './../providers/APIClient';
import { Http, HttpModule } from '@angular/http';
import { Mapping } from './../providers/mapping/Mapping';
import { POIManager } from './../providers/POIManager';
import { DecimalPipe } from '@angular/common';
import { Logging } from './../providers/Logging';
import { AppManager } from './../providers/AppManager';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, Events } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NullableTranslatePipe } from '../pipes/NullableTranslatePipe';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams && (<any>params.interpolateParams).Title) {
      //for lookup lists our standard reference data has a .Title member we can use if we're not translating a term
      return (<any>params.interpolateParams).Title
    } else {
      //translation not handled
      return params.key;
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    //pages
    CommentPage,
    FavouriteEditorPage,
    JourneysPage,
    MediaUploadPage,
    POIDetailsPage,
    ProfilePage,
    RoutePlannerPage,
    SearchPage,
    SettingsPage,
    SignInPage,
    TabsPage,
    //components
    PlaceSearch,
    PoiDetails,
    RoutePlanner,
    //pipes
    NullableTranslatePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,

    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    CommentPage,
    FavouriteEditorPage,
    JourneysPage,
    MediaUploadPage,
    POIDetailsPage,
    ProfilePage,
    RoutePlannerPage,
    SearchPage,
    SettingsPage,
    SignInPage,
    TabsPage
  ],
  providers: [
    AppManager,
    Logging,
    DecimalPipe,
    POIManager,
    Mapping,
    Events,
    APIClient,
    SubmissionQueue,
    JourneyManager,
    ReferenceDataManager,
    GoogleMapsDirections,
    Camera,
    Keyboard
  ]
})

export class AppModule {

}
