import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, AppRate } from 'ionic-native';

import { ResultGamesPage, NextGamesPage, NewsPage, AboutPage, LoginPage, MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings, Rate } from '../shared/shared';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  userFace: any[];
  rootPage: any;// = MyTeamsPage;
  news: any;
  name:any;
  photo:any;

  constructor(
    public events: Events,
    public loadingController: LoadingController,
    public platform: Platform,
    public eliteApi: EliteApi,
    public userSettings: UserSettings,
    public rate: Rate) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.userSettings.initStorage().then(() => {

        AppRate.preferences.storeAppURL =
        {
          android: 'https://play.google.com/store/apps/details?id=br.com.abranches.vaitime'
        };
        AppRate.preferences.customLocale = {
                  title: 'Avalie o "Vai Time!"',
                  message: 'Sem avaliações positivas, passamos fome :(',
                  cancelButtonLabel: 'Não',
                  rateButtonLabel: 'Avaliar :)',
                  laterButtonLabel: 'Mais tarde'
                }

        ;
        AppRate.promptForRating(false);

        this.hideSplashScreen();
        this.refreshFavorites();
        this.eliteApi.getNews().then(data => {
          this.news = data;
        });
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
        this.rootPage = LoginPage;
      });

    });
  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
      }
  }

  refreshFavorites(){
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
    //this.favoriteTeams = this.userSettings.getAllFavorites();
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
        content: 'Buscando Dados...',
        dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }

  goToVersao(){
    this.nav.push(AboutPage);
  }

  goToNews(){
    this.nav.push(NewsPage, this.news);
  }

  goToNextGames(){
    this.nav.push(NextGamesPage);
  }

  goToResultGames(){
    this.nav.push(ResultGamesPage);
  }


}
