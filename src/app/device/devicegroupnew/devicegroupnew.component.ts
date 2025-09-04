import { DevicegroupService } from './../devicegroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Devicegroup } from '../devicegroup';

@Component({
    selector: 'app-devicegroupnew',
    templateUrl: './devicegroupnew.component.html',
    styleUrls: ['./devicegroupnew.component.css'],
    standalone: false
})
export class DevicegroupnewComponent implements OnInit {

  device: Devicegroup = {}
  constructor(public bar: MatSnackBar, public service: DevicegroupService) { }

  ngOnInit() {
  }

  save() {
    this.service.add(this.device).subscribe(d => {
      this.bar.open('Add', '', { duration: 5000 })
      this.device = {}
    })
  }
}
