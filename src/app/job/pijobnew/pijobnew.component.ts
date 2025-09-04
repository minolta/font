import { PijobgroupService } from './../pijobgroup.service';
import { Component, OnInit } from '@angular/core';
import { Pijob } from '../pijob';
import { DeviceService } from '../../device/device.service';
import { JobService } from '../job.service';
import { Ds18sensorService } from '../../device/ds18sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pijobsave } from '../pijobsave';
import { PijobService } from '../pijob.service';
import { isThisTypeNode } from 'typescript';
import { PortService } from '../../port/port.service';
import { LogicService } from '../../port/logic.service';
import { environment } from '../../../environments/environment';
import { Sensorinjob } from '../sensorinjob';
import { Pumpinjob } from '../pumpinjob';
import { Portinjobobj } from '../portinjobobj';
import { Portinjob } from '../portinjob';
import { Device } from '../../device/device';
import { Job } from '../job';
import { Pijobgroup } from '../pijobgroup';

@Component({
    selector: 'app-pijobnew',
    templateUrl: './pijobnew.component.html',
    styleUrls: ['./pijobnew.component.css'],
    standalone: false
})
export class PijobnewComponent implements OnInit {
  sensors: Sensorinjob[] = Array<Sensorinjob>();
  pijob: Pijob = { priority: 10, timetorun: 1 };
  ports: Portinjobobj[] = Array<Portinjobobj>();
  devicebag = {
    obj: { name: '', id: 0 },
  };
  dssensorbag = {
    obj: { name: '' },
  };
  pijobgroupbag = {
    obj: { name: '', id: 0 },
  };
  pumpbag = {
    obj: { name: '', id: 0 },
  };
  devicedesbag = {
    obj: { name: '', id: 0 },
  };
  jobbag = {
    obj: { name: '', id: 0 },
  };
  runwithbag = {
    obj: { name: '', id: 0 },
  };
  device: Device = {};
  devicedes: Device = {};
  pijobgroup: Pijobgroup = {};
  //สำหรับบอกว่าต้องเปิด pump ตัวไหนบ้าง
  pumps: Pumpinjob[] = Array<Pumpinjob>();
  job: Job = {};
  pump: Pumpinjob = {};
  constructor(
    public pjs: PijobService,
    public ds: DeviceService,
    public js: JobService,
    public dss: Ds18sensorService,
    public pns: PortService,
    public ls: LogicService,
    public bar: MatSnackBar,
    public pijobgroupservice: PijobgroupService
  ) {}

  ngOnInit() {
    this.dss.sn({ search: '', page: 0, limit: 100 }).subscribe((d) => {
      console.log('Test DSS ' + JSON.stringify(d));
    });
  }
  removepump(i: number) {
    this.pumps.splice(i, 1);
  }
  addpump() {
    let id = this.pump.id;
    let found = this.pumps.find((i) => i.id === id);

    if (!found) {
      this.pumps.push(this.pump);
    }
  }

  addport() {
    let p: Portinjob = {
      portname: {},
      status: {},
      traget: {},
      //issue #11
      enable: true,
      runtime: 0,
      waittime: 0,
    };
    this.ports.push(p);
  }

  removeport(r: Portinjobobj) {
    var idx = this.ports.indexOf(r);
    if (idx !== -1) {
      this.ports.splice(idx, 1);
    }
  }

