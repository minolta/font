import { DeviceModule } from './../device/device.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DhtinfoComponent } from './dhtinfo/dhtinfo.component';
import {
  AskbeforedeletedsComponent,
  Ds18b20infoComponent,
} from './ds18b20info/ds18b20info.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AutoModule } from '@kykub/auto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WaterinfoComponent } from './waterinfo/waterinfo.component';
import { DeviceactiveComponent } from './deviceactive/deviceactive.component';
import { DssComponent } from './dss/dss.component';
import { ActivedeviceComponent } from './activedevice/activedevice.component';
import { VbattinfoComponent } from './vbattinfo/vbattinfo.component';
import { VbattService } from './vbatt.service';
import { ParameterviewComponent } from './parameterview/parameterview.component';
import { MatSelectModule } from '@angular/material/select';
import { DustinfoComponent } from './dustinfo/dustinfo.component';
import { DustService } from './dust.service';
import { LoginfoComponent } from './loginfo/loginfo.component';
import { LogService } from './log.service';
import { DistanceinfoComponent } from './distanceinfo/distanceinfo.component';
import { DistanceService } from './distance.service';
import { EditconfigComponent } from './editconfig/editconfig.component';
import { Co2Component } from './co2/co2.component';
import { Co2Service } from './co2.service';
import { NgChartsModule } from 'ng2-charts';
import { DatetimeModule } from '../datetime/datetime.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    AutoModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
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
    DeviceModule,
    NgChartsModule,
    DatetimeModule,
  ],
  declarations: [
    DhtinfoComponent,
    ParameterviewComponent,
    Ds18b20infoComponent,
    WaterinfoComponent,
    DeviceactiveComponent,
    DssComponent,
    AskbeforedeletedsComponent,
    ActivedeviceComponent,
    VbattinfoComponent,
    ParameterviewComponent,
    DustinfoComponent,
    LoginfoComponent,
    DistanceinfoComponent,
    EditconfigComponent,
    Co2Component,
  ],
  exports: [DhtinfoComponent, Ds18b20infoComponent, VbattinfoComponent],
})
export class PiinfoModule {
  static forRoot(): ModuleWithProviders<PiinfoModule> {
    return {
      ngModule: PiinfoModule,
      providers: [
        VbattService,
        DustService,
        LogService,
        DistanceService,
        Co2Service,
      
      ],
    };
  }
}
