import { TestBed } from '@angular/core/testing';

import { AddProjectValidationService } from './add-project-validation.service';

describe('AddProjectValidationService', () => {
  let service: AddProjectValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProjectValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
