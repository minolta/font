import { NgModule } from '@angular/core';
import { DeviceModule } from './device/device.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { FwModule } from './fw/fw.module';
import { PressureModule } from './pressure/pressure.module';
import { provideHttpClient } from '@angular/common/http';
import { GetserviceService } from './getservice.service';
import { PortModule } from './port/port.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
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
    FwModule.forRoot(),
    PressureModule.forRoot(),
    PortModule.forRoot()

    
  ],
  exports: [],
  providers: [
    provideNativeDateAdapter(),
    provideAnimations(),
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    GetserviceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
