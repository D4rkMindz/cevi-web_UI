import { inject, TestBed } from '@angular/core/testing';

import { TokenAuthService } from './token-auth.service';

describe('TokenAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenAuthService]
    });
  });

  it('should be created', inject([TokenAuthService], (service: TokenAuthService) => {
    expect(service).toBeTruthy();
  }));
});
