import { Component, input } from '@angular/core';

@Component({
  selector: 'app-datetimes',
  templateUrl: './datetimes.component.html',
  styleUrl: './datetimes.component.css'
})
export class DatetimesComponent {

date = input<Date>()

}
