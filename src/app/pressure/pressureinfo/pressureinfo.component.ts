import { PressureService } from './../pressure.service';
import { DeviceService } from './../../device/device.service';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { Ds18sensorService } from './../../device/ds18sensor.service';
import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pressure } from '../pressure';
import { BaseChartDirective } from 'ng2-charts';
import { SavedataService } from '../../savedata.service';
import { environment } from '../../../environments/environment';
import { Device } from '../../device/device';
@Component({
  selector: 'app-pressureinfo',
  templateUrl: './pressureinfo.component.html',
  styleUrls: ['./pressureinfo.component.css'],
})
export class PressureinfoComponent implements OnInit, OnDestroy {
  havechart = false;
  chart: any;
  bag = { obj: { name: '', id: 0 } };
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
  avg: any;
  last: any;
  device: Device = {};

  vdata: number[] = [];
  labels: string[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.vdata,
        label: 'T',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart1?: BaseChartDirective;
  constructor(
    private elementRef: ElementRef,
    public bar: MatSnackBar,
    public pds: DeviceService,
    public ps: PressureService,
    public ss: SavedataService
  ) {}

  savedate() {
    this.ss.save('pressuresave', {
      s: this.sd,
      e: this.ed,
      device: this.bag.obj,
      auto: this.autoupdate,
    });
  }

  loaddate() {
    let o = this.ss.load('pressuresave');
    if (o != null) {
      this.sd = o.s;
      this.ed = o.e;
      this.autoupdate = o.auto;
      this.bag.obj = o.device;
    }
  }
  ngOnInit() {
    this.loaddate();
    this.subscription = interval(60000).subscribe((val) => {
      this.autoupdatef();
    });

    // let today = new Date();
    // let n = new Date();
    // let p = new Date();
    // p.setHours(today.getHours() + (-1));
    // n.setHours(today.getHours() + 24)
    // this.sd = p
    // this.ed = n
  }
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

  showdata() {
    this.savedate();
    this.ps.getgraph(this.bag.obj.id, this.sd, this.ed).subscribe((d) => {
      console.log();
      // this.makedata1(d)
      console.log('Found', d.length);
      this.makedata2(d);
    });
    this.getavg();
  }
  select() {
    console.log('Select ====>' + JSON.stringify(this.bag.obj));
    // this.ls.message('Pressure ' + this.bag.obj.name)
  }
  makedata2(d: Pressure[]) {
    this.vdata.length = 0;
    this.labels.length = 0;

    d.forEach((i) => {
      this.vdata.push(i.pressurevalue!!);
      let d = new Date(i.valuedate!!);
      this.labels.push(
        d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      );
      this.last = i.pressurevalue;
    });
    this.chart1?.update();
  }
  makedata1(d: Pressure[]) {
    let data: number[] = [];
    let category = [];
    for (let o of d) {
      o as Pressure;
      data.push(o.pressurevalue!!);
      let d = new Date(o.valuedate!!);
      category.push(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
      this.last = o.pressurevalue;
    }
    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

    if (!this.havechart) {
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: category,
          datasets: [
            {
              label: 'P',
              data: data,
              borderColor: 'red',
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
    // this.ls.message('Last update:' + old + " " + this.bag.obj.name)
    this.bar.open('Update ', ' ' + Date(), { duration: 5000 });
    //console.log('Chart:' + this.chart)
  }

  getavg() {
    let o = { search: '', id: this.bag.obj.id, s: this.sd, e: this.ed };
    console.log('AVG : ' + JSON.stringify(o));
    this.ps.http
      .post(environment.host + '/rest/piserver/pressure/getavg', o)
      .subscribe((d) => {
        console.log('Value : ' + d);
        this.avg = d;
      });
  }
}
