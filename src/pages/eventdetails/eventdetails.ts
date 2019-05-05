import { Component ,ViewChild, ElementRef} from '@angular/core';
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
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {

  eventDetails;
  visible: boolean;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
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
    console.log('ionViewDidLoad EventDetailsPage');
    this.getEventDetails(this.navParams.get('id'))
    //this.loadMap();
  }

  
  

  getEventDetails(id) {
    this.spinnerDialog.show();
    this.mainService.getEventDetails(id).subscribe(
      res => {
      this.eventDetails = res.data[0];
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
