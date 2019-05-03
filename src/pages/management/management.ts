import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {MainService} from '../../core/services/main.service';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

/**
 * Generated class for the ManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-management',
  templateUrl: 'management.html',
})
export class ManagementPage {

  committeeList:any=[];
  secretaryList:any=[];

  allManagementList:any=[];
  allCommitteeList:any=[];
  allSecretaryList:any=[];
  allTrustyList:any=[];
  
  managementType: string = "management";
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public menuCtrl:MenuController,
    public mainService:MainService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagementPage');
    this.menuCtrl.close();

    this.getManagementList()
  }


  getManagementList()
  {
    this.spinnerDialog.show();
    this.mainService.getManagementList().subscribe(
      res => {
       this.allManagementList = res.data;

       res.data.forEach(x => {
         if(x.category_id ==3)
         {
          this.allCommitteeList = x.management_details
          this.allCommitteeList.forEach(z => {
            this.committeeList.push({url: z.management_full_image})
           })  
         }

         if(x.category_id ==4)
         {
          this.allSecretaryList = x.management_details
          this.allSecretaryList.forEach(y => {
            this.secretaryList.push({url: y.management_full_image})
           })  
         }
        
         if(x.category_id ==2)
         {
          this.allTrustyList = x.management_details
         }

       })      
       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  openSecretaryModal(index) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.secretaryList,
      initialSlide: index, // The second image
    });
    modal.present();
  }

  openCommitteeModal(index) {
    let modal1 = this.modalCtrl.create(GalleryModal, {
      photos: this.committeeList,
      initialSlide: index, // The second image
    });
    modal1.present();
  }

}
