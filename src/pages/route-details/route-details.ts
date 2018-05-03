import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { StopDetailsPage } from '../stop-details/stop-details';
import { FirebaseProvider } from './../../providers/firebase/firebase';

/**
 * Generated class for the RouteDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-details',
  templateUrl: 'route-details.html',
})
export class RouteDetailsPage {
  sortedStops: any[];
  lineName: "";
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController) {
    let keys = Object.keys(this.navParams.data.routeStops);
    this.sortStops(keys)
  }

  ionViewDidLoad() {
    this.lineName = this.navParams.data.routeName;
  }

  sortStops(keys: any[]) {
    let sortedKeys = keys.sort((a, b) => this.stopCompare(a, b));
    this.sortedStops = []
    sortedKeys.forEach((key) => {
      this.sortedStops.push(this.navParams.data.routeStops[key]);
    })
  }

  stopCompare(a: any, b: any) {
    var aStopNum: number = Number(a.slice(4, ));
    var bStopNum: number = Number(b.slice(4, ));
    return aStopNum - bStopNum;
  }

  itemTapped(event, item) {
    let stops = this.firebaseProvider.getBusStops().valueChanges();
    stops.subscribe(elem => {
      this.items = elem;
      this.items.forEach(stop => {
        if (stop.name == item) {
          let stopDetailsModal = this.navCtrl.push(StopDetailsPage,
            { stopName: stop.name, stopID: stop.id });
          return;
        }
      });
      let alert = this.alertCtrl.create({
        title: 'Stop not found',
        buttons: ['got it']
      });
      alert.present();
    });
  }

}
