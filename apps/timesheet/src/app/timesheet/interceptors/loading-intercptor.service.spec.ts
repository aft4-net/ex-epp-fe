import { TestBed } from '@angular/core/testing';

import { LoadingIntercptorService } from './loading-intercptor.service';

describe('LoadingIntercptorService', () => {
  let service: LoadingIntercptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingIntercptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
