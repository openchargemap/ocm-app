import { MediaUploadModule } from './pages/mediaupload/mediaupload.module';
import { POIDetailsModule } from './pages/poi-details/poi-details.module';
import { CommentModule } from './pages/comment/comment.module';
import { SearchPageModule } from './pages/search/search.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RoutePlannerPageModule } from './pages/route-planner/route-planner.module';
import { SignInModule } from './pages/signin/signin.module';
import { ProfileModule } from './pages/profile/profile.module';
import { SettingsModule } from './pages/settings/settings.module';
import { JourneysModule } from './pages/journeys/journeys.module';
import { PoiEditorPageModule } from './pages/poi-editor/poi-editor.module';

import { AboutPageModule } from './pages/about/about.module';
import { LayerEditorPageModule } from './pages/layer-editor/layer-editor.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams && (<any>params.interpolateParams).Title) {
      // for lookup lists our standard reference data has a .Title member we can use if we're not translating a term
      return (<any>params.interpolateParams).Title;
    } else {
      // translation not handled
      return '??' + params.key;
    }
  }
}

@NgModule({
  declarations: [AppComponent],
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
    JourneysModule,
    SignInModule,
    CommentModule,
    MediaUploadModule,
    POIDetailsModule,
    PoiEditorPageModule,
    ProfileModule,
    SettingsModule,
    AboutPageModule,
    LayerEditorPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
