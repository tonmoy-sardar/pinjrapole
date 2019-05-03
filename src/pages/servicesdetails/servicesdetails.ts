import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the ServicesdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicesdetails',
  templateUrl: 'servicesdetails.html',
})
export class ServicesdetailsPage {

  serviceDetails;
  visible: boolean;
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mainService:MainService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesdetailsPage');
    this.visible = false;
    
    this.getProductServiceDetails(this.navParams.get('id'))
  }


  getProductServiceDetails(id) {
    this.spinnerDialog.show();
    this.mainService.getProductServiceDetails(id).subscribe(
      res => {
      this.visible = true;
      this.serviceDetails = res.data[0];
      this.spinnerDialog.hide();
       
      },
      error => {
        this.visible = true;
        this.spinnerDialog.hide();
      }
    )
  }


  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
