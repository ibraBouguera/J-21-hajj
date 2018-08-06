import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HajjProvider } from '../../providers/hajj/hajj';
import {HousingPage} from '../../pages/housing/housing';


/**
 * Generated class for the HousingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housing-list',
  templateUrl: 'housing-list.html',
})
export class HousingListPage {
  houssings = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private data: HajjProvider) {
    this.data.get_housing(localStorage.getItem('hajj_id')).subscribe((resp) => {
      if(resp){
        console.log(resp);

        this.houssings=resp;
      }else{
        console.log('error');
      }

    });
  }
  houssing_details(id){
    this.houssings.forEach(element => {
      if(element.id==id){
        this.navCtrl.push(HousingPage,{
          houssing:element
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingListPage');
  }

}
