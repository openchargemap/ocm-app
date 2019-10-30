import { GeoLatLng } from './GeoPosition';
import { AddressInfo } from 'net';
import { ExtendedAddressInfo } from './CoreDataModel';

export class PlaceSearchResult {
    Location: GeoLatLng;
    Title: string;
    Address: string;
    Type: string;
    ReferenceID: string;
    Attribution: string;
    AddressInfo?: ExtendedAddressInfo;
}
