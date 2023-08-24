import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayerEditorPage } from './layer-editor.page';

const routes: Routes = [
  {
    path: '',
    component: LayerEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayerEditorPageRoutingModule { }
