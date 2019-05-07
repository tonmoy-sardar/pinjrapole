import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

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
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;

  data:any = {};


public lat:any;
public lng:any;
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public mainService:MainService,
    private geolocation: Geolocation,) {
      console.log("Data==>","kelo");
      this.geolocation.getCurrentPosition().then((position) => {
        console.log("Data==>",position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        
      }, (err) => {
        console.log('Error getting location', err);
      });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.visible = false;
    console.log('ionViewDidLoad BranchDetailsPage');
    this.getBranchDetails(this.navParams.get('id'));
    //this.fetchCurrentAddress();
    //this.loadMap();
  }

  // fetchCurrentAddress(){
  //   console.log("Data==>","kelo");
  //   this.geolocation.getCurrentPosition().then((position) => {
  //     console.log("Data==>",position);
  //     this.lat = position.coords.latitude;
  //     this.lng = position.coords.longitude;
      
  //   }, (err) => {
     
  //   });
  // }
  loadMap(address,latitude,longitude){

    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = address;          

    this.addInfoWindow(marker, content);
  }

  startNavigating(address,latitude,longitude){
    //console.log(typeof(latitude));

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    
    directionsDisplay.setMap(this.map);
    //directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    console.log("dgfg",latitude)
    console.log("aaaa",longitude)
    directionsService.route({
      // origin: 'kolkata',
      // destination: 'champahati',
      origin: {lat: this.lat, lng: this.lng},
      destination: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
      console.log("aaaaa")
        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(res);
            console.log("bbbb")
        } else {
            console.warn(status);
            console.log("cccc")
        }

    });

}
  

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
      this.loadMap(this.branchDetails.address,this.branchDetails.latitude,this.branchDetails.longitude);
      
      this.startNavigating(this.branchDetails.address,this.branchDetails.latitude,this.branchDetails.longitude);
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
