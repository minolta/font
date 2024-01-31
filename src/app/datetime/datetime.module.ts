import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimeComponent } from './datetime/datetime.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [DatetimeComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule],
  exports: [DatetimeComponent],
})
export class DatetimeModule {}
