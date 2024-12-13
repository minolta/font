import { DeletepijobComponent } from './../deletepijob/deletepijob.component';
import { OnecommandService } from './../onecommand.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from './../../device/device.service';
import { PijobService } from './../pijob.service';
import { Component, OnInit } from '@angular/core';
import { Onecommand } from '../onecommand';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PijobeditdiaComponent } from '../pijobeditdia/pijobeditdia.component';
import { Overlay } from '@angular/cdk/overlay';
import { ThisReceiver } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { WService } from '../../w.service';
import { Device } from '../../device/device';
import { Pijob } from '../pijob';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'app-pijoblist',
    templateUrl: './pijoblist.component.html',
    styleUrls: ['./pijoblist.component.css'],
    standalone: false
})
export class PijoblistComponent implements OnInit {
  bag = { obj: { id: 0, name: '' } };
  savesearch: string | null = null;
  device?: Device | null;
  shwodevicename = true;
  limit = 100;
  rows?: Pijob[];
  constructor(
    public service: PijobService,
    public ocs: OnecommandService,
    private router: Router,
    public http: HttpClient,
    public pds: DeviceService,
    public bar: MatSnackBar,
    public dialog: MatDialog,
    private overlay: Overlay,
    public ws: WService
  ) {
    // super(service)
  }

  tb(i: number, r: Pijob) {
    if (this.device == null) {
      this.shwodevicename = true;
      this.device = r.pidevice;
      console.log('1');
    } else if (r.pidevice!!.id != this.device.id) {
      this.shwodevicename = true;
      this.device = r.pidevice;
      console.log('2');
    } else {
      this.shwodevicename = false;
      console.log('3');
    }
  }
  removedevice() {
    localStorage.setItem('listbydevice', '');
  }
  ngOnInit() {
    let d = localStorage.getItem('listbydevice');
    this.savesearch = localStorage.getItem('savesearchpijob');
    console.log('Save search:::', this.savesearch);
    console.log('device:', d);

    if (d) {
      let dl = JSON.parse(d);
      console.log('Load device', dl);
      if (dl != null && dl != 'null') this.bag.obj = dl;
    }

    if (this.savesearch != null && this.savesearch !== '') {
      this.update();
    } else if (this.bag.obj.id != 0) {
      this.listbydevice(this.bag.obj);
    }
  }

  update() {
    console.log(
      'Save search in update',
      localStorage.getItem('savesearchpijob')
    );
    this.service
      .sn({ search: this.savesearch, page: 0, limit: this.limit })
      .subscribe((d) => {
        console.log('Found ' + JSON.stringify(d));
        this.rows = d;
        if (this.savesearch)
          localStorage.setItem('savesearchpijob', this.savesearch);
        // localStorage.setItem('listbydevice', null);
      });
  }
  listbydevice(d?: Device) {
    if (d != null) {
      this.device = d;
      localStorage.setItem('listbydevice', JSON.stringify(d));
      this.service.findbydeviceid(d.id!!, this.limit).subscribe((d: any) => {
        this.rows = d;
      });
    }
  }
  enable(id: number, index: number) {
    this.service.enable(id).subscribe((d) => {
      if (this.rows) this.rows[index] = d;

      this.bar.open('Set to ', d.enable + '', { duration: 5000 });
    });
  }
  run(pj: Pijob) {
    let pd = pj.pidevice;

    console.log('Run one command ', pj);
    let url = 'http://' + pj.pidevice!!.ip + ':3334/rundirect/' + pj.id;
    console.debug('Direct run', url);
    this.http.get(url).subscribe(
      (d) => {
        this.bar.open('Run job', pj.name, { duration: 5000 });
      },
      (e) => {
        console.error('Run function ', e);
      }
    );
  }

  delete(r: Pijob, i: number) {
    let dialogRef = this.dialog.open(DeletepijobComponent, {
      width: '250px',
      data: { pijob: r },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.service.delete(result).subscribe((d) => {
          if (this.rows) this.rows.splice(i, 1);
          this.bar.open('Delete', '' + r.name, { duration: 3000 });
        });
      }
    });
  }

  edit(id: number, i: number) {
    console.log(
      'Have device ************************************************************* ' +
        JSON.stringify(this.bag.obj)
    );
    this.router.navigate(['/pijobedit', id, 'edit' + id]);
  }
}
