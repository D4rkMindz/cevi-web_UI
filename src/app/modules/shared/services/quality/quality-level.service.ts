import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { config } from '../../../../config/config';
import { QualityLevel } from './QualityLevel';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable()
export class QualityLevelService {

  private _qualities: QualityLevel[] = [];

  /**
   * QualityLevelService constructor
   * @param {HttpService} http
   * @param {LocalStorageService} localStorage
   */
  constructor(private http: HttpService,
              private localStorage: LocalStorageService) {
  }

  /**
   * Load and get quality levels
   * @returns {Promise<QualityLevel[]>}
   */
  public async loadAndGetQualityLevels() {
    await this.load();
    await this.saveQualities();
    return this.getQualityLevels();
  }

  /**
   * Get quality levels
   * @returns {QualityLevel[]}
   */
  public getQualityLevels() {
    return this._qualities;
  }

  /**
   * Load qualities
   * @returns {Promise<void>}
   */
  private async load() {
    await this.loadFromStorage();
    if (this._qualities.length >= 1) {
      console.log(`Loaded ${this._qualities.length} qualities from storage`, this._qualities);
      return;
    }
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/articles/qualities';
    const response = await this.http.get(url);
    if ('qualities' in response) {
      response.qualities.forEach((quality) => {
        this._qualities.push(new QualityLevel(quality));
      });
    }
  }

  /**
   * Load qualities from storage
   * @returns {Promise<void>}
   */
  private async loadFromStorage() {
    const json = <string>await this.localStorage.getItem(config.keys.qualityLevels);
    const qualities = JSON.parse(json);
    this._qualities = [];
    if (qualities) {
      qualities.forEach((quality) => {
        this._qualities.push(new QualityLevel(quality));
      });
    }
  }

  /**
   * Save qualities to storage
   * @returns {Promise<void>}
   */
  private async saveQualities() {
    const saveableQualities = [];
    this._qualities.forEach((quality) => {
      saveableQualities.push(quality.toObject());
    });
    await this.localStorage.setItem(config.keys.qualityLevels, JSON.stringify(saveableQualities));
  }
}
