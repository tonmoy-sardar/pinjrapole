import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {MainService} from '../../core/services/main.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

declare var google;
/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branchdetails',
  templateUrl: 'branchdetails.html',
})
export class BranchdetailsPage {

  branchDetails;
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
    console.log('ionViewDidLoad BranchDetailsPage');
    this.getBranchDetails(this.navParams.get('id'))
    this.loadMap();
  }

  loadMap() {

    
    let latLng = new google.maps.LatLng(22.627420, 88.325920);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var locations = [
      ['Calcutta Pinjrapole Society Liluah Gosala, 58, Netaji Subhas Road, Patuapara, Liluah, Howrah, West Bengal 711204', 22.627420, 88.325920, 1],
      ['Sodepur Gaushala, 48, Sodepur Road, Bankimpally, Amarabati, Sodepur, West Bengal, India', 22.699190, 88.385340, 2],
      ['Raniganj Gaushala, (Kolkata Pinjrapole Society) Near Hatia Talaw, Beside, Raniganj, West Bengal 713347', 23.603900, 87.117700, 3],
      ['Hazaribagh Pinjrapole Gaushala, Seotagarha, Jharkhand 825303', 23.999315, 85.420273, 4],
    ];


    

    // let marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.map.getCenter()
    // });

    // let content = "<h3>Calcutta Pinjrapole Society</h3><h4>34, Armenian Street, Armenian Street, Kolkata, West Bengal 700001</h4>";          

    // this.addInfoWindow(marker, content);
    var marker, i;
    var infowindow = new google.maps.InfoWindow();
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: this.map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    }

  }
  // loadMap(address,latitude,longitude) {

  //   let latLng = new google.maps.LatLng(latitude,longitude);

  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 5,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });

  //   let content = address;          

  //   this.addInfoWindow(marker, content);
    

  // }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getBranchDetails(id) {
    this.spinnerDialog.show();
    this.mainService.getBranchDetails(id).subscribe(
      res => {
      this.branchDetails = res.data[0];
      this.visible = true;
      this.spinnerDialog.hide();
      //this.loadMap(this.branchDetails.address,this.branchDetails.latitude,this.branchDetails.longitude);
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
