import { HttpClient } from '@angular/common/http';
import { DeviceService } from './../../device/device.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortService } from '../../port/port.service';
import { timer, Observable, from } from 'rxjs';
import { DirectioService } from '../directio.service';
import { Runobject } from '../runobject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Directtoobject } from '../directtoobject';
import { environment } from '../../../environments/environment';
import { Pumptoopen } from '../../pumptoopen';
import { Status } from '../../device/status';
import { Port } from '../../port/port';
@Component({
  selector: 'app-directio',
  templateUrl: './directio.component.html',
  styleUrls: ['./directio.component.css'],
})
export class DirectioComponent implements OnInit, OnDestroy {
  devicebag = { obj: { name: '', ip: '', id: 0 } };
  pumpbag = {
    obj: {
      name: '',
      ip: '',
      id: 0,
      enable: true,
      run: true,
      psi: 0,
      v: 0,
      duty: 0,
    },
  };
  errors = [];
  portbag = { obj: { name: '', ip: '' } };
  runtime = 1;
  value = 1;
  ports?: Port[] = Array<Port>();
  ip?: string;
  porttime?: number;
  showenable = false;
  pumptoopen: Pumptoopen[] = Array<Pumptoopen>(); //สำหรับเก็บ่าจะเปิดปั๊มอะไร
  lasturl = '';
  tasks: Directtoobject[] = [];
  sub2: any;
  sub: any;
  savetolocal() {
    localStorage.setItem('directruntime', String(this.runtime));
    localStorage.setItem('directenable', String(this.showenable));
    localStorage.setItem('pumps', JSON.stringify(this.pumptoopen));
    localStorage.setItem(
      'directruntimedevicebag',
      JSON.stringify(this.devicebag.obj)
    );
  }

