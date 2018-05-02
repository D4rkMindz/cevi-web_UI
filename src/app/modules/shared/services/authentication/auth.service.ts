import { Injectable } from '@angular/core';
import { TokenAuthService } from './token-auth.service';
import { CredentialsService } from './credentials.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { config } from '../../../../config/config';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../../functions/translation';

@Injectable()
export class AuthService {

  constructor(private tokenAuth: TokenAuthService, private credentials: CredentialsService, private localStorage: LocalStorageService) {
  }

  public isAuthenticated() {
    // check if user has some credentials and the token is saved.
    // When the token is expired, the token will be reloaded with the given credentials
    return (this.credentials.hasCredentials() && !!this.credentials.token);
  }

  /**
   * Get Token
   * @return {Promise<void>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422
   */
  public async getToken() {
    if (!this.credentials.hasCredentials()) {
      const key = <string>_('Please Authenticate');
      throw new Error(await __(key));
    }

    if (this.credentials.isExpired()) {
      await this.tokenAuth.loadToken();
      return this.credentials.token;
    }

    return this.credentials.token;
  }

  /**
   * Check if the user can login
   * @param {string} username
   * @param {string} password
   * @param {boolean} isEmail
   * @param stayLoggedIn
   * @return {Promise<boolean>}
   */
  public async authenticate(username: string, password: string, isEmail: boolean, stayLoggedIn: boolean) {
    if (isEmail) {
      this.credentials.email = username;
    } else {
      this.credentials.username = username;
    }
    this.credentials.password = password;
    const token = await this.getToken();

    if (stayLoggedIn && !!token) {
      // save the credential data into the local storage
      await this.localStorage.setItem(config.keys.credentials, this.credentials);
    }

    // if the token was received, the user can login
    return !!token;
  }
}
