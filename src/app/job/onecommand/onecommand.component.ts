import { PijobService } from './../pijob.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onecommand',
  templateUrl: './onecommand.component.html',
  styleUrls: ['./onecommand.component.css']
})
export class OnecommandComponent implements OnInit {

  constructor(public pjs:PijobService) { }

  ngOnInit() {
  }

}
