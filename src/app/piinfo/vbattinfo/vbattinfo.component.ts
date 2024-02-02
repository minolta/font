import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { VbattService } from '../vbatt.service';
import { Vbatt } from '../vbatt';
import { interval } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../device/device.service';
import { SavedataService } from '../../savedata.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vdata } from '../../piinof/vdata';
import { Device } from '../../device/device';
@Component({
  selector: 'app-vbattinfo',
  templateUrl: './vbattinfo.component.html',
  styleUrls: ['./vbattinfo.component.css'],
})
export class VbattinfoComponent implements OnInit {
  imin? = 0;
  imax? = 0;
  lasti? = 0;
  vdata: number[] = [];
  idata: number[] = [];
  labels: string[] = [];
  watt = 0;
  fwatt? = 0;
  lwatt? = 0;
  cwatt? = 0;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.vdata,
        // data: ,
        label: 'v',
        backgroundColor: 'rgba(50,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.idata,
        label: 'i',
        backgroundColor: 'rgba(160,180,177,0.2)',
        borderColor: 'rgba(250,159,177,1)',
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
  min? = 0;
  max? = 0;
  chart: any;
  device: Device = {};
  device1: Device = {};
  havechart = false; //สำหรับบอกว่าสร้าง charts แล้วหรือยังถ้ายังสร้างใหม่
  bag = { obj: { name: '', id: 0 } };
  bag1 = { obj: { name: '', id: 0 } };
  sd?: Date;
  ed?: Date;
  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource: any;
  lastvalue? = 0;
  autoupdate = false;
  subscription: any;
  tde? = 0;
  tte? = 0;
  diffwatt: any;
  constructor(
    public service: VbattService,
    private elementRef: ElementRef,
    public ds: DeviceService,
    public ss: SavedataService,
    public bar: MatSnackBar,
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loaddate();
    this.subscription = interval(60000).subscribe((val) => {
      this.autoupdatef();
    });
    if (this.autoupdate) this.showdata();
  }
  autoupdatef() {
    if (this.autoupdate) {
      this.showdata();
    }
  }
  savedate() {
    let o = {
      sdate: this.sd,
      edate: this.ed,
      device: this.bag,
      auto: this.autoupdate,
    };
    this.ss.save('vbattobject', o);
  }
  loaddate() {
    let o = this.ss.load('vbattobject');
    if (o != null) {
      this.sd = o.sdate;
      this.ed = o.edate;
      this.bag = o.device;
      this.autoupdate = o.auto;
    }

    console.log('Save', o);
  }
  findwatt() {
    this.service.findwatt(this.device.id!!, this.sd, this.ed).subscribe(
      (d) => {
        this.watt = d as any;
        this.bar.open('Find watt', this.watt.toString(), { duration: 3000 });
        this.savedate();
      },
      (e) => {
        console.error('Error', e);
      }
    );
  }
  finddiffwatt() {
    let url = environment.host + '/rest/piserver/finddiffwatt';
    this.http
      .post(url, {
        id: this.device.id,
        search: this.device1.id,
        s: this.sd,
        e: this.ed,
      })
      .subscribe((d) => {
        console.log(d);
        this.diffwatt = d;
        this.savedate();
      });
  }
  showdata() {
    console.log('Show device:', this.device);
    this.service
      .getGraph(this.device.id!!, this.sd, this.ed)
      .subscribe((d: any) => {
        console.debug('Found data ', d.length);
        this.makenewdata(d as Array<Vbatt>);
        if (this.chart1) this.chart1.update();
      });
    this.savedate();
  }
  makenewdata(datas: Array<Vbatt>) {
    this.vdata.length = 0;
    this.idata.length = 0;
    this.labels.length = 0;
    this.min = this.max = 0;
    this.imin = this.imax = 0;
    this.watt = this.fwatt = this.lwatt = 0;
    if (datas[0]) this.fwatt = datas[0].e;
    if (datas[0]) this.lwatt = datas[datas.length - 1].e;
    if (this.lwatt && this.fwatt) this.watt = this.lwatt - this.fwatt;
    if (datas[0]) this.cwatt = datas[datas.length - 1].p;

    datas.forEach((item) => {
      this.vdata.push(item.v!!);
      this.idata.push(item.i!!);
      if (this.max!! < item.v!!) this.max = item.v;
      if (this.min!! > item.v!! || this.min == 0) this.min = item.v;

      if (this.imin!! > item.i!! || this.imin == 0) this.imin = item.i;
      if (this.imax!! < item.i!!) this.imax = item.i;

      this.lastvalue = item.v;
      this.lasti = item.i;
      this.tde = item.tde;
      this.tte = item.tte;
      let vd = new Date(item.valuedate!!);
      if (item.e != 0) this.lwatt = item.e;

      let d = vd.getHours() + ':' + vd.getMinutes() + ':' + vd.getSeconds();
      console.log(d);
      this.labels.push(d);
    });
  }
  makechart(datas: Array<Vbatt>) {
    let buf: any;
    let bufi: any;
    let category = [];
    let labels: string[] = [];

    datas.forEach((item) => {
      buf.push(item.v);
      bufi.push(item.i);
      this.lastvalue = item.v;
      category.push('');
      console.log(item.valuedate);
      let vd = new Date(item.valuedate!!);
      let d = vd.getHours() + ':' + vd.getMinutes() + ':' + vd.getSeconds();
      console.log(d);
      labels.push(d);
    });

    let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

    if (!this.havechart) {
      this.havechart = true;
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'V',
              data: buf,
              borderColor: '#3cba9f',
              fill: false,
            },
            {
              label: 'I',
              data: bufi,
              borderColor: '#3cba00',
              fill: false,
            },
          ],
        },
      });
    } else {
      let o = this.chart as Chart;
      o.data.datasets[0].data = buf;
      o.data.labels = labels;
      o.update();
    }
  }
}
