import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  name: 'dev',
  version: '8.6.1-dev',
  production: false,
  analyticsId: '',
  googleMapsKey: '',
  mapBoxToken: 'pk.eyJ1Ijoid2VicHJvZnVzaW9uIiwiYSI6ImNrdHZlbmVuYjI5ZXYydW51czN2MGw1dzcifQ.KdG2biLiQVEbE1fOLXrwQg',
  mapKitToken: '',
  enableStaticMaps: false,
  defaultMapProvider: 4, // 1: GM native 4: MapBox // 5:MappingAPI.MAPKIT_JS  //6: mapbox GL with Maptiler,
  apiBase: 'https://api-01.openchargemap.io',
  apiKey: '1d192491-c085-4563-9dbb-b1f09a2e9c66',
  enabledFeatures: ['MAP', 'ADD_COMMENT', 'ADD_PHOTO', 'FAVOURITES', 'FILTER_OPTIONS_BY_COUNTRY', 'ADD_POI', 'EDIT_POI','LAYERS']
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
 // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
