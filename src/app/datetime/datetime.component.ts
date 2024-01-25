import { Time } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrl: './datetime.component.css',
})
export class DatetimeComponent {
  date?: Date;
  time: Time = { hours: 0, minutes: 0 };

  @Input()
  get datevalue() {
    return this.date;
  }
  set datavalue(d: Date) {
    this.date = d;
  }
  @Input()
  get timevalue() {
    return this.time;
  }
  set timevalue(t: Time) {
    this.time = t;
  }
}
