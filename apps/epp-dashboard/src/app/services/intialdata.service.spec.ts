import { TestBed } from '@angular/core/testing';

import { IntialdataService } from './intialdata.service';

describe('IntialdataService', () => {
  let service: IntialdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntialdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
