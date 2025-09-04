import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device } from '../../device/device';
import { DeviceService } from '../../device/device.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-deviceactive',
    templateUrl: './deviceactive.component.html',
    styleUrls: ['./deviceactive.component.css'],
    standalone: false
})
export class DeviceactiveComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      console.log('Bye Bye');
    }
  }
  buf = Array<any>();
  devices: Device[] = Array<Device>();
  showall = false;
  sub: any;
  bag = { obj: { id: 0, name: '' } };
  lastupdate: any;

  constructor(public service: DeviceService) {}

  ngOnInit() {
    // const source = interval(10000);
    // this.sub = source.subscribe(val => this.update());
    this.load();
    this.update();
  }

  update() {
    console.log('Call');
    // this.service.sn({ search: '', page: 0, limit: 1000 }).subscribe(d => {
    //   this.devices = d
    // })
    let http = this.service.http;
    let host = environment.host;

    http
      .post<Device[]>(
        environment.host + '/rest/piserver/pidevice/activedevice',
        this.buf
      )
      .subscribe(
        (d) => {
          console.log('return call active', d);
          this.devices = d;
          this.lastupdate = Date();
        },
        (error) => {
          console.error(error);
        }
      );
  }
  load() {
    // let f = JSON.parse(localStorage.getItem('deviceactiveids'));
    // if (f != null) this.buf = f;
  }
  add(e: any) {
    // let f = JSON.parse(localStorage.getItem('deviceactiveids'));
    // if (f != null) this.buf = f;
    // this.buf.push(e);
    // localStorage.setItem('deviceactiveids', JSON.stringify(this.buf));
    // this.update();
  }
  remove(i: Device) {
    this.buf.splice(this.getdevice(i, this.buf), 1);
    this.buf.splice(this.getdevice(i, this.devices), 1);
    localStorage.setItem('deviceactiveids', JSON.stringify(this.buf));
    this.update();
  }
  getdevice(device: Device, b: any[]) {
    let index = 0;
    for (let d of b) {
      if (d.id === device.id) return index;

      index++;
    }
    return -1;
  }
}
