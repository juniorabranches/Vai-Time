import {Facebook} from 'ionic-native';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



@Injectable()
export class FacebookLogin {


	constructor() {

	}

	static login(successCallback, errorCallback) {
		Facebook.login(['user_friends']).then(response => {
      successCallback(response.authResponse);
    }, error => {
      errorCallback(error);
    })
	}


}
