import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PoiEditorPage } from './poi-editor.page';
import { TranslateModule } from '@ngx-translate/core';
import { UIComponentsModule } from '../../components/ui-components.module';

const routes: Routes = [
  {
    path: '',
    component: PoiEditorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UIComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoiEditorPage]
})
export class PoiEditorPageModule { }
