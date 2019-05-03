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
  selector: 'page-branch',
  templateUrl: 'branch.html',
})
export class BranchPage {

  allBranchList:any=[];
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
    this.getBranchList();
  }


  getBranchList() {
    this.spinnerDialog.show();
    this.mainService.getBranchList().subscribe(
      res => {
       this.allBranchList = res.data;
       console.log(this.allBranchList);
       this.spinnerDialog.hide();
       
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  gotoDetails(id) {
    console.log(id);
    this.navCtrl.push('BranchdetailsPage',{id:id});
  }


  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
