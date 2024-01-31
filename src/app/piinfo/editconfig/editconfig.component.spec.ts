import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconfigComponent } from './editconfig.component';

describe('EditconfigComponent', () => {
  let component: EditconfigComponent;
  let fixture: ComponentFixture<EditconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditconfigComponent ]
    })
    .compileComponents();
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
