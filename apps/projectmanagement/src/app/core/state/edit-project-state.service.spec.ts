import { TestBed } from '@angular/core/testing';

import { EditProjectStateService } from './edit-project-state.service';

describe('EditProjectStateService', () => {
  let service: EditProjectStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProjectStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
