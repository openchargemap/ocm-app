import { SignInPage } from './../signin/signin';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { AppManager } from './../../providers/AppManager';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
    templateUrl: 'profile.html'
})
export class ProfilePage {

    userProfile: any;
    constructor(
        public appManager: AppManager,
        public nav: NavController,
        public translate: TranslateService,
        public modalController: ModalController
    ) {
    }

    ionViewDidEnter() {

        this.userProfile = this.appManager.getUserProfile();

        if (this.userProfile == null || !this.appManager.isUserAuthenticated()) {
            this.showSignInModal();
        } else {
            this.refreshProfileView();
        }
    }

    refreshProfileView() {
        this.userProfile = this.appManager.getUserProfile();

    }

    showSignInModal() {
        //navigate to sign in page
        let signInModal = this.modalController.create(SignInPage, { Profile: this.userProfile });

        signInModal.onDidDismiss(() => {
            //may have an updated user profile
            this.refreshProfileView();
        });

        signInModal.present();
    }

    signOut() {
        this.appManager.signOutCurrentUser();
        this.userProfile = null;

        this.appManager.showToastNotification(this.nav, "You are now signed out.");
    }
}
