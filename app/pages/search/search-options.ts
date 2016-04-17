import {Page} from 'ionic-angular';
import {NgZone} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/search/search-options.html'
})
export class SearchOptionsPage {
  autocomplete: google.maps.places.Autocomplete;
  selectedPlace: string;
  zone: NgZone;
  constructor() {
    this.selectedPlace = "No place selected";

this.zone = new NgZone({enableLongStackTrace: false});
  }

 onPageDidEnter() {
        //setup places autocomplete

        //set search filters and perform location lookups etc
    var input = <HTMLInputElement>document.getElementById('place_autocomplete');
    this.autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);
    this.autocomplete.addListener('place_changed', () => { this.handlePlaceChanged() });
    
  }
  
  handlePlaceChanged() {

    
    
    var place = this.autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      //map.fitBounds(place.geometry.viewport);
    } else {
      //map.setCenter(place.geometry.location);
      //map.setZoom(17);  // Why 17? Because it looks good.
    }

    //marker.setPosition(place.geometry.location);


    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

   
 this.zone.run(() => {
      this.selectedPlace = address;
    
    });

    alert(address);
  }
}
