import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

export const environment = {
  name: 'prod',
  version: '7.0.1',
  production: true,
  analyticsId: 'UA-76936-21',
  googleMapsKey: '',
  mapBoxToken: '',
  mapKitToken: '',
  enableStaticMaps: false,
  defaultMapProvider: 4 //1: GM native 4:MapBox // 4:MappingAPI.MAPKIT_JS
};
