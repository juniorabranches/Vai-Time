import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { EliteApi } from '../shared/shared';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  user: any = {};

  constructor(public vaitimeApi: EliteApi) {
    var config = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_DOMAIN",
      databaseURL: "YOUR_DATABASE",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }

  login(token: string, successCallback, errorCallback) {
    let credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).then(response => {
      this.setUser(token, response.providerData[0]);
      //this.vaitimeApi.setUser(token, response.providerData[0]);
      successCallback();

    }, error => {
      errorCallback(error);
    })
  }

  getDB() {
    return window;
  }

  getUser(id, successCallback) {
    let ref = firebase.database().ref('users').child(id);

    ref.once('value', (snapshot) => {
      let user = snapshot.val();
      successCallback(user);
    })
  }

  private setUser(token: string, authData: any) {
    this.user.name = authData.displayName;
    this.user.photo = authData.photoURL;
    this.user.id = authData.uid;
    this.user.email = authData.email;

    var date = new Date();
    var month = '';
    if (date.getMonth() === 0) {
        month = '01';
    } else if (date.getMonth() === 1) {
        month = '02';
    } else if (date.getMonth() === 2) {
        month = '03';
    } else if (date.getMonth() === 3) {
        month = '04';
    } else if (date.getMonth() === 4) {
        month = '05';
    } else if (date.getMonth() === 5) {
        month = '06';
    } else if (date.getMonth() === 6) {
        month = '07';
    } else if (date.getMonth() === 7) {
        month = '08';
    } else if (date.getMonth() === 8) {
        month = '09';
    } else if (date.getMonth() === 9) {
        month = '10';
    } else if (date.getMonth() === 10) {
        month = '11';
    } else if (date.getMonth() === 11) {
        month = '12';
    }
    this.user.date = date.getDate() + "/" + month + "/" + date.getFullYear();
    this.user.dateClean = date.getDate() + month + date.getFullYear();
    this.saveUser();
  }

  private saveUser() {
    firebase.database().ref('users').child(this.user.name+' - '+this.user.id).set({
      name: this.user.name,
      date: this.user.date,
      email: this.user.email,
      photo: this.user.photo,
      id: this.user.id
      //token: this.user.token
    });
  }

  getSuggestions(){

  }

  saveSuggestions(user, photo, date, sugestion) {
    var date1 = new Date();
    //console.log(user, photo, email, date, sugestion);
    firebase.database().ref('suggestions').child(user +' - '+ date1 + ' - ' +date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds()).set({
      user: user,
      photo: photo,
      date: date,
      sugestion: sugestion,
      hour: date1.getHours(),
      minutes: date1.getMinutes(),
      seconds: date1.getSeconds()
    });
  }
}
