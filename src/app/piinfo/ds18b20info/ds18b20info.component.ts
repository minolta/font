import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { Ds18sensorService } from './../../device/ds18sensor.service';
import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  Inject,
  ViewChild,
} from '@angular/core';
import { Ds18b20Service } from '../../device/ds18b20.service';
import { Dsobj } from '../../device/dsobj';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { DeviceService } from '../../device/device.service';
import { PressureService } from '../../pressure/pressure.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-ds18b20info',
  templateUrl: './ds18b20info.component.html',
  styleUrls: ['./ds18b20info.component.css'],
})
export class Ds18b20infoComponent implements OnInit, OnDestroy {
  vdata: number[] = [];
  labels: Date[] = [];
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
    private route: ActivatedRoute,
    public dss: Ds18sensorService,
    public ds18sensers: Ds18sensorService,
    public dvs: DeviceService,
    public ds18s: Ds18b20Service,
    public ps: PressureService,
    public bar: MatSnackBar,
    public ds: DeviceService,
    public dialog: MatDialog
  ) {}
  lastupdate: any;
  avg: any;
  chart?: Chart;
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

  deletebydateask(): void {
    const dialogRef = this.dialog.open(AskbeforedeletedsComponent, {
      width: '250px',
      data: {
        method: 'Delete By Date',
        name: this.bag.obj,
        sd: this.sd,
        ed: this.ed,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed : ' + result);
      if (result) this.deletebydate();
    });
  }
  deletebyallask(): void {
    const dialogRef = this.dialog.open(AskbeforedeletedsComponent, {
      width: '250px',
      data: {
        method: 'Delete By ALL',
        name: this.bag.obj,
        sd: this.sd,
        ed: this.ed,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed : ' + result);
      if (result) this.deleteall();
    });
  }
  loadinfo() {
    if (localStorage.getItem('dsinfodevicedate') != null) {
      let o = JSON.parse(localStorage.getItem('dsinfodevicedate')!!);
      this.sd = o.sd;
      this.ed = o.ed;
    }
    if (localStorage.getItem('dsinfodevice') != null) {
      this.bag.obj = JSON.parse(localStorage.getItem('dsinfodevice')!!);
    }
  }
  saveinfo() {
    localStorage.setItem(
      'dsinfodevicedate',
      JSON.stringify({ sd: this.sd, ed: this.ed })
    );
    localStorage.setItem('dsinfodevice', JSON.stringify(this.bag.obj));
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
    let t = timer(2000, 60000);
    this.subscription = t.subscribe((t) => {
      this.autoupdatef();
    });
  }
  select() {
    this.saveinfo();
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
    this.saveinfo();
    console.log('search date ' + this.sd + ' --- ' + this.ed);
    this.ds18s.graph(this.bag.obj.id, this.sd, this.ed).subscribe((d) => {
      this.makedata2(d);
    });
    this.avgfunc();
  }
  makedata2(datas: Array<Dsobj>) {
    this.vdata.length = 0;
    this.labels.length = 0;
    datas.forEach((i) => {
      this.vdata.push(i.t!!);
      this.lastvalue = i.t;
      this.labels.push(i.adddate!!);
    });
    this.chart1!!.update();
    // for (let o of d) {
    //   let bb = o as Dsobj;
    //   //  console.log("BB===>:" + JSON.stringify(bb.t))
    //   //if (bb.t != old) {
    //   data.push(bb.t);
    //   category.push(bb.adddate);
    //   old = bb.t;
    //   this.lastvalue = old;
    //   //  }
    // }
  }
  showdatabyid(id: number) {
    console.log('search date ' + this.sd + ' --- ' + this.ed + ' id:' + id);
    this.ds18s.graph(id, this.sd, this.ed).subscribe((d) => {
      this.makedata1(d);
    });
    this.avgfunc();
  }
  makedata1(d: Dsobj[]) {
    let data = [];
    let category = [];
    let old;
    for (let o of d) {
      let bb = o as Dsobj;
      //  console.log("BB===>:" + JSON.stringify(bb.t))
      //if (bb.t != old) {
      data.push(bb.t);
      category.push(bb.adddate);
      old = bb.t;
      this.lastvalue = old;
      //  }
    }
    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

    if (!this.havechart) {
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        options: {},
        data: {
          labels: category,
          datasets: [
            {
              label: 'T',
              data: data,
              borderColor: '#3cba9f',
              fill: false,
            },
          ],
        },
      }) as any
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

  makedata(d: Dsobj[]) {
    let data = [];
    let category = [];

    //console.log("D:" + JSON.stringify(d))

    let old = 0;
    for (let o of d) {
      //  console.log("BB===>:" + JSON.stringify(bb.t))
      if (o.t != old) {
        data.push({ value: o.t });
        category.push({ label: o.adddate });
        old = o.t!!;
      }
    }

    this.last = old;

    this.setsrc();

    // console.log('Index: ============ ' + JSON.stringify(category))
    this.dataSource.categories = [
      {
        category,
      },
    ];

    this.dataSource.chart.caption =
      'DS18B20 ' + this.bag.obj.callname + '(' + this.bag.obj.name + ')';
    this.dataSource.chart.subCaption =
      this.sd?.toLocaleString() + ' ' + this.ed?.toLocaleString();
    this.dataSource.dataset = [{ seriesname: 'T', data: data }];
    this.lastupdate = new Date().toLocaleTimeString();

    //console.log('Dataset ' + JSON.stringify(this.dataSource))
  }

  //Set up chart
  setsrc() {
    this.dataSource = {
      chart: {
        caption: 'DS18B20',
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
        legendShadow: '1',
        showAxisLines: '1',
        showAlternateHGridColor: '0',
        divlineThickness: '1',
        divLineIsDashed: '1',
        divLineDashLen: '1',
        divLineGapLen: '0',
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

  avgfunc() {
    let o = { search: '', id: this.bag.obj.id, s: this.sd, e: this.ed };
    console.log('AVG : ' + o);
    this.ds18s.http
      .post(environment.host + '/rest/piserver/ds18value/getgraphvalueavg', o)
      .subscribe((d) => {
        console.log('Value : ' + d);
        this.avg = d;
      });
  }

  deleteall() {
    this.ds18s.deleteall(this.bag.obj.id).subscribe((d) => {
      this.bar.open('Delete All', 'ok', { duration: 2000 });
    });
  }

  deletebydate() {
    this.ds18s
      .deletebydate(this.bag.obj.id, this.sd, this.ed)
      .subscribe((d) => {
        this.bar.open('Delete By date', 'ok', { duration: 2000 });
      });
  }
}

@Component({
  selector: 'app-askbeforedetele',
  templateUrl: './askbeforedete.html',
  styleUrls: ['./ds18b20info.component.css'],
})
export class AskbeforedeletedsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AskbeforedeletedsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
}
