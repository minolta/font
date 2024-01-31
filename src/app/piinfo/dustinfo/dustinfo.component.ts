import { Component, OnInit } from '@angular/core';
import { DustService } from '../dust.service';
import { Chart } from 'chart.js';
import { ElementRef } from '@angular/core';
import { Pm } from '../pm';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../device/device.service';
@Component({
  selector: 'app-dustinfo',
  templateUrl: './dustinfo.component.html',
  styleUrls: ['./dustinfo.component.css'],
})
export class DustinfoComponent implements OnInit, OnDestroy {
  sd?: Date;
  ed?: Date;
  chart: any;
  havechart = false;
  bag = { obj: { name: '', id: 0 } };
  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource: any;
  autoupdate = false;
  subscription: any;

  constructor(
    public ds: DeviceService,
    public service: DustService,
    private elementRef: ElementRef,
    public bar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscription');
    }
  }

  ngOnInit(): void {
    this.loaddata();
    this.subscription = interval(60000).subscribe((val) => {
      if (this.autoupdate) {
        this.showdata();
      }
    });
  }

  savedata() {
    localStorage.setItem(
      'dustdata',
      JSON.stringify({
        sd: this.sd,
        ed: this.ed,
        obj: this.bag.obj,
      })
    );
  }
  loaddata() {
    if (localStorage.getItem('dustdata') != null) {
      if (localStorage.getItem('dustdata') != null) {
        let data = JSON.parse(localStorage.getItem('dustdata')!!);
        this.sd = data.sd;
        this.ed = data.ed;
        this.bag.obj = data.obj;
      }
    }
  }
  showdata() {
    console.log(this.bag.obj.id);
    console.log(this.sd + ' ' + this.ed);
    this.service.getGraph(this.bag.obj.id, this.sd, this.ed).subscribe((d) => {
      console.log(d);
      this.makegraph(d);
      this.savedata();
    });
  }

  totalpm1 = 0;
  totalpm25 = 0;
  totalpm10 = 0;
  lastpm1? = 0;
  lastpm25? = 0;
  lastpm10? = 0;
  makegraph(d: Array<Pm>) {
    let labels: Date[] = [];
    let pm1buf: number[] = [];
    let pm25buf: number[] = [];
    let pm10buf: number[] = [];
    let category = [];

    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');
    this.totalpm1 = 0;
    this.totalpm25 = 0;
    this.totalpm10 = 0;
    //adddata
    d.forEach((i) => {
      let formattedDate = i.valuedate;
      labels.push(formattedDate!!);
      pm1buf.push(i.pm1!!);
      pm10buf.push(i.pm10!!);
      pm25buf.push(i.pm25!!);
      this.totalpm1 += i.pm1!!;
      this.totalpm25 += i.pm25!!;
      this.totalpm10 += i.pm10!!;
      this.lastpm1 = i.pm1;
      this.lastpm10 = i.pm10;
      this.lastpm25 = i.pm25;
    });

    this.totalpm1 /= d.length;
    this.totalpm10 /= d.length;
    this.totalpm25 /= d.length;

    if (!this.havechart) {
      console.log('new Chart');
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Pm1',
              data: pm1buf,
              borderColor: '#3cba9f',
              fill: false,
            },
            {
              label: 'pm2.5',
              data: pm25buf,
              borderColor: '#fc3d03',
              fill: false,
            },
            {
              label: 'pm10',
              data: pm10buf,
              borderColor: '#42f54e',
              fill: false,
            },
          ],
        },
      });
    } else {
      //update old chart
      console.log('Update old chart');
      let o = this.chart as Chart;
      o.data.datasets[0].data = pm1buf;
      o.data.datasets[1].data = pm25buf;
      o.data.datasets[2].data = pm10buf;
      o.data.labels = labels;
      o.update();
    }
    this.bar.open('Update', '', { duration: 1000 });
  }
}
