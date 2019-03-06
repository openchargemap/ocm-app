import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PoiEditorPage } from './poi-editor.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [PoiEditorPage]
})
export class PoiEditorPageModule {}
