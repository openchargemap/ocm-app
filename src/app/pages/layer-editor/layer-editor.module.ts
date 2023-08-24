import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayerEditorPageRoutingModule } from './layer-editor-routing.module';

import { LayerEditorPage } from './layer-editor.page';
import { UIComponentsModule } from '../../components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayerEditorPageRoutingModule,
    UIComponentsModule
  ],
  declarations: [LayerEditorPage]
})
export class LayerEditorPageModule { }
