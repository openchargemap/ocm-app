import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

export const environment = {
  name: 'prod',
  production: true,
  googleMapsKey: '',
  mapBoxToken: '',
  mapKitToken: '',
  enableStaticMaps: false,
  defaultMapProvider: 4 //1: GM native 4:MapBox // 4:MappingAPI.MAPKIT_JS
};
