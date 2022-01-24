import { TestBed } from '@angular/core/testing';

import { TimesheetHttpInterceptorService } from './timesheet-http-interceptor.service';

describe('TimesheetHttpInterceptorService', () => {
  let service: TimesheetHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
