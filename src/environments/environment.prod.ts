import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

export const environment = {
  name: 'prod',
  version: '8.8.2',
  production: true,
  analyticsId: '',
  googleMapsKey: '',
  mapBoxToken: '',
  mapTilerToken: '',
  mapKitToken: '',
  enableStaticMaps: false,
  defaultMapProvider:  MappingAPI.MAPLIBRE, // 1: GM native 4: MapBox // 5:MappingAPI.MAPKIT_JS  //6: mapbox GL with Maptiler,
  apiBase: 'https://api.openchargemap.io',
  apiKey: '9bb03e5b-0fb2-4916-9b2b-26c6bd27a56a',
  enabledFeatures: ['MAP', 'ADD_COMMENT', 'ADD_PHOTO', 'FAVOURITES', 'FILTER_OPTIONS_BY_COUNTRY', 'ADD_POI', 'EDIT_POI', 'LAYERS']
};
