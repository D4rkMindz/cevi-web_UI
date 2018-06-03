import { Injectable } from '@angular/core';
import { SecureHttpService } from '../http/secure-http.service';
import { config } from '../../../../config/config';

@Injectable()
export class StorageLocationService {

  constructor(private https: SecureHttpService) {
  }

  public async getStorageLocationsForDepartment(departmentId: string) {
    const url = config.defaults.url.base + config.defaults.url.apiVersion + `/departments/${departmentId}/storages`;
    const response = await this.https.get(url);
    console.log(response);
  }
}
