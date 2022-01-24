import { TestBed } from '@angular/core/testing';

import { UserPermissionStateService } from './user-permission-state.service';

describe('UserPermissionStateService', () => {
  let service: UserPermissionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPermissionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
