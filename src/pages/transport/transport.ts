import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HajjProvider } from '../../providers/hajj/hajj';


/**
 * Generated class for the TransportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html',
})
export class TransportPage {

  from="";
  to="";
  matricule='';
  transport_lat:any;
  transport_lon:any;
  @ViewChild('maps') mapElement: ElementRef;
  geocoder = new google.maps.Geocoder;
  map: any;
  travel:any;
  mylocation :any;
  transport:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,private geo:Geolocation,private diagnostic: Diagnostic,private data: HajjProvider) {
    this.platform.ready().then((readySource) => {
      this.travel=navParams.get('travel');
    console.log(this.travel);
        //console.log(resp[0]);
        this.from=this.travel.start;
        this.to=this.travel.arrive;
        this.matricule=this.travel.matricule;
        this.transport_lat=this.travel.lat;
        this.transport_lon=this.travel.lon;
        this.geo.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
          let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
          this.mylocation=mylocation;
          this.transport=new google.maps.LatLng(this.transport_lat,this.transport_lon);


          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 10,
            center: mylocation
          });

          this.directionsDisplay.setMap(this.map);
          this.show_route();
        });

    });

  }

  ionViewDidLoad() {





  }

  // get address
   get_address(mylocation){
    this.geocoder.geocode({'location': mylocation}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
         var address =results[0]['address_components'][3]['long_name']+' , '+results[0]['address_components'][4]['long_name']+' , '+results[0]['address_components'][5]['long_name'];
          alert(address);
          //this.start=address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });

   }
   // show Route
  show_route() {
    this.directionsService.route({
      origin:this.mylocation ,
      destination:{lat: 21.4895091, lng: 39.18336709999994} ,
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

}
