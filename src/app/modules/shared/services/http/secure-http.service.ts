import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpServiceInterface } from './HttpInterface';
import { __ } from '../../../../functions/translation';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable()
export class SecureHttpService implements HttpServiceInterface {

  private lang: string;

  /**
   * SecureHttpService constructor
   * Class to make HTTP Requests on the JWT Protected API
   * @param {HttpClient} http
   * @param {AuthService} auth
   * @param {TranslateService} translate
   * @param snackbar
   */
  constructor(private http: HttpClient, private auth: AuthService, private translate: TranslateService, private snackbar: SnackbarService) {
    this.lang = this.translate.currentLang.slice(0, 2);
    this.translate.onLangChange.subscribe(translations => this.lang = translations.lang.slice(0, 2));
  }

  /**
   * HTTP GET Request on JWT Protected API
   * @param {string} url
   * @param {HttpParams} params
   * @return {Promise<Object>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422 receiving the token
   */
  public async get(url: string, params?: HttpParams) {
    const headers = await this.prepareRequestHeaders();
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
   * HTTP POST Request on JWT Protected API
   * @param {string} url
   * @param body
   * @param {HttpParams} params
   * @return {Promise<Object>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422 receiving the token
   */
  public async post(url: string, body: any, params?: HttpParams) {
    const headers = await this.prepareRequestHeaders();
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
   * HTTP PUT Request on JWT Protected API
   * @param {string} url
   * @param body
   * @param {HttpParams} params
   * @return {Promise<Object>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422 receiving the token
   */
  public async put(url: string, body: any, params?: HttpParams) {
    const headers = await this.prepareRequestHeaders();
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
   * HTTP DELETE Request on JWT Protected API
   * @param {string} url
   * @param {HttpParams} params
   * @return {Promise<Object>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422 receiving the token
   */
  public async delete(url: string, params?: HttpParams) {
    const headers = await this.prepareRequestHeaders();
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
   * @return {Promise<void>}
   * @throws AuthenticationFailedException
   * @throws Error When there was another error than 422
   */
  private async prepareRequestHeaders() {
    const token = await this.auth.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json')
      .append('X-App-Language', this.lang)
      .append('X-Token', token);
    return headers;
  }

  /**
   * Inform the user if any error occurs
   * @returns {Promise<void>}
   */
  private async handleError(e) {
    if (e.error.code === 422) {
      return e.error;
    }

    const key = <string>_('Loading data failed. Please try again later. ERROR 404');
    const message = await __(key);
    this.snackbar.error(message);
    return null;
  }
}
