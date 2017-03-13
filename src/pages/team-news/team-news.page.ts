import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';
import {NewsDetailPage } from '../pages';

@Component({
    templateUrl: 'team-news.page.html'
})
export class TeamNewsPage {

  team: any;

  newsTeam: any[];
  isNews = true;

  constructor(public nav: NavController, public navParams: NavParams, public eliteApi: EliteApi, private loadingController: LoadingController) {
    this.team = this.navParams.data;
    this.getNewsTeam();
  }

  getNewsTeam(){
    //buscando noticias do time
    this.eliteApi.getNews().then(data => {

      this.newsTeam = _.chain(data)
                    .filter(g => g.id === this.team.name)
                    .value();

      if (this.newsTeam.length === 0) {
        this.isNews = false;
      } else {
        this.isNews = true;
      }


    });
  }

    openNewsTeam($event, news){
        let loader = this.loadingController.create({
            content: 'Carregando Notícia...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(NewsDetailPage, news);
    }

}
