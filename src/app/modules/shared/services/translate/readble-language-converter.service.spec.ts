import { inject, TestBed } from '@angular/core/testing';

import { ReadableLanguageConverterService } from './readble-language-converter.service';

describe('ReadableLanguageConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadableLanguageConverterService]
    });
  });

  it('should be created', inject([ReadableLanguageConverterService], (service: ReadableLanguageConverterService) => {
    expect(service).toBeTruthy();
  }));
});
