import { TestBed } from '@angular/core/testing';

import { DutyStationService } from './duty-station.service';

describe('DutyStationService', () => {
  let service: DutyStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
