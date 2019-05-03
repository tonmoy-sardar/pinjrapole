import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchdetailsPage } from './branchdetails';

@NgModule({
  declarations: [
    BranchdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchdetailsPage),
  ],
})
export class BranchdetailsPageModule {}
