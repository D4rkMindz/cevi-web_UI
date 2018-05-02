import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';

@Injectable()
export class LocalStorageService {

  /**
   * LocalStorageService constructor
   * @param {NgForage} localStorage
   */
  constructor(private localStorage: NgForage) {
  }

  /**
   * Set item into storage
   * @param {string} key
   * @param value
   * @return {Promise<any>}
   */
  public async setItem(key: string, value: any) {
    return await this.localStorage.setItem(key, value);
  }

  /**
   * Get single item from storage
   * @param {string} key
   * @return {Promise<any>}
   */
  public async getItem(key: string) {
    return await this.localStorage.getItem(key);
  }

  /**
   * Clear storage
   * @return {Promise<void>}
   */
  public async clear() {
    return await this.localStorage.clear();
  }

  /**
   * Remove single item from storage
   * @param {string} key
   * @return {Promise<void>}
   */
  public async removeItem(key: string) {
    return await this.localStorage.removeItem(key);
  }
}
