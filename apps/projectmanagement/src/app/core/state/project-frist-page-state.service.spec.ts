import { TestBed } from '@angular/core/testing';

import { ProjectFristPageStateService } from './project-frist-page-state.service';

describe('ProjectFristPageStateService', () => {
  let service: ProjectFristPageStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFristPageStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
