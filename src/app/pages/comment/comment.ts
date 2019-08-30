import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserComment } from '../../model/CoreDataModel';

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
            CommentTypeID: 10,
            Rating: null
        };

        this.poi = this.navParams.get('poi');

        this.commentTypes = appManager.referenceDataManager.getCommentTypes(true, true);
        this.checkinTypes = appManager.referenceDataManager.getCheckinStatusTypes(true, true);
    }

    onPageWillEnter() {

    }

    cancel() {
        this.modalController.dismiss();
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

                this.appManager.analytics.appEvent("Comment", "Failed");
            });

        if (submission) {
            this.logging.log('Comment submitted');

            await loading.dismiss();
            await this.modalController.dismiss();
            this.appManager.analytics.appEvent("Comment", "Submitted");
        }
    }
}
