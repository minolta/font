import { DeviceService } from './../device.service';
import { Device } from './../device';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-devicenew',
  templateUrl: './devicenew.component.html',
  styleUrls: ['./devicenew.component.css']
})
export class DevicenewComponent implements OnInit {

  device: Device = {}
  constructor(public bar: MatSnackBar, public service: DeviceService) { }

  ngOnInit() {
  }

  save() {

    this.service.add(this.device).subscribe(d => {
      this.bar.open('Add device', '', { duration: 5000 })
      this.device = {}
    })
  }

}
