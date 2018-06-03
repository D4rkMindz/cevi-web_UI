import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePlaceSelectionDialogComponent } from './storage-place-selection-dialog.component';

describe('StoragePlaceSelectionDialogComponent', () => {
  let component: StoragePlaceSelectionDialogComponent;
  let fixture: ComponentFixture<StoragePlaceSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragePlaceSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePlaceSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
