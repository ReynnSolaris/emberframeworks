import { TestBed } from '@angular/core/testing';

import { AuthGateInterceptor } from './auth-gate.interceptor';

describe('AuthGateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthGateInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthGateInterceptor = TestBed.inject(AuthGateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
