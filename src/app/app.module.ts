import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PersonalPage } from '../pages/personal/personal';
import { StopsPage } from '../pages/stops/stops';
import { RouteMapPage } from '../pages/route-map/route-map';
import { StopDetailsPage } from '../pages/stop-details/stop-details';

//for firebase
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
// import { FirebaseProvider } from '../providers/firebase/firebase';

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
    StopDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PersonalPage,
    StopsPage,
    RouteMapPage,
    StopDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
