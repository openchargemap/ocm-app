import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.webprofusion.openchargemap",
  appName: "Open Charge Map",
  webDir: "www/browser",
  android: {
    buildOptions: {
      keystorePath: "c:/Work/GIT/ocm-private/Certs/Android/android.keystore",
      keystoreAlias: "ocm",
    },
  },
   plugins: {
    Keyboard: {
      resizeOnFullScreen: false
    }
  }
};

export default config;
