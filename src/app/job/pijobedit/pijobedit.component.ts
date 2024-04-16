import { Component, OnInit } from '@angular/core';
import { Pijob } from '../pijob';
import { PijobService } from '../pijob.service';
import { DeviceService } from '../../device/device.service';
import { JobService } from '../job.service';
import { Ds18sensorService } from '../../device/ds18sensor.service';
import { PortService } from '../../port/port.service';
import { LogicService } from '../../port/logic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pijobsave } from '../pijobsave';
import { ActivatedRoute } from '@angular/router';
import { DeletepijobComponent } from '../deletepijob/deletepijob.component';
import { PijobgroupService } from '../pijobgroup.service';
import { environment } from '../../../environments/environment';
import { Sensorinjob } from '../sensorinjob';
import { HttpClient } from '@angular/common/http';
import { Portinjob } from '../portinjob';
import { Portinjobobj } from '../portinjobobj';
import { Pumpinjob } from '../pumpinjob';
import { Device } from '../../device/device';
import { Job } from '../job';
import { Pijobgroup } from '../pijobgroup';
import { Port } from '../../port/port';

@Component({
  selector: 'app-pijobedit',
  templateUrl: './pijobedit.component.html',
  styleUrls: ['./pijobedit.component.css'],
})
export class PijobeditComponent implements OnInit {
  sensors?: Sensorinjob[];
  error = null;
  pumps?: Pumpinjob[];
  id: number = 0;
  pijob: Pijob = {};
  ports?: Portinjobobj[];
  devicebag = { obj: { id: 0, name: '' } };
  pumpbag = { obj: { id: 0, name: '' } };
  pbag = { obj: { id: 0, name: '' } };
  pijobgroupbag = {
    obj: { id: 0, name: '' },
  };
  pijobgroup: Pijobgroup = {};
  dssensorbag = {
    obj: { id: 0, name: '' },
  };
  devicedesbag = {
    obj: { id: 0, name: '' },
  };
  jobbag = {
    obj: { id: 0, name: '' },
  };
  runwithbag = {
    obj: { name: '', id: 0 },
  };

  device: Device = {};
  devicedes: Device = {};
  devicesensor: any;
  jobtype: Job = {};
  pump: Pumpinjob = {};
  pn: Port = {};
  constructor(
    public pjs: PijobService,
    public ds: DeviceService,
    public dialog: MatDialog,
    public js: JobService,
    public dss: Ds18sensorService,
    public pns: PortService,
    public ls: LogicService,
    public bar: MatSnackBar,
    public pijobgroupservice: PijobgroupService,
    private route: ActivatedRoute,
    public http: HttpClient
  ) {}

  ngOnInit() {
    console.log('Call pijobedit');
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.info('id:' + this.id);
      this.pjs.get(this.id).subscribe(
        (d) => {
          this.pijob = d;
          this.loadSensorinpijob();
          if (this.pijob.id) this.loadpump(this.pijob.id);
          // this.setport(this.id);
          this.setport2();
          if (this.pijob.pidevice) this.device = this.pijob.pidevice;

          if (this.pijob.runwithid != null && this.pijob.runwithid != 0)
            this.pjs.get(this.pijob.runwithid).subscribe((rw) => {
              this.runwithbag.obj = rw as any;
            });

          if (this.pijob.desdevice != null)
            this.devicedes = this.pijob.desdevice;
          else this.devicedesbag.obj = { id: 0, name: '' };
          if (this.pijob.pijobgroup != null) {
            this.pijobgroup = this.pijob.pijobgroup;
          }

          if (this.pijob.ds18sensor != null)
            this.devicesensor = this.pijob.ds18sensor;
          else this.dssensorbag.obj = { id: 0, name: '' };

          if (this.pijob.job) this.jobtype = this.pijob.job as any;
        },
        (e) => {
          console.error('Error', e);
        }
      );
    });
  }
  loadSensorinpijob() {
    let url =
      environment.host + '/rest/piserver/sensorinpijob/' + this.pijob.id;

    console.log('Load sensor for this job ', url);

    this.dss.http.get(url).subscribe((d) => {
      this.sensors = d as any;
      console.log('****** Found sensor for job *******', d);
    });
  }

  removesensor(i: number, index: number) {
    let url = environment.host + '/removesensor/' + i;
    this.dss.http.get(url).subscribe((d) => {
      console.log('Delete sensor in job', d);
      if (this.sensors) this.sensors.splice(index, 1);
    });
  }
  addsensor() {
    console.log('Sensor', this.devicedes);

    let found: Sensorinjob | undefined;
    if (this.sensors) {
      found = this.sensors.find((i) => i.sensor!!.id == this.devicedes.id);
    }
    if (!found) {
      if (!this.sensors)
       this.sensors = Array<Sensorinjob>();
      this.sensors.push({
        sensor: this.devicedes,
      });
      this.bar.open('add sensor', this.devicedesbag.obj.name);
      this.savesensor();
    } else console.error('Found same sensor', found);
  }

  savesensor() {
    if (this.sensors) {
      let l = this.sensors.map((i) => {
        i.pijob = this.pijob;
        return i;
      });
      let url = environment.host + '/rest/piserver/addsensorinpijob';
      this.dss.http.post(url, l).subscribe((d) => {
        console.log('add sensor', d);
      });

      console.log('Data sensor for save:', l);
    }
  }
  delete(r: Pijob) {
    let dialogRef = this.dialog.open(DeletepijobComponent, {
      width: '250px',
      data: { pijob: r },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.pjs.delete(result).subscribe((d) => {
          this.bar.open('Delete', '' + r.name, { duration: 3000 });
        });
      }
    });
  }
  /**
   * เพิ่ม port ให้ job ทำงาน
   */
  addport() {
    let p: Portinjobobj = {
      portname: {},
      status: {},
      enable: true,
      runtime: 0,
      waittime: 0,
      device: {},
      pijob: this.pijob,
      pijob_id: this.pijob.id,
    };
    if (!this.ports) this.ports = Array<Portinjobobj>();
    this.ports.push(p);
  }

  removeport(r: Portinjobobj) {
    console.log(r);
    if (r) {
      r.portname = r.portname!!.obj;
      this.pjs.removeport(r).subscribe((d) => {
        console.log('Delete ' + d);
        var idx = this.ports!!.indexOf(r);
        if (idx !== -1) {
          this.ports!!.splice(idx, 1);
        }
      });
    }
  }

  copy() {
    console.log(this.id);
    let h = environment.host + '/piserver/pijob/copy/' + this.id;
    this.http.get(h).subscribe((d) => {
      this.bar.open('Copy', '', { duration: 2000 });
    });
  }
  save() {
    let p: Pijobsave = {};
    // this.pijob.ds18sensor = this.dssensor;
    this.pijob.pidevice = this.device;
    this.pijob.job = this.jobtype;
    this.pijob.desdevice = this.devicedes;
    this.pijob.pijobgroup = this.pijobgroup;

    if (this.runwithbag.obj != null) {
      let pj = this.runwithbag.obj as Pijob;
      this.pijob.runwithid = pj.id;
      console.log('Run with pijob ' + pj.id);
    } else {
      this.pijob.runwithid = 0;
    }

    p.pijob = this.pijob;

    console.debug('editpijob 1', p);
    console.debug('editpijob Port before conver ', this.ports);

    p.ports = this.ports?.map((i) => {
      let pij: Portinjob = {};
      pij.id = i.id;
      pij.device = i.device;
      pij.enable = i.enable;
      pij.portname = i.portname;
      pij.portname_id = i.portname.id
      pij.status = i.status;
      pij.runtime = i.runtime;
      pij.waittime = i.waittime;
      pij.ver = i.ver;
      pij.pijob_id = this.pijob.id;
      pij.pijob = this.pijob;
      return pij;
    });
    console.debug('port to edit', p.ports);
    this.http
      .post<Portinjobobj[]>(
        environment.host + '/rest/piserver/pijob/editport',
        p.ports
      )
      .subscribe(
        (d) => {
          console.debug('Edit port return ', d);
          this.ports = d;
          console.debug('ser  new port ', this.ports);
        },
        (e) => {
          console.error('ERROR edit port', e);
        }
      );

    console.debug('editpijob Save obj:', p);

    this.pjs.edit(this.pijob).subscribe(
      (d) => {
        console.debug('Edit D: ', d);
        this.pijob = d;
        this.setport();
        this.bar.open('Edit ', '' + this.pijob.name, { duration: 2000 });
        //this.bar.open("Edit", "", { duration: 2000 })
      },
      (e) => {
        console.error(e);
      }
    );
  }

  removepump(id: number) {
    let url = environment.host + '/removepump/' + id;
    this.http.get(url).subscribe((d) => {
      if (this.pijob.id) this.loadpump(this.pijob.id);
    });
  }
  loadpump(pijobid?: number) {
    if (pijobid) {
      let url = environment.host + '/pump/' + pijobid;
      this.http.get(url).subscribe((d) => {
        console.log(d);
        this.pumps = d as any;
      });
    }
  }
  enablepumps(p: Pumpinjob) {
    console.log('Enable pumps', p.enable);
    let url = environment.host + '/rest/piserver/pumps/injob/enable/' + p.id;
    this.http.get(url).subscribe((d) => {
      console.log('Enable ok');
    });
  }
  addpump() {
    // console.log('add');
    // console.log(this.pumpbag);
    // console.log(this.pijob);
    let url = environment.host + '/rest/piserver/addpumptopijob';
    this.http
      .post<Pumpinjob>(url, {
        pid: this.pump.id,
        jid: this.pijob.id,
        portname_id: this.pn.id,
      })
      .subscribe((d) => {
        // console.log('Add')
        this.bar.open('Add pump', '', { duration: 1000 });
        this.loadpump(this.pijob.id);
      });
  }
  setport2() {
    this.pjs.listport(this.id).subscribe(
      (d) => {
        console.debug('Load port', d);
        let s = d.map((item) => {
          let o: Portinjobobj = {
            id: item.id,
            enable: item.enable,
            portname: item.portname,
            status: item.status,
            runtime: item.runtime,
            waittime: item.waittime,
            device: item.device,
            pijob_id: item.pijob_id,
            pijob: this.pijob, //ไม่ติด pijob มา
            ver: item.ver, //สำหรับ delete
          };
          return o;
        });

        s.sort(function (a, b) {
          var x = a.device.name.toLowerCase();
          var y = b.device.name.toLowerCase();
          var p1 = a.portname.name.toLocaleLowerCase();
          var p2 = b.portname.name.toLocaleLowerCase();

          if (x < y) return -1;
          if (x > y) return 1;

          //ถ้า เท่ากันให้เรียง port ด้วย
          //   return 0;
          if (p1 < p2) return -1;
          if (p1 > p2) return 1;

          return 0;
        });

        console.debug('load port', s);
        this.ports = s;
      },
      (e) => {
        console.error('load port error',e)
      }
    );
  }

  /**
   *
   * @param ps load port เข้ามาเพื่อแก้ไข
   */
  setport() {
    this.ports = []; //reset port

    this.pjs.listport(this.id).subscribe((d) => {
      console.log('Port in side:' + JSON.stringify(d));
      console.debug('load port 1', d);
      this.ports = d
        .map((i) => {
          let po: Portinjobobj = {};
          po.enable = i.enable;
          po.id = i.id;
          po.status = i.status;
          po.portname = i.portname;
          po.runtime = i.runtime;
          po.waittime = i.waittime;
          po.ver = i.ver;
          po.device = i.device;
          po.pijob = i.pijob;
          return po;
        })
        .sort(function (a, b) {
          var x = a.device.name.toLowerCase();
          var y = b.device.name.toLowerCase();
          var p1 = a.portname.name.toLocaleLowerCase();
          var p2 = b.portname.name.toLocaleLowerCase();

          if (x < y) return -1;
          if (x > y) return 1;

          //ถ้า เท่ากันให้เรียง port ด้วย
          //   return 0;
          if (p1 < p2) return -1;
          if (p1 > p2) return 1;

          return 0;
        });
    });
  }
}
