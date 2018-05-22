import { TestBed, async, inject } from '@angular/core/testing';

import { DepartmentGuard } from './department.guard';

describe('DepartmentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentGuard]
    });
  });

  it('should ...', inject([DepartmentGuard], (guard: DepartmentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
