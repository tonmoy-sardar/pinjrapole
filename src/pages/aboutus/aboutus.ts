import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {

  allBranchList:any=[];

  welcomeTitle;
  welcomeContent;
  welcomePageImg;
  importanceTitle;
  importanceContent;
  importancePageImg;
  about2Content;
  about2PageImg;
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
    this.menuCtrl.close();
    this.branchList();
    this.getWelcomeText();
    this.getAbout2Text();
    this.getImportanceText();

  }


  getWelcomeText() {
    var page_id = 11
    this.spinnerDialog.show();
    this.mainService.getPageText(page_id).subscribe(
      res => {
       this.welcomeTitle = res.data[0].page_title;
       this.welcomeContent = res.data[0].page_content;
       this.welcomePageImg = res.data[0].page_img;
       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  getAbout2Text() {
    var page_id = 113
    this.mainService.getPageText(page_id).subscribe(
      res => {
       
       this.about2Content = res.data[0].page_content;
       this.about2PageImg = res.data[0].page_img;
      },
      error => {
      }
    )
  }

  getImportanceText() {
    var page_id = 115
    this.mainService.getPageText(page_id).subscribe(
      res => {
        this.importanceTitle = res.data[0].page_title;
        this.importanceContent = res.data[0].page_content;
        this.importancePageImg = res.data[0].page_img;
      },
      error => {
      }
    )
  }

  branchList() {
    this.mainService.getBranchList().subscribe(
      res => {
       this.allBranchList = res.data;
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
