/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

export class AppConfig {
  public baseURL: string;
  public loginProviderRedirectBaseURL: string;
  public loginProviderRedirectURL: string;
  public enableLiveMapQuerying: boolean;
  public mapsAPIKey: string;

  constructor() {
    this.baseURL = "https://openchargemap.org/app/";
    this.loginProviderRedirectBaseURL = "https://openchargemap.org/site/loginprovider/?_mode=silent&_forceLogin=true&_redirectURL=";
    this.loginProviderRedirectURL = this.loginProviderRedirectBaseURL + this.baseURL;
    this.enableLiveMapQuerying = true;
    this.mapsAPIKey = "AIzaSyASE98mCjV1bqG4u2AUHqftB8Vz3zr2sEg";
  }
}
