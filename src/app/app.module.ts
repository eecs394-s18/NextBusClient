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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
