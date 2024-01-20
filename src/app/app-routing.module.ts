import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device/devicelist/devicelist.component';
import { DevicedetailComponent } from './device/devicedetail/devicedetail.component';

const routes: Routes = [
  { path: 'devicelist', component: DeviceListComponent },
  { path: 'dd', component: DevicedetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
