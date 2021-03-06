import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../../config/config';
import { LocalStorageService } from '../../modules/shared/services/storage/local-storage.service';
import { CredentialsService } from '../../modules/shared/services/authentication/credentials.service';
import { UserDataService } from '../../modules/shared/services/user/user-data.service';
import { injector } from '../injector';
import { SecureHttpService } from '../../modules/shared/services/http/secure-http.service';
import { toDate } from '../../functions/to-date';

@Injectable()
export class BootstrapService {

  /**
   * BootstrapService constructor
   * @param {TranslateService} translate
   * @param {LocalStorageService} localStorage
   * @param {CredentialsService} credentials
   * @param injectr
   * @param user
   */
  constructor(private translate: TranslateService,
              private localStorage: LocalStorageService,
              private credentials: CredentialsService,
              private injectr: Injector,
              private user: UserDataService) {
    injector(this.injectr);
  }

  /**
   * Get Secure HTTP Service
   * @return {SecureHttpService}
   */
  get https(): SecureHttpService {
    return this.injectr.get(SecureHttpService);
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
  public async loadDataFromStorage() {
    const json = <string>await this.localStorage.getItem(config.keys.credentials);
    const credentials = JSON.parse(json);

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
      this.credentials.expiresAt = toDate(credentials._expiresAt);
    }

    if (!!credentials._userId) {
      this.credentials.userId = credentials._userId;
    }

    await this.getUserFromStorage();

    if (!this.user.id && this.credentials.hasCredentials()) {
      const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/' + this.credentials.userId;
      const response = <any> await this.https.get(url);
      this.user.fill(response.user);
      return;
    }
  }

  /**
   * Load user data from local storage on bootstrap
   * @return {Promise<void>}
   */
  public async getUserFromStorage() {
    const json = <any>await this.localStorage.getItem(config.keys.user);
    const user = JSON.parse(json);
    if (user) {
      this.user.fill(user);
    }
  }
}
