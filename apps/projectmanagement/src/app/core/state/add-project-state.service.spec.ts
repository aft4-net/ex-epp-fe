import { TestBed } from '@angular/core/testing';

import { AddProjectStateService } from './add-project-state.service';

describe('AddProjectStateService', () => {
  let service: AddProjectStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProjectStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
