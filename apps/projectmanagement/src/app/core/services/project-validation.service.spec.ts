import { TestBed } from '@angular/core/testing';

import { ProjectValidationService } from './project-validation.service';

describe('ProjectValidationService', () => {
  let service: ProjectValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
