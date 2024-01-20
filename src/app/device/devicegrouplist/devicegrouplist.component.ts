import { DevicegroupService } from './../devicegroup.service';
import { Component, OnInit } from '@angular/core';
import { Devicegroup } from '../devicegroup';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-devicegrouplist',
  templateUrl: './devicegrouplist.component.html',
  styleUrls: ['./devicegrouplist.component.css'],
  standalone: true,
  imports: [MatCardModule],
})
export class DevicegrouplistComponent implements OnInit {
  rows?: Devicegroup[];
  constructor(public service: DevicegroupService) {}

  ngOnInit() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
    });
  }
}
