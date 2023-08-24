import { SignInPage } from './../signin/signin';
import { TranslateService } from '@ngx-translate/core';
import { AppManager } from './../../services/AppManager';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

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

        if (this.userProfile == null || !this.appManager.isUserAuthenticated(true)) {
            this.showSignInModal();
        } else {
            this.refreshProfileView();
        }

        this.appManager.analytics.viewEvent('Profile');
    }

    refreshProfileView() {
        this.userProfile = this.appManager.getUserProfile();

    }

    showSignInModal() {
        // show sign in page
        this.modalController.create({ component: SignInPage, componentProps: { Profile: this.userProfile } })
            .then(m => {
                m.onDidDismiss().then(() => {
                    // may have an updated user profile
                    this.refreshProfileView();
                });

                m.present();
            });

    }

    close() {
        this.modalController.dismiss();
    }
}
