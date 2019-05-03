import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {

  productDetails;
  visible: boolean;
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService) {

  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.visible = false;
    console.log('ionViewDidLoad ProductdetailsPage');
    this.getProductServiceDetails(this.navParams.get('id'))

  }


  getProductServiceDetails(id) {
    this.spinnerDialog.show();
    this.mainService.getProductServiceDetails(id).subscribe(
      res => {
      this.productDetails = res.data[0];
      this.visible = true;
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
