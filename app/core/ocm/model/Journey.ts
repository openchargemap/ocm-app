import {GeoLatLng} from './GeoPosition';

export class WayPoint{
    public Title: string;
    public Notes: string;
    public Stage: number;
    public Position: GeoLatLng;
    public PoiList: Array<any>;
}

export class Journey{
    public Title:string;
    public Notes: string;
    public WayPoints: Array<WayPoint>;
}