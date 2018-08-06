import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportListPage } from './transport-list';

@NgModule({
  declarations: [
    TransportListPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportListPage),
  ],
})
export class TransportListPageModule {}
