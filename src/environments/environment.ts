import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  name:'dev',
  production: false,
  googleMapsKey: 'AIzaSyDIb4CIuIkLg_C6fzuCbTwNEJcLKXZ4Xxo',
  mapBoxToken:'pk.eyJ1Ijoid2VicHJvZnVzaW9uIiwiYSI6ImNqbzJqYTZ5eDBteXIzd3FzNGJ0ZjFpYzcifQ.b9Sy_pRRDRS_dTSLaB65Kg',
  mapKitToken:'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZZQ1lESkdHNTMifQ.eyJpc3MiOiIyTDdMUDk1MlhZIiwiaWF0IjoxNTQ4OTkxNDU4LCJleHAiOjE1ODM4MTA2NTh9.2HZSX7x7K_OG-TLGldYQtouuC3GpSruyJtU8bRIFhKHuyVr-QnRb3IxnfBuFr3J0Ofu2R2dU7ORBn4bgbNHdcw',
  enableStaticMaps: false,
  defaultMapProvider: 1 //1: GM native 3: MapBox // 4:MappingAPI.MAPKIT_JS
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
 // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
