import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMapPage } from './google-map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapPage),
  ]

})
export class GoogleMapPageModule {}
