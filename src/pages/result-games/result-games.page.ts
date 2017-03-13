import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
    templateUrl: 'result-games.page.html'
})
export class ResultGamesPage {

  games: any[];
  allGames : any[];
  orderGames : any[];
  tournamentFilter = 'Copa do Brasil';
  tournaments: any;
  semJogos:boolean;

  constructor(public nav: NavController, public vaiTimeApi: EliteApi, public viewCtrl: ViewController, public navParams: NavParams, public loadingController: LoadingController) {

  }


  ionViewWillEnter() {
    this.init();
  }


  init(){
    this.vaiTimeApi.getNextGames().then(data => {

      this.allGames = _.chain(data)
                    .filter(g => g.after === 'no')
                    .value();

      this.allGames = _.orderBy(this.allGames, ['seq', 'date'], ['desc', 'desc']);
    });


    this.vaiTimeApi.getTournaments().then(data => {
      this.tournaments = data;
    });

    this.filtertournament(this.tournamentFilter);
  }

  filtertournament(torneio){
    this.semJogos = false;
    this.games = null;
    this.games = this.allGames;
    this.games = this.games.filter(g => g.tournamentName === torneio);

    if (this.games.length === 0) {
      this.semJogos = true;
    }
  }


  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.tournamentName+record.date !== records[recordIndex-1].tournamentName+records[recordIndex-1].date) {
      return record.tournamentName + ' - ' + record.date;
    }
    return null;
  }

  getScoreDisplayBadgeClass1(games){
    return  games.team1score > games.team2score ? 'primary' :  games.team1score < games.team2score ? 'danger' : 'secondary';
  }

  getScoreDisplayBadgeClass2(games){
    return games.team2score > games.team1score ? 'primary' : games.team2score < games.team1score ? 'danger' : 'secondary';
  }


}
