import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  getBusStops() {
    return this.afd.list('/busStops/');
  }
  getstopTimes(stopID, day) {
    var dayStr = "";
    switch (day) {
      case 0:
        dayStr = "sunday";
        break;
      case 1:
        dayStr = "monday";
        break;
      case 2:
        dayStr = "tuesday";
        break;
      case 3:
        dayStr = "wednesday";
        break;
      case 4:
        dayStr = "thursday";
        break;
      case 5:
        dayStr = "friday";
        break;
      case 6:
        dayStr = "saturday";
        break;
    }
    console.log('getting stoptimes /busStops/stop' + stopID + '/' + dayStr + 'Times/');
    return this.afd.list('/busStops/stop' + stopID + '/' + dayStr + 'Times/');
    // return this.afd.list('/busStops/stop0/mondayTimes/');
  }

  getStopLocation(stopID) {
    return this.afd.list('/busStops/stop' + stopID + '/location/');
  }
  getStopLines(stopID) {
    return this.afd.list('/busStops/stop' + stopID + '/lines/');
  }
}
