import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageLocation } from '../../shared/services/storage-location/StorageLocation';
import { StorageLocationService } from '../../shared/services/storage-location/storage-location.service';
import { Article } from '../../shared/services/article/Article';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserDataService } from '../../shared/services/user/user-data.service';

@Component({
  selector: 'cevi-web-storage-place-selection-dialog',
  templateUrl: './storage-place-selection-dialog.component.html',
  styleUrls: ['./storage-place-selection-dialog.component.scss']
})
export class StoragePlaceSelectionDialogComponent implements OnInit {

  sls: StorageLocation[] = [new StorageLocation()];
  form: FormGroup;
  selecetedSL: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { article?: Article },
              private formBuilder: FormBuilder,
              private user: UserDataService,
              private storageLocations: StorageLocationService) {
    this.fillStorageLocations();
  }

  ngOnInit() {
  }

  private async fillStorageLocations() {
    await this.storageLocations.getStorageLocationsForDepartment(this.user.department.id);
  }
}
