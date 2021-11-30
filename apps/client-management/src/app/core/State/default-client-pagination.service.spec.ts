import { TestBed } from '@angular/core/testing';

import { DefaultClientPaginationService } from './default-client-pagination.service';

describe('DefaultClientPaginationService', () => {
  let service: DefaultClientPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultClientPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
