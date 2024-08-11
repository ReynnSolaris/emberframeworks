import { TestBed } from '@angular/core/testing';

import { MainApiService } from './main-api.service';

describe('MainApiService', () => {
  let service: MainApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
