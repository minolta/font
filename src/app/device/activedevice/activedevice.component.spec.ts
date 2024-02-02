import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivedeviceComponent } from './activedevice.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActivedeviceComponent', () => {
  let component: ActivedeviceComponent;
  let fixture: ComponentFixture<ActivedeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivedeviceComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
