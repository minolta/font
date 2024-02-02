import { TestBed } from '@angular/core/testing';

import { Co2Service } from './co2.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Co2Service', () => {
  let service: Co2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(Co2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search co2 value', () => {});
});
