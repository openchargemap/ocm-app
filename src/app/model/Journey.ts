import { GeoLatLng } from './GeoPosition';
import { SyncItem } from './SyncItem';


export interface ISyncItem {
    _sync: SyncItem;
}

export class JourneyBaseItem implements ISyncItem {
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

export class JourneyRouteLeg {
    public Title: string;
    public DistanceKM: number;
    public DurationMinutes: number;
    public StartElevation: number;
    public EndElevation: number;
    public EnergyConsumptionkWh: number;
}
export class JourneyRoute {
    public Title: string;
    public JourneyRouteLegs: Array<JourneyRouteLeg>;
    public TotalDistanceKM: number;
    public TotalDurationMinutes: number;
    public TotalEnergykWh: number;
}
