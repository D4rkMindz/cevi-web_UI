import { inject, TestBed } from '@angular/core/testing';

import { UserLoaderService } from './user-loader.service';

describe('UserLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoaderService]
    });
  });

  it('should be created', inject([UserLoaderService], (service: UserLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
