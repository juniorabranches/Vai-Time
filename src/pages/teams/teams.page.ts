import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'teams.page.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;


  constructor(public loadingController: LoadingController,
              public nav: NavController,
              public navParams: NavParams,
              public eliteApi: EliteApi) { }

  ionViewDidLoad(){

    this.queryText = '';
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Carregando Times...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
            _.chain(data.teams)
            .orderBy('division')
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();

        this.teams = this.allTeamDivisions;
        loader.dismiss();
      });
    });

  }

  itemTapped($event, team){
    this.nav.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      console.log(this.allTeamDivisions);
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));

      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
      console.log(filteredTeams);
    });

    this.teams = filteredTeams;
  }
}
