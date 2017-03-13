import { Component,  trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { LoadingController, NavController, MenuController } from 'ionic-angular';

import { MyTeamsPage } from '../pages';
import { FacebookLogin, EliteApi, FirebaseService, Push } from '../../shared/shared';

@Component({
    templateUrl: 'login.page.html'
/*    animations:
    [
      //For the logo
      trigger('flyInBottomSlow', [
        state('in', style({
          transform: 'translate3d(0,0,0)'
        })),
        transition('void => *', [
          style({transform: 'translate3d(0,2000px,0'}),
          animate('2000ms ease-in-out')
        ])
      ]),

      //For the background detail
      trigger('flyInBottomFast', [
        state('in', style({
          transform: 'translate3d(0,0,0)'
        })),
        transition('void => *', [
          style({transform: 'translate3d(0,2000px,0)'}),
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
            style({transform: 'translate3d(0,2000px,0)', offset: 0}),
            style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
            style({transform: 'translate3d(0,0,0)', offset: 1})
          ]))
        ])
      ]),

      //For login button
      trigger('fadeIn', [
        state('in', style({
          opacity: 1
        })),
        transition('void => *', [
          style({opacity: 0}),
          animate('1000ms 2000ms ease-in')
        ])
      ])

    ]*/
  })

export class LoginPage {

    rootPage: any;// = MyTeamsPage;

    constructor(
        public loadingController: LoadingController,
        public nav: NavController,
        public eliteApi: EliteApi,
        public fire: FirebaseService,
        public menu: MenuController){
          //Push.init();
        }

        ionViewWillEnter(){
          this.menu.enable(false);
        }

        ionViewWillLeave(){
          this.menu.enable(false);
        }

        onLoginFace() {
          //Push.init();
          FacebookLogin.login(response => {
            //console.log(response.accessToken);
              this.fire.login(response.accessToken, () => {
              //  console.log('iniciou push');
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

        onLogin() {
              //Push.init();
              //console.log('iniciou push');
              this.nav.setRoot(MyTeamsPage, {face: true,
                                             imagem: "./assets/images/user.PNG",
                                             name: "Visitante",
                                             botao: true,
                                             id: null
                                            });
        }

}
