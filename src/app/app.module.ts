import { NgModule } from '@angular/core';
import { DeviceModule } from './device/device.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { JobModule } from './job/job.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AutoModule } from '@kykub/auto';
import { NgChartsModule } from 'ng2-charts';
import { PiinfoModule } from './piinfo/piinfo.module';
import { DatetimeModule } from './datetime/datetime.module';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    AutoModule,
    FormsModule,
    MatDatepickerModule,
    DatetimeModule,
    ReactiveFormsModule,
    DeviceModule.forRoot(),
    JobModule.forRoot(),
    NgChartsModule,
    PiinfoModule.forRoot(),
    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
    // NgxMatNativeDateModule,
    // NgxMatDatetimePickerModule,
  ],
  exports: [],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
