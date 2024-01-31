import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DistanceService } from '../distance.service';
import { Chart } from 'chart.js';
import * as m from 'moment';
import { interval } from 'rxjs';
import { Ds18sensorService } from '../../device/ds18sensor.service';
import { DeviceService } from '../../device/device.service';
import { Distance } from '../distance';
@Component({
  selector: 'app-distanceinfo',
  templateUrl: './distanceinfo.component.html',
  styleUrls: ['./distanceinfo.component.css'],
})
export class DistanceinfoComponent implements OnInit, OnDestroy {
  lastupdate: any;
  avg: any;
  chart: any;
  havechart = false;
  bag = { obj: { name: '', id: 0, callname: '' } };
  sd?: Date;
  ed?: Date;
  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource: any;
  autoupdate = false;
  subscription: any;
  last: any;
  lastvalue: any;

  constructor(
    private elementRef: ElementRef,
    public dts: DistanceService,
    private route: ActivatedRoute,
    public dss: Ds18sensorService,
    public dvs: DeviceService,
    public bar: MatSnackBar,
    public ds: DeviceService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscription');
    }
  }
  autoupdatef() {
    if (this.autoupdate) {
      console.log('Update :');
      this.showdata();
    } else {
      console.log('Not update');
    }
  }

  ngOnInit(): void {
    this.load();
    this.subscription = interval(60000).subscribe((val) => {
      this.autoupdatef();
    });
  }
  showdata() {
    console.log('search date ' + this.sd + ' --- ' + this.ed);
    this.save();
    this.dts.searchbydate(this.bag.obj.id, this.sd, this.ed).subscribe((d) => {
      console.log(d);
      this.makedata1(d);
    });
  }
  save() {
    localStorage.setItem(
      'distance',
      JSON.stringify({ sd: this.sd, ed: this.ed, device: this.bag })
    );
  }
  load() {
    let o = localStorage.getItem('distance');
    if (o != null) {
      let oo = JSON.parse(o);
      this.sd = oo.sd;
      this.ed = oo.ed;
      this.bag = oo.device;
    }
  }

  makedata1(d: Distance[]) {
    let data = [];
    let category = [];
    this.avg = 0;
    let c = 1;
    for (let o of d) {
      data.push(o.distancevalue);
      category.push(o.valuedate);
      this.avg += o.distancevalue;
      this.lastvalue = o.distancevalue;
      c++;
    }

    this.avg = this.avg / c;
    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

    if (!this.havechart) {
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: category,
          datasets: [
            {
              label: 'W',
              data: data,
              borderColor: '#3246a8',
              fill: false,
            },
          ],
        },
      });
    } else {
      let o = this.chart as Chart;

      o.data.datasets[0].data = data as any;

      o.data.labels = category;
      o.update();
    }
    // this.ls.message('Last update:' + old + " " + this.bag.obj.callname)
    this.bar.open('Update ', ' ' + Date(), { duration: 5000 });
    //console.log('Chart:' + this.chart)
  }
}
