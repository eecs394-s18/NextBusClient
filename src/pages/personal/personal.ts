import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { StopDetailsPage } from '../stop-details/stop-details';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  stops: Observable<any[]>;
  deviceLocation : Coordinates;
  favStops: String;
  myLocation: {lat: number, long: number};
  closestStops: any[];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public firebaseProvider: FirebaseProvider,
    private geolocation: Geolocation) {
    this.stops = this.firebaseProvider.getBusStops().valueChanges();
    this.favStops = "";
    this.closestStops = [];
  }

  ionViewDidLoad() {
    this.refreshFav();
    setInterval(() => { this.refreshFav(); }, 1000);

    this.geolocation.getCurrentPosition().then((data) => {
      this.deviceLocation = data.coords;
      this.findClosestStops()
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deviceLocation = data.coords;
      this.findClosestStops()
    });
  }

  findClosestStops() {
    this.stops.subscribe(stops => {
      stops.forEach(stop => {
        var this_stop_location = stop['location']
        var this_stop_lat = this_stop_location['Latitude']
        var this_stop_long = this_stop_location['Longitude']
        // calculate distance of every stops
        var distance_to_stop = this.calculateDistance(this.deviceLocation.latitude, this_stop_lat,
                                          this.deviceLocation.longitude, this_stop_long)
        if (distance_to_stop < 0.5) {
          // get all stops in a 500 metre radius
          this.closestStops.push({stop: stop, distance: distance_to_stop})
        }
      })
      // get the closest 4 stops
      this.closestStops.sort((stopA, stopB) => {
        return stopA.distance - stopB.distance;
      });
      this.closestStops = this.closestStops.slice(0,4)
    })
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  refreshFav() {
    this.storage.get('favorite-stops').then(stops => this.favStops = stops);
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
      { stopName: item.name, stopID: item.id });
  }

  infoButtonClick() {
    let alert = this.alertCtrl.create({
      title: 'Favorites',
      subTitle: "To add another stop: <br/> 1) Go to the stops page <br/> 2) Select a stop <br/> 3) Click the star on the top right",
      buttons: ['got it']
    });
    alert.present();
  }

}
