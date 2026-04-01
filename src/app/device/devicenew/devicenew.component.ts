import { DeviceService } from './../device.service';
import { Device } from './../device';
import { Component, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-devicenew',
    templateUrl: './devicenew.component.html',
    styleUrls: ['./devicenew.component.css'],
    standalone: false
})
export class DevicenewComponent implements OnInit {

  device = signal<Device>({});
  constructor(public bar: MatSnackBar, public service: DeviceService) { }

  ngOnInit() {
  }

  updateDeviceField<K extends keyof Device>(key: K, value: Device[K]) {
    this.device.update((current) => ({ ...current, [key]: value }));
  }

  save() {
    const payload = this.device();
    console.debug('Add new device', payload)
    this.service.add(payload).subscribe(d => {
      this.bar.open('Add device', '', { duration: 5000 })
      this.device.set({})
    })
  }

}
