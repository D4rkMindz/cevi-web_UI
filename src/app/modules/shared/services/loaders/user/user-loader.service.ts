import { Injectable } from '@angular/core';
import { config } from '../../../../../config/config';
import { UserDataService } from '../../user/user-data.service';
import { SecureHttpService } from '../../http/secure-http.service';
import { CredentialsService } from '../../authentication/credentials.service';
import { LocalStorageService } from '../../storage/local-storage.service';

@Injectable()
export class UserLoaderService {

  /**
   * UserLoaderService constructor
   * @param {UserDataService} user
   * @param {SecureHttpService} https
   * @param {CredentialsService} credentials
   * @param {LocalStorageService} localStorage
   */
  constructor(private user: UserDataService,
              private https: SecureHttpService,
              private credentials: CredentialsService,
              private localStorage: LocalStorageService) {
  }

  /**
   * Load user data from server
   * @returns {Promise<void>}
   */
  public async loadUserData() {
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/' + this.credentials.userId;
    const response = <any>await this.https.get(url);
    if (!response) {
      return;
    }
    const user = response.user;
    this.user.fill(user);

    if ('username' in user && this.credentials.username !== user.username) {
      this.credentials.username = user.username;
    }

    const data = {
      address: this.user.address,
      archived_at: this.user.archived_at,
      archived_by: this.user.archived_by,
      birthdate: this.user.birthdate,
      cevi_name: this.user.cevi_name,
      created_at: this.user.created_at,
      created_by: this.user.created_by,
      department: this.user.department,
      email: this.user.email,
      first_name: this.user.first_name,
      gender: this.user.gender,
      id: this.user.id,
      js_certificate: this.user.js_certificate,
      js_certificate_until: this.user.js_certificate_until,
      language: this.user.language,
      last_name: this.user.last_name,
      modified_at: this.user.modified_by,
      modified_by: this.user.modified_at,
      position: this.user.position,
      signup_completed: this.user.signup_completed,
      email_confirmed: this.user.email_confirmed,
      url: this.user.url,
      username: this.user.username,
    };

    await this.localStorage.setItem(config.keys.user, JSON.stringify(data));
  }
}
