import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation} from '@ionic-native/geolocation';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private geolocation: Geolocation,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.rootPage = '';
      this.geolocation.getCurrentPosition().then((position) => {
        console.log("Data==>",position);
        
        localStorage.setItem('lat', position.coords.latitude.toString())
        localStorage.setItem('lng', position.coords.longitude.toString())
        
      }, (err) => {
        console.log('Error getting location', err);
      });
      this.nav.setRoot('HomePage');

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  gotoPage(routePage)
  {
    this.nav.push(routePage);
  }

 
}
