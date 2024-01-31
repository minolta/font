import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from '../log.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AskbeforedeletedsComponent } from '../ds18b20info/ds18b20info.component';
import { Logic } from '../../port/logic';
import { Log } from '../log';
@Component({
  selector: 'app-loginfo',
  templateUrl: './loginfo.component.html',
  styleUrls: ['./loginfo.component.css'],
})
export class LoginfoComponent implements OnInit {
  sd?: Date;
  ed?: Date;
  s?: string;
  limit = 1000;
  count = 0;
  rows: Log[] = [];
  constructor(
    public ls: LogService,
    public bar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  loadvalue() {
    let l = localStorage.getItem('logdata');
    if (l != null) {
      let o = JSON.parse(l);
      this.sd = o.sd;
      this.ed = o.ed;
      this.s = o.search;
      this.limit = o.limit;
    }
  }

  deletelogbydateask(): void {
    const dialogRef = this.dialog.open(AskbeforedeletedsComponent, {
      width: '250px',
      data: {
        method: 'Delete By Date',
        name: 'Date Logs',
        sd: this.sd,
        ed: this.ed,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed : ' + result);
      if (result) this.delete();
    });
  }
  savevalue() {
    localStorage.setItem(
      'logdata',
      JSON.stringify({
        sd: this.sd,
        ed: this.ed,
        search: this.s,
        limit: this.limit,
      })
    );
  }
  ngOnInit(): void {
    this.loadvalue();
  }
  update() {
    this.update();
  }
  delete() {
    // this.ls.delete({ search: '', s: this.sd, e: this.ed }).subscribe((d) => {
    //   this.bar.open('Delete', 'Delete log', { duration: 2000 });
    //   this.ss();
    // });
  }
  ss() {
    this.savevalue();
    this.ls
      .sn({
        search: this.s,
        s: this.sd,
        e: this.ed,
        page: 0,
        limit: this.limit,
      })
      .subscribe((d: any) => {
        console.log(d);
        this.ls.count().subscribe((c) => {
          this.count = c as number;
        });
        this.rows = d.map((i:Logic) => {
          i.date!! = new Date(i.timestmpvalue!!);
          return i;
        });
        this.bar.open('Search', '', { duration: 2000 });
      });
  }
}
