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
  busStoplist: any;
  ID: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
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
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
      { stopName: item.name, stopID: item.id });
  }

  initializeItems() {
    this.busStoplist = this.stops
  }

  getBusNames(busStops: any): any {

    var stops: any[] = [];
    for (var stopKey in busStops) {
      var busStopObj: any = busStops[stopKey];

      var lines = "";

      Object.keys(busStopObj["lines"]).forEach(function(key, index) {
        lines = lines + busStopObj["lines"][key];
      });
      console.log(lines);
      let stop = {
        "name": busStopObj["name"],
        "id": busStopObj["id"],
        "lines": lines
      }

      stops.push(stop);
    }
    return stops;
  }

  refreshstops() {
    if (this.stops === []) {
      return;
    }
    this.busStoplist = this.stops
    clearInterval(this.ID);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.busStoplist = this.busStoplist.filter((stop) => {
        return (stop.lines.toLowerCase().indexOf(val.toLowerCase()) > -1 || stop.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
