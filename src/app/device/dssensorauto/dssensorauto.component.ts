import { AutoComponent } from '@kykub/auto';
import { Component, OnInit,  OnChanges } from '@angular/core';


@Component({
  selector: 'app-dssensorauto',
  templateUrl: './dssensorauto.component.html',
  styleUrls: ['./dssensorauto.component.css']
})
export class DssensorautoComponent extends AutoComponent implements OnInit, OnChanges {

  constructor() { super() }
}