import { Component } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';
import { LoadingController, NavController, ViewController, Platform, NavParams, ToastController } from 'ionic-angular';
import {AppRate} from 'ionic-native';
import _ from 'lodash';

import { SuggestionsPage, MyTeamsPage } from '../pages';
import { FacebookLogin, EliteApi, FirebaseService, UserSettings } from '../../shared/shared';


@Component({
    templateUrl: 'suggestions-details.page.html'
})
export class SuggestionsDetailsPage {
    allSuggestions: any;
    dados:any;
    temLoginface:boolean;
    suggestions = [];
    numberMsgs;
    allMsgs;

    userName:string;
    userPhoto:any;
    date:string;
    sugestion:string;

    keys: String[];
    constructor(
        public loadingController: LoadingController,
        public nav: NavController,
        public eliteApi: EliteApi,
        public userSettings: UserSettings,
        private viewCtrl: ViewController,
        private platform: Platform,
        public navParams: NavParams,
        public fire: FirebaseService,
        private toast:ToastController,
        private http:Http){
          this.userName = this.navParams.get('name');
          this.userPhoto = this.navParams.get('imagem');
          this.numberMsgs = 7;
          this.init();
      }

      init(){
        this.temLoginface = false;
        //console.log(this.fire.user.id)
        if (this.fire.user.id != undefined) {
          this.temLoginface = true;
        }

        setInterval(() => {
          this.getSuggestions();
        }, 1000);

      }

      viewDidLoad(){
          this.init();
      }
      viewDidEnter(){
          this.init();
      }
      viewWillEnter(){
          this.init();
      }
      ionViewDidLoad(){
          this.init();
      }
      ionViewDidEnter(){
          this.init();
      }
      ionViewWillEnter(){
          this.init();
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
        }
          else if (sugestion === '') {
          let toast = this.toast.create({
            message: 'Por favor, informe seu comentário',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
          close;
        }
        else {
          this.fire.saveSuggestions(user, photo, this.fire.user.date, sugestion);
          let toast = this.toast.create({
            message: 'Mensagem enviada. Obrigado',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
          this.sugestion = '';
          this.init();
        }
      }

      getSuggestions(){
        this.eliteApi.getSuggestions().then(data => {
          this.suggestions = [];
          this.allSuggestions = data
          this.allSuggestions = _.orderBy(this.allSuggestions, ['date', 'hour','minutes','seconds'], ['desc', 'desc','desc','desc']);

          for (const key of Object.keys(this.allSuggestions)) {

                  this.suggestions.push({ date: this.allSuggestions[key].date,
                                          email: this.allSuggestions[key].email,
                                          photo: this.allSuggestions[key].photo,
                                          sugestion:this.allSuggestions[key].sugestion,
                                          user: this.allSuggestions[key].user,
                                          hour: this.allSuggestions[key].hour,
                                          minutes: this.allSuggestions[key].minutes,
                                          seconds: this.allSuggestions[key].seconds,});
          }

          this.allMsgs = this.suggestions.length;
        });
      }

      goToSuggestions(){
        let loader = this.loadingController.create({
            content: 'Carregando Espaço "Fala Torcedor!"...',
            dismissOnPageChange: true
        });
        loader.present();
        this.nav.push(SuggestionsPage,  {id: this.fire.user.id,
                                        imagem: this.fire.user.photo,
                                        name: this.fire.user.name
                                       });
      }

      onLoginFace() {
      //  Push.init();
        FacebookLogin.login(response => {
          //console.log(response.accessToken);
            this.fire.login(response.accessToken, () => {
              this.nav.setRoot(MyTeamsPage,  {face: true,
                                              imagem: this.fire.user.photo,
                                              name: this.fire.user.name,
                                              botao : false,
                                              id : this.fire.user.id
                                             });
            }, error => {
              alert(error);
            })


        }, error => {
          alert(error.errorMessage);
        });
      }

      moreMessages(numberMsgs){
        this.numberMsgs = this.numberMsgs + numberMsgs;
        this.init();
      }



}
