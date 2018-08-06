import { Http ,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers:this.headers});
  constructor(public http: Http) {
   // console.log('Hello DataProvider Provider');
  }

  add_client(pass,user){
    return this.http.get('http://localhost/public/login?user='+user+"&pass="+pass,this.options)
    .map(rsp => rsp.json());
  }

  update_position(phone,uuid,lat,lon){
    return this.http.get('http://waselni.tk/update_position.php?phone='+phone+"&uuid="+uuid+"&lat="+lat+"&lon="+lon,this.options)
    .map(rsp => rsp.json());
  }

  client_exist(phone){
    return this.http.get('http://waselni.tk/client_exist.php?phone='+phone,this.options)
    .map(rsp => rsp.json());
  }

  get_drivers(){
    return this.http.get('http://waselni.tk/get_drivers.php',this.options)
    .map(rsp => rsp.json());
  }
}
