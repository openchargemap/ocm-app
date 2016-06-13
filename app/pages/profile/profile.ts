import {Component} from '@angular/core';
import {NavController, Modal, Alert} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {SignInPage} from '../signin/signin';
import {MediaUploadPage} from '../mediaupload/mediaupload';
import {CommentPage} from '../comment/comment';

@Component({
    templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {

    userProfile: any;
    constructor(public appManager: AppManager, public nav: NavController) {

    }

    ionViewDidEnter() {

        this.userProfile = this.appManager.getUserProfile();

        if (this.userProfile == null || !this.appManager.isUserAuthenticated()) {
            //navigate to sign in page
            let signInModal = Modal.create(SignInPage, { Profile: this.userProfile });
            this.nav.present(signInModal);
        } else {
            this.userProfile.GravatarURL = "http://www.gravatar.com/avatar/" + this.userProfile.EmailHash + "?s=80&d=mm";

        }
    }

    signOut() {
        this.appManager.signOutCurrentUser();
        this.userProfile = null;

        let alert = Alert.create({
            title: 'Signed Out',
            subTitle: 'You are now signed out',
            buttons: ['Dismiss']
        });
        this.nav.present(alert);
    }
}
