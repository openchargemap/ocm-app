import {Page} from 'ionic-angular';
import {APIClient} from '../../core/ocm/services/APIClient';


@Page({
    templateUrl: 'build/pages/profile/template.html'
})
export class ProfilePage {
   
    api: APIClient;

    constructor(api: APIClient) {
       
    }
    onPageWillEnter() {
        //if not signed in, show sign in page
        alert("got here");
    }

    log(msg: string) {
        if (window.console) {
            console.log(msg);
        }
    }
}