  loadfromlocal() {
    let pums = localStorage.getItem('pumps');

    if (pums != null) {
      this.pumptoopen = JSON.parse(pums);
      console.log('load pumps ' + JSON.stringify(this.pumptoopen));
    }
    let rt = localStorage.getItem('directruntime');
    console.log(rt);
    if (rt != null) this.runtime = parseInt(rt);

    let e = localStorage.getItem('directenable');
    if (e != null) {
      this.showenable = JSON.parse(e);
      console.log(this.showenable);
    }

    console.log(localStorage.getItem('directruntimedevicebag'));
    if (localStorage.getItem('directruntimedevicebag'))
      this.devicebag.obj = JSON.parse(
        localStorage.getItem('directruntimedevicebag')!!
      );

    if (this.devicebag.obj == null) {
      this.devicebag = { obj: { name: '', ip: '', id: 0 } };
    }
    this.drs.loadtohistory();
  }
  constructor(
    public ds: DeviceService,
    public pns: PortService,
    private http: HttpClient,
    public drs: DirectioService,
    private bar: MatSnackBar
  ) {}
  onallpump() {
    try {
      let foropen = this.pumptoopen.filter((i) => i.enable);

      foropen.forEach((pump) => {
        let url = 'http://' + pump.pump!!.ip + '/run?delay=' + this.runtime;
        console.info('Open pump from directto', 'open pump -->:' + url);
        this.http.get<Status>(url).subscribe(
          (d) => {
            console.log('open pump: ' + d.name + ' status : ' + d.status);
          },
          (e) => {
            // this.errors.push(url + ' ' + JSON.stringify(e.error));
            // console.error('open pump ' + JSON.stringify(e));
          }
        );
      });
      this.bar.open('Open All pump ', '', { duration: 2000 });
      this.savetolocal();
    } catch (e) {
      console.error(' onpump ERROR ' + JSON.stringify(e));
    }
  }
  readpumpstatus() {
    try {
      this.pumptoopen.forEach((i) => {
        console.log('------------->' + JSON.stringify(i));
        let url = 'http://' + i.pump?.ip + '/';
        console.log('Call pump status ' + url);
        this.http.get<Status>(url).subscribe(
          (d) => {
            // console.log("openpump: " + d["name"]);
            console.log('pump status' + JSON.stringify(d));
            i.run = d.status;
            i.v = d.batt_volt;
            i.psi = d.psi;
            i.duty = d.duty;
          },
          (e) => {
            // this.errors.push(
            //   'READ status :' + i.pump.name + ' ERROR ' + e.error.error
            // );
            // console.error('readpump status error ' + JSON.stringify(e));
            i.run = false;
          }
        );
      });
    } catch (e) {
      console.error('read status ERROR ' + JSON.stringify(e));
    }
  }
  updatepump() {
    console.log('Save OBJ : ' + JSON.stringify(this.pumptoopen));
    this.savetolocal();
  }
  removeerros() {
    this.errors = [];
  }
  removehistory() {
    this.drs.history = [];
    this.drs.removeallhistory();
  }
  removepump(p: Pumptoopen) {
    let index = this.pumptoopen.indexOf(p);
    this.pumptoopen.splice(index, 1);
    this.savetolocal();
  }
  addpump() {
    console.log(this.pumptoopen);
    let p: Pumptoopen = {
      pump: JSON.parse(JSON.stringify(this.pumpbag.obj)),
      enable: true,
      run: true,
    }; //เอา pumpobject ออกมา
    let found = this.pumptoopen.find((item) => item.pump?.id == p.pump?.id);
    if (!found) {
      p.enable = true;
      p.run = true;
      this.pumptoopen.push(p);
      console.log('Add pump' + JSON.stringify(p));
      this.savetolocal();
    } else {
      console.log('have already');
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  stopdir(id: number) {
    let url = environment.host + '/rest/piserver/directto/stop/' + id;
    this.http.get(url).subscribe((d) => {
      console.log('Stop', d);
    });
  }
  ngOnInit() {
    this.loadfromlocal();
    this.f(this.showenable);
    const numbers = timer(0, 1000);
    this.sub = numbers.subscribe((val) => {
      console.log('Timer');
      try {
        let url = environment.host + '/rest/piserver/directto/list';

        this.http
          .post(environment.host + '/rest/piserver/getrequest', { url: url })
          .subscribe((d) => {
            console.log('Tasks ', d);
            this.tasks = d as Directtoobject[];
          });
        this.drs.updaterun();
        this.drs.updatehistory();
        this.drs.removeoverrun();
      } catch (e) {
        console.error('upadterun ERROR ', e);
      }
    });

    const checkstatus = timer(0, 5000);
    this.sub2 = checkstatus.subscribe((v) => {
      try {
        this.readpumpstatus();
      } catch (e) {
        console.error('ERROR read pump status', e);
      }
    });
  }
  f(e:boolean) {
    console.log(e);
    if (e) {
      this.pns.sn({ search: '', page: 0, limit: 1000 }).subscribe((d) => {
       
        this.ports = d.filter(item => 
          item.portenable
        );
        console.log(this.ports);
      });
    } else {
      this.pns.sn({ search: '', page: 0, limit: 1000 }).subscribe((d) => {
        this.ports = d;
      });
    }
  }

  // sub;
  // sub2;
  callrun = 0;
  // port;
  error = null;
  offallpump() {
    this.pumptoopen.forEach((i) => {
      let url = 'http://' + i.pump?.ip + '/off';
      console.log('Close:' + url);
      this.http.get<Status>(url).subscribe((d) => {
        console.log('offpump: ', d);
      });
    });
    this.bar.open('Off All pump ', '', { duration: 2000 });
  }
  getpumpsstatus() {}
  openpump(timetoopen: number) {
    this.pumptoopen.forEach((i) => {
      if (i.enable) {
        let delay = timetoopen + 100;
        let url = 'http://' + i.pump?.ip + '/run?delay=' + delay;
        console.log('Open:' + url);
        this.http.get<Status>(url).subscribe((d) => {
          console.log('openpump: ', d);
        });
      } else {
        //ปิดไปเลย
        // let url = "http://" + i.pump.ip + "/run?delay=" + 1;
        // console.log("Close:" + url);
        // this.http
        //   .post(environment.host + "/getrequest", { url: url })
        //   .subscribe((d) => {
        //     console.log("openpump: " + d["name"]);
        //   });
      }
    });
  }

  //ใช้สำหรับเพิ่มตัวแสดงผล
  set(p: Port) {
    this.callrun = 0;

    this.savetolocal();
    this.openpump(this.runtime);
    let url = 'http://' + this.devicebag.obj.ip + '/run?delay=' + this.runtime;
    this.http.get(url).subscribe((d) => {
      let obj: Runobject = {
        deviceid: this.devicebag.obj.id,
        ip: this.devicebag.obj.ip,
        portid: p.id,
        logic: this.value,
        runtime: this.runtime,
        url: url,
        portname: p.name,
        devicename: this.devicebag.obj.name,
        nowrun: 0,
      };
      let found = this.drs.find(obj);
      console.log('Foudn drs', found);
      if (!found) {
        this.drs.add(obj);
      } else {
        found.nowrun = 0; //reset run
      }
    });
   
  }
  getdevice() {
    this.ip = this.devicebag.obj.ip;
  }

  rh(r:Runobject) {
    this.drs.removehistory(r);
  }

  again(r: Runobject) {
    console.log('ad:::' + JSON.stringify(r));
    // console.log(r);
    this.http
      .post(environment.host + '/rest/piserver/getrequest', { url: r.url })
      .subscribe((d) => {
        console.log(d);
        r.nowrun = 0;
        let found = this.drs.find(r);
        if (!found) {
          this.drs.add(r);
        } else {
          found.nowrun = 0;
        }
      });
  }

  stop(objrun: Runobject) {
    let url =
      'http://' +
      objrun.ip +
      '/run?port=' +
      objrun.portname +
      '&value=' +
      objrun.logic +
      '&delay=' +
      1;
    this.http
      .post(environment.host + '/rest/piserver/getrequest', { url: url })
      .subscribe((d) => {
        console.log(d);
        objrun.nowrun = objrun.runtime;
      });
  }
}
