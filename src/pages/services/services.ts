import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  allServiceList:any=[];
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
    this.menuCtrl.close();
    this.getServiceList();
  }

  getServiceList() {
    this.spinnerDialog.show();
    this.mainService.getServiceList().subscribe(
      res => {
       this.allServiceList = res.data;
       console.log(this.allServiceList);
       this.spinnerDialog.hide();
       
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  gotoDetails(id) {
    this.navCtrl.push('ServicesdetailsPage',{id:id});
  }

  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
