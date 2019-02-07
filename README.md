# ocm-app
The OCM web and mobile app

Implement using Ionic, Angular and TypeScript

Install Ionic CLI & Cordova:
> npm install -g cordova ionic

Build and test:
> npm install

> ionic serve


Platforn Specifics
- Web uses the MapKitJS mapping provider
    - ionic cordova build browser --prod
- Android and iOS use the Google Maps Native mapping provider
    - iOS and Android versions historically have different bundle ids.
    - iOS fresh setup: install and update latest cocoapods version, then  /platforms/ios/ pod deintegrate, pod install
        - change bundle id to org.openchargemap.app and name to Open Charge (Open Charge Map is too long)
        - Use square icon for iOS
        - File> Workspace> Legacy Build
        - ionic cordova platform remove ios
        - ionic cordova platform add ios
        - platforms/ios/ pod deintegrate, pod install
        - ionic cordova prepare ios --prod