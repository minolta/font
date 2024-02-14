import { Time } from '@angular/common';
import { Component, EventEmitter, Input, Output,ViewChild, ElementRef } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrl: './datetime.component.css',
})
export class DatetimeComponent {
  // @ViewChild('date') dateinput?: ElementRef;
  // @ViewChild('time') timeinput?: ElementRef;
  date? = new Date();
  time: Time = { hours: 0, minutes: 0 };
  full?: string;
  @Input() tl: string = 'Time';
  @Input() dl: string = 'Date';

  // @Input()
  // set datetime(d: Date | undefined) {
  //   this._datetime = d;
  //   if(d)
  //   this.date = new Date(this._datetime!!)
  //   console.debug('Set date',this._datetime)
  // }
  // get datetime() {
  //   return this._datetime;
  // }
  // _datetime: Date | undefined;

  @Input()
  set datetime(d: Date | undefined) {
    this._datetime = d;
    console.debug('Set date time', this._datetime);
  }

  _datetime?: Date;
  @Output() datetimeChange = new EventEmitter<Date>();

  onSet() {
    let dt = this.date + ' ' + this.time;
    let d = moment(dt, 'YYYY-MM-DD hh:mm').toDate();
    this.datetimeChange.emit(d);
  }
}
