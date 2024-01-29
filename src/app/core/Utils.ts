import { environment } from '../../environments/environment';

/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

declare var device: any;

export type FeatureOption = 'MAP' | 'ADD_POI' | 'EDIT_POI' | 'ADD_COMMENT' | 'ADD_PHOTO' | 'FAVOURITES' | 'ROUTE_PLANNER' | 'FILTER_OPTIONS_BY_COUNTRY' | 'ROUTE_PLANNER' | 'GOOGLE_MAPS' | 'LAYERS';

export class Utils {

    static isFeatureEnabled(feature: FeatureOption): boolean {
        if (environment.enabledFeatures.find(f => f === feature)) {
            return true;
        } else {
            return false;
        }
    }

    static getClientHeight(): number {
        const body = document.body, html = document.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        return height;
    }

    static getClientWidth(): number {
        const body = document.body, html = document.documentElement;
        const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
        return width;
    }

    static getMaxLevelOfPOI(poi) {
        let level = 0;

        if (poi.StatusTypeID==150){
            // planned for future date
            return 0;
        }
        
        if (poi.Connections != null) {
            for (let c = 0; c < poi.Connections.length; c++) {
                if (poi.Connections[c].Level != null && poi.Connections[c].Level.ID > level) {
                    level = poi.Connections[c].Level.ID;
                }
            }
        }

        if (level === 4) { level = 2; } // lvl 1&2
        if (level > 4) { level = 3; } // lvl 2&3 etc
        return level;
    }

    static getIconForPOI(poi) {
        const poiLevel = Utils.getMaxLevelOfPOI(poi);
        let iconURL = 'assets/images/icons/map/level' + poiLevel;

        if (poi.UsageType != null && poi.UsageType.Title.indexOf('Private') > -1) {
            iconURL += '_private';
        } else if (poi.StatusType != null && poi.StatusType.IsOperational !== true) {
            iconURL += '_nonoperational';
        } else {
            iconURL += '_operational';
        }

        iconURL += '_icon.png';
        return iconURL;
    }

    static getColorForPOI(poi): string {
        const poiLevel = Utils.getMaxLevelOfPOI(poi);
        let color = "#c0c0c0";

        if (poi.UsageType != null && poi.UsageType.Title.indexOf('Private') > -1) {
            color = "#FF0000";
        } else if (poi.StatusType != null && poi.StatusType.IsOperational !== true) {
            color = "#a0a0a0";
        } else {
            if (poiLevel == 2) {
                color = "#72EB0D";
            } else if (poiLevel == 3) {
                color = "#EB800D";
            }
        }

        return color;
    }

    static getIconForConnector(id: number): string {
        let iconURL = 'assets/images/icons/connectors/';
        if (id === 1) {
            iconURL += 'Type1_J1772.svg';
        } else if (id === 2) {
            iconURL += 'Chademo_type4.svg';
        } else if (id === 25) {
            iconURL += 'Type2_socket.svg';
        } else if (id === 32) {
            iconURL += 'Type1_CCS.svg';
        } else if (id === 33) {
            iconURL += 'Type2_CCS.svg';
        } else if (id === 1036) {
            iconURL += 'Type2_tethered.svg';
        } else if (id === 26) {
            iconURL += 'Type3c.svg';
        } else if (id === 28) {
            iconURL += 'schuko.svg';
        } else {
            iconURL += 'Unknown.svg';
        }
        return iconURL;
    }

    static getFormattedDistance(poi): string {
        if (poi && poi.AddressInfo && poi.AddressInfo.Distance) {
            return poi.AddressInfo.Distance.toFixed(1) + ' ' + (poi.AddressInfo.DistanceUnit === 1 ? 'km' : 'miles');
        } else {
            return '';
        }
    }

