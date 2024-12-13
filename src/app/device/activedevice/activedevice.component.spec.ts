import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivedeviceComponent } from './activedevice.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActivedeviceComponent', () => {
  let component: ActivedeviceComponent;
  let fixture: ComponentFixture<ActivedeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ActivedeviceComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(ActivedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
