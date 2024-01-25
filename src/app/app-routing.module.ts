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

const routes: Routes = [
  { path: 'devicelist', component: DeviceListComponent },
  { path: "devicenew", component: DevicenewComponent },
  { path: "deviceedit/:id", component: DeviceeditComponent },
  { path: "devicedetail/:id", component: DevicedetailComponent },
  { path: 'dd', component: DevicedetailComponent },


  { path: "importpijob", component: ImportpijobComponent },
  { path: "pijobedit/:id", component: PijobeditComponent },
  { path: "joblist", component: JoblistComponent },
  { path: "pijoblist", component: PijoblistComponent },
  { path: "pijobnew", component: PijobnewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
