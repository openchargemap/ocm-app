Open Charge Map App
======

This is a work in progress app for Open Charge Map built using Ionic 2 with Angular 2 and TypeScript.

Plugin Notes:

Required for geolocation: ionic plugin add cordova-plugin-geolocation
Required for native maps: 

from npm: cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID= --variable API_KEY_FOR_IOS=
from github: cordova plugin add https://github.com/phonegap-googlemaps-plugin/cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID= --variable API_KEY_FOR_IOS=

- required Google Play Services and Android Support Repository
- need to authorize debug SHA key for API: 
        
    keytool -exportcert -alias androiddebugkey -keystore path-to-debug-or-production-keystore -list -v
    
iOS wkWebview
    ionic plugin add cordova-plugin-wkwebview-engine
    <allow-navigation href="gap:*" />
Other plugins:



com.googlemaps.ios 1.13.0 "Google Map iOS SDK for Cordova"
cordova-plugin-googlemaps 1.3.9 "phonegap-googlemaps-plugin"


ionic plugin rm cordova-plugin-console
ionic plugin rm cordova-plugin-device
ionic plugin rm cordova-plugin-geolocation
ionic plugin rm cordova-plugin-compat
ionic plugin rm cordova-plugin-statusbar
ionic plugin rm cordova-plugin-whitelist
ionic plugin rm cordova-plugin-wkwebview-engine
ionic plugin rm ionic-plugin-keyboard
ionic plugin rm cordova-plugin-splashscreen

    -note: not having the correct splashscreen image will cause loading errors

ionic plugin add cordova-plugin-console
ionic plugin add cordova-plugin-device
ionic plugin add cordova-plugin-geolocation
ionic plugin add cordova-plugin-statusbar
ionic plugin add cordova-plugin-whitelist
ionic plugin add cordova-plugin-wkwebview-engine
ionic plugin add ionic-plugin-keyboard
ionic plugin add cordova-plugin-splashscreen