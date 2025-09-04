import { Ds18sensorService } from './../ds18sensor.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ds18b20Service } from '../ds18b20.service';
import { Ds18b20sensor } from '../ds18b20sensor';

@Component({
    selector: 'app-dssensorlist',
    templateUrl: './dssensorlist.component.html',
    styleUrls: ['./dssensorlist.component.css'],
    standalone: false
})
export class DssensorListComponent implements OnInit {
  rows?: Ds18b20sensor[];
  constructor(public service: Ds18sensorService, public bar: MatSnackBar) {}

  ngOnInit() {
    this.updated();
  }

  delete(r: any, i: any) {
    this.service.delete(r).subscribe(
      (d) => {
        if (this.rows) this.rows.splice(i, 1);
      },
      (e) => {
        this.bar.open('ERROR', e.error.error, { duration: 8000 });
      }
    );
  }
  updated() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
    });
  }
}
