import { Device } from './../device';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../device.service';
import { Dht22valueService } from '../dht22value.service';
import * as FileSaver from 'file-saver';
import { Ds18sensorService } from '../ds18sensor.service';
import { Openpumps } from '../openpumps';
import { Pijob } from '../pijob';
import { WService } from '../../w.service';
import { Dhtcaches } from '../dhtcaches';
import { Status } from '../status';
@Component({
  selector: 'app-devicedetail',
  templateUrl: './devicedetail.component.html',
  styleUrls: ['./devicedetail.component.css'],
})
export class DevicedetailComponent implements OnInit, OnDestroy {
  uptime = 0;
  day = 0;
  h = 0;
  refid = 0;
  min = 0;
  itid?: any;
  sec = 0;
  powers?: any;
  coresize = 0;
  activecore = 0;
  onlyactive = false;
  delay: number = 30;
  id: number = 0;
  device: Device = {};
  lastcheckin?: any;
  lastdhtvalue?: Dhtcaches;
  subscription?: any;
  lastupdate?: string;
  thread?: any;
  refidresult?: any; //สำหรับแสดงผลลัทพของ refid
  job = null;
  autoupdate = false;
  status?: Status[];
  filtername?: any;
  port = 80;
  dr = false;
  q?: any;
  ip?: string;
  toshow = 0;
  queuesize?: number;
  threadobj?: any;
  updatetime = 1;
  lowinfo?: any;
  dhtcaches?: Dhtcaches[];
  onoffhjob = true;
  pijobs?: Pijob[];
  openpumps?: Openpumps[];
  constructor(
    public ts: Ds18sensorService,
    private route: ActivatedRoute,
    public bar: MatSnackBar,
    public service: DeviceService,
    public dhts: Dht22valueService,
    public ws: WService
  ) {}