  save() {
    if (this.check()) {
      let p: Pijobsave = {};
      this.pijob.ds18sensor = this.dssensorbag.obj;
      this.pijob.pidevice = this.device;
      this.pijob.job = this.job;
      this.pijob.desdevice = this.devicedes;
      this.pijob.pijobgroup = this.pijobgroup;

      p.pijob = this.pijob;
      p.ports = this.ports?.map((i) => {
        let pij: Portinjob = {};
        pij.id = i.id;
        pij.device = i.device.obj;
        pij.enable = i.enable;
        pij.portname = i.portname.obj;
        pij.status = i.status.obj;
        pij.runtime = i.runtime;
        pij.waittime = i.waittime;
        pij.ver = i.ver;
        return pij;
      });
      p.pumps = this.pumps;
      console.log('Port : ', p.ports);
      p.pijob.runwithid = this.runwithbag.obj.id;
      console.log('New pijob with other job : ' + p.pijob.runfirstid);
      console.log('Save obj:' + JSON.stringify(p));
      this.pjs.add(p).subscribe(
        (d) => {
          this.pijob = d;
          this.bar.open('Add', '' + this.pijob.name, { duration: 2000 });
          this.savesensor();
          // this.pijob = {}
          this.pijob.name = ''; //reset แต่ ชื่ออย่างเดียวเอาละ
          this.ports = [];
        },
        (e) => {
          // this.error = e;
          console.error('Save pijob ', e);
        }
      );
    } else {
    }
  }
  //ใช้สำหรับทดสอบว่าพร้อมจะ save ได้ยัง

  check() {
    if (this.pijob.name == '' || this.pijob.name == null) {
      this.bar.open('ERROR', 'Not have job name', { duration: 5000 });
      return false;
    }
    if (this.device.name == '' || this.device.id == 0) {
      this.bar.open('ERROR', 'For device not have', { duration: 5000 });
      return false;
    }

    if (this.devicedes.name == '' || this.devicedes.id == 0) {
      this.bar.open('ERROR', 'Des traget not have', { duration: 5000 });
      return false;
    }

    if (this.job.name == '' || this.job.id == 0) {
      this.bar.open('ERROR', 'Job type not have', { duration: 5000 });
      return false;
    }

    if (this.pijobgroup.name == '' || this.pijobgroup.id == 0) {
      this.bar.open('ERROR', 'Job group not set', { duration: 5000 });
      return false;
    }

    if (this.ports != null && this.ports.length > 0) {
      if (this.ports.find((p) => p.portname.id == 0 || p.portname.name == '')) {
        this.bar.open('ERROR', 'Port name not set', { duration: 5000 });
        return false;
      }

      if (this.ports.find((i) => i.device.id == 0 || i.device.name == '')) {
        this.bar.open('ERROR', 'Port traget  not set', { duration: 5000 });
        return false;
      }
      if (this.ports.find((i) => i.status.id == 0 || i.status.name == '')) {
        this.bar.open('ERROR', 'Port logic  not set', { duration: 5000 });
        return false;
      }
    }

    return true;
  }
  autofill() {
    let count = 0;
    let first: Portinjobobj;
    this.ports = this.ports.map((i) => {
      console.log(i);
      if (count == 0) {
        first = i;
        console.log('FFFF' + JSON.stringify(first));
        count++;
        return i; //อันแรกเป็นต้นฉบับ
      }

      //  i.portname =  first.portname
      i.device.obj = JSON.parse(JSON.stringify(first.device.obj));
      i.status.obj = JSON.parse(JSON.stringify(first.status.obj));
      i.runtime = first.runtime;
      i.waittime = first.waittime;
      console.log('IIII' + JSON.stringify(i));
      count++;
      return i;
    });
  }

  addsensor() {
    console.log('Sensor', this.devicedesbag);

    let found = this.sensors.find((i) => i.sensor?.id == this.devicedes.id);
    if (!found) {
      this.sensors.push({
        sensor: this.devicedes,
      });
      this.bar.open('add sensor', this.devicedesbag.obj.name);
    } else console.error('Found same sensor', found);
  }

  savesensor() {
    let l = this.sensors.map((i) => {
      i.pijob = this.pijob;
      return i;
    });
    if (l.length > 0) {
      let url = environment.host + '/rest/piserver/addsensorinpijob';
      this.dss.http.post(url, l).subscribe((d) => {
        console.log('add sensor', d);
      },e=>{
        console.error('Save sensor error',e)
      });
    }
    console.log('Data sensor for save:', l);
  }
}
