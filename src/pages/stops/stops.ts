import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { StopDetailsPage } from '../stop-details/stop-details';
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
  items: Array<{title: string}>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
    this.items = [];
    let item1 = {title: 'Weber Arch'};
    let item2 = {title: 'Tech Institute'};
    this.items.push(item1);
    this.items.push(item2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopsPage');
  }

  itemTapped(event, item) {
    let stopDetailsModal = this.modalCtrl.create(StopDetailsPage,
    {stopName: item.title},
    {cssClass:'stopDetailsModal'});
    stopDetailsModal.present();
  }

}
