import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { PersonalPage } from '../pages/personal/personal';
import { StopsPage } from '../pages/stops/stops';
import { RouteMapPage } from '../pages/route-map/route-map';
import { StopDetailsPage } from '../pages/stop-details/stop-details';
import { GoogleMapPage } from '../pages/google-map/google-map';

//for firebase
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';

// for storage
import { IonicStorageModule } from '@ionic/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCGu9TTnXfE5R1IIgnX4E7cEfoXIcm_L1k",
  authDomain: "nextbus-6963e.firebaseapp.com",
  databaseURL: "https://nextbus-6963e.firebaseio.com",
  projectId: "nextbus-6963e",
  storageBucket: "nextbus-6963e.appspot.com",
  messagingSenderId: "229424620214"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PersonalPage,
    StopsPage,
    RouteMapPage,
    StopDetailsPage,
    GoogleMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PersonalPage,
    StopsPage,
    RouteMapPage,
    StopDetailsPage,
    GoogleMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
