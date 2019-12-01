import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

export const environment = {
  name: 'prod',
  version: '7.1.0',
  production: true,
  analyticsId: '',
  googleMapsKey: '',
  mapBoxToken: '',
  mapKitToken: '',
  enableStaticMaps: false,
  defaultMapProvider: 4, //1: GM native 4: MapBox // 5:MappingAPI.MAPKIT_JS  //6: mapbox GL with Maptiler,
  apiBase: 'https://api.openchargemap.io/',
  apiKey:'',
  enabledFeatures: [ 'MAP', 'ADD_COMMENT', 'ADD_PHOTO', 'FAVOURITES', 'FILTER_OPTIONS_BY_COUNTRY']
};
