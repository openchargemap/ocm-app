import { MappingAPI } from "../app/services/mapping/interfaces/mapping";

export const environment = {
  production: true,
  googleMapsKey: 'AIzaSyASE98mCjV1bqG4u2AUHqftB8Vz3zr2sEg',
  mapBoxToken:'pk.eyJ1Ijoid2VicHJvZnVzaW9uIiwiYSI6ImNqbzJqYTZ5eDBteXIzd3FzNGJ0ZjFpYzcifQ.b9Sy_pRRDRS_dTSLaB65Kg',
  mapKitToken:'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZZQ1lESkdHNTMifQ.eyJpc3MiOiIyTDdMUDk1MlhZIiwiaWF0IjoxNTQ4OTkxNDU4LCJleHAiOjE1ODM4MTA2NTh9.2HZSX7x7K_OG-TLGldYQtouuC3GpSruyJtU8bRIFhKHuyVr-QnRb3IxnfBuFr3J0Ofu2R2dU7ORBn4bgbNHdcw',
  enableStaticMaps: false,
  defaultMapProvider: 4 // MappingAPI.MAPKIT_JS
};
