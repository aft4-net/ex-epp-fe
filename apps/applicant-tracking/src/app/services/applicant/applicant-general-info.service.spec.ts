import { TestBed } from '@angular/core/testing';

import { ApplicantGeneralInfoService } from './applicant-general-info.service';

describe('ApplicantGeneralInfoService', () => {
  let service: ApplicantGeneralInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantGeneralInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
