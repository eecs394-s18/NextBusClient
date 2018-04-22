import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';
import { GoogleMapPage } from '../google-map/google-map';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
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
  fav: boolean;

  constructor(
    public navParams: NavParams,
    public view: ViewController,
    public firebaseProvider: FirebaseProvider,
    public storage: Storage,
    public modalCtrl: ModalController) {
    this.nextBuses = [{ "line": "Loading", "timeRemaining": "xx:xx", "time": "xx:xx" }];
  }

  ionViewDidLoad() {
    this.fav = false;
    this.stopName = this.navParams.data.stopName;
    var d = new Date();
    this.stopID = this.navParams.data.stopID;
    this.stopTime = this.firebaseProvider.getstopTimes(this.stopID, d.getDay()).valueChanges();
    this.stopLines = this.firebaseProvider.getStopLines(this.stopID).valueChanges();
    this.stopLocation = this.firebaseProvider.getStopLocation(this.stopID).snapshotChanges();

    console.log("stopDetail id: " + this.stopID);

    // Get firebase changes in real time from observable
    this.stopLocation.subscribe();
    this.stopLines.subscribe();
    this.stopTime.subscribe(times => {
      this.nextBuses = this.getNextBusesInOrder(times);
    });

    setInterval(() => {
      this.refreshNextBusTimes();
    }, 60000); //60000 milliseconds is 1 minute
    this.storage.get('favorite-stops').then(data => this.fav = data.includes(this.stopName)).catch(err => console.log("read error"));
  }

  refreshNextBusTimes() {
    if (this.nextBuses === undefined) {
      return;
    }
    this.nextBuses.forEach(nextBus => {
      let currentMins = nextBus['timeRemaining'];
      if (currentMins === 0) {
        console.log('remove bus maybe, show survey maybe')
      } else {
        nextBus['timeRemaining'] = currentMins - 1;
      }
    });
  }


  convertTimeStringToDateTime(timeString: string): Date {
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

  timeRemainingFromT1ToT2(t1: Date, t2: Date): number {
    const minMask: number = 60 * 1000;
    const secMask: number = 1000;

    var diffInMs: number = <any>t2 - <any>t1; // any is needed to supress typescript error which complains about date arithmetic
    var diffRemaining: number = diffInMs;
    var diffMins: number = Math.trunc(diffRemaining / minMask);
    var diffRemaining: number = diffRemaining % minMask;
    var diffSeconds: number = Math.trunc(diffRemaining / secMask);

    return diffMins;
  }

  getNextBusesInOrder(todayBusTimes: any): any {
    var now: Date = new Date();

    var nextBuses: any[] = [];
    for (var timeLocationObjKey in todayBusTimes) {
      var timeLocationObj: any = todayBusTimes[timeLocationObjKey];
      var busTime: Date = this.convertTimeStringToDateTime(timeLocationObj.time);
      if (busTime > now) {
        var timeToThisBus = this.timeRemainingFromT1ToT2(now, busTime);
        let thisBus = {
          "time": timeLocationObj.time,
          "line": timeLocationObj.line,
          "timeRemaining": timeToThisBus
        };
        nextBuses.push(thisBus);
      }
    }

    // sorting the next buses based on time of arrival
    nextBuses.sort(function(a, b): number {
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

  MapbuttonClick() {
    var stopInfo = {
      'stopName': this.stopName,
      'location': this.stopLocation
    };


    let mapModal = this.modalCtrl.create(GoogleMapPage, stopInfo);
    mapModal.present();
  }

  addFav(stopName) {
    var tempData = ',' + stopName;
    this.fav = !this.fav;

    if (this.fav) {
      this.storage.get('favorite-stops').then(stops => { tempData = stops + tempData; this.storage.set('favorite-stops', tempData); });
    }
    else {
      this.storage.get('favorite-stops').then(stops => { tempData = stops.replace(tempData, ""); this.storage.set('favorite-stops', tempData); });
    }

  }


  buttonClick() {

  }
}
