import { TestBed } from '@angular/core/testing';

import { UpdateClientStateService } from './update-client-state.service';

describe('UpdateClientStateService', () => {
  let service: UpdateClientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateClientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
