import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamNewsPage, TeamPlayersPage, StandingsPage, TeamDetailPage } from '../pages';

@Component({
  templateUrl: 'team-home.page.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  teamPlayersTab = TeamPlayersPage;
  teamNewsTab = TeamNewsPage;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.team =  this.navParams.data;
  }

  goHome(){
    this.nav.popToRoot();
  }
}
