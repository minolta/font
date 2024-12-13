import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortnewComponent } from './portnew/portnew.component';
import { PortService } from './port.service';
import { PortlistComponent } from './portlist/portlist.component';
import { PorteditComponent } from './portedit/portedit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AutoModule } from '@kykub/auto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogiclistComponent } from './logiclist/logiclist.component';
import { LogicnewComponent } from './logicnew/logicnew.component';
import { LogiceditComponent } from './logicedit/logicedit.component';
import { LogicService } from './logic.service';
import {  MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {  MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    AutoModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
  ],
  declarations: [
    PortnewComponent,
    PortlistComponent,
    PorteditComponent,
    LogiclistComponent,
    LogiceditComponent,
    LogicnewComponent,
  ],
  exports: [
    PortnewComponent,
    PortlistComponent,
    PorteditComponent,
    LogiclistComponent,
    LogiceditComponent,
    LogicnewComponent,
  ],
})
export class PortModule {
  static forRoot(): ModuleWithProviders<PortModule> {
    return {
      ngModule: PortModule,
      providers: [PortService, LogicService],
    };
  }
}
