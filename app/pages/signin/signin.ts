import {Page} from 'ionic-angular';
import {APIClient} from '../../core/ocm/services/APIClient';


@Page({
    templateUrl: 'build/pages/signin/signin.html'
})
export class SignInPage {
    email: string;
    password: string;
    api: APIClient;

    constructor(api: APIClient) {
        this.email = "test@gmail.com";
        this.api = api;
    }
    performSignIn() {

        //sign in with supplied email address and password
        this.api.performSignIn(this.email, this.password).then(() => {
            this.log("Got sign in response");
            alert("Signed in as " + this.api.authResponse.Data.UserProfile.Username);
            localStorage.setItem("authResponse", JSON.stringify(this.api.authResponse));

            //post test comment
/*
            var comment = {
                "ChargePointID": 60624,
                "CommentTypeID": 10,
                "UserName": "A. Nickname",
                "Comment": "This place is awesome, free cake for EV owners!",
                "Rating": 5,
                "RelatedURL": "http://awesomevplace.com",
                "CheckinStatusTypeID": 0
            };
            this.api.submitUserComment(comment);
*/
        }).catch((reason) => {
            alert("Invalid email addresss or password");
            this.log("Error logging in:" + reason);
        });
    }

    log(msg: string) {
        if (window.console) {
            console.log(msg);
        }
    }
}
