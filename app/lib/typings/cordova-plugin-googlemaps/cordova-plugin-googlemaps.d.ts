declare var PLUGIN_NAME: string;
declare var MARKERS: {};
declare var KML_LAYERS: {};
declare var OVERLAYS: {};
/**
 * Google Maps model.
 */
declare var BaseClass: () => any;
declare var App: () => void;
declare function onBackbutton(): void;
declare var _append_child: (event: any) => void;
declare var _remove_child: (event: any) => void;
/********************************************************************************
 * @name CameraPosition
 * @class This class represents new camera position
 * @property {LatLng} target The location where you want to show
 * @property {Number} [tilt] View angle
 * @property {Number} [zoom] Zoom level
 * @property {Number} [bearing] Map orientation
 * @property {Number} [duration] The duration of animation
 *******************************************************************************/
declare var CameraPosition: (params: any) => void;
/*****************************************************************************
 * Location Class
 *****************************************************************************/
declare var Location: {
    new (): Location;
    prototype: Location;
};
/*******************************************************************************
 * @name LatLng
 * @class This class represents new camera position
 * @param {Number} latitude
 * @param {Number} longitude
 ******************************************************************************/
declare var LatLng: (latitude: any, longitude: any) => void;
/*****************************************************************************
 * Marker Class
 *****************************************************************************/
declare var Marker: (map: any, id: any, markerOptions: any) => void;
/*****************************************************************************
 * Circle Class
 *****************************************************************************/
declare var Circle: (map: any, circleId: any, circleOptions: any) => void;
/*****************************************************************************
 * Polyline Class
 *****************************************************************************/
declare var Polyline: (map: any, polylineId: any, polylineOptions: any) => void;
/*****************************************************************************
 * Polygon Class
 *****************************************************************************/
declare var Polygon: (map: any, polygonId: any, polygonOptions: any) => void;
/*****************************************************************************
 * TileOverlay Class
 *****************************************************************************/
declare var TileOverlay: (map: any, tileOverlayId: any, tileOverlayOptions: any) => void;
/*****************************************************************************
 * GroundOverlay Class
 *****************************************************************************/
declare var GroundOverlay: (map: any, groundOverlayId: any, groundOverlayOptions: any) => void;
/*****************************************************************************
 * KmlOverlay Class
 *****************************************************************************/
declare var KmlOverlay: (map: any, kmlOverlayId: any, kmlOverlayOptions: any) => void;
/*****************************************************************************
 * LatLngBounds Class
 *****************************************************************************/
declare var LatLngBounds: () => void;
/*****************************************************************************
 * Private functions
 *****************************************************************************/
declare function isHTMLColorString(inputValue: any): boolean;
declare function HTMLColor2RGBA(colorValue: any, defaultOpacity: any): any;
/**
 * http://d.hatena.ne.jp/ja9/20100907/1283840213
 */
declare function HLStoRGB(h: any, l: any, s: any): any[];
declare function parseBoolean(boolValue: any): boolean;
declare function isDom(element: any): boolean;
declare function getPageRect(): {
    'width': number;
    'height': number;
    'left': number;
    'top': number;
};
declare function getDivRect(div: any): {
    'left': any;
    'top': any;
    'width': any;
    'height': any;
};
declare function onMapResize(event: any): void;
/*****************************************************************************
 * External service
 *****************************************************************************/
declare var externalService: {};
/*****************************************************************************
 * Geocoder class
 *****************************************************************************/
declare var Geocoder: {};
/*****************************************************************************
 * Watch dog timer for child elements
 *****************************************************************************/
declare var _mapInstance: any;
/*****************************************************************************
 * geometry Encode / decode points
 * http://jsfiddle.net/8nzg7tta/
 *****************************************************************************/
