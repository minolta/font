import { DeviceService } from './../../device/device.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ds18b20Service } from '../../device/ds18b20.service';
import { Ds18b20sensor } from '../../device/ds18b20sensor';
@Component({
    selector: 'app-dss',
    templateUrl: './dss.component.html',
    styleUrls: ['./dss.component.css'],
    standalone: false
})
export class DssComponent implements OnInit, OnDestroy {
  subscription: any;
  devices: Array<any> = [];
  rows: Ds18b20sensor[] = [];
  autoupdate = false;
  constructor(
    public service: Ds18b20Service,
    public pidevices: DeviceService,
    public bar: MatSnackBar
  ) {
    //output: 0
    // this.subscription = source.subscribe(val => this.show());
  }
  bag = { obj: { id: 0, name: '' } };
  ngOnInit() {
    this.load();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscription');
      this.bar.open('Close', 'Show last tmp', { duration: 1000 });
    }
  }
  load() {
    if (localStorage.getItem('dssdevices') != null) {
      let save = JSON.parse(localStorage.getItem('dssdevices')!!);
      if (save != null) this.devices = save;
    }
  }
  updatetmp() {
    console.log('GET');
    this.service.updatebylast(this.devices).subscribe((d) => {
      this.rows = d;
      console.log(d);
      this.bar.open('Update', 'tmp', { duration: 1000 });
    });
  }
  remove(i: number) {
    this.devices.splice(i, 1);
    localStorage.setItem('dssdevices', JSON.stringify(this.devices));
  }
  show() {
    if (this.autoupdate) this.updatetmp();
  }
  addtodisplay() {
    this.devices.push(JSON.parse(JSON.stringify(this.bag.obj)));
    console.log('====' + this.devices);
    localStorage.setItem('dssdevices', JSON.stringify(this.devices));
  }
}
