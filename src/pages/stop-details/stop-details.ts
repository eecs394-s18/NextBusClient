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
  public stopID: string;
  stopTime: Observable<any[]>;
  stopLines: Observable<any[]>;
  stopLocation: Observable<any[]>;
  constructor(public navParams: NavParams, public view: ViewController, public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    this.stopName = this.navParams.data.stopName;
    var d = new Date();
    this.stopID = this.navParams.data.stopID;
    this.stopTime = this.firebaseProvider.getstopTimes(this.stopID, d.getDay()).valueChanges();
    this.stopLines = this.firebaseProvider.getStopLines(this.stopID).valueChanges();
    this.stopLocation = this.firebaseProvider.getStopLocation(this.stopID).snapshotChanges();

    console.log("stopDetail id: " + this.stopID);
    this.stopLocation.subscribe(res => { res.forEach(t => { console.log(t.key + ": " + t.payload.val()); }); });
    this.stopLines.subscribe(res => { res.forEach(t => { console.log("each line serviced:" + t); }); });
    this.stopTime.subscribe(res => { res.forEach(t => { console.log("each time and line: " + t.time + " " + t.line); }); });


  }

  closeModal() {
    this.view.dismiss()
  }

 buttonClick() {

   }


}
