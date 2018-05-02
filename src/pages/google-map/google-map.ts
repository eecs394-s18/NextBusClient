import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
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
    var currentMap = this.map;
  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: this.map
  	})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(currentPos){

      var curLat = currentPos.coords.latitude;
      var curLng = currentPos.coords.longitude;
      console.log(curLat);
      console.log(curLng);
      var device = new google.maps.Marker({
        position: new google.maps.LatLng(curLat, curLng),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          radius: 500,
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.8,
          strokeWeight: 7,
          fillColor: "#3333FF",
          fillOpacity: 1,
          scale: 8
        },
        draggable: false,
        shadow : null,
        zIndex : 999 ,

        map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
      });
      device.setMap(currentMap);
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(device.getPosition());
      bounds.extend(marker.getPosition());
      currentMap.fitBounds(bounds);
      // Add a new marker based on the curLat,curLng

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
