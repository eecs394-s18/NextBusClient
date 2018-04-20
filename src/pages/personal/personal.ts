import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StopDetailsPage } from '../stop-details/stop-details';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';


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

  items: Observable<any[]>;
  favStops: String;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public storage: Storage,
    public firebaseProvider: FirebaseProvider) {
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.favStops = "";
  }

  ionViewDidLoad() {
    this.refreshFav();
    setInterval(() => { this.refreshFav(); }, 3000);
  }

  refreshFav() {
    this.storage.get('favorite-stops').then(stops => this.favStops = stops);
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.modalCtrl.create(StopDetailsPage,
      { stopName: item.name, stopID: item.id },
      { cssClass: 'stopDetailsModal' });
    stopDetailsModal.present();
  }

}
