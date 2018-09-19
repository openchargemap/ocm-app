import { JourneysPage } from './journeys';
import { RoutePlannerPageModule } from './../route-planner/route-planner.module';
import { UIComponentsModule } from './../../components/ui-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FavouriteEditorPage } from './favourite-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UIComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: JourneysPage
      }
    ])
  ],
  declarations: [JourneysPage, FavouriteEditorPage]
})
export class JourneysModule { }
