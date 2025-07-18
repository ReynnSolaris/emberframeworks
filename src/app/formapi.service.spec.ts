import { TestBed } from '@angular/core/testing';

import { FormapiService } from './formapi.service';

describe('FormapiService', () => {
  let service: FormapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
