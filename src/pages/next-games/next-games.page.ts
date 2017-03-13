import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
    templateUrl: 'next-games.page.html'
})
export class NextGamesPage {

  games: any[];
  allGames : any[];
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
                    .filter(g => g.after === 'yes')
                    .orderBy(g => g.date)
                    .value();

//      this.allGames = _.orderBy(this.allGames, ['tournamentName'], "asc");
      this.allGames = _.orderBy(this.allGames, ['seq', 'date'], ['asc', 'asc']);

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

}
