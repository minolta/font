import { Port } from '../port';
import { PortService } from './../port.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-portlist',
    templateUrl: './portlist.component.html',
    styleUrls: ['./portlist.component.css'],
    standalone: false
})
export class PortlistComponent implements OnInit {
  rows = Array<Port>();
  constructor(public service: PortService) {}
  updatefromnewcomponent($event: any) {
    console.log('Add', $event);
    this.update();
  }
  ngOnInit() {
    this.update();
  }

  update() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
    });
  }
}
