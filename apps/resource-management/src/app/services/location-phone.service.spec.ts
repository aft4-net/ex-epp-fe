import { TestBed } from '@angular/core/testing';

import { LocationPhoneService } from './location-phone.service';

describe('LocationPhoneService', () => {
  let service: LocationPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
