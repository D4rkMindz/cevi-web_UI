import { TestBed, inject } from '@angular/core/testing';

import { QualityLevelService } from './quality-level.service';

describe('QualityLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityLevelService]
    });
  });

  it('should be created', inject([QualityLevelService], (service: QualityLevelService) => {
    expect(service).toBeTruthy();
  }));
});
