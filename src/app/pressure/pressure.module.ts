import { PressureService } from './pressure.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { PRESSURE_OPTIONS } from './pressure.config';
import { HttpClient } from '@angular/common/http';
import { newpressureService } from './pressure.func';
import { PressureinfoComponent } from './pressureinfo/pressureinfo.component';
import { NgChartsModule } from 'ng2-charts';
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
    NgChartsModule,
  ],
  declarations: [PressureinfoComponent],
  exports: [PressureinfoComponent],
})
export class PressureModule {
  static forRoot(cfg: Configfile): ModuleWithProviders<PressureModule> {
    return {
      ngModule: PressureModule,
      providers: [
        { provide: PRESSURE_OPTIONS, useValue: cfg },
        {
          provide: PressureService,
          useFactory: newpressureService,
          deps: [PRESSURE_OPTIONS, HttpClient],
        },
      ],
    };
  }
}
