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
  public stopName: string;

  constructor(public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    this.stopName = this.navParams.data.stopName;
  }

  closeModal() {
    this.view.dismiss()
  }

  favoriteAdded() {

      if (this.isActive === "false") {
        this.isActive = "true";
      }
      else if (this.isActive === "true") {
        this.isActive = "false";
      }
   }

}
