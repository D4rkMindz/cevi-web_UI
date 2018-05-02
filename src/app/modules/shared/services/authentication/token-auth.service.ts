import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CredentialsService } from './credentials.service';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../../../../config/config';
import { AuthenticationFailedException } from './exceptions/authentication.failed.exception';

@Injectable()
export class TokenAuthService {

  private language: string;

  /**
   * TokenAuthService constructor
   * @param {HttpClient} http
   * @param {CredentialsService} credentials
   * @param {TranslateService} translate
   */
  constructor(private http: HttpClient, private credentials: CredentialsService, private translate: TranslateService) {
    this.translate.onLangChange.subscribe(translations => this.language = translations.lang.slice(0, 2));
  }

  /**
   * Get token
   * @return {Promise<void>}
   */
  public async loadToken() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')
      .set('X-App-Language', this.language);

    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/auth';
    const username = this.credentials.username || this.credentials.email;
    const body = JSON.stringify({username: username, password: this.credentials.password});
    const response = <any>await this.http.post(url, body).toPromise();

    this.credentials.token = response.token;
    this.credentials.userId = response.user_id;
    this.credentials.expiresAt = new Date(response.expires_at);
  }

}
