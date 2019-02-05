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
    - iOS fresh setup: <ios>/pod deintegrate, pod install