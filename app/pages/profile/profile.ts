import {Component} from '@angular/core';
import {NavController, Modal, Alert} from 'ionic-angular';
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
    constructor(public appManager: AppManager, public nav: NavController, private translate:TranslateService) {

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
        if (this.userProfile != -null) {
            this.userProfile.GravatarURL = "http://www.gravatar.com/avatar/" + this.userProfile.EmailHash + "?s=80&d=mm";
        }
    }

    showSignInModal() {
        //navigate to sign in page
        let signInModal = Modal.create(SignInPage, { Profile: this.userProfile });

        signInModal.onDismiss(() => {
            //may have an updated user profile
            this.refreshProfileView();
        });

        this.nav.present(signInModal);
    }

    signOut() {
        this.appManager.signOutCurrentUser();
        this.userProfile = null;

       this.appManager.showToastNotification(this.nav, "You are now signed out.");
    }
}
