import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobModule } from '../job.module';

import { ZonelistComponent } from './zonelist.component';

describe('ZonelistComponent', () => {
  let component: ZonelistComponent;
  let fixture: ComponentFixture<ZonelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[JobModule],
      declarations: [ ZonelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(ZonelistComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
