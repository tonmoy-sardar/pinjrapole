import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YojanaPage } from './yojana';

@NgModule({
  declarations: [
    YojanaPage,
  ],
  imports: [
    IonicPageModule.forChild(YojanaPage),
  ],
})
export class YojanaPageModule {}
