import { Component, trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { LoadingController, NavController, Platform } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import { SocialSharing } from 'ionic-native';
import {AppRate} from 'ionic-native';

import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'about.page.html',
  animations:
  [
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])

  ]
})
export class AboutPage {


  constructor(
    public loadingController: LoadingController,
    public nav: NavController,
    public eliteApi: EliteApi, private platform: Platform) {

    AppRate.promptForRating(true);

  }

  openApp(url: string) {
    let browser = new InAppBrowser(url, '_system');
  }



  whatsappShare() {
    SocialSharing.shareViaWhatsApp("Vai Time! O Aplicativo para os amantes do futebol em 2017.",
      null,
      "https://play.google.com/store/apps/details?id=br.com.abranches.vaitime")
      .then(() => {
//        alert("Compartilhado com sucesso no Wha");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  twitterShare() {
    SocialSharing.shareViaTwitter("Vai Time! O Aplicativo para os amantes do futebol em 2017.",
      null,
      "https://play.google.com/store/apps/details?id=br.com.abranches.vaitime")
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  instagramShare() {
    SocialSharing.shareViaTwitter("Vai Time! O Aplicativo para os amantes do futebol em 2017: https://play.google.com/store/apps/details?id=br.com.abranches.vaitime",
      null)
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  facebookShare() {
    SocialSharing.shareViaFacebook("Vai Time! O Aplicativo para os amantes do futebol em 2017.",
      null,
      "https://play.google.com/store/apps/details?id=br.com.abranches.vaitime")
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

}
