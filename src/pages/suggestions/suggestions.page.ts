import { Component } from '@angular/core';
import { LoadingController, NavController, ViewController, Platform, NavParams, ToastController } from 'ionic-angular';

import { EliteApi, UserSettings, FirebaseService } from '../../shared/shared';


@Component({
    templateUrl: 'suggestions.page.html'
})
export class SuggestionsPage {

    name:any;
    photo:any;
    id:boolean;

    userName:string;
    userPhoto:any;
    date:string;
    sugestion:string;

    constructor(
        public loadingController: LoadingController,
        public nav: NavController,
        public eliteApi: EliteApi,
        public userSettings: UserSettings,
        private viewCtrl: ViewController,
        private platform: Platform,
        public navParams: NavParams,
        public fire: FirebaseService,
        private toast:ToastController){
          this.userName = this.navParams.get('name');
          this.userPhoto = this.navParams.get('imagem');
          this.id = this.navParams.get('id');
      }

      sendMessage(user, photo, date, sugestion){
        if (user === undefined) {
          let toast = this.toast.create({
            message: 'Por favor, informe seu nome',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        } else if (sugestion === undefined) {
          let toast = this.toast.create({
            message: 'Por favor, informe seu comentário',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
          close;
        } else {
          this.fire.saveSuggestions(user, photo, this.fire.user.date, sugestion);
          let toast = this.toast.create({
            message: 'Mensagem enviada',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
          this.nav.pop();
        }
      }



}
