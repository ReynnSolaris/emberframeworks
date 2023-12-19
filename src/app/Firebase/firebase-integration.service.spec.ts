import { TestBed } from '@angular/core/testing';

import { FirebaseIntegrationService } from './firebase-integration.service';

describe('FirebaseIntegrationService', () => {
  let service: FirebaseIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
