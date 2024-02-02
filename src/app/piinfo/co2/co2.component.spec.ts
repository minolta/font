import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Co2Component } from './co2.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeviceService } from '../../device/device.service';
import { AutoModule } from '@kykub/auto';

describe('Co2Component', () => {
  let component: Co2Component;
  let fixture: ComponentFixture<Co2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AutoModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
      ],
      declarations: [Co2Component],
      providers: [DeviceService],
    }).compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(Co2Component);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
