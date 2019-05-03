import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {MainService} from '../../core/services/main.service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  allBranchList:any=[];
  allGalleryImageList:any=[];
  whoWeTitle;
  whoWeContent;
  whoWePageImg;

  whatWeDoTitle;
  whatWeDoContent;

  whyProtectTitle;
  whyProtectContent;

  whyNativeTitle;
  whyNativeContent;

  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService
   
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.menuCtrl.close();

    this.getGalleryImageList()
    this.getWhyProtect();
    this.getWhyNative();
    this.getWhatWeDo();
    this.getWhoWeAre();
    this.branchList();
  }

  getGalleryImageList()
  {
    
    this.mainService.getGalleryImageList().subscribe(
      res => {
       this.allGalleryImageList = res.data;
      },
      error => {
      }
    )
  }

  branchList() {
    this.spinnerDialog.show();
    this.mainService.getBranchList().subscribe(
      res => {

       this.allBranchList = res.data;
       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }
  
  getWhoWeAre() {
    var page_id = 82
    this.mainService.getWhoWeAre(page_id).subscribe(
      res => {
       this.whoWeTitle = res.data[0].page_title;
       this.whoWeContent = res.data[0].page_content;
       this.whoWePageImg = res.data[0].page_img;
      },
      error => {
      }
    )
  }

  getWhatWeDo() {
    var page_id = 85
    this.mainService.getWhatWeDo(page_id).subscribe(
      res => {
       this.whatWeDoTitle = res.data[0].page_title;
       this.whatWeDoContent = res.data[0].page_content;
      },
      error => {
      }
    )
  }

  getWhyProtect() {
    var page_id = 88
    this.mainService.getWhyProtect(page_id).subscribe(
      res => {
       this.whyProtectTitle = res.data[0].page_title;
       this.whyProtectContent = res.data[0].page_content;
      },
      error => {
      }
    )
  }

  getWhyNative() {
    var page_id = 90
    this.mainService.getWhyNative(page_id).subscribe(
      res => {
       this.whyNativeTitle = res.data[0].page_title;
       this.whyNativeContent = res.data[0].page_content;
      },
      error => {
      }
    )
  }




  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }

}
