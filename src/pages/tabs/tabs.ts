import { Component } from '@angular/core';

import { PersonalPage } from '../personal/personal';
import { StopsPage } from '../stops/stops';
import { RouteMapPage } from '../route-map/route-map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PersonalPage;
  tab2Root = StopsPage;
  tab3Root = RouteMapPage;

  constructor() {

  }
}
