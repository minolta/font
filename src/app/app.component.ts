import { Component } from '@angular/core';
import { WService } from './w.service';
import { environment } from '../environments/environment';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Time } from '@angular/common';
import moment from 'moment';
import { DeviceService } from './device/device.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'font';
  sd?: Date;
  st?: Time;
  v = new Date();
  v1 = new Date();
  env = environment;
  disabled: boolean = false;
  maxDate: any;
  showSpinners: boolean = true;
  showSeconds: boolean = true;
  stepHour: number = 0;
  stepMinute: number = 0;
  stepSecond: number = 0;
  touchUi: boolean = true;
  color: ThemePalette;
  enableMeridian: boolean = true;
  disableMinute: boolean = true;
  hideTime: boolean = false;
  minDate: any;
  dateControl = new FormControl();
  obj: any;
  constructor(public ws: WService, public ds: DeviceService) {}
  printsd(t1?: string, t2?: string) {
    console.debug('sd value', this.sd);
    console.debug('t1', t1, t2);
  }
  getdatetime(e: any) {
    console.debug('Have even', e);
  }
  gettime() {
    // const str = '09-24-2024 09:44:21';
    let str = this.sd + ' ' + this.st;
    console.debug('Str:', str, this.sd?.getTime()!! / 1000);
    const date = moment(str, 'DD-MM-YYYY hh:mm').toDate();

    console.debug('Convert date', date, date.getTime());
  }
}
