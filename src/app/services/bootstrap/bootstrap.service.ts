import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../../config/config';
import { LocalStorageService } from '../../modules/shared/services/storage/local-storage.service';
import { CredentialsService } from '../../modules/shared/services/authentication/credentials.service';
import { toDate } from '../../functions/to-date';
import { UserDataService } from '../../modules/shared/services/user/user-data.service';

@Injectable()
export class BootstrapService {

  /**
   * BootstrapService constructor
   * @param {TranslateService} translate
   * @param {LocalStorageService} localStorage
   * @param {CredentialsService} credentials
   * @param user
   */
  constructor(private translate: TranslateService,
              private localStorage: LocalStorageService,
              private credentials: CredentialsService,
              private user: UserDataService) {
  }

  /**
   * Set the application language by reading the lang URL query parameter
   */
  public readLanguageQueryParam() {
    console.log(`Bootstrapping ${config.appName} @ ${new Date().toString()}`);
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('lang')) {
      return;
    }

    const lang = urlParams.get('lang');
    if (this.translate.currentLang === lang) {
      return;
    }

    const availableLanguages = config.defaults.language.availableLanguages;
    if (availableLanguages.includes(lang)) {
      this.translate.use(lang);
      console.log(`setting language to ${lang}`);
      return;
    }

    const browserLang = this.translate.getBrowserLang().slice(0, 2);
    if (!availableLanguages.includes(browserLang)) {
      this.translate.use(config.defaults.language.default);
      console.log(`setting language to ${config.defaults.language.default}`);
      return;
    }

    this.translate.use(browserLang);
    console.log(`setting language to ${browserLang}`);
  }

  /**
   * Load user credentials from local storage
   * @return {Promise<void>}
   */
  public async getUserCredentialsFromStorage() {
    const credentials = <any>await this.localStorage.getItem(config.keys.credentials);

    if (!credentials) {
      return;
    }

    if (!!credentials._username) {
      this.credentials.username = credentials._username;
    }

    if (!!credentials._password) {
      this.credentials.password = credentials._password;
    }

    if (!!credentials._token) {
      this.credentials.token = credentials._token;
    }

    if (!!credentials._password) {
      this.credentials.password = credentials._password;
    }

    if (!!credentials._email) {
      this.credentials.email = credentials._email;
    }

    if (!!credentials._expiresAt) {
      this.credentials.expiresAt = credentials._expiresAt;
    }

    if (!!credentials._userId) {
      this.credentials.userId = credentials._userId;
    }
  }

  /**
   * Load user data from local storage on bootstrap
   * @return {Promise<void>}
   */
  public async getUserFromStorage() {
    const user = <any>await this.localStorage.getItem(config.keys.user);
    this.user.fill(user);
  }
}
