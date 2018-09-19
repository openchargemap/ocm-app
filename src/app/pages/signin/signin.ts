import { Router } from '@angular/router';
import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { TranslateService } from '@ngx-translate/core';

import { Component, NgZone } from '@angular/core';
import {Location} from '@angular/common';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { UserProfile } from '../../model/UserProfile';

@Component({
    templateUrl: 'signin.html'
})
export class SignInPage {
    email: string;
    password: string;

    constructor(
        public appManager: AppManager,
        public nav: NavController,
        public zone: NgZone,
        public translate: TranslateService,
        public alertController: AlertController,
        public loadingController: LoadingController,
        public logging: Logging,
        public router: Router,
        private location:Location
    ) {
        this.email = '';

        /* const currentProfile = <UserProfile>params.get('Profile');
         if (currentProfile != null) {
             this.email = currentProfile.EmailAddress;
         }*/
    }

    cancelSignIn() {
        // FIXME: this.nav.pop();
       this.location.back();
        }

    async performSignIn() {

        const loading = await this.loadingController.create({
            message: 'Signing In..'
        });
        await loading.present();

        // sign in with supplied email address and password
        let signInFailed = false;
        const signInResult = await this.appManager.api.performSignIn(this.email, this.password).catch(async (err) => {
            signInFailed = true;
            // sign in rejected
            loading.dismiss();
            const a = await this.alertController.create({
                header: 'Open Charge Map',
                subHeader: 'Email or Password not recognised',
                buttons: ['Ok']
            });
            a.present();

            this.logging.log('Error logging in:' + err);
        });


        loading.dismiss();

        if (!signInFailed) {

            // signed in OK, save response and return to main app
            localStorage.setItem('authResponse', JSON.stringify(this.appManager.api.authResponse));

            // navigation to main app. TODO: navigate to last requested page (route guard)
            this.router.navigateByUrl('/search');
        }

    }
}
