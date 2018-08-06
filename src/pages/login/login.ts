import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HajjProvider } from '../../providers/hajj/hajj';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user="";
  pass="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private data: HajjProvider,public platform: Platform) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  verify(){

    this.data.get_hajj(this.user,this.pass).subscribe((resp) => {
      console.log(resp[0]['id']);

      if(resp[0]['id']){
        localStorage.setItem('hajj_id',resp[0]['id']);
        this.navCtrl.push(HomePage);
      }else{
        console.log('error');
      }

    });
  }


}
