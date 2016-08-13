import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, LoadingController, ViewController    } from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {UserComment} from '../../core/ocm/model/AppModels';

@Component({
    templateUrl: 'build/pages/comment/comment.html',
    directives: []
})

export class CommentPage {

    commentModel: UserComment;
    poi: any;

    commentTypes: any;
    checkinTypes: any;
    constructor(
        private navParams: NavParams,
        private appManager: AppManager,
        private nav: NavController,
        private view: ViewController,
        private zone: NgZone,
        private loadingController: LoadingController
    ) {

        this.commentModel = <UserComment>{
            ChargePointID: this.navParams.get('id'),
            Comment: "",
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

        //this.nav.pop();
        this.view.dismiss();
    }

    add() {
        let loading = this.loadingController.create({
            content: "Sending ..",
            dismissOnPageChange: true
        });

        loading.present();

        this.appManager.submitComment(this.commentModel).then((response) => {
            this.appManager.log("Comment submitted");
            loading.dismiss().then(() => {
                this.view.dismiss();
            }
            );

        }, (rejection) => {

            this.appManager.showToastNotification(this.nav, "There was a problem submitting your comment.");

            loading.dismiss();

        });

    }
}
