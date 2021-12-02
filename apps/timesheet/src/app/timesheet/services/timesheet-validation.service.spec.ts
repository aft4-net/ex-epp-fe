import { TestBed } from '@angular/core/testing';

import { TimesheetValidationService } from './timesheet-validation.service';

describe('TimesheetValidationService', () => {
  let service: TimesheetValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
