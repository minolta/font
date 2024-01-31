import { DeviceService } from './../../device/device.service';
import { Dht22valueService } from './../../device/dht22value.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Forgraph } from '../forg';
import { interval } from 'rxjs';
//import { Subscription } from "rxjs";
//import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-dhtinfo',
  templateUrl: './dhtinfo.component.html',
  styleUrls: ['./dhtinfo.component.css'],
})
export class DhtinfoComponent implements OnInit, OnDestroy {
  hmin? = 0;
  hmax? = 0;
  tmax? = 0;
  tmin? = 0;
  hdata: number[] = [];
  tdata: number[] = [];
  labels: string[] = [];
  getdate(event:string)
  {
    console.debug('Get date func',event)
  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.hdata,
        label: 'H',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.tdata,
        label: 'T',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
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
    public ds: DeviceService,
    public dhts: Dht22valueService,
    public bar: MatSnackBar,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {}
  chart: any;
  havechart = false;
  bag = { obj: { name: '', id: 0 } };
  sd: any;
  ed: any;
  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource: any;
  autoupdate = false;
  subscription: any;
  ot: any;
  oh: any;
  saveinfo() {
    localStorage.setItem(
      'dhtdateinfo',
      JSON.stringify({ sd: this.sd, ed: this.ed })
    );
    localStorage.setItem('dhtinfodevice', JSON.stringify(this.bag.obj));
  }
  loadinfo() {
    if (localStorage.getItem('dhtdateinfo')) {
      if (localStorage.getItem('dhtdateinfo')) {
        let dd = JSON.parse(localStorage.getItem('dhtdateinfo')!!);
        this.sd = dd.sd;
        this.ed = dd.ed;
      }
    }

    if (localStorage.getItem('dhtinfodevice') != null) {
      let device = JSON.parse(localStorage.getItem('dhtinfodevice')!!);
      this.bag.obj = device;
    }
  }

  newdate() {
    let today = new Date();
    let n = new Date();
    let p = new Date();
    p.setHours(today.getHours() + -1);
    n.setHours(today.getHours() + 24);
    this.sd = p;
    this.ed = n;
  }
  ngOnInit() {
    this.loadinfo();
    this.subscription = interval(60000).subscribe((val) => {
      this.autoupdatef();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscription');
    }
  }
  autoupdatef() {
    if (this.autoupdate) {
      this.showdata();
    } else {
    }
  }

  showdata() {
    console.log(JSON.stringify(this.bag));
    this.dhts.getResult(this.sd, this.ed, this.bag.obj.id).subscribe((d) => {
      this.hdata.length = 0;
      this.tdata.length = 0;
      this.labels.length = 0;
      this.makedata1(d);
    });
    this.saveinfo();
  }
  makedata1(d: Forgraph[]) {
    console.log('D', d);
    let datas = d;

    datas.forEach((item) => {
      if (this.tmax!! < item.t!!) this.tmax = item.t;
      if (this.tmin!! > item.t!! || this.tmin == 0) this.tmin = item.t;

      if (this.hmax!! < item.h!!) this.hmax = item.h;
      if (this.hmin!! > item.h!! || this.hmin == 0) this.hmin = item.h;
      this.hdata.push(item.h!!);
      this.tdata.push(item.t!!);
      this.ot = item.t;
      this.oh = item.h;
      // category.push({
      //   label: item.hour + ":" + item.day + "/" + item.month + "/" + item.year,
      // });
      this.labels.push(item.hour + '/' + item.day + '/' + item.month);
      this.oh = item.h;
      this.ot = item.t;
    });

    console.log('Data set ', this.lineChartData);
    this.chart1!!.chart!!.update();
  }

  makedata12(d: Forgraph[]) {
    let buf: any[] = [];
    let buf1: any[] = [];
    let buf2: number[] = [];
    let category = [];
    let labels: string[] = [];

    // let oh;
    // let ot;

    let datas = d;
    datas.map((item) => {
      buf.push(item.h);
      buf1.push(item.t);
      category.push({
        label: item.hour + ':' + item.day + '/' + item.month + '/' + item.year,
      });
      labels.push(item.hour + '/' + item.day + '/' + item.month);
      this.oh = item.h;
      this.ot = item.t;
    });

    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

    console.log('Chart :', this.chart);
    if (!this.havechart) {
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'H',
              data: buf,
              borderColor: '#3cba9f',
              fill: false,
            },
            {
              label: 'T',
              data: buf1,
              borderColor: '#ffcc00',
              fill: false,
            },
          ],
        },
      });
    } else {
      let o = this.chart as Chart;
      console.log(
        'xxxxx' + o + 'Buf :' + buf + ' ' + o.data + ' === buf1' + buf1
      );
      o.data.datasets[0].data = buf;
      o.data.datasets[1].data = buf1;
      o.data.labels = labels;
      o.update();
    }

    // this.ls.message("H[" + oh + "] T[" + ot + "]");
    this.bar.open('Update ', ' ' + Date(), { duration: 5000 });
  }

  makedata(d:Forgraph[]) {
    let buf = [];
    let buf1 = [];
    let buf2: number[] = [];
    let category = [];
    let labels: string[] = [];
    let oh;
    let ot;
    for (let i of d) {
      
      buf.push({ value: i.h });
      buf1.push({ value: i.t });
      buf2.push(0);
      oh = i.h;
      ot = i.t;
      category.push({
        label: i.hour + ':' + i.day + '/' + i.month + '/' + i.year,
      });
      labels.push(i.hour + ' /' + i.day + '/' +i.month);
    }

    this.setsrc();

    console.log('Index: ============ ' + JSON.stringify(category));
    this.dataSource.categories = [
      {
        category,
      },
    ];
    this.dataSource.chart.caption = 'DHT22 value ' + this.bag.obj.name;
    this.dataSource.chart.subCaption =
      this.sd.toLocaleString() + ' ' + this.ed.toLocaleString();
    this.dataSource.dataset = [
      { seriesname: 'H', data: buf },
      { seriesname: 'T', data: buf1 },
    ];

    console.log('Dataset ' + JSON.stringify(this.dataSource));
  }

  //Set up chart
  setsrc() {
    this.dataSource = {
      chart: {
        caption: 'DHT22',
        subCaption: 'Bakersfield Central vs Los Angeles Topanga',
        captionFontSize: '14',
        subcaptionFontSize: '14',
        subcaptionFontBold: '0',
        paletteColors: '#0075c2,#1aaf5d',
        bgcolor: '#ffffff',
        showBorder: '0',
        showShadow: '0',
        showCanvasBorder: '0',
        usePlotGradientColor: '0',
        legendBorderAlpha: '0',
        legendShadow: '0',
        showAxisLines: '0',
        showAlternateHGridColor: '0',
        divlineThickness: '1',
        divLineIsDashed: '1',
        divLineDashLen: '1',
        divLineGapLen: '1',
        xAxisName: 'Day',
        showValues: '0',
      },
      categories: [
        {
          category: [],
        },
      ],
      dataset: [
        {
          seriesname: 'H',
          data: [],
        },
        {
          seriesname: 'T',
          data: [],
        },
      ],
      trendlines: [{}],
    };
  }
}
