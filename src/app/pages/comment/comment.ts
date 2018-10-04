import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { UserComment } from './../../model/UserComment';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'comment.html'
})

export class CommentPage {

    commentModel: UserComment;
    poi: any;

    commentTypes: any;
    checkinTypes: any;

    constructor(
        public navParams: NavParams,
        public appManager: AppManager,
        public nav: NavController,
        public zone: NgZone,
        public loadingController: LoadingController,
        public modalController: ModalController,
        public logging: Logging,
        public router: Router
    ) {

        this.commentModel = <UserComment>{
            ChargePointID: this.navParams.get('id'),
            Comment: '',
            CheckinStatusTypeID: 10,
            UserCommentTypeID: 10,
            Rating: null
        };

        this.poi = this.navParams.get('poi');

        this.commentTypes = appManager.referenceDataManager.getCommentTypes(true, true);
        this.checkinTypes = appManager.referenceDataManager.getCheckinStatusTypes(true, true);
    }

    onPageWillEnter() {

    }

    cancel() {
        // TODO:
    }

    async add() {
        const loading = await this.loadingController.create({
            message: 'Sending ..',
            // dismissOnPageChange: true
        });

        await loading.present();

        let submission = await this.appManager.submitComment(this.commentModel).catch(
            (rejection) => {

                this.appManager.showToastNotification('There was a problem submitting your comment.');

                this.loadingController.dismiss();

            });

        this.logging.log('Comment submitted');

        await loading.dismiss();
        await this.modalController.dismiss();

    }
}
