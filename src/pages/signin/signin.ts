import { Logging } from './../../providers/Logging';
import { AppManager } from './../../providers/AppManager';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, AlertController, Loading, LoadingController, ViewController} from 'ionic-angular';
import {UserProfile} from '../../model/UserProfile';

@Component({
    templateUrl: 'signin.html'
})
export class SignInPage {
    email: string;
    password: string;

    constructor(
        public appManager: AppManager,
        public nav: NavController,
        public viewController: ViewController,
        public params: NavParams,
        public zone: NgZone,
        public translate: TranslateService,
        public alertController:AlertController,
        public loadingController:LoadingController,
        public logging: Logging
    ) {
        this.email = "";

        var currentProfile = <UserProfile>params.get("Profile");
        if (currentProfile != null) {
            this.email = currentProfile.EmailAddress;
        }
    }

    cancelSignIn() {
        this.nav.pop();
    }

    performSignIn() {

        let loading = this.loadingController.create({
            content: "Signing In..",
            dismissOnPageChange: true
        });

        loading.present();


        //sign in with supplied email address and password
        this.appManager.api.performSignIn(this.email, this.password).then((response) => {

            //signed in OK, save response and return to main app
            localStorage.setItem("authResponse", JSON.stringify(this.appManager.api.authResponse));
            loading.dismiss().then(() => {
                this.viewController.dismiss();
            });

        }, (reason) => {

            //sign in rejected
            loading.dismiss().then(() => {
                let alert = this.alertController.create({
                    title: 'Open Charge Map',
                    subTitle: 'Email or Password not recognised',
                    buttons: ['Ok']
                });
                alert.present();

            });

            this.logging.log("Error logging in:" + reason);


        });
    }
}
