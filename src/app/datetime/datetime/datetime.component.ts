import { Time } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrl: './datetime.component.css',
})
export class DatetimeComponent {
  date? = new Date();
  time: Time = { hours: 0, minutes: 0 };
  full?: string;

  @Input() datetime?: Date;
  @Output() datetimeChange = new EventEmitter<Date>();

  onSet() {
    let dt = this.date + ' ' + this.time;
    let d = moment(dt, 'YYYY-MM-DD hh:mm').toDate();
    this.datetimeChange.emit(d);
  }
}
