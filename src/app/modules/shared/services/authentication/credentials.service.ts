import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Moment } from 'moment';

@Injectable()
export class CredentialsService {

  private _usernameObs: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _username = null;

  get username(): any {
    return this._username;
  }

  set username(value: any) {
    this._usernameObs.next(value);
    this._username = value;
  }

  private _password = null;

  get password(): any {
    return this._password;
  }

  set password(value: any) {
    this._password = value;
  }

  private _email = null;

  get email(): any {
    return this._email;
  }

  set email(value: any) {
    this._email = value;
  }

  private _expiresAt: Moment;

  get expiresAt(): Moment {
    return this._expiresAt;
  }

  set expiresAt(value: Moment) {
    this._expiresAt = value;
  }

  private _token = null;

  get token(): any {
    return this._token;
  }

  set token(value: any) {
    this._token = value;
  }

  private _userId = null;

  get userId(): any {
    return this._userId;
  }

  set userId(value: any) {
    this._userId = value;
  }

  public clear() {
    this.username = null;
    this.password = null;
    this.email = null;
    this.expiresAt = null;
    this.token = null;
  }

  public getUsernameAsObservable() {
    return this._usernameObs.asObservable();
  }

  public isExpired() {
    if (!this.token || !this.expiresAt) {
      return true;
    }

    return this.expiresAt.valueOf() <= new Date(Date.now()).valueOf();
  }

  public hasCredentials() {
    return !!((!!this.username || !!this.email) && this.password);
  }
}
