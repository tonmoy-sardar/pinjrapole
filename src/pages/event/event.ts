import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  allEventList:any=[];
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.menuCtrl.close();
    this.getEventList();
  }


  getEventList() {
    this.spinnerDialog.show();
    this.mainService.getEventList().subscribe(
      res => {
       this.allEventList = res.data;
       console.log(this.allEventList);
       this.spinnerDialog.hide();
       
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  gotoDetails(id) {
    console.log(id);
    this.navCtrl.push('EventdetailsPage',{id:id});
  }


  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
