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
  stops: any;
  temp: any;
  ID: any;
  // busStopsRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    // this.busStopsRef = this.firebaseProvider.getBusStops();
    // this.busStops = this.busStopsRef.valueChanges();
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.stops = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopsPage');
    this.items = this.firebaseProvider.getBusStops().valueChanges();
    this.items.subscribe(item => {
      this.stops = this.getBusNames(item);
    });

    

    this.ID = setInterval(() => {
      this.refreshstops();
      console.log(this.stops)
    }, 1000); //60000 milliseconds is 1 minute

    // if (this.stops != []){
    //   console.log(this.stops)
    //   this.temp = this.stops
    //   clearInterval(ID);
    // }
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
      { stopName: item.name, stopID: item.id });
  }

  initializeItems() {
    this.temp = this.stops
  }

  getBusNames(busStops: any): any {

    var stops: any[] = [];
    for (var stopKey in busStops) {
      var busStopObj: any = busStops[stopKey];
      let stop = {
        "name" : busStopObj["name"],
        "id" : busStopObj["id"]
      }
      stops.push(stop);
      }
    // console.log(stops)

    return stops;
  }

  refreshstops() {
    if (this.stops === []) {
      return;
    }
    this.temp = this.stops
    clearInterval(this.ID);
    // console.log(this.stops);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.temp = this.temp.filter((stopname) => {
        return (stopname.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
