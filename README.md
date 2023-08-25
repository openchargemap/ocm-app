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

2. Install npm modules: `npm install` (depending on Angular version may require `npm install --legacy-peer-deps` or `npm install --force`)

3. To run in desktop browser: `ionic serve`

## Web production build:

Run `ionic build --prod` which will output html build to www folder. When updating live app, preserve web.config and favicon.
Copy `www` output to gh-pages branch and commit to publish. When updating live app, preserve CNAME and favicon.

## Platform Specifics

- Android and iOS, using Capacitor

  - Build app: `ionic build --prod`
  - Sync app content to platform: `npx cap sync`

  - iOS and Android versions historically have different bundle ids.

    - Android:
      - Update bundle id to com.webprofusion.openchargemap (including capacitor.config.json), version code in /app/build.gradle
      - npx cap add android
      - set required permissions per plugin in AndroidManifest.xml/ Gelocation
      - // resolve ERR_CLEARTEXT_NOT_PERMITTED debug error: add `android:usesCleartextTraffic="true"` to AndroidManifest.xml
      - Icons: Android Studio > Tools > Resource Manager > + New Image Asset, browse to Icon as SVG, scale 113%; trim yes; set background layer colour to #8BC43F
      - Splashscreen: open Tools > resource Manager and drag splashscreen image in to replace existing
      - Push notifications: copy google-services.json to app
      - Set version in Android Studio: app:build.gradle default config https://stackoverflow.com/a/26865465/1707154
      - build: `ionic build --prod`, `npx cap sync android`, `npx cap open android`, Generate Signed APK in Android Studio using private keystore
      - double check icons and splashscreens
    - iOS:
      - npx cap add ios
      - Update bundle id to org.openchargemap.app (including capacitor.config.json), version code, set Display Name to 'Open Charge' (for length)
      - Set Info.plist settings and permissions as required by Capacitor plugins:
        - Privacy Location Text (important for validation): 'Your location information will be used to find charging stations near you.' See https://capacitorjs.com/docs/apis/geolocation
        - [unused] Add Push Notifications capability
      - set splashscreen and icons: replace /ios/App/App/Assets with resources/ios/Assets
      - Release build:
        - `ionic build --prod`, `npx cap sync ios`
        - Update Version and Build ID in xcode
        - Target Generic iOS device, Product > Archive. Then Organizer > Distribute App > App Store Connect

## Type Docs

    `typedoc --options typedoc.json --exclude '**/*+(e2e|spec|index).ts' ./src/`
