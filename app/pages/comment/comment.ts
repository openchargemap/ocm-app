import {Component} from '@angular/core';
import {NavController, NavParams, Modal, Alert, Loading} from 'ionic-angular';
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
    constructor(private navParams: NavParams, public appManager: AppManager, public nav: NavController) {

        this.commentModel = <UserComment>{
            ChargePointID: this.navParams.get('id'),
            Comment: "",
            CheckinStatusTypeID: 0,
            UserCommentTypeID: 10,
            Rating: 4
        };

        this.poi = this.navParams.get('poi');

        this.commentTypes = appManager.referenceDataManager.getCommentTypes(true, true);
        this.checkinTypes = appManager.referenceDataManager.getCheckinStatusTypes(true, true);
    }

    onPageWillEnter() {

    }

    cancel() {

        this.nav.pop();
    }

    add() {
        let loading = Loading.create({
            content: "Sending ..",
            dismissOnPageChange: true
        });

        this.nav.present(loading);

        //alert("Would submit "+JSON.stringify(this.commentModel));


        this.appManager.submitComment(this.commentModel).then((response) => {
            alert("Comment Published.");
            this.nav.pop();
        }) /*, (rejection) => {
            /*if (rejection == null  && rejection.ok && rejection.ok == true) {
                this.nav.pop();
            } else {
                alert("There was a problem submitting your comment.");

                loading.dismiss();
            }*/
            .catch((rejected) => {
               
                    alert("There was a problem submitting your comment." + JSON.stringify(rejected));

                    loading.dismiss();
              
            });

    }
}
