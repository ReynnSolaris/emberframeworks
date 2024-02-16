import { TestBed } from '@angular/core/testing';

import { AdminRealTimeService } from './admin-real-time.service';

describe('AdminRealTimeService', () => {
  let service: AdminRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
