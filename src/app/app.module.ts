import { MediaUploadModule } from './pages/mediaupload/mediaupload.module';
import { POIDetailsModule } from './pages/poi-details/poit-details.module';
import { CommentModule } from './pages/comment/comment.module';
import { SearchPageModule } from './pages/search/search.module';
import { CommentPage } from './pages/comment/comment';
import { SearchPage } from './pages/search/search';
import { RoutePlannerPage } from './pages/route-planner/route-planner';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { POIDetailsPage } from './pages/poi-details/poi-details';

import { RoutePlannerPageModule } from './pages/route-planner/route-planner.module';
import { SignInModule } from './pages/signin/signin.module';
import { MediaUploadPage } from './pages/mediaupload/mediaupload';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams && (<any>params.interpolateParams).Title) {
      //for lookup lists our standard reference data has a .Title member we can use if we're not translating a term
      return (<any>params.interpolateParams).Title;
    } else {
      //translation not handled
      return '??' + params.key;
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [RoutePlannerPage, SearchPage, CommentPage, POIDetailsPage, MediaUploadPage], // , JourneysPage, MediaUploadPage, POIDetailsPage, ProfilePage, SettingsPage, SignInPage
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    SearchPageModule,
    RoutePlannerPageModule,
    SignInModule,
    CommentModule,
    MediaUploadModule,
    POIDetailsModule
  ],
  providers: [
    StatusBar,
    Keyboard,
    Camera,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
