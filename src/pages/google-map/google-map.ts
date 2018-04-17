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
  location: any[];
  constructor(public navCtrl: NavController, public parm:NavParams) {
  	//TODO: Assign location into this file. 
  	this.stopName = parm.get('stopName');
  	this.location = parm.get('location');
  	this.stopLocationLat = 42.055984;
  	this.stopLocationLng = -87.675171;
  }

  ionViewDidLoad(){
  	this.initMap();
  }

  initMap(){
  
  	let latLng = new google.maps.LatLng(this.stopLocationLat, this.stopLocationLng);

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
