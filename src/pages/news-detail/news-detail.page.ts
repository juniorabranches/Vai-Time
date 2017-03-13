import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
    templateUrl: 'news-detail.page.html'
})
export class NewsDetailPage {

  new: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.new =  this.navParams.data;
  }

  whatsappShare(message, image, link) {
    SocialSharing.shareViaWhatsApp('O Aplicativo "Vai Time!" informa: '+message+'.',
      image,
      link)
      .then(() => {
//        alert("Compartilhado com sucesso no Wha");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  twitterShare(message, image, link) {
    SocialSharing.shareViaTwitter('O Aplicativo "Vai Time!" informa: '+message+'.',
      image,
      link)
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  instagramShare(message, image) {
    SocialSharing.shareViaTwitter('O Aplicativo "Vai Time!" informa: '+message+'.', image)
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

  facebookShare(message, image, link) {
    SocialSharing.shareViaFacebook('O Aplicativo "Vai Time!" informa: '+message+'.',
      image,
      link)
      .then(() => {
        //alert("Success");
      },
      () => {
        alert("ERRO! Desculpe, estamos trabalhando para consertar isso.");
      })
  }

}
