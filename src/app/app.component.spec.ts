import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AutoModule } from '@kykub/auto';
import { NgChartsModule } from 'ng2-charts';
import { DatetimeModule } from './datetime/datetime.module';
import { DeviceModule } from './device/device.module';
import { JobModule } from './job/job.module';
import { PiinfoModule } from './piinfo/piinfo.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatIconModule,
        MatInputModule,
        MatMenuModule,
        AutoModule,
        FormsModule,
        MatDatepickerModule,
        DatetimeModule,
        ReactiveFormsModule,
        DeviceModule.forRoot(),
        JobModule.forRoot(),
        NgChartsModule,
        PiinfoModule.forRoot(),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'font'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    // expect(app.title).toEqual('font');
  });

  it('should render title', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('h1')?.textContent).toContain('Hello, font');
  });
});
