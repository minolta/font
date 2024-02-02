import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoComponent } from './auto.component';
import { TestService } from './test.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AutoComponent', () => {
  let component: AutoComponent;
  let fixture: ComponentFixture<AutoComponent>;
  let service: TestService;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      declarations: [AutoComponent],
      providers: [TestService],
    }).compileComponents();

    service = TestBed.inject(TestService);
    fixture = TestBed.createComponent(AutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.service = service;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check type input', () => {

    let is = el.queryAll(By.css('input'))
    console.debug('Auto input ',is)
    expect(is[0].nativeElement.type).toBe('text')
  });
  it('ป้อน 1 เข้าไปจะเจออันเดียว',async ()=>{

    const inputElement = el.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = '1';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll('mat-option');
    expect(matOptions.length).toBe(1,
      'ใส่ 1 ต้องเจออันเดียว');
  }
  )
});
