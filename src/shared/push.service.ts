declare var window: any;

export class Push {
  static init() {


      window["plugins"].OneSignal
        .startInit("YOUR_API_KEY", "YOUR_NUMBER_KEY")
      	.handleNotificationOpened((jsonData) => {
          //
        })
        .endInit();

  }

}
