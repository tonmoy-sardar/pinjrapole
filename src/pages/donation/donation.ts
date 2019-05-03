import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {MainService} from '../../core/services/main.service';
/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class DonationPage {

  donationType: string = "Cash";
  donationForm: FormGroup;
  donationContent;
  donationDevelopmentContent;
  donationFoodContent
  donationCashContent;
  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public mainService:MainService
    ) {

      this.donationForm = this.formBuilder.group({
        fname: ["",Validators.required],
        lname: ["", Validators.required],
        email: ['', [
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]],
        phone: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]],
        amount: ["", Validators.required],
      });
  }



 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationPage');
    this.menuCtrl.close();
    this.getDonationText();
    this.getDonationCashText();
    this.getDonationDevelopmentContent();
    this.getDonationFoodContent();
  }

  getDonationText() {
    var page_id = 44
    this.spinnerDialog.show();
    this.mainService.getPageText(page_id).subscribe(
      res => {
       this.donationContent = res.data[0].page_content;
       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }


  getDonationCashText() {
    var page_id = 49
   
    this.mainService.getDonationText(page_id).subscribe(
      res => {
       this.donationCashContent = res.data[0].donation_page_content;
      
      },
      error => {
        
      }
    )
  }

  getDonationDevelopmentContent() {
    var page_id = 53
   
    this.mainService.getDonationText(page_id).subscribe(
      res => {
       this.donationDevelopmentContent = res.data[0].donation_page_content;
     
      },
      error => {
        
      }
    )
  }

  getDonationFoodContent() {
    var page_id = 51
   
    this.mainService.getDonationText(page_id).subscribe(
      res => {
       this.donationFoodContent = res.data[0].donation_page_content;
     
      },
      error => {
        
      }
    )
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
    return !this.donationForm.get(field).valid && (this.donationForm.get(field).dirty || this.donationForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    console.log(this.donationForm)
    console.log(field)
    return {
      'is-invalid': this.donationForm.get(field).invalid && (this.donationForm.get(field).dirty || this.donationForm.get(field).touched),
      'is-valid': this.donationForm.get(field).valid && (this.donationForm.get(field).dirty || this.donationForm.get(field).touched)
    };
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  submitDonation()
  {

  }

}
