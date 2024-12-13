import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PiinfoModule } from '../piinfo.module';

import { DustinfoComponent } from './dustinfo.component';

describe('DustinfoComponent', () => {
  let component: DustinfoComponent;
  let fixture: ComponentFixture<DustinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[PiinfoModule.forRoot()],
      declarations: [ DustinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(DustinfoComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
