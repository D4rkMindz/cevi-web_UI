import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { HttpServiceInterface } from './HttpInterface';
import { __ } from '../../../../functions/translation';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable()
export class HttpService implements HttpServiceInterface {

  private lang: string;

  /**
   * HTTP Service constructor
   * @param {HttpClient} http
   * @param {TranslateService} translate
   * @param snackbar
   */
  constructor(private http: HttpClient, private translate: TranslateService, private snackbar: SnackbarService) {
    this.lang = this.translate.currentLang.slice(0, 2);
    this.translate.onLangChange.subscribe(translations => this.lang = translations.lang.slice(0, 2));
  }

  /**
   * HTTP GET Request
   * @param {string} url
   * @param {HttpParams} params
   * @return {Promise<any>}
   */
  public async get(url: string, params?: HttpParams) {
    const headers = this.prepareRequestHeaders();
    try {
      return await this.http.get(url, {
        headers: headers,
        params: params,
        responseType: 'json',
      }).toPromise();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        return await this.handleError(e);
      }
    }
  }

  /**
   * HTTP POST request
   * @param {string} url
   * @param body
   * @param {HttpParams} params
   * @return {Promise<any>}
   */
  public async post(url: string, body: any, params?: HttpParams) {
    const headers = this.prepareRequestHeaders();
    try {
      return await this.http.post(url, JSON.stringify(body), {
        headers: headers,
        params: params,
        responseType: 'json',
      }).toPromise();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        return await this.handleError(e);
      }
    }
  }

  /**
   * HTTP PUT Request
   * @param {string} url
   * @param body
   * @param {HttpParams} params
   * @return {Promise<any>}
   */
  public async put(url: string, body: any, params?: HttpParams) {
    const headers = this.prepareRequestHeaders();
    try {
      return await this.http.put(url, JSON.stringify(body), {
        headers: headers,
        params: params,
        responseType: 'json',
      }).toPromise();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        return await this.handleError(e);
      }
    }
  }

  /**
   * HTTP DELETE Request
   * @param {string} url
   * @param {HttpParams} params
   * @return {Promise<any>}
   */
  public async delete(url: string, params?: HttpParams) {
    const headers = this.prepareRequestHeaders();
    try {
      return await this.http.delete(url, {
        headers: headers,
        params: params,
        responseType: 'json',
      }).toPromise();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        return await this.handleError(e);
      }
    }
  }

  /**
   * Prepare any request parameters here
   */
  private prepareRequestHeaders() {
    const headers = new HttpHeaders();
    return headers.append('Content-Type', 'application/json')
      .append('X-App-Language', this.lang);
  }

  /**
   * Inform the user if any error occurs
   * @returns {Promise<void>}
   */
  private async handleError(e) {
    if (e.status === 422) {
      return e.error;
    }

    const key = <string>_('Loading data failed. Please try again later. ERROR 404');
    const message = await __(key);
    this.snackbar.error(message);
    return null;
  }
}
