import { TestBed } from '@angular/core/testing';

import { ViewReportService } from './view-report.service';

describe('ViewReportService', () => {
  let service: ViewReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
