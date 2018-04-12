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
  nextBuses: any;

  constructor(public navParams: NavParams, public view: ViewController, public firebaseProvider: FirebaseProvider) {
    this.nextBuses = [{"line": "Loading", "timeRemaining": "xx:xx", "time": "xx:xx"}]
  }

  ionViewDidLoad() {
    this.stopName = this.navParams.data.stopName;
    var d = new Date();
    this.stopID = this.navParams.data.stopID;
    this.stopTime = this.firebaseProvider.getstopTimes(this.stopID, d.getDay()).valueChanges();
    this.stopLines = this.firebaseProvider.getStopLines(this.stopID).valueChanges();
    this.stopLocation = this.firebaseProvider.getStopLocation(this.stopID).snapshotChanges();

    console.log("stopDetail id: " + this.stopID);
    
    this.stopLocation.subscribe();
    this.stopLines.subscribe();
    this.stopTime.subscribe(times => { 
      this.nextBuses = this.getNextBusesInOrder(times);
    });

    // setInterval(function() {
    //   console.log('interval')
    //   console.log(this.nextBuses)
    //   if (this.nextBuses === undefined) {
    //     console.log('undef')
    //     return;
    //   }
    //   console.log(this.nextBuses[0].diffSecs);
    //   this.nextBuses[0].diffSecs = this.nextBuses[0].diffSecs - 1;
    // }, 1000);
  }

  convertTimeStringToDateTime(timeString: string) : Date {
    if (timeString === undefined) {
      return;
    }
    var newDate: Date = new Date;
    var hhMM: string[] = timeString.split(/\:|\-/g);
    newDate.setHours(parseInt(hhMM[0]));
    newDate.setMinutes(parseInt(hhMM[1]));
    newDate.setSeconds(0); //default
    return newDate;
  }

  timeRemainingFromT1ToT2(t1: Date, t2: Date) : {diffHours: number, diffMins: number, diffSecs: number}{
    const hourMask: number = 60*60*1000;
    const minMask: number = 60*1000;
    const secMask: number = 1000;

    var diffInMs: number = <any>t2-<any>t1; // any is needed to supress typescript error which complains about date arithmetic
    var diffRemaining: number = diffInMs;
    var diffHours: number = Math.trunc(diffRemaining/hourMask);
    var diffRemaining: number = diffRemaining % hourMask;
    var diffMins: number = Math.trunc(diffRemaining/minMask);
    var diffRemaining: number = diffRemaining % minMask;
    var diffSeconds: number = Math.trunc(diffRemaining/secMask);

    return {diffHours: diffHours, diffMins: diffMins, diffSecs: diffSeconds};
  }

  getNextBusesInOrder(todayBusTimes: any): any { 
    var now: Date = new Date();

    var nextBuses: any[] = [];
    for (var timeLocationObjKey in todayBusTimes) {
      var timeLocationObj: any = todayBusTimes[timeLocationObjKey];
      var busTime: Date = this.convertTimeStringToDateTime(timeLocationObj.time);
      if (busTime > now) {
        var timeToThisBus = this.timeRemainingFromT1ToT2(now, busTime);
        let thisBus = {"time": timeLocationObj.time, 
                      "line": timeLocationObj.line,
                      "timeRemaining": timeToThisBus};
        nextBuses.push(thisBus);
      }
    }

    // sorting the next buses based on time of arrival
    nextBuses.sort( function(a, b) : number {
      if (a.time > b.time) {
        return 1;
      }
      return -1;
    });

    return nextBuses;
  }

  closeModal() {
    this.view.dismiss()
  }

  buttonClick() {

  }


}
