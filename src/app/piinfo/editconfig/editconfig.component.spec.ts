import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconfigComponent } from './editconfig.component';
import { DeviceService } from '../../device/device.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutoModule } from '@kykub/auto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { DatetimeModule } from '../../datetime/datetime.module';
import { DeviceModule } from '../../device/device.module';

describe('EditconfigComponent', () => {
  let component: EditconfigComponent;
  let fixture: ComponentFixture<EditconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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
      declarations: [EditconfigComponent],
      providers: [DeviceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
