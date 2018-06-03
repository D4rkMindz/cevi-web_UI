import { Injectable } from '@angular/core';
import { config } from '../../../../config/config';
import { HttpService } from '../http/http.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Gender } from './Gender';

@Injectable()
export class GenderService {
  private genders = null;
  private gendersFormatted = null;
  private lang: string;

  /**
   * GenderService constructor
   * @param {HttpService} http
   * @param {LocalStorageService} localStorage
   * @param translate
   */
  constructor(private http: HttpService,
              private localStorage: LocalStorageService,
              private translate: TranslateService) {
    this.lang = config.defaults.language.default;
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang;
      this.formatGenders();
    });
  }

  /**
   * Load and get genders.
   * @returns {Promise<any>}
   */
  public async loadAndGetGenders() {
    await this.loadGenders();
    this.formatGenders();
    await this.saveGenders();
    return this.getFormattedGenders();
  }

  /**
   * Get all genders.
   * @returns {any}
   */
  public getGenders() {
    return this.genders;
  }

  /**
   * Get formatted genders
   * @returns {any}
   */
  public getFormattedGenders() {
    return this.gendersFormatted;
  }

  /**
   * Load all genders from server
   * @returns {Promise<void>}
   */
  private async loadGenders() {
    const json = <any>await this.localStorage.getItem(config.keys.genders);
    const loadedGenders = JSON.parse(json);
    const genders = [];
    if (loadedGenders ) {
      for (const gender of loadedGenders) {
        genders.push(new Gender(gender));
      }
      this.genders = genders;
      return;
    }
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/genders';
    const response = <any>await this.http.get(url);
    if (!response) {
      return;
    }
    for (const gender of response.genders) {
      genders.push(new Gender(gender));
    }
    this.genders = genders;
  }

  /**
   * Save genders into local storage
   * @returns {Promise<void>}
   */
  private async saveGenders() {
    await this.localStorage.setItem(config.keys.genders, JSON.stringify(this.genders));
  }

  /**
   * Format genders
   */
  private formatGenders() {
    const data = [];
    this.genders.forEach((gender: Gender) => {
      data.push({id: gender.id, name: gender['name_' + this.lang]});
    });
    this.gendersFormatted = data;
  }
}
