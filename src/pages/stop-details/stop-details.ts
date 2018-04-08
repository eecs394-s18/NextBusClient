import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the StopDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stop-details',
  templateUrl: 'stop-details.html',
})
export class StopDetailsPage {

  constructor(public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopDetailsPage');
  }

  closeModal() {
    this.view.dismiss()
  }

}
