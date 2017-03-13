import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

import { EliteApi } from '../../shared/shared';
declare var window: any;

@Component({
  templateUrl: 'map.page.html'
  //directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MapPage {

  map: any;

  constructor(public navParams: NavParams, public eliteApi: EliteApi) {

    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };

  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}
