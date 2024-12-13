import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from './../device.service';
import { Component, OnInit } from '@angular/core';
import { Ds18sensorService } from '../ds18sensor.service';
import * as FileSaver from 'file-saver';
// import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Device } from '../device';
import { environment } from '../../../environments/environment';
import { WService } from '../../w.service';
@Component({
    selector: 'app-devicelist',
    templateUrl: './devicelist.component.html',
    styleUrls: ['./devicelist.component.css'],
    standalone: false
})
export class DeviceListComponent implements OnInit {
  n?: Date;
  limit = 500;
  now: number = 0;
  s: any;
  re = 0;
  subscription: any;
  rowsbuffer = [];
  ssss = false;
  rows?: Device[];
  constructor(
    public service: DeviceService,
    public ts: Ds18sensorService,
    public ws: WService,
    public bar: MatSnackBar
  ) {}
  load() {
    let ssave = localStorage.getItem('searchdevice');
    console.log(ssave);
    if (ssave != null) this.s = ssave;

    let s = localStorage.getItem('showonly');
    if (s != null) {
      this.ssss = JSON.parse(s);
    }
  }
  savesearch() {
    console.log('Save:' + this.s);
    localStorage.setItem('searchdevice', this.s);
    localStorage.setItem('showonly', JSON.stringify(this.ssss));
  }
  ref() {}
  ngOnInit() {
    this.load();
    this.n = new Date();
    this.n.getTime();
    this.update();
    // let timer = TimerObservable.create(2000, 60000);
    // this.subscription = timer.subscribe((t: any) => {
    //   if (this.re > 0) this.update();
    // });
  }

  showname(ip: string) {
    let url = 'http://' + ip + '/showname';
    console.log(url);
    this.service.http.get(url).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.bar.open('Show name on device', '', { duration: 2000 });
    });
  }

  resetpijob(ip: string) {
    let url = 'http://' + ip + '/resetpijob';
    console.log(url);
    this.service.http.get(url).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.bar.open('Reset all pi job', 'Is ok', { duration: 2000 });
    });
  }

  export(device: Device) {
    console.log(JSON.stringify(device));
    let url = 'http://' + device.ip + '/exportjob';
    this.ts.http.get(url, { responseType: 'blob' }).subscribe((d) => {
      console.log('return:' + d);
      FileSaver.saveAs(d, device.name + '.json');
    });
  }
  update() {
    console.log('Update ' + this.s);
    this.savesearch();
    this.service.sn({ search: this.s, page: 0, limit: this.limit }).subscribe(
      (d) => {
        let dd = d as Array<Device>;
        console.log(d);
        if (this.ssss) {
          this.rows = dd.filter((i) => {
            i.lastcheckinlong!! > 0;
          });
        } else {
          this.rows = d;
        }
        this.bar.open('Search', 'Found:' + dd.length, { duration: 2000 });
        // console.log(JSON.stringify(this.rows));
      },
      (e) => {
        console.error('ERROR', e);
      }
    );
  }
  showonlyup(e: boolean) {
    this.ssss = e;
    this.update();
  }
  exportdevice() {
    let url = environment.host + '/rest/piserver/pidevice/exports';
    this.ts.http.get(url, { responseType: 'blob' }).subscribe((d) => {
      console.log('return:' + d);
      FileSaver.saveAs(d, 'devices.json');
    });
  }

  numtostr(x: number) {
    var dd = (x / 86400) | 0;
    var sectoh = x % 86400;
    var hh = (sectoh / 3600) | 0;
    var sectomin = sectoh % 3600;
    var mm = (sectomin / 60) | 0;
    var lastsec = sectomin % 60;

    let day = dd;

    let h = hh;
    let min = mm;

    let sec = lastsec; //เหลือวินาที

    // var p1 = x % 60;
    // var p2 = x / 60;
    // var p3 = p2 % 60;
    // var d = 0;
    // p2 = p2 / 60;
    // if (p2 > 24) {
    //   d = parseInt((p2 / 24).toString());
    //   p2 = (x - d * 24 * 60) / 120; //เอาวันลบก่อน
    // }
    return 'uptime ' + day + ' Day(s) ' + h + ':' + min + ':' + sec;
  }
}
