import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GoogleMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google; //add it to work in my laptop, feel free to remove it. Xiao
@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {

  // Receive the Stop Name and location

  @ViewChild('map') mapElement;
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

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){
    console.log("start the google map");
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
    // The marker for the bus-stop
  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: this.map
  	})
    console.log("Mark the first point");
    if (navigator.geolocation) {
      console.log("Open geolocation");
      navigator.geolocation.getCurrentPosition(function(currentPos){

      // When I select another stop doesn't work

      var curLat = currentPos.coords.latitude;
      var curLng = currentPos.coords.longitude;

      // Add a new marker based on the curLat,curLng
      console.log(curLat);
      console.log(curLng);
    },function(){
      console.log("Cannot find the current location");
    });}else{
      console.log("Geolocation cannot be opened");
    }

  }
  closeModal() {
    this.navCtrl.pop();
  }

}
