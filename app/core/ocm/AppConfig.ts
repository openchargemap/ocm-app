/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

export class AppConfig {
    public baseURL: string;
    public loginProviderRedirectBaseURL: string;
    public loginProviderRedirectURL: string;

    constructor() {
        this.baseURL = "http://openchargemap.org/app/";
        this.loginProviderRedirectBaseURL = "http://openchargemap.org/site/loginprovider/?_mode=silent&_forceLogin=true&_redirectURL=";
        this.loginProviderRedirectURL = this.loginProviderRedirectBaseURL + this.baseURL;
    }


}


