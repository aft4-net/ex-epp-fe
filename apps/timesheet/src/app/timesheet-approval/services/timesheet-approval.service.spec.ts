import { TestBed } from '@angular/core/testing';

import { TimesheetApprovalService } from './timesheet-approval.service';

describe('TimesheetApprovalService', () => {
  let service: TimesheetApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
