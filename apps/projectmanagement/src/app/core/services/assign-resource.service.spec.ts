import { TestBed } from '@angular/core/testing';

import { AssignResourceService } from './assign-resource.service';

describe('AssignResourceService', () => {
  let service: AssignResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
