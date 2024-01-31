import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { interval, timer } from 'rxjs';
import { Co2Service } from '../co2.service';
import { DeviceService } from '../../device/device.service';
import { SavedataService } from '../../savedata.service';
import { ArgData } from '../argdata';

@Component({
  selector: 'app-co2',
  templateUrl: './co2.component.html',
  styleUrls: ['./co2.component.css'],
})
export class Co2Component implements OnInit, OnDestroy {
  autoupdate = false;
  subscription: any;
  tlabel = 'T';
  hlabel = 'H';
  co2label = 'Co2';
  pmlabel = 'PM';
  lt? = 0;
  lh? = 0;
  lc? = 0;
  lp? = 0;
  labels: string[] = [];
  hdata: number[] = [];
  tdata: number[] = [];
  co2data: number[] = [];
  pmdata: number[] = [];
  bag = { obj: { name: '', id: 0 } };
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.hdata,
        label: this.hlabel,
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
        label: this.tlabel,
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: this.co2data,
        label: this.co2label,
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.pmdata,
        label: this.pmlabel,
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'green',
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
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  sd?: Date;
  ed?: Date;
  //----------------
  constructor(
    public co2s: Co2Service,
    public ss: SavedataService,
    public ds: DeviceService
  ) {}

  ngOnInit(): void {
    let o = this.ss.load('co2save');
    console.log('Save', o);
    if (o != null) {
      this.sd = o.s;
      this.ed = o.e;
      this.autoupdate = o.auto;
      if (o.sensor != null) {
        console.log('Set bag', o.sensor);
        this.bag.obj = o.sensor;
      }
    }
    const numbers = timer(0, 15000);
    this.subscription = numbers.subscribe((val) => {
      console.log('Auto update', val);
      if (this.autoupdate) {
        this.update();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log(' co2 Unsubscription');
    }
  }
  search() {
    let o = {
      sensor: this.bag.obj,
      s: this.sd,
      e: this.ed,
      auto: this.autoupdate,
    };
    console.log('O-----------', o);
    this.ss.save('co2save', o);
    this.update();
  }
  makedata(d: ArgData[]) {
    this.hdata.length = 0;
    this.tdata.length = 0;
    this.co2data.length = 0;
    this.pmdata.length = 0;
    this.labels.length = 0;

    d.forEach((i) => {
      this.lh = i.rhum;
      this.lt = i.atmp;
      this.lc = i.rco2;
      this.lp = i.pm02;
      this.hdata.push(i.rhum!!);
      this.tdata.push(i.atmp!!);
      this.co2data.push(i.rco2!!);
      this.pmdata.push(i.pm02!!);
      this.labels.push(i.adddate!!.toDateString());
    });
    this.hlabel = 'H ' + this.lh;
    this.tlabel = 'T ' + this.lt;
    this.co2label = 'Co2 ' + this.lc;
    this.pmlabel = 'PM ' + this.lp;
  }
  update() {
    this.co2s
      .sn({ search: '', s: this.sd, e: this.ed, id: this.bag.obj.id })
      .subscribe((d) => {
        console.log('Data', d);
        this.makedata(d);
        if (this.chart) this.chart.update();
      });
  }
}
//{"wifi":-59,"pm02":25,"rco2":478,"atmp":32.20,"rhum":54}
