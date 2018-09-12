import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { TranslateService } from '@ngx-translate/core';

import { Component, NgZone } from '@angular/core';
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
        public params: NavParams,
        public zone: NgZone,
        public translate: TranslateService,
        public alertController: AlertController,
        public loadingController: LoadingController,
        public logging: Logging
    ) {
        this.email = '';

        const currentProfile = <UserProfile>params.get('Profile');
        if (currentProfile != null) {
            this.email = currentProfile.EmailAddress;
        }
    }

    cancelSignIn() {
        // FIXME: this.nav.pop();
    }

    performSignIn() {

        this.loadingController.create({
            message: 'Signing In..'
        }).then(l => {
            l.present();
        });

        // sign in with supplied email address and password
        this.appManager.api.performSignIn(this.email, this.password).then((response) => {

            // signed in OK, save response and return to main app
            localStorage.setItem('authResponse', JSON.stringify(this.appManager.api.authResponse));

            // FIXME: navigation to main app

        }, (reason) => {

            // sign in rejected

            this.alertController.create({
                header: 'Open Charge Map',
                subHeader: 'Email or Password not recognised',
                buttons: ['Ok']
            }).then(a => {
                a.present();
            });

            this.logging.log('Error logging in:' + reason);
        });
    }
}
