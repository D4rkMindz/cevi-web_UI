import { TestBed, inject } from '@angular/core/testing';

import { StorageLocationService } from './storage-location.service';

describe('StorageLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageLocationService]
    });
  });

  it('should be created', inject([StorageLocationService], (service: StorageLocationService) => {
    expect(service).toBeTruthy();
  }));
});
