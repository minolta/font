import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortnewComponent } from './portnew/portnew.component';
import { Configfile } from '@kykub/base';
import { PORT_OPTIONS } from './port.conf';
import { PortService } from './port.service';
import { newportservice, newlogicservice } from './port.func';
import { HttpClient } from '@angular/common/http';
import { PortlistComponent } from './portlist/portlist.component';
import { PorteditComponent } from './portedit/portedit.component';
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
import { AutoModule } from '@kykub/auto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogiclistComponent } from './logiclist/logiclist.component';
import { LogicnewComponent } from './logicnew/logicnew.component';
import { LogiceditComponent } from './logicedit/logicedit.component';
import { LogicService } from './logic.service';
@NgModule({
  imports: [
    CommonModule, AutoModule,
    MatDatepickerModule, MatButtonModule, MatIconModule, MatTabsModule, MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule, MatSidenavModule, MatListModule, MatMenuModule,
    MatToolbarModule, MatInputModule, MatCheckboxModule,
    MatCardModule, FormsModule, ReactiveFormsModule,
    RouterModule
  ],
  declarations: [PortnewComponent, PortlistComponent, PorteditComponent,
    LogiclistComponent, LogicnewComponent, LogiceditComponent],
  exports: [PortnewComponent, PortlistComponent, PorteditComponent,
    LogiclistComponent, LogicnewComponent, LogiceditComponent]
})
export class PortModule {
  static forRoot(cfg: Configfile): ModuleWithProviders<PortModule> {
    return {
      ngModule: PortModule,
      providers: [
        { provide: PORT_OPTIONS, useValue: cfg },
        {
          provide: PortService,
          useFactory: newportservice,
          deps: [PORT_OPTIONS, HttpClient]
        },
        {
          provide: LogicService,
          useFactory: newlogicservice,
          deps: [PORT_OPTIONS, HttpClient]
        },
      ]
    }
  }
}
