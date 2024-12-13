import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimeComponent } from './datetime/datetime.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoComponent } from './auto/auto.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DatetimesComponent } from './datetimes/datetimes.component';
@NgModule({
  declarations: [DatetimeComponent, AutoComponent, DatetimesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [DatetimeComponent, AutoComponent],
})
export class DatetimeModule {}
