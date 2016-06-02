import {GeoLatLng} from './GeoPosition';
import {SyncItem} from './SyncItem';


export interface ISyncItem {
    _sync: SyncItem;
}

class JourneyBaseItem implements ISyncItem {
    public Title: string;
    public Notes: string;
    public _sync: SyncItem;

    constructor(itemType: string, schemaVersion: number) {
        this._sync = new SyncItem(itemType, schemaVersion);
    }
}

export class BookmarkedPOI extends JourneyBaseItem implements ISyncItem {
    public PoiID: number;
    public Type: string;
    public Poi: any;
    public Photos: any;
    public _sync: SyncItem;
}

export class WayPoint extends JourneyBaseItem {

    public Stage: number;
    public Position: GeoLatLng;
    public PoiIDs: Array<number>;
    public PoiList: Array<BookmarkedPOI>;

    public constructor() {
        super("waypoint", 1);
    }

}

export class JourneyStage extends JourneyBaseItem {

    public WayPoints: Array<WayPoint>;

    public constructor() {
        super("journey_stage", 1);

        this.WayPoints = [];
    }
}

export class Journey extends JourneyBaseItem {

    public ID: string;

    public Stages: Array<JourneyStage>;



    public constructor() {
        super("journey", 1);
        this.ID = "" + Date.now();
        this.Stages = [];

    }
}