import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';


/**
 * Generated class for the YojanaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yojana',
  templateUrl: 'yojana.html',
})
export class YojanaPage {

  yojanaList:any=[];
  allYojanaList:any=[];
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YojanaPage');
    this.menuCtrl.close();
    this.getYojanaList();
  }

  getYojanaList() {
    this.spinnerDialog.show();
    this.mainService.getYojanaList().subscribe(
      res => {

      this.yojanaList = res.data;

       res.data.forEach(x => {
        this.allYojanaList.push({url: x.youjna_img})
       })      
       console.log(this.allYojanaList);
       this.spinnerDialog.hide();
       
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

 openModal(index) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.allYojanaList,
      initialSlide: index, // The second image
    });
    modal.present();
  }

  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
  }


}
