# The Open Charge Map app (web and mobile)
This app provides the map user interface for browsing data on Open Charge Map (https://map.openchargemap.io). It can also be embedded by other websites using an iframe.

The app is implemented using the Angular version of the Ionic Framework.

## Configuration
The build/runtime configuration settings are in `/src/environments/environment.ts` and `environment.prod.ts`
The `.prod.ts` version is used when you build with the `--prod` flag

At a minimum the `apiBase` setting must be set to a working OCM API host and the `mapBoxToken` must be set to a real mapbox API key.

Feature toggles are defined by the `enabledFeatures` array, the app will check for the presence of a feature in this array before enabling related UI. This is where additional feature toggles would be defined and this allows dev and prod versions to have different features toggled on.

## Build Requirements (Windows/mac OS)

1. Install Ionic CLI
`npm install -g @ionic/cli`

2. Install npm modules: `npm install`

3. To run in desktop browser: `ionic serve`

## Web production build:
Run `ionic build --prod` which will output html build to www folder. When updating live app, preserve web.config and favicon.
Copy `www` output to gh-pages branch and commit to publish. When updating live app, preserve CNAME and favicon.

## Platform Specifics
- Web uses a web/js mapping provider for the browser version
    - ionic build --prod
- Android and iOS
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
            - Update bundle id to com.webprofusion.openchargemap (including capacitor.config.json), version code in /app/build.gradle
            - npx cap add android
            - // resolve ERR_CLEARTEXT_NOT_PERMITTED debug error: add `android:usesCleartextTraffic="true"` to AndroidManifest.xml
            - Icons: Android Studio > Res > New Image Asset, browse to Icon,  scale 100%; trim yes; set background to #8BC43F
            - Splashscreen: use apetools to generate 'splash.png' variants, remove unused existing default screens
            - Push notifications: copy google-services.json to app
            - Set version in Android Studio: app:build.gradle default config  https://stackoverflow.com/a/26865465/1707154
            - build: `ionic build --prod`, `npx cap sync android`, `npx cap open android`, Generate Signed APK in Android Studio
            - double check icons and splashscreens
        - iOS:
            - npx cap add ios
            - Update bundle id to org.openchargemap.app (including capacitor.config.json), version code, set Display Name to 'Open Charge' (for length)
            - Set Info.plist settings and permissions as required by Capacitor plugins: 
                - Status Bar: UIViewControllerBasedStatusBarAppearance : Yes
                - Privacy Location Text (important for validation): 'Your location information will be used to find charging stations near you.'
                - Add Push Notifications capability
            - set splashscreen and icons: replace Assets with resources/Assets
            - Release build:
                - `ionic build --prod`, `npx cap sync ios`
                - Update Version and Build ID in xcode
                - Target Generic iOS device, Product > Archive, Distribute App > App Store Connect



## Type Docs
    `typedoc --options typedoc.json --exclude '**/*+(e2e|spec|index).ts' ./src/`