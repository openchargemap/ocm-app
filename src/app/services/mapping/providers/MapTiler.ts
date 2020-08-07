
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Utils } from '../../../core/Utils';
import { MappingAPI, IMapProvider, MapOptions, IMapManager } from '../interfaces/mapping';
import { Events } from '../../../services/Events';
import { Logging, LogLevel } from './../../Logging';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapBoxMapProvider } from './MapBox';

/**Map Provider for MapTiler MapBoxGL JS API
* @module MapProviders
*/

@Injectable()
export class MapTilerMapProvider extends MapBoxMapProvider {

  /** @constructor */
  constructor(events: Events, logging: Logging, http: HttpClient) {
    super(events, logging, http);
    this.mapAPIType = MappingAPI.MAPTILER;
    this.mapTileSet = 'https://maps.tilehosting.com/styles/streets/style.json?key=Gs9z7krALe3CGI60d5cL';
  }

  initAPI() {
  }
}
