import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device/devicelist/devicelist.component';
import { DevicedetailComponent } from './device/devicedetail/devicedetail.component';
import { DevicenewComponent } from './device/devicenew/devicenew.component';
import { DeviceeditComponent } from './device/deviceedit/deviceedit.component';
import { ImportpijobComponent } from './job/importpijob/importpijob.component';
import { JoblistComponent } from './job/joblist/joblist.component';
import { PijobeditComponent } from './job/pijobedit/pijobedit.component';
import { PijoblistComponent } from './job/pijoblist/pijoblist.component';
import { PijobnewComponent } from './job/pijobnew/pijobnew.component';
import { ZonelistComponent } from './job/zonelist/zonelist.component';
import { ParameterviewComponent } from './piinfo/parameterview/parameterview.component';
import { DhtinfoComponent } from './piinfo/dhtinfo/dhtinfo.component';
import { JobnewComponent } from './job/jobnew/jobnew.component';
import { VbattinfoComponent } from './piinfo/vbattinfo/vbattinfo.component';
import { DirectioComponent } from './job/directio/directio.component';
import { DevicegroupnewComponent } from './device/devicegroupnew/devicegroupnew.component';
import { DevicegroupeditComponent } from './device/devicegroupedit/devicegroupedit.component';
import { DevicegrouplistComponent } from './device/devicegrouplist/devicegrouplist.component';
import { PijobgroupnewComponent } from './job/pijobgroupnew/pijobgroupnew.component';
import { FwuploadComponent } from './fw/fwupload/fwupload.component';
import { DustinfoComponent } from './piinfo/dustinfo/dustinfo.component';
import { PressureinfoComponent } from './pressure/pressureinfo/pressureinfo.component';
import { PortnewComponent } from './port/portnew/portnew.component';
import { PortlistComponent } from './port/portlist/portlist.component';
import { PorteditComponent } from './port/portedit/portedit.component';
import { ExportjobComponent } from './job/exportjob/exportjob.component';
// import { FwuploadComponent } from './fw/fwupload/fwupload.component';

const routes: Routes = [
  { path: 'devicelist', component: DeviceListComponent },
  { path: 'devicenew', component: DevicenewComponent },
  { path: 'deviceedit/:id', component: DeviceeditComponent },
  { path: 'devicedetail/:id', component: DevicedetailComponent },
  { path: 'dd', component: DevicedetailComponent },

  { path: 'devicegroupnew', component: DevicegroupnewComponent },
  { path: 'devicegrouplist', component: DevicegrouplistComponent },
  { path: 'devicegroupedit/:id', component: DevicegroupeditComponent },

  { path: 'importpijob', component: ImportpijobComponent },
  { path: 'pijobedit/:id', component: PijobeditComponent },
  { path: 'joblist', component: JoblistComponent },
  { path: 'pijoblist', component: PijoblistComponent },
  { path: 'pijobnew', component: PijobnewComponent },
  { path: 'jobnew', component: JobnewComponent },
  { path: 'zonelist', component: ZonelistComponent },
  { path: 'pijobgroupnew', component: PijobgroupnewComponent },
  { path: 'exportpijob', component: ExportjobComponent },
  
  { path: 'deviceparameter', component: ParameterviewComponent },

  { path: 'directio', component: DirectioComponent },
  { path: 'dhtinfo', component: DhtinfoComponent },
  { path: 'vbattinfo', component: VbattinfoComponent },
  { path: 'dustinfo', component: DustinfoComponent },
  { path: 'pressureinfo', component: PressureinfoComponent },

  { path: 'fwupload', component: FwuploadComponent },

  { path: 'portnew', component: PortnewComponent },
  {
    path: 'portlist',
    component: PortlistComponent,
  },
  {
    path: 'portedit/:id',
    component: PorteditComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: true,
      // relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
