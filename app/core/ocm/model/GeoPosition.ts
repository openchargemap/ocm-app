export class GeoLatLng implements Coordinates {
    //based on HTML Geolocation "Coordinates"
    public altitudeAccuracy: number;
    public longitude: number;
    public latitude: number;
    public speed: number;
    public heading: number;
    public altitude: number;
    public accuracy: number;

    constructor(lat: number = null, lng: number = null) {
        this.latitude = lat;
        this.longitude = lng;
    }
}

export class GeoPosition {
    //based on HTML Geolocation "Position"
    public coords: GeoLatLng;
    public timestamp: number;
    public attribution: string;

    constructor(lat: number = null, lng: number = null) {
        this.coords = new GeoLatLng();
        this.coords.latitude = lat;
        this.coords.longitude = lng;
    }

    static fromPosition(pos: Position): GeoPosition {
        return new GeoPosition(pos.coords.latitude, pos.coords.longitude);
    }
}