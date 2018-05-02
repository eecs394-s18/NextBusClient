import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
