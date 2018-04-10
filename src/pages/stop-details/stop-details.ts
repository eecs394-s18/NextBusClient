import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
/**
 * Generated class for the StopDetailsPage  page.
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
  public stopName: string;
  public stopLine: string;
  public stopID: string;
  stopTime: Observable<any[]>;
  constructor(public navParams: NavParams, public view: ViewController, public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    this.stopName = this.navParams.data.stopName;
    this.stopLine = this.navParams.data.stopLine;
    var d = new Date();
    this.stopID = this.navParams.data.stopID;
    this.stopTime = this.firebaseProvider.getstopTimes(this.stopID, d.getDay()).valueChanges();

    // basic way to parse data from stopTime:
    this.stopTime.subscribe(res => { res.forEach(t => { console.log("each time and line: " + t.time + " " + t.line) }); });

    console.log("stopDetail id: " + this.stopID);
  }

  closeModal() {
    this.view.dismiss()
  }

}
