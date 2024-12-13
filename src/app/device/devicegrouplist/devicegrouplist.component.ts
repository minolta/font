import { DevicegroupService } from './../devicegroup.service';
import { Component, OnInit } from '@angular/core';
import { Devicegroup } from '../devicegroup';
@Component({
  selector: 'app-devicegrouplist',
  templateUrl: './devicegrouplist.component.html',
  styleUrls: ['./devicegrouplist.component.css'],
})
export class DevicegrouplistComponent implements OnInit {
  rows?: Devicegroup[] = [];
  constructor(public service: DevicegroupService) {}

  ngOnInit() {
    console.debug('init device group')
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
      console.debug('Found device group ',d)
    });
  }
}