    static fixJSONDate(val) {
        if (val == null) { return null; }
        if (val.indexOf('/') == 0) {
            let pattern = /Date\(([^)]+)\)/;
            let results = pattern.exec(val);
            val = new Date(parseFloat(results[1]));
        } else {
            val = new Date(val);
        }
        return val;
    }

    /// Begin Standard data formatting methods ///
    static formatMapLinkFromPosition(poi, searchLatitude, searchLongitude, distance, distanceunit) {
        return '<a href="https://maps.google.com/maps?saddr='
            + searchLatitude + ',' + searchLongitude + '&daddr='
            + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude + '">Map (' + Math.ceil(distance) + ' ' + distanceunit + ')</a>';
    }

    static formatSystemWebLink(linkURL, linkTitle) {
        return '<a href=\'#\' onclick="window.open(\'' + linkURL + '\', \'_system\');return false;">' + linkTitle + '</a>';
    }

    static formatMapLink(poi, linkContent, isRunningUnderCordova: boolean) {
        if (isRunningUnderCordova) {
            if (device && device.platform == 'WinCE') {
                return this.formatSystemWebLink('maps:' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude, linkContent);
            } else if (device && device.platform === 'iOS') {
                return this.formatSystemWebLink(
                    'https://maps.apple.com/?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude, linkContent
                );
            } else {
                return this.formatSystemWebLink(
                    'https://maps.google.com/maps?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude, linkContent
                );
            }
        }
        // default to google maps online link
        return '<a target="_blank"  href="https://maps.google.com/maps?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude + '">' + linkContent + '</a>';
    }

    static formatURL(url, title: string = null) {
        if (url == null || url == '') { return ""; }
        if (url.indexOf('http') == -1) { url = "https://" + url; }
        return '<a target="_blank" href="' + url + '">' + (title != null ? title : url) + '</a>';
    }

    static formatPOIAddress = function (poi, includeLineBreaks: boolean = true) {
        let output = '';
        if (includeLineBreaks) {
            output = '' + this.formatTextField(poi.AddressInfo.AddressLine1) +
                this.formatTextField(poi.AddressInfo.AddressLine2) +
                this.formatTextField(poi.AddressInfo.Town) +
                this.formatTextField(poi.AddressInfo.StateOrProvince) +
                this.formatTextField(poi.AddressInfo.Postcode) +
                (poi.AddressInfo.Country != null ? this.formatTextField(poi.AddressInfo.Country.Title) : '');
        } else {
            output = this.formatStringArray([
                poi.AddressInfo.AddressLine1,
                poi.AddressInfo.AddressLine2,
                poi.AddressInfo.Town,
                poi.AddressInfo.StateOrProvince,
                poi.AddressInfo.Postcode,
                (poi.AddressInfo.Country != null ? poi.AddressInfo.Country.Title : '')
            ]);
        }
        return output;
    };

    static formatStringArray = function (list: Array<string>, separator: string = ', ') {
        if (list == null) { return ""; }
        let output = '';
        for (let i = 0; i < list.length; i++) {
            if (list[i] != null && list[i].trim() != '') {
                if (i == list.length - 1) {
                    output += list[i];
                } else {
                    output += list[i] + separator;
                }
            }
        }
        return output;
    };

    static formatString(val) {
        if (val == null) { return ""; }
        return val.toString();
    }

    static formatTextField(val, label: string = null, newlineAfterLabel: boolean = false, paragraph: boolean = false, resourceKey: string = null) {
        if (val == null || val == '' || val == undefined) { return ""; }
        let output = (label != null ? '<strong class=\'ocm-label\' ' + (resourceKey != null ? 'data-localize=\'' + resourceKey + '\' ' : '') + '>' + label + '</strong>: ' : '') + (newlineAfterLabel ? '<br/>' : '') + (val.toString().replace('\n', '<br/>')) + '<br/>';
        if (paragraph == true) { output = "<p>" + output + "</p>"; }
        return output;
    }

    static formatEmailAddress(email: string) {
        if (email != undefined && email != null && email != '') {
            return '<i class=\'fa fa-envelope fa-fw\'></i> <a href="mailto:' + email + '">' + email + '</a><br/>';
        } else {
            return '';
        }
    }

    static formatPhone(phone, labeltitle: string = null) {
        if (phone != undefined && phone != null && phone != '') {
            if (labeltitle == null) {
                labeltitle = '<i class=\'fa fa-phone fa-fw \'></i> ';
            } else {
                labeltitle += ': ';
            }

            return labeltitle + '<a href="tel:' + phone + '">' + phone + '</a><br/>';
        } else {
            return '';
        }
    }

    static formatPOIDetails(poi, fullDetailsMode: boolean) {
        let dayInMilliseconds = 86400000;
        let currentDate = new Date();

        if (fullDetailsMode == null) { fullDetailsMode = false; }

        let addressInfo = this.formatPOIAddress(poi, false);

        let contactInfo = '';
        contactInfo += this.formatPhone(poi.AddressInfo.ContactTelephone1);
        contactInfo += this.formatPhone(poi.AddressInfo.ContactTelephone2);
        contactInfo += this.formatEmailAddress(poi.AddressInfo.ContactEmail);

        let drivingInfo = '';

        if (poi.AddressInfo.Distance != null) {
            let directionsUrl = 'https://maps.google.com/maps?saddr=&daddr=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
            drivingInfo += '<strong id=\'addr_distance\'><span data-localize=\'details.approxDistance\'>Distance</span>: ' + poi.AddressInfo.Distance.toFixed(1) + ' ' + (poi.AddressInfo.DistanceUnit == 2 ? 'Miles' : 'KM') + '</strong>';
            drivingInfo += '<p>' + this.formatSystemWebLink(directionsUrl, 'Get Directions') + '</p>';
        }

        if (poi.AddressInfo.RelatedURL != null && poi.AddressInfo.RelatedURL != '') {
            let displayUrl = poi.AddressInfo.RelatedURL;
            // remove protocol from url
            displayUrl = displayUrl.replace(/.*?:\/\//g, '');
            // shorten url if over 40 characters
            if (displayUrl.length > 40) { displayUrl = displayUrl.substr(0, 40) + ".."; }
            contactInfo += '<i class=\'fa fa-fw fa-external-link\'></i>  ' + this.formatSystemWebLink(poi.AddressInfo.RelatedURL, '<span data-localize=\'details.addressRelatedURL\'>' + displayUrl + '</span>');
        }

        contactInfo += '</p>';

        const comments = this.formatTextField(poi.GeneralComments, null, false, true) +
            this.formatTextField(poi.AddressInfo.AccessComments, 'Access', true, true, 'details.accessComments');

        let additionalInfo = '';

        if (poi.NumberOfPoints != null) {
            additionalInfo += this.formatTextField(poi.NumberOfPoints, 'Bays', false, true, 'details.numberOfPoints');
        }

        if (poi.UsageType != null) {
            additionalInfo += this.formatTextField(poi.UsageType.Title, 'Usage', false, true, 'details.usageType');
        }

        if (poi.UsageCost != null) {
            additionalInfo += this.formatTextField(poi.UsageCost, 'Usage Cost', false, true, 'details.usageCost');
        }

        if (poi.OperatorInfo != null) {
            if (poi.OperatorInfo.ID != 1) { // skip unknown operators
                additionalInfo += this.formatTextField(poi.OperatorInfo.Title, 'Operator', false, true, 'details.operatorTitle');
                if (poi.OperatorInfo.WebsiteURL != null) {
                    additionalInfo += this.formatTextField(this.formatURL(poi.OperatorInfo.WebsiteURL), 'Operator Website', true, true, 'details.operatorWebsite');
                }
            }
        }

        let equipmentInfo = '';

        if (poi.StatusType != null) {
            equipmentInfo += this.formatTextField(poi.StatusType.Title, 'Status', false, true, 'details.operationalStatus');
            if (poi.DateLastStatusUpdate != null) {
                equipmentInfo += this.formatTextField(Math.round(((<any>currentDate - <any>this.fixJSONDate(poi.DateLastStatusUpdate)) / dayInMilliseconds)) + ' days ago', 'Last Updated', false, true, 'details.lastUpdated');
            }
        }

        // output table of connection info
        if (poi.Connections != null) {
            if (poi.Connections.length > 0) {
                equipmentInfo += '<table class=\'table table-striped\'>';
                equipmentInfo += '<tr><th data-localize=\'details.equipment.connectionType\'>Connection</th><th data-localize=\'details.equipment.powerLevel\'>Power Level</th><th data-localize=\'details.operationalStatus\'>Status</th></tr>';

                for (let c = 0; c < poi.Connections.length; c++) {
                    let con = poi.Connections[c];
                    if (con.Amps == '') { con.Amps = null; }
                    if (con.Voltage == '') { con.Voltage = null; }
                    if (con.Quantity == '') { con.Quantity = null; }
                    if (con.PowerKW == '') { con.PowerKW = null; }

                    equipmentInfo += '<tr>' +
                        '<td>' + (con.ConnectionType != null ? con.ConnectionType.Title : '') + '</td>' +
                        '<td>' + (con.Level != null ? '<strong>' + con.Level.Title + '</strong><br/>' : '') +
                        (con.Amps != null ? this.formatString(con.Amps) + 'A/ ' : '') +
                        (con.Voltage != null ? this.formatString(con.Voltage) + 'V/ ' : '') +
                        (con.PowerKW != null ? this.formatString(con.PowerKW) + 'kW <br/>' : '') +
                        (con.CurrentType != null ? con.CurrentType.Title : '') + '<br/>' +
                        (con.Quantity != null ? this.formatString(con.Quantity) : '1') + ' Present' +
                        '</td>' +
                        '<td>' + (con.StatusType != null ? con.StatusType.Title : '-') + '</td>' +
                        '</tr>';
                }
                equipmentInfo += '</table>';
            }
        }

        let advancedInfo = '';
        advancedInfo += this.formatTextField('<a target=\'_blank\' href=\'https://openchargemap.org/site/poi/details/' + poi.ID + '\'>OCM-' + poi.ID + '</a>', 'OpenChargeMap Ref', false, true, 'details.refNumber');
        if (poi.DataProvider != null) {
            advancedInfo += this.formatTextField(poi.DataProvider.Title, 'Data Provider', false, true, 'details.dataProviderTitle');
            if (poi.DataProvider.WebsiteURL != null) {
                advancedInfo += this.formatTextField(this.formatURL(poi.DataProvider.WebsiteURL), 'Website', false, true, 'details.dataProviderWebsite');
            }
            advancedInfo += this.formatTextField(poi.AddressInfo.Latitude, 'Latitude', false, true, null);
            advancedInfo += this.formatTextField(poi.AddressInfo.Longitude, 'Longitude', false, true, null);
        }

        let output = {
            'address': addressInfo,
            'drivingInfo': drivingInfo,
            'contactInfo': contactInfo,
            'additionalInfo': comments + additionalInfo + equipmentInfo,
            'advancedInfo': advancedInfo
        };
        return output;
    }

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // http://davidwalsh.name/javascript-debounce-function
    static debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) { func.apply(context, args); }
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) { func.apply(context, args); }
        };
    }

    static getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
