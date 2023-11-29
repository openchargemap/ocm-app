import { Router } from '@angular/router';
import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { TranslateService } from '@ngx-translate/core';

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'signin.html'
})
export class SignInPage {
    email: string;
    password: string;

    username: string;
    confirmpassword: string;

    mode: string = 'signin';

    constructor(
        public appManager: AppManager,
        public modalController: ModalController,
        public translate: TranslateService,
        public alertController: AlertController,
        public loadingController: LoadingController,
        public logging: Logging,
        public router: Router,
        private location: Location
    ) {
        this.email = '';

        /* const currentProfile = <UserProfile>params.get('Profile');
         if (currentProfile != null) {
             this.email = currentProfile.EmailAddress;
         }*/
    }

    cancelSignIn() {
        this.modalController.dismiss();
    }

    async performRegister() {

        if (this.password != this.confirmpassword) {   
            alert("Your password and the confirmed password do not match, please try again.");
            return;
        }
        if (this.password.length < 6) {
            alert("Your password should be at least 6 characters.");
            return;
        }

        const loading = await this.loadingController.create({
            message: 'Registering ..'
        });
        await loading.present();

        // sign in with supplied email address and password
        let signInFailed = false;

        try {

            const registerResult = await this.appManager.api.performRegister(this.username, this.email, this.password);

            loading.dismiss();

            // signed in OK, save response and return to main app
            localStorage.setItem('authResponse', JSON.stringify(this.appManager.api.authResponse));

            this.appManager.isUserAuthenticated(true);

            // navigation to main app. TODO: navigate to last requested page (route guard)
            this.modalController.dismiss();

            this.appManager.analytics.appEvent("Profile", "SignedIn");

        } catch (err) {
            signInFailed = true;
            // sign in rejected
            loading.dismiss();

            const a = await this.alertController.create({
                header: 'Open Charge Map',
                subHeader: 'Email or Password not recognised',
                buttons: ['Ok']
            });
            await a.present();

            this.logging.log('Error logging in:' + err);
        }

    }
    async performSignIn() {

        if (this.mode == 'register') {
            return this.performRegister();
        }

        const loading = await this.loadingController.create({
            message: 'Signing In..'
        });
        await loading.present();

        // sign in with supplied email address and password
        let signInFailed = false;

        try {

            const signInResult = await this.appManager.api.performSignIn(this.email, this.password);

            loading.dismiss();

            // signed in OK, save response and return to main app
            localStorage.setItem('authResponse', JSON.stringify(this.appManager.api.authResponse));

            this.appManager.isUserAuthenticated(true);

            // navigation to main app. TODO: navigate to last requested page (route guard)
            this.modalController.dismiss();

            this.appManager.analytics.appEvent("Profile", "SignedIn");

        } catch (err) {
            signInFailed = true;
            // sign in rejected
            loading.dismiss();

            const a = await this.alertController.create({
                header: 'Open Charge Map',
                subHeader: 'Email or Password not recognised',
                buttons: ['Ok']
            });
            await a.present();

            this.logging.log('Error logging in:' + err);
        }

    }
}
