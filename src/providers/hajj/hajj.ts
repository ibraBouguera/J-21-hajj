import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HajjProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HajjProvider {

  headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
  options = new RequestOptions({headers:this.headers});

  constructor(public http: Http) {
  }

  get_hajj(user,pass){
    return this.http.get('http://localhost/thadj/public/login?username='+user+"&password="+pass,this.options)
    .map(rsp => rsp.json());
  }

  get_transport(id){
    return this.http.get('http://localhost/thadj/public/'+id+"/travels",this.options)
    .map(rsp => rsp.json());
  }
  get_housing(id){
    return this.http.get('http://localhost/thadj/public/'+id+"/housing",this.options)
    .map(rsp => rsp.json());
  }

}
