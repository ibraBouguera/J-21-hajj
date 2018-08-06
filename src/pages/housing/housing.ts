import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { HajjProvider } from '../../providers/hajj/hajj';

/**
 * Generated class for the HousingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-housing',
  templateUrl: 'housing.html',
})
export class HousingPage {

  from="";
  to="";
  hotel='';
  transport_lat:any;
  transport_lon:any;
  @ViewChild('maps') mapElement: ElementRef;
  geocoder = new google.maps.Geocoder;
  map: any;
  mylocation :any;
  transport:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  houssing:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,private geo:Geolocation,private data: HajjProvider) {
    this.platform.ready().then((readySource) => {
      this.houssing=navParams.get('houssing');
        console.log(this.houssing);
        //console.log(resp[0]);
        var st = new Date(this.houssing.start);
        var en = new Date(this.houssing.end);
        this.from=st.getDate()  + "-" + (st.getMonth()+1) + "-" + st.getFullYear();
        this.to=en.getDate()  + "-" + (en.getMonth()+1) + "-" + en.getFullYear();

        this.hotel=this.houssing.name;
        /*
        this.transport_lat=this.houssing.lat;
        this.transport_lon=this.houssing.lon;
        */
        this.geo.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
          let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
          this.mylocation=mylocation;
          //this.transport=new google.maps.LatLng(this.transport_lat,this.transport_lon);


          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 10,
            center: mylocation
          });

          this.directionsDisplay.setMap(this.map);
          this.show_route();
        });

    });
  }

  show_route() {
    this.directionsService.route({
      origin:this.mylocation ,
      destination:{lat: 21.4304217, lng: 39.8302188} ,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(this.mylocation, new google.maps.LatLng(21.4895091, 39.18336709999994));
        console.log(distance);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingPage');
  }

}
