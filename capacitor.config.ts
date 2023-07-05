import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.webprofusion.openchargemap',
  appName: 'Open Charge Map',
  webDir: 'www',
  bundledWebRuntime: false
,
    android: {
       buildOptions: {
          keystorePath: 'c:\Work\GIT\ocm-private\Certs\Android\android.keystore',
          keystoreAlias: 'ocm',
       }
    }
  };

export default config;
