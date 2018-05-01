import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RouteDetailsPage } from '../route-details/route-details';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';

/**
 * Generated class for the RouteMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-map',
  templateUrl: 'route-map.html',
})
export class RouteMapPage {

  routes: Observable<any[]>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    // this.routes = this.firebaseProvider.getRoutes().valueChanges();
    // this.stops = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopsPage');
    this.routes = this.firebaseProvider.getRoutes().valueChanges();
  }

  onRouteClick(event, route) {
    let routeDetailsModal = this.navCtrl.push(RouteDetailsPage,
      { routeName: route.name });
  }


}
