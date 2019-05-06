import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { MainService } from '../../core/services/main.service';

declare var google;


/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  contactForm: FormGroup;
  addressTitle;
  addressContent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog,
    public mainService: MainService) {

    this.contactForm = this.formBuilder.group({
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: ['', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      message: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');

    this.menuCtrl.close();
    this.loadMap();

  }

  // loadMap(){

  //   let latLng = new google.maps.LatLng(22.579241, 88.354378);




  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });

  //   let content = "<h3>Calcutta Pinjrapole Society</h3><h4>34, Armenian Street, Armenian Street, Kolkata, West Bengal 700001</h4>";          

  //   this.addInfoWindow(marker, content);
  // }

  // addInfoWindow(marker, content){

  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });

  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });

  // }

  loadMap() {

    this.getAddressText();
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

  getAddressText() {
    var page_id = 229
    this.mainService.getPageText(page_id).subscribe(
      res => {
        this.addressTitle = res.data[0].page_title;
        this.addressContent = res.data[0].page_content;
  
      },
      error => {
      }
    )
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }


  isFieldValid(field: string) {
    return !this.contactForm.get(field).valid && (this.contactForm.get(field).dirty || this.contactForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    console.log(this.contactForm)
    console.log(field)
    return {
      'is-invalid': this.contactForm.get(field).invalid && (this.contactForm.get(field).dirty || this.contactForm.get(field).touched),
      'is-valid': this.contactForm.get(field).valid && (this.contactForm.get(field).dirty || this.contactForm.get(field).touched)
    };
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  submitContact() {
    if (this.contactForm.valid) {
      this.spinnerDialog.show();
      this.mainService.submitContact(this.contactForm.value).subscribe(
        res => {

          this.presentToast("Contact Information submitted succesfully.");

          this.spinnerDialog.hide();
          this.contactForm.reset();
        },
        error => {
          this.presentToast("Please enter valid login credentials");
          console.log(error);
          this.spinnerDialog.hide();

        }
      )
    } else {
      this.markFormGroupTouched(this.contactForm)
    }
  }




}