declare function decodePath(encoded: any, precision: any): any[];
declare function encodePath(points: any): string;
declare function encodePoint(plat: any, plng: any, lat: any, lng: any): string;
declare function encodeSignedNumber(num: any): string;
declare function encodeNumber(num: any): string;
declare function getAllChildren(root: any): any[];
declare var HTML_COLORS: {
    "aliceblue": string;
    "antiquewhite": string;
    "aqua": string;
    "aquamarine": string;
    "azure": string;
    "beige": string;
    "bisque": string;
    "black": string;
    "blanchedalmond": string;
    "blue": string;
    "blueviolet": string;
    "brown": string;
    "burlywood": string;
    "cadetblue": string;
    "chartreuse": string;
    "chocolate": string;
    "coral": string;
    "cornflowerblue": string;
    "cornsilk": string;
    "crimson": string;
    "cyan": string;
    "darkblue": string;
    "darkcyan": string;
    "darkgoldenrod": string;
    "darkgray": string;
    "darkgrey": string;
    "darkgreen": string;
    "darkkhaki": string;
    "darkmagenta": string;
    "darkolivegreen": string;
    "darkorange": string;
    "darkorchid": string;
    "darkred": string;
    "darksalmon": string;
    "darkseagreen": string;
    "darkslateblue": string;
    "darkslategray": string;
    "darkslategrey": string;
    "darkturquoise": string;
    "darkviolet": string;
    "deeppink": string;
    "deepskyblue": string;
    "dimgray": string;
    "dimgrey": string;
    "dodgerblue": string;
    "firebrick": string;
    "floralwhite": string;
    "forestgreen": string;
    "fuchsia": string;
    "gainsboro": string;
    "ghostwhite": string;
    "gold": string;
    "goldenrod": string;
    "gray": string;
    "grey": string;
    "green": string;
    "greenyellow": string;
    "honeydew": string;
    "hotpink": string;
    "indianred ": string;
    "indigo  ": string;
    "ivory": string;
    "khaki": string;
    "lavender": string;
    "lavenderblush": string;
    "lawngreen": string;
    "lemonchiffon": string;
    "lightblue": string;
    "lightcoral": string;
    "lightcyan": string;
    "lightgoldenrodyellow": string;
    "lightgray": string;
    "lightgrey": string;
    "lightgreen": string;
    "lightpink": string;
    "lightsalmon": string;
    "lightseagreen": string;
    "lightskyblue": string;
    "lightslategray": string;
    "lightslategrey": string;
    "lightsteelblue": string;
    "lightyellow": string;
    "lime": string;
    "limegreen": string;
    "linen": string;
    "magenta": string;
    "maroon": string;
    "mediumaquamarine": string;
    "mediumblue": string;
    "mediumorchid": string;
    "mediumpurple": string;
    "mediumseagreen": string;
    "mediumslateblue": string;
    "mediumspringgreen": string;
    "mediumturquoise": string;
    "mediumvioletred": string;
    "midnightblue": string;
    "mintcream": string;
    "mistyrose": string;
    "moccasin": string;
    "navajowhite": string;
    "navy": string;
    "oldlace": string;
    "olive": string;
    "olivedrab": string;
    "orange": string;
    "orangered": string;
    "orchid": string;
    "palegoldenrod": string;
    "palegreen": string;
    "paleturquoise": string;
    "palevioletred": string;
    "papayawhip": string;
    "peachpuff": string;
    "peru": string;
    "pink": string;
    "plum": string;
    "powderblue": string;
    "purple": string;
    "rebeccapurple": string;
    "red": string;
    "rosybrown": string;
    "royalblue": string;
    "saddlebrown": string;
    "salmon": string;
    "sandybrown": string;
    "seagreen": string;
    "seashell": string;
    "sienna": string;
    "silver": string;
    "skyblue": string;
    "slateblue": string;
    "slategray": string;
    "slategrey": string;
    "snow": string;
    "springgreen": string;
    "steelblue": string;
    "tan": string;
    "teal": string;
    "thistle": string;
    "tomato": string;
    "turquoise": string;
    "violet": string;
    "wheat": string;
    "white": string;
    "whitesmoke": string;
    "yellow": string;
    "yellowgreen": string;
};
