import { RoutePlannerPageModule } from './../route-planner/route-planner.module';
import { UIComponentsModule } from './../../components/ui-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { RouterModule } from '@angular/router';
import { SearchPage } from './search';
import { MapLegendComponent } from './map-legend/map-legend.component';

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
        component: SearchPage
      }
    ])
  ],
  declarations: [SearchPage, MapLegendComponent]
})
export class SearchPageModule { }
