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
  deviceLocation : Coordinates;
  items: Observable<any[]>;
  favStops: String;
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public firebaseProvider: FirebaseProvider,
    private geolocation: Geolocation) {
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.favStops = "";
  }

  ionViewDidLoad() {
    this.refreshFav();
    setInterval(() => { this.refreshFav(); }, 1000);

    this.geolocation.getCurrentPosition().then((data) => {
      this.deviceLocation = data.coords;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deviceLocation = data.coords;
    });
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
