import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';

import {NewsDetailPage } from '../pages';

@Component({
    templateUrl: 'news.page.html'
})
export class NewsPage {

  news: any;
  backButton = false;

  constructor(public nav: NavController, public viewCtrl: ViewController, public navParams: NavParams, public loadingController: LoadingController) {

  }

  newsTapped($event, news){
      let loader = this.loadingController.create({
          content: 'Carregando Notícia...',
          dismissOnPageChange: true
      });
      loader.present();
      this.nav.push(NewsDetailPage, news);
  }

  ionViewWillEnter() {
    this.init();
  }



  init(){
    this.news =  this.navParams.data;
  }

}
