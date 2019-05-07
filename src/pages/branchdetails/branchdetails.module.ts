import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchdetailsPage } from './branchdetails';
import { Geolocation} from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    BranchdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchdetailsPage),
  ],
  providers: [Geolocation],
})
export class BranchdetailsPageModule {}
