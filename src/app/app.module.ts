import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { SuggestionsDetailsPage, SuggestionsPage, ResultGamesPage, NextGamesPage, TeamNewsPage, TeamPlayersPage, NewsPage, NewsDetailPage, AboutPage, LoginPage, GamePage, MapPage, MyTeamsPage, StandingsPage, TeamDetailPage, TeamHomePage, TeamsPage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings, FirebaseService, Push, Rate } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage,
    AboutPage,
    NewsDetailPage,
    NewsPage,
    TeamPlayersPage,
    TeamNewsPage,
    NextGamesPage,
    ResultGamesPage,
    SuggestionsPage,
    SuggestionsDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'YOUR_API_KEY'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage,
    AboutPage,
    NewsDetailPage,
    NewsPage,
    TeamPlayersPage,
    TeamNewsPage,
    NextGamesPage,
    ResultGamesPage,
    SuggestionsPage,
    SuggestionsDetailsPage
  ],
  providers: [
    EliteApi,
    Storage,
    UserSettings,
    FirebaseService,
    Push,
    Rate
  ]
})
export class AppModule {}
