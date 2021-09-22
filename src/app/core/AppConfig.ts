import { environment } from "../../environments/environment";

/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

export class AppConfig {
  public baseURL: string;
  public loginProviderRedirectBaseURL: string;
  public loginProviderRedirectURL: string;
  public enableLiveMapQuerying: boolean;
  public googleMapsAPIKey: string;
  public enableStaticMaps: boolean;

  constructor() {
    this.baseURL = "https://map.openchargemap.io";
    this.loginProviderRedirectBaseURL = "https://openchargemap.org/site/loginprovider/?_mode=silent&_forceLogin=true&_redirectURL=";
    this.loginProviderRedirectURL = this.loginProviderRedirectBaseURL + this.baseURL;
    this.enableLiveMapQuerying = true;
    this.googleMapsAPIKey = environment.googleMapsKey;

    this.enableStaticMaps = environment.enableStaticMaps;
  }
}
