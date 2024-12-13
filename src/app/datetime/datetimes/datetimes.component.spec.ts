import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimesComponent } from './datetimes.component';

describe('DatetimesComponent', () => {
  let component: DatetimesComponent;
  let fixture: ComponentFixture<DatetimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatetimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatetimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
