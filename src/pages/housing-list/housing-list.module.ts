import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousingListPage } from './housing-list';

@NgModule({
  declarations: [
    HousingListPage,
  ],
  imports: [
    IonicPageModule.forChild(HousingListPage),
  ],
})
export class HousingListPageModule {}
