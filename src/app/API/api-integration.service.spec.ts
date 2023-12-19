import { TestBed } from '@angular/core/testing';

import { ApiIntegrationService } from './api-integration.service';

describe('ApiIntegrationService', () => {
  let service: ApiIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
