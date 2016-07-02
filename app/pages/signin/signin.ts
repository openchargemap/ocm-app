import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Alert, Loading, ViewController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {AppManager} from '../../core/ocm/services/AppManager';
import {UserProfile, AsyncResult} from '../../core/ocm/model/AppModels';


@Component({
    templateUrl: 'build/pages/signin/signin.html',
    pipes:[TranslatePipe]
})
export class SignInPage {
    email: string;
    password: string;

    constructor(private appManager: AppManager, private nav: NavController, private viewController: ViewController, params: NavParams, private zone: NgZone, public translate:TranslateService) {
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

        let loading = Loading.create({
            content: "Signing In..",
            dismissOnPageChange: true
        });

        this.nav.present(loading);


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
                let alert = Alert.create({
                    title: 'Open Charge Map',
                    subTitle: 'Email or Password not recognised',
                    buttons: ['Ok']
                });
                this.nav.present(alert);

            });

            this.appManager.log("Error logging in:" + reason);


        });
    }
}
