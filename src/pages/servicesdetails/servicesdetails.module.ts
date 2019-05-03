import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesdetailsPage } from './servicesdetails';

@NgModule({
  declarations: [
    ServicesdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesdetailsPage),
  ],
})
export class ServicesdetailsPageModule {}
