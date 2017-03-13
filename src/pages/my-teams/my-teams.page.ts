import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, ViewController, Platform, NavParams, Slides } from 'ionic-angular';

import { SuggestionsDetailsPage, SuggestionsPage, ResultGamesPage, NextGamesPage, NewsPage, NewsDetailPage, TeamHomePage, TournamentsPage } from '../pages';
import { EliteApi, UserSettings, FacebookLogin, FirebaseService } from '../../shared/shared';


import {AdMob} from 'ionic-native';

@Component({
    templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {
    @ViewChild(Slides) slides: Slides;
    favorites = [];
    semFavoritos: boolean;
    news: any;
    logouFace:boolean;
    name:any;
    photo:any;
    id:any;
    botaoFace:boolean;

    allTeams: any;
    meuTime: any;

    constructor(
        public loadingController: LoadingController,
        public nav: NavController,
        public eliteApi: EliteApi,
        public userSettings: UserSettings,
        private viewCtrl: ViewController,
        private platform: Platform,
        public navParams: NavParams,
        public fire: FirebaseService){
          this.logouFace =  this.navParams.get('face');
          this.name = this.navParams.get('name');
          this.photo = this.navParams.get('imagem');
          this.botaoFace = this.navParams.get('botao');
          this.id = this.navParams.get('id');
          this.getFavorites();
          interface AdMobType {
            banner:string,
            interstitial:string
          };

          var admobid:AdMobType;
          // select the right Ad Id according to platform
          if( /(android)/i.test(navigator.userAgent) ) {
              admobid = { // for Android
                  banner: 'ca-app-pub-4949793219130681/4713795771',
                  interstitial: 'ca-app-pub-4949793219130681/4713795771'
              };
          } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
              admobid = { // for iOS
                  banner: 'ca-app-pub-4949793219130681/4713795771',
                  interstitial: 'ca-app-pub-4949793219130681/4713795771'
              };
          } else {
              admobid = { // for Windows Phone
                  banner: 'ca-app-pub-4949793219130681/4713795771',
                  interstitial: 'ca-app-pub-4949793219130681/4713795771'
              };
          }

/*          if(AdMob){

              AdMob.createBanner( {
                            adId:admobid.banner,
                            isTesting:false,//comment this out before publishing the app
                            autoShow:true} );
                        }*/
          this.meuTime = '';
        }

        slideOptions = {
                initialSlide: 0,
                loop: true,
                autoplay:3000,
                pager:false
              };

        onLoginFace() {
          //Push.init();
          FacebookLogin.login(response => {
            //console.log(response.accessToken);
              this.fire.login(response.accessToken, () => {
              //  console.log('iniciou push');
                this.nav.setRoot(MyTeamsPage,  {face: true,
                                                imagem: this.fire.user.photo,
                                                name: this.fire.user.name
                                               });
              }, error => {
                alert(error);
              })


          }, error => {
            alert(error.errorMessage);
          });
        }


    getFavorites(){
      this.semFavoritos = false;
      this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
      if (this.favorites.length === 0) {
        this.semFavoritos = true
      } else {
        this.semFavoritos = false
      }
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Carregando dados...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
    }


    goToTournaments(){
        this.nav.push(TournamentsPage);
    }

    ionViewWillEnter() {
      this.getFavorites();

      this.eliteApi.getNews().then(data => {
        this.news = data;
      });



      if (this.meuTime === '') {
        this.eliteApi.getTeams().then(data => {
          this.allTeams = data;
        });
      };
    }

    ionViewDidEnter(){
      this.getFavorites();
    }

    newsTapped($event, news){
        let loader = this.loadingController.create({
            content: 'Carregando Notícia...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(NewsDetailPage, news);
    }

    goToNews(){
        this.nav.push(NewsPage, this.news);
    }

    goToNextGames(){
        let loader = this.loadingController.create({
            content: 'Carregando Próximos Jogos...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(NextGamesPage);
    }


    goToResultGames(){
        let loader = this.loadingController.create({
            content: 'Carregando Resultados...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(ResultGamesPage);
    }

    goToSuggestions(){
        let loader = this.loadingController.create({
            content: 'Carregando Espaço "Fala Torcedor!"...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(SuggestionsPage,  {id: this.id,
                                        imagem: this.photo,
                                        name: this.name
                                       });
    }

    goToSuggestionsDetails(){
        let loader = this.loadingController.create({
            content: 'Carregando Espaço "Fala Torcedor!"...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(SuggestionsDetailsPage,  {id: this.id,
                                        imagem: this.photo,
                                        name: this.name
                                      });

    }


}
