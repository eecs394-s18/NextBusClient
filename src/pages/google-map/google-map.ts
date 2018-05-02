import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
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

  // Receive the Stop Name and stopLocation
  @ViewChild('map') mapElement;
  map: any;
  stopName: string;
  stopLocation: {lat: number, long: number};
  locationValid: boolean;
  launcher:any;
  deviceLocation : Coordinates;
  constructor(public navCtrl: NavController, public parm:NavParams,
              private launchNavigator: LaunchNavigator,public alertCtrl: AlertController,
              private geolocation: Geolocation) {
  	this.stopName = parm.get('stopName');
    this.stopLocation = parm.get('location');
    this.locationValid = true;
    this.launcher = launchNavigator;
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){
    if (this.stopLocation.lat === 0 && this.stopLocation.long === 0) {
      this.locationValid = false;
      return;
    }
    let latLng = new google.maps.LatLng(this.stopLocation.lat, this.stopLocation.long);

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
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deviceLocation = data.coords;
      console.log(this.deviceLocation);
      var device = new google.maps.Marker({
        position: new google.maps.LatLng(this.deviceLocation.latitude, this.deviceLocation.longitude),
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

    });
    
  }
  closeModal() {
    this.navCtrl.pop();
  }
  openApp(){
    this.geolocation.getCurrentPosition().then((data) => {
      var phonelocation = data.coords;
      let options: LaunchNavigatorOptions = {
        start: [phonelocation.latitude,phonelocation.longitude],
        app: this.launcher.APP.GOOGLE_MAPS
      };

      this.launcher.navigate([this.stopLocation.lat,this.stopLocation.long], options)
      .then(
      success => console.log('Launched navigator'),
      error => {let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: "Cannot open GoogleMap",
                buttons: ['got it']
                });
                alert.present();}
              );
    }).catch((error) => {
      let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: "Change location permission",
                buttons: ['got it']
                });
                alert.present();
    });

  }

}
