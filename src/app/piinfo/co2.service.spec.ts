import { TestBed } from '@angular/core/testing';

import { Co2Service } from './co2.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
describe('Co2Service', () => {
  let service: Co2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(Co2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search co2 value', () => {});
});
