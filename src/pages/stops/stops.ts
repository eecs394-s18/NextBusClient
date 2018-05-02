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
      this.busStoplist = this.stops;
    });

    this.ID = setInterval(() => {
      this.refreshstops();
    }, 1000); //60000 milliseconds is 1 minute

    this.colorInit();

  }

  itemTapped(event, item) {
    let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
      { stopName: item.name, stopID: item.id });
  }

  colorInit() { // initializes color in order to be recognized by the color change function
    document.getElementById("is").style.backgroundColor = "rgb(140, 140, 140)"
    document.getElementById("cl").style.backgroundColor = "rgb(140, 140, 140)"
    document.getElementById("el").style.backgroundColor = "rgb(140, 140, 140)"
    document.getElementById("cta201").style.backgroundColor = "rgb(140, 140, 140)"
  }

  filterLine(ev: any, lineName, id) {

    this.initializeItems();

    if (lineName && lineName.trim() != '') {
      this.busStoplist = this.busStoplist.filter((stop) => {
        return (stop.lines.toLowerCase().indexOf(lineName.toLowerCase()) > -1);
      })
    }

    let currColor = document.getElementById(id).style.backgroundColor;

    if (document.getElementById(id).style.backgroundColor === "rgb(140, 140, 140)") {
      document.getElementById(id).style.backgroundColor = "rgb(66, 66, 66)";
    } else {
      this.initializeItems();
      document.getElementById(id).style.backgroundColor = "rgb(140, 140, 140)";
    }

  }




  initializeItems() {
    this.busStoplist = this.stops
  }

  swap(tag) {
    let color = document.getElementById(tag).style.backgroundColor; 
    if (color === "#488aff") {
      color = "#ffb9a3";
    } else {
      color = "#488aff";
    }
  }

  getBusNames(busStops: any): any {

    var stops: any[] = [];
    for (var stopKey in busStops) {
      var busStopObj: any = busStops[stopKey];

      var lines = "";

      Object.keys(busStopObj["lines"]).forEach(function(key, index) {
        lines = lines + busStopObj["lines"][key];
      });

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
        return (stop.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
