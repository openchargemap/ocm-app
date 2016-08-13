import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {AppManager} from '../../core/ocm/services/AppManager';
import {SignInPage} from '../signin/signin';
import {MediaUploadPage} from '../mediaupload/mediaupload';
import {CommentPage} from '../comment/comment';

@Component({
    templateUrl: 'build/pages/profile/profile.html',
    pipes:[TranslatePipe]
})
export class ProfilePage {

    userProfile: any;
    constructor(
        public appManager: AppManager, 
        public nav: NavController, 
        private translate:TranslateService,
        private modalController:ModalController) {

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
