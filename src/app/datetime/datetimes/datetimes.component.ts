import { Component, input } from '@angular/core';

@Component({
    selector: 'app-datetimes',
    templateUrl: './datetimes.component.html',
    styleUrl: './datetimes.component.css',
    standalone: false
})
export class DatetimesComponent {

date = input<Date>()

}
