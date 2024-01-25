import { PijobgroupService } from './pijobgroup.service';
import { PijobService } from './pijob.service';
import { JobService } from './job.service';
import { PijobnewComponent } from './pijobnew/pijobnew.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PijoblistComponent } from './pijoblist/pijoblist.component';
import { AutoModule } from '@kykub/auto';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { RouterModule } from '@angular/router';
import { JOB_OPTIONS } from './job.conf';
import { HttpClient } from '@angular/common/http';
// import {
//   newjobservice,
//   newpijobservice,
//   newonecommandservice,
// } from './job.func';
import { JoblistComponent } from './joblist/joblist.component';
import { JobnewComponent } from './jobnew/jobnew.component';
import { JobeditComponent } from './jobedit/jobedit.component';
import { DeviceModule } from '../device/device.module';
import { PijobeditComponent } from './pijobedit/pijobedit.component';
import { OnecommandComponent } from './onecommand/onecommand.component';
import { OnecommandService } from './onecommand.service';
import { DeletepijobComponent } from './deletepijob/deletepijob.component';
import { ImportpijobComponent } from './importpijob/importpijob.component';
import { ExportjobComponent } from './exportjob/exportjob.component';
import { PijobeditdiaComponent } from './pijobeditdia/pijobeditdia.component';
import { DevicejobComponent } from './devicejob/devicejob.component';
import { IplistComponent } from './iplist/iplist.component';
import { DirectioComponent } from './directio/directio.component';
import { PijobgroupnewComponent } from './pijobgroupnew/pijobgroupnew.component';
import { ZonelistComponent } from './zonelist/zonelist.component';

/*
สำหรับจัดการงานต่างๆของ PI
*/
@NgModule({
  imports: [
    CommonModule,
    AutoModule,
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
    DeviceModule,
  ],
  declarations: [
    PijoblistComponent,
    PijobnewComponent,
    JobeditComponent,
    OnecommandComponent,
    PijobeditComponent,
    DeletepijobComponent,
    JoblistComponent,
    ExportjobComponent,
    PijobeditdiaComponent,
    JobnewComponent,
    ImportpijobComponent,
    DevicejobComponent,
    IplistComponent,
    DirectioComponent,
    PijobgroupnewComponent,
    ZonelistComponent,
  ],
  exports: [
    PijoblistComponent,
    PijobnewComponent,
    JoblistComponent,
    JobnewComponent,
    JobeditComponent,
    PijobeditComponent,
    OnecommandComponent,
    DeletepijobComponent,
    ImportpijobComponent,
  ],
})
export class JobModule {
  static forRoot(): ModuleWithProviders<JobModule> {
    return {
      ngModule: JobModule,
      providers: [PijobService,OnecommandService,JobService
        // { provide: JOB_OPTIONS, useValue: cfg },
        // {
        //   provide: JobService,
        //   useFactory: newjobservice,
        //   deps: [JOB_OPTIONS, HttpClient]
        // },
        // {
        //   provide: PijobService,
        //   useFactory: newpijobservice,
        //   deps: [JOB_OPTIONS, HttpClient]
        // },
        // {
        //   provide: OnecommandService,
        //   useFactory: newonecommandservice,
        //   deps: [JOB_OPTIONS, HttpClient]
        // },
        // {
        //   provide: PijobgroupService,
        //   useFactory: npjg,
        //   deps: [HttpClient, JOB_OPTIONS]
        // },
      ],
    };
  }
}
