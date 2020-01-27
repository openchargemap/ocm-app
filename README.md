# The Open Charge Map app (web and mobile)
This app provides the map user interface for browsing data on Open Charge Map (https://map.openchargemap.io). It can also be embedded by other websites using an iframe.

The app is implemented using the Angular version of the Ionic Framework.

## Configuration
The build/runtime configuration settings are in `/src/environments/environment.ts` and `environment.prod.ts`
The `.prod.ts` version is used when you build with the `--prod` flag

At a minimum the `apiBase` setting must be set to a working OCM API host and the `mapBoxToken` must be set to a real mapbox API key.

Feature toggles are defined by the `enabledFeatures` array, the app will check for the presence of a feature in this array before enabling related UI. This is where additional feature toggles would be defined and this allows dev and prod versions to have different features toggled on.

## Build Requirements (Windows/mac OS)

1. Install Ionic CLI & Cordova:
`npm install -g cordova ionic`

2. Install npm modules: `npm install`

3. To run in desktop browser: `ionic serve`

## Web production build:
Run `ionic build --prod` which will output html build to www folder. When updating live app, preserve web.config and favicon.

## Platform Specifics
- Web uses a web/js mapping provider for the browser version
    - ionic cordova plugin remove cordova-plugin-inappbrowser
    - ionic cordova build browser --prod
- Android and iOS
    - ionic cordova plugin add cordova-plugin-inappbrowser
    - iOS and Android versions historically have different bundle ids.
    - iOS fresh setup: install and update latest cocoapods version, then  /platforms/ios/ pod deintegrate, pod install
        - change bundle id to org.openchargemap.app and name to Open Charge (Open Charge Map is too long)
        - Use square icon for iOS
        - File> Workspace> Legacy Build
        - ionic cordova platform remove ios
        - ionic cordova platform add ios
        - platforms/ios/ pod deintegrate, pod install
        - ionic cordova prepare ios --prod
    - using capacitor:
        - Android:
            - npx cap add android
            - resolve ERR_CLEARTEXT_NOT_PERMITTED debug error: add `android:usesCleartextTraffic="true"` to AndroidManifest.xml
            - Icons: Android Studio > Res > New Image Asset, browse to Icon, replace, scale 71% set background to #8BC43F
            - Splashscreen: use apetools to generate 'splash.png' variants, remove unused existing default screens
            - Push notifications: copy google-services.json to app
            - build: `ionic build --prod`, `npx cap sync`, `npx cap open android`


## Type Docs
    `typedoc --options typedoc.json --exclude '**/*+(e2e|spec|index).ts' ./src/`