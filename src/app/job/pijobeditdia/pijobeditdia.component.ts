import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pijob } from '../pijob';
import { PijobService } from '../pijob.service';
import { DeviceService } from '../../device/device.service';
import { JobService } from '../job.service';
import { Ds18sensorService } from '../../device/ds18sensor.service';
import { PortService } from '../../port/port.service';
import { LogicService } from '../../port/logic.service';
import { ActivatedRoute } from '@angular/router';
import { Pijobsave } from '../pijobsave';
import { Portinjobobj } from '../portinjobobj';

@Component({
    selector: 'app-pijobeditdia',
    templateUrl: './pijobeditdia.component.html',
    styleUrls: ['./pijobeditdia.component.css'],
    standalone: false
})
export class PijobeditdiaComponent implements OnInit {
  id: number = 0;
  pijob: Pijob = {};
  ports: Portinjobobj[] = Array<Portinjobobj>();
  devicebag = { obj: { id: 0, name: '' } };
  dssensorbag = {
    obj: { id: 0, name: '' },
  };
  date?: Date;
  devicedesbag = {
    obj: { id: 0, name: '' },
  };
  jobbag = {
    obj: { id: 0, name: '' },
  };
  runwithbag = {
    obj: { id: 0, name: '' },
  };
  constructor(
    public dialogRef: MatDialogRef<PijobeditdiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pjs: PijobService,
    public ds: DeviceService,
    public js: JobService,
    public dss: Ds18sensorService,
    public pns: PortService,
    public ls: LogicService,
    public bar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.pjs.get(data.id).subscribe((d) => {
      this.pijob = d;
      this.setport();
      this.devicebag.obj = this.pijob.pidevice as any;

      if (this.pijob.runwithid)
        this.pjs.get(this.pijob.runwithid).subscribe((rw) => {
          this.runwithbag.obj = rw as any;
        });

      if (this.pijob.desdevice != null)
        this.devicedesbag.obj = this.pijob.desdevice as any;
      else this.devicedesbag.obj = { name: '', id: 0 };

      if (this.pijob.ds18sensor != null)
        this.dssensorbag.obj = this.pijob.ds18sensor as any;
      else this.dssensorbag.obj = { name: '', id: 0 };

      this.jobbag.obj = this.pijob.job as any;
    });
  }

  ngOnInit() {}
  addport() {
    let p: Portinjobobj = {};
    this.ports.push(p);
  }

  removeport(r: Portinjobobj) {
    var idx = this.ports.indexOf(r);
    if (idx !== -1) {
      this.ports.splice(idx, 1);
    }
  }

  save() {
    let p: Pijobsave = {};
    this.pijob.ds18sensor = this.dssensorbag.obj;
    this.pijob.pidevice = this.devicebag.obj;
    this.pijob.job = this.jobbag.obj;
    this.pijob.desdevice = this.devicedesbag.obj;
    if (this.runwithbag.obj != null) {
      let pj = this.runwithbag.obj as Pijob;
      this.pijob.runwithid = pj.id;
      console.log('Run with pijob ' + pj.id);
    } else this.pijob.runwithid = 0;
    p.pijob = this.pijob;
    p.ports = this.ports;

    console.log('Save obj:' + JSON.stringify(p));
    this.pjs.edit(p).subscribe((d) => {
      this.pijob = d;
      this.bar.open('Edit ', '' + this.pijob.name, { duration: 2000 });
      this.dialogRef.close(this.pijob);
    });
  }

  setport() {
    this.pjs.listport(this.pijob.id!!).subscribe((d) => {
      console.log('Port in side:' + JSON.stringify(d));
      let ports = d as Array<any>;
      for (let p of ports) {
        let o = {
          id: p.id,
          enable: p.enable,
          portname: { obj: p.portname },
          logic: { obj: p.status },
        };
        this.ports.push(o);
      }
    });
  }
}
