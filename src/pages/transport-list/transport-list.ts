import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HajjProvider } from '../../providers/hajj/hajj';
import {TransportPage} from '../../pages/transport/transport';

/**
 * Generated class for the TransportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transport-list',
  templateUrl: 'transport-list.html',
})
export class TransportListPage {
  travels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private data: HajjProvider) {
    this.data.get_transport(localStorage.getItem('hajj_id')).subscribe((resp) => {
      if(resp){
        this.travels=resp;
      }else{
        console.log('error');
      }

    });
  }

  travel_details(id){
    this.travels.forEach(element => {
      if(element.id==id){
        this.navCtrl.push(TransportPage,{
          travel:element
        });
      }
    });

    console.log(id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportListPage');
  }

}
