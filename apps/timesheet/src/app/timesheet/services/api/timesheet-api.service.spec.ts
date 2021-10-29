import { TestBed } from '@angular/core/testing';

import { TimesheetApiService } from './timesheet-api.service';

describe('TimesheetApiService', () => {
  let service: TimesheetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
