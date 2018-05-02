import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CredentialsService {

  private _username = null;
  private _password = null;
  private _email = null;
  private _expiresAt: Date;
  private _token = null;
  private _userId = null;
  private _usernameObs: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get userId(): any {
    return this._userId;
  }

  set userId(value: any) {
    this._userId = value;
  }

  get token(): any {
    return this._token;
  }

  set token(value: any) {
    this._token = value;
  }

  get email(): any {
    return this._email;
  }

  set email(value: any) {
    this._email = value;
  }

  get password(): any {
    return this._password;
  }

  set password(value: any) {
    this._password = value;
  }

  get username(): any {
    return this._username;
  }

  set username(value: any) {
    this._usernameObs.next(value);
    this._username = value;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  set expiresAt(value: Date) {
    this._expiresAt = value;
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
