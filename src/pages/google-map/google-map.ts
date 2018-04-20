import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the GoogleMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {

  // Receive the Stop Name and location

  @ViewChild ('map') mapElement;
  map: any;
  stopName: string;
  stopLocationLat: number;
  stopLocationLng: number;
  location: {lat: number, long: number};
  locationValid: boolean;

  constructor(public navCtrl: NavController, public parm:NavParams) {
  	this.stopName = parm.get('stopName');
    this.location = parm.get('location');
    this.locationValid = true;
  }

  ionViewDidLoad(){
  	this.initMap();
  }

  initMap(){
    if (this.location.lat === 0 && this.location.long === 0) {
      this.locationValid = false;
      return;
    }
    let latLng = new google.maps.LatLng(this.location.lat, this.location.long);

  	let mapOptions = {
  		center: latLng,
  		zoom: 15,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: this.map
  	})
  }
  closeModal() {
    this.navCtrl.pop();
  }

}
