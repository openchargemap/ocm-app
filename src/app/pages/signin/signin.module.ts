import { SignInPage } from './signin';
import { UIComponentsModule } from './../../components/ui-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

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
        component: SignInPage
      }
    ])
  ],
  declarations: [SignInPage]
})
export class SignInModule { }