  bag = { obj: { name: '', id: 0, ip: '' } };
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscription');
    }
    clearInterval(this.itid);
  }

  showspijob() {
    let url = 'http://' + this.ip + ':' + this.port + '/pijob';
    console.log('Show call showpijobs', url);
    this.service.http.get(url).subscribe(
      (d: any) => {
        console.log('showpijob return', d);
        this.pijobs = d;
      },
      (e) => {
        console.error('Show pijob Error showpijobs', e);
      }
    );
  }
  changehjobstatus() {
    let url = 'http://' + this.ip + ':' + this.port + '/togerhjob';
    this.service.http.get(url).subscribe((d) => {
      this.onoffhjob = d as boolean;
      console.log(
        'Change h job status-----------------------------------------------',
        d
      );
    });
  }
  /**
   * สำหรับแสดงสถานะของ hjob
   */
  getwarterstatus() {
    let url = 'http://' + this.ip + ':' + this.port + '/waterlowstatus';
    this.service.http.get(url).subscribe((d) => {
      this.onoffhjob = d as boolean;
    });
  }
  resetstopwarter() {
    let url = 'http://' + this.ip + ':' + this.port + '/resetlows';
    this.service.http.get(url).subscribe((d) => {
      this.bar.open('Reset water stop');
    });
  }
  showstopinfo() {
    let url = 'http://' + this.ip + ':' + this.port + '/listlows';
    this.service.http.get(url).subscribe((d) => {
      console.log('List lows', d);
      this.lowinfo = d;
    });
  }
  rerun(id: number, name: string) {
    console.log('ID', id);
    let url = 'http://' + this.ip + ':' + this.port + '/kill/' + id;
    this.service.http.get(url).subscribe((d) => {
      let url = 'http://' + this.ip + ':3334/rundirect/' + id;

      this.service.http.get(url).subscribe(
        (d) => {
          this.bar.open('Run job', name, { duration: 5000 });
        },
        (e) => {
          console.error('ERROR', e);
        }
      );
    });
  }
  savedevice() {
    localStorage.setItem('detailip', JSON.stringify(this.ip));
    localStorage.setItem('devicedetaildevice', JSON.stringify(this.bag));
    localStorage.setItem('devicedetaildeviceport', JSON.stringify(this.port));
    localStorage.setItem(
      'devicedetaildevicesearch',
      JSON.stringify(this.filtername)
    );
    localStorage.setItem('showonlyrun', JSON.stringify(this.onlyactive));
    localStorage.setItem(
      'deviceinfoautoupdate',
      JSON.stringify(this.autoupdate)
    );
    localStorage.setItem('delay', this.delay.toString());
  }
  loaddevice() {
    let dd = localStorage.getItem('delay');
    if (dd != null) this.delay = dd as any;
    let d = localStorage.getItem('devicedetaildevice');
    if (d != null) {
      this.bag = JSON.parse(d);
      this.device = this.bag.obj;
    }

    let l = localStorage.getItem('detailip');
    if (l != null) this.ip = JSON.parse(l);
    d = localStorage.getItem('devicedetaildevicesearch');
    if (d != null) {
      this.filtername = JSON.parse(d);
    }

    d = localStorage.getItem('deviceinfoautoupdate');
    if (d != null) {
      this.autoupdate = JSON.parse(d);
    }
    let dp = localStorage.getItem('devicedetaildeviceport');
    if (dp != null) {
      this.port = JSON.parse(dp);
    }
    let g = localStorage.getItem('showonlyrun');
    if (g != null) this.onlyactive = JSON.parse(g);
  }
  kill(id: number) {
    let url = 'http://' + this.ip + ':' + this.port + '/kill/' + id;
    this.service.http
      // .post(environment.host + "/rest/piserver/getrequest", { url: url })
      .get(url)
      .subscribe((d) => {
        console.log(d);
      });
  }
  ngOnInit() {
    this.loaddevice();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.info('Hidden info ', 'Hidden');
        // if (this.subscription) {
        //   this.subscription.unsubscribe();
        //   console.log("Unsubscription");
        // }
        clearInterval(this.itid);
        // tab is changed
      } else {
        // console.info("Hidden info", "Actinve");
        // this.subscription = source.subscribe((val) => this.update());
        this.itid = setInterval(() => {
          this.update();
        }, this.delay * 1000);
      }
    });

    if (this.bag.obj.id != 0) {
      this.showthread(this.bag.obj.ip);
      this.getwarterstatus();
    } else {
      this.route.params.subscribe((params) => {
        this.id = params['id'];
        this.service.get(this.id).subscribe((d) => {
          this.device = d;
          this.bag.obj = d as any;
          if (this.device.id) this.last(this.device.id);
          this.lastdht(this.device.id);
          this.showthread(this.bag.obj.ip);
        });
      });
    }
    // this.ls.message("Device detail");
    // let source = timer(this.delay * 1000);
    this.itid = setInterval(() => {
      this.update();
    }, this.delay * 1000);
    //output: 0
    // this.subscription = source.subscribe((val) => this.update());
    this.update();
  }
  export(device: any) {
    console.log(JSON.stringify(device));
    let url = 'http://' + device.ip + '/exportjob';
    this.ts.http.get(url, { responseType: 'blob' }).subscribe((d) => {
      console.log('return:' + d);
      FileSaver.saveAs(d, device.name + '.json');
    });
  }
  last(id: number) {
    this.service.last(id).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.lastcheckin = d;
    });
  }
  resetpijob(ip: string) {
    let url = 'http://' + ip + '/resetpijob';
    console.log(url);
    this.service.http.get(url).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.bar.open('Reset all pi job', 'Is ok', { duration: 5000 });
    });
  }

  showname(ip: number) {
    let url = 'http://' + ip + '/showname';
    console.log(url);
    this.service.http.get(url).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.bar.open('Show name on device', '', { duration: 2000 });
    });
  }

  showstatus(ip: number) {
    let url = 'http://' + ip + '/status';
    this.service.http.get<Status[]>(url).subscribe((d) => {
      this.status = d;
      console.log('Thread info:' + JSON.stringify(d));
    });
  }
  showdhts() {
    let url = 'http://' + this.ip + ':' + this.port + '/dhtcaches';
    this.service.http.get(url).subscribe((d) => {
      this.dhtcaches = d as any;
      console.log('dht:', this.dhtcaches);
    });
  }
  showthread(ip: string) {
    if (this.ip != null && this.ip.length != 0) ip = this.ip;
    let url = 'http://' + ip + ':' + this.port + '/listtask';
    console.log(url);
    if (!this.dr)
      this.service.http
        // .post(environment.host + "/rest/piserver/getrequest", { url: url })
        .get(url)
        .subscribe(
          (d: any) => {
            console.log('listtask', d);
            if (this.onlyactive)
              this.thread = d.filter((i: any) => i.runstatus);
            else this.thread = d;
            // this.q = null;
          },
          (e) => {
            // this.error = e;
          }
        );
    else
      this.service.http.get(url).subscribe(
        (d) => {
          this.thread = d;
          console.log('listtask', d);
          // this.q = null;
          console.log('Thread info:' + JSON.stringify(d));
        },
        (e) => {
          console.error(e);
        }
      );
  }
  showqueue(ip: string) {
    let url = 'http://' + ip + ':' + this.port + '/lq';
    console.log(url);
    if (!this.dr)
      this.service.http
        // .post(environment.host + "/rest/piserver/getrequest", { url: url })
        .get(url)
        .subscribe((d) => {
          this.q = d;
        });
    else
      this.service.http.get(url).subscribe(
        (d) => {
          // this.thread = null;
          this.q = d;
          console.log('Thread info:' + JSON.stringify(d));
        },
        (e) => {
          console.error(e);
        }
      );
  }
  showthreadfiltername(ip: string, filtername: String) {
    if (!ip && this.ip != null) ip = this.ip;
    let url = 'http://' + ip + ':' + this.port + '/l3/' + filtername;
    console.log(url);
    if (!this.dr)
      this.service.http
        // .post(environment.host + "/rest/piserver/getrequest", { url: url })
        .get(url)
        .subscribe(
          (d: any) => {
            console.log('Return Thread', d);
            if (this.onlyactive)
              this.thread = d.filter((i: any) => i.runstatus);
            else this.thread = d;
          },
          (e) => {
            // this.error = e;
          }
        );
    else
      this.service.http.get<any>(url).subscribe((d) => {
        this.thread = d;
        console.log('Thread info:' + JSON.stringify(d));
      });
  }
  showthreadinpool(ip: string) {
    let url = 'http://' + ip + '/listpool';
    console.log(url);
    this.service.http.get<any>(url).subscribe((d) => {
      this.thread = d;
      console.log('Thread info:' + JSON.stringify(d));
    });
  }
  lastdht(id?: number) {
    this.dhts.last(id).subscribe((d) => {
      this.lastdhtvalue = d;
    });
  }
  activejob() {
    let ip = this.device.ip;
    if (this.ip) ip = this.ip;

    let url = 'http://' + ip + ':' + this.port + '/threadinfo';
    console.log(url);
    this.service.http.get(url).subscribe((d) => {
      console.log(JSON.stringify(d));
      this.threadobj = d;
    });
  }
  getcoresize() {
    let ip = this.device.ip;
    if (this.ip) ip = this.ip;
    this.service.http
      .get('http://' + ip + ':' + this.port + '/core')
      .subscribe((d) => {
        this.coresize = d as number;
      });
  }
  getqueuesize() {
    let ip = this.device.ip;
    if (this.ip) ip = this.ip;
    this.service.http
      .get('http://' + ip + ':' + this.port + '/queuesize')
      .subscribe((d) => {
        this.queuesize = d as number;
      });
  }
  update() {
    // this.error = null;
    console.log('To show ' + this.toshow);
    this.activejob();
    if (this.autoupdate) {
      if (!this.filtername || 0 === this.filtername.length)
        this.showthread(this.bag.obj.ip);
      else {
        this.showthreadfiltername(this.bag.obj.ip, this.filtername);
      }
      this.lq();
      this.getdate();
      this.getusepowerjob();
      this.showopenpumps();
      this.showdhts();
    }
  }

  ss(e: any) {
    this.bag.obj = e;
    if (e.ip != null) this.ip = e.ip;
    this.device = e;
  }
  s() {
    this.showthread(this.bag.obj.ip);
    this.toshow = 0;
    this.savedevice();
  }
  sp() {
    this.showthreadinpool(this.bag.obj.ip);
  }

  changeupdatetime() {
    console.log('Change updete time', this.delay);
    clearInterval(this.itid);
    setInterval(() => {
      this.update();
    }, this.delay * 1000);
    this.savedevice();
  }
  lq() {
    // this.toshow = 1;
    let i = this.bag.obj.ip;
    if (this.ip != null && this.ip.length != 0) i = this.ip;
    this.showqueue(i);
  }
  getusepowerjob() {
    let url = 'http://' + this.ip + ':' + this.port + '/power';
    this.service.http
      // .post(environment.host + "/rest/piserver/getrequest", { url: url })
      .get(url)
      .subscribe((d) => {
        this.powers = d as Array<string>;
        console.log('powers', this.powers);
      });
  }
  getdate() {
    let url = 'http://' + this.ip + ':' + this.port + '';
    this.service.http.get(url).subscribe((d) => {
      console.log('uptime', d);
      let aa = d as any;
      this.uptime = aa.uptime;

      var dd = (this.uptime / 86400) | 0;
      var sectoh = this.uptime % 86400;
      var hh = (sectoh / 3600) | 0;
      var sectomin = sectoh % 3600;
      var mm = (sectomin / 60) | 0;
      var lastsec = sectomin % 60;

      this.day = dd;

      this.h = hh;
      this.min = mm;

      this.sec = lastsec; //เหลือวินาที
    });
  }

  showopenpumps() {
    let url = 'http://' + this.ip + ':' + this.port + '/openpumps';
    this.service.http
      // .post(environment.host + "/rest/piserver/getrequest", { url: url })
      .get(url)
      .subscribe((d) => {
        console.log('Openpumps jobs', d);
        this.openpumps = d as any;
      });
  }

  showbyrefid() {
    let url = 'http://' + this.ip + ':' + this.port + '/refid/' + this.refid;
    this.service.http
      // .post(environment.host + "/rest/piserver/getrequest", { url: url })
      .get(url)
      .subscribe((d) => {
        console.log('Refid', d);
        this.refidresult = d;

        this.bar.open('Get refid', this.refid.toString(), { duration: 2000 });
      });
  }
}
