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
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  allProductList:any=[];
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
    this.getProductList();
  }


  getProductList() {
    this.spinnerDialog.show();
    this.mainService.getProductList().subscribe(
      res => {
       this.allProductList = res.data;
       console.log(this.allProductList);
       this.spinnerDialog.hide();
       
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  gotoDetails(id) {
    console.log(id);
    this.navCtrl.push('ProductdetailsPage',{id:id});
  }


  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
