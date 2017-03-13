import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'standings.page.html',
})
export class StandingsPage {
  allStandings: any[];
  divisionFilter = 'division';
  standings: any[];
  team: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;

    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    this.allStandings = tourneyData.standings;
    //console.log(this.allStandings);
    this.filterDivision();
  }

  filterDivision(){
    //if(this.divisionFilter === 'all'){
      this.standings = _.orderBy(this.allStandings, ['points'], "desc");
      this.standings = _.orderBy(this.standings, ['points'], "desc");
//      console.log(this.standings);
    //} else {
//      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
  //  }
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

}
