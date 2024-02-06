import { Ds18b20Service } from './ds18b20.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './devicelist/devicelist.component';
import { DevicenewComponent } from './devicenew/devicenew.component';
import { DevicegrouplistComponent } from './devicegrouplist/devicegrouplist.component';
import { DEVICE_OPTIONS } from './device.config';
import { DeviceService } from './device.service';
// import {
//   newdeviceservice,
//   newdevicegroupservice,
//   newdht22service,
//   newds18b20service,
//   newds18sensorservice,
// } from "./device.func";
import { DevicegroupnewComponent } from './devicegroupnew/devicegroupnew.component';
import { DevicegroupService } from './devicegroup.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoModule } from '@kykub/auto';
import { RouterModule } from '@angular/router';
import { DevicedetailComponent } from './devicedetail/devicedetail.component';
import { DssensorautoComponent } from './dssensorauto/dssensorauto.component';
import { DssensorListComponent } from './dssensorlist/dssensorlist.component';
import { DssensoreditComponent } from './dssensoredit/dssensoredit.component';
import { DssensornewComponent } from './dssensornew/dssensornew.component';
import { MatExpansionModule } from '@angular/material/expansion';
// import { WService } from '../w.service';
import { ActivedeviceComponent } from './activedevice/activedevice.component';
import { Ds18sensorService } from './ds18sensor.service';
import { Dht22valueService } from './dht22value.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeviceeditComponent } from './deviceedit/deviceedit.component';
import { DatetimeModule } from '../datetime/datetime.module';
import { DevicegroupeditComponent } from './devicegroupedit/devicegroupedit.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AutoModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    DatetimeModule,
    MatFormFieldModule
  ],
  declarations: [
    DeviceListComponent,
    DevicenewComponent,
    DevicegroupnewComponent,
    DevicedetailComponent,
    DssensorautoComponent,
    DssensorListComponent,
    DssensoreditComponent,
    DssensornewComponent,
    ActivedeviceComponent,
    DeviceeditComponent,
    DevicegroupeditComponent,
    DevicegrouplistComponent
  ],
  exports: [
    DeviceListComponent,
    DevicenewComponent,
    DevicegrouplistComponent,
    DevicegroupnewComponent,
    DeviceListComponent,
    DeviceeditComponent,
    DevicedetailComponent,
    DssensorautoComponent,
    DssensornewComponent,
  ],
})
export class DeviceModule {
  static forRoot(): ModuleWithProviders<DeviceModule> {
    return {
      ngModule: DeviceModule,
      providers: [
        DeviceService,
        Ds18b20Service,
        Ds18sensorService,
        Dht22valueService,
        DevicegroupService,
      ],
    };
  }
}
