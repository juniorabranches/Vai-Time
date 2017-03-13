import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'team-players.page.html',
})
export class TeamPlayersPage {
  jogadores: any;
  players: any[];
  team: any;
  temPlayer = true;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) {

      this.team = this.navParams.data;
      this.getPlayers();
    }

    getPlayers(){
      this.eliteApi.getPlayers().then(data => {

        this.players = _.chain(data)
                      .filter(g => g.teamName === this.team.name)
                      .value();

        if (this.players.length === 0) {
          this.temPlayer = false;
        } else {
          this.temPlayer = true;
        }


      });

    }

    slideOptions = {
            initialSlide: 0,
            loop: true,
            autoplay:3000,
            pager:false
          };    


    getHeader(record, recordIndex, records){
      if (recordIndex === 0 || record.position !== records[recordIndex-1].position) {
        return record.position;
      }
      return null;
    }


}
