import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StopDetailsPage } from '../stop-details/stop-details';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';

/**
 * Generated class for the StopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stops',
  templateUrl: 'stops.html',
})
export class StopsPage {

  items: Observable<any[]>;
  stopNames: any;
  temp: any;
  // busStopsRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    // this.busStopsRef = this.firebaseProvider.getBusStops();
    // this.busStops = this.busStopsRef.valueChanges();
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.stopNames = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopsPage');
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.items.subscribe(item => {
      this.stopNames = this.getBusNames(item);
    });

    

    var ID = setInterval(() => {
      this.refreshStopNames();
    }, 1000); //60000 milliseconds is 1 minute

    if (this.stopNames != []){
      console.log(this.stopNames)
      this.temp = this.stopNames
      clearInterval(ID);
    }
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
      { stopName: item.name, stopID: item.id });
  }

  initializeItems() {
    this.temp = this.stopNames
  }

  getBusNames(busStops: any): any {

    var stopNames: any[] = [];
    for (var stopKey in busStops) {
      var busStopObj: any = busStops[stopKey];
      stopNames.push(busStopObj["name"]);
      }
    // console.log(stopNames)

    return stopNames;
  }

  refreshStopNames() {
    if (this.stopNames === undefined) {
      return;
    }
    this.temp = this.stopNames
    // console.log(this.stopNames);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.temp = this.temp.filter((stopname) => {
        return (stopname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
