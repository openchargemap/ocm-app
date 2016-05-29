import {GeoLatLng} from './GeoPosition';

export class WayPoint{
    public Title: string;
    public Notes: string;
    public Stage: number;
    public Position: GeoLatLng;
    public PoiIDs:Array<number>;
    public PoiList: Array<any>;
   
}

export class Journey{
    public ID:string;
    public Title:string;
    public Notes: string;
    public WayPoints: Array<WayPoint>;
    
    public constructor(){
        this.ID = ""+Date.now;
        this.WayPoints=[];
    }
}