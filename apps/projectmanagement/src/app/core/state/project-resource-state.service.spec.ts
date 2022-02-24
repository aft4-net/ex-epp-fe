import { TestBed } from '@angular/core/testing';

import { ProjectResourceStateService } from './project-resource-state.service';

describe('ProjectResourceStateService', () => {
  let service: ProjectResourceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectResourceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
