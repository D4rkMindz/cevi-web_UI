import { Injectable } from '@angular/core';
import { toDate } from '../../../../functions/to-date';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../storage/local-storage.service';
import { config } from '../../../../config/config';

@Injectable()
export class UserDataService {

  constructor(private localStorage: LocalStorageService) {
  }

  /**
   * Department entity
   */
  private _department: { id: string, name: string };

  get department(): { id: string; name: string } {
    return this._department;
  }

  set department(value: { id: string; name: string }) {
    this._departmentObs.next(value);
    this._department = value;
  }

  private _departmentObs: BehaviorSubject<{
    id: string, name: string
  }> = new BehaviorSubject<{
    id: string, name: string
  }>({
    id: null,
    name: null,
  });

  get departmentObs(): BehaviorSubject<{ id: string; name: string }> {
    return this._departmentObs;
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  /**
   * Position entity
   */
  private _position: { id: string, name_de: string, name_en: string, name_fr: string, name_it: string };

  get position(): { id: string; name_de: string; name_en: string; name_fr: string; name_it: string } {
    return this._position;
  }

  set position(value: { id: string; name_de: string; name_en: string; name_fr: string; name_it: string }) {
    this._positionObs.next(value);
    this._position = value;
  }

  private _positionObs: BehaviorSubject<{
    id: string, name_de: string, name_en: string, name_fr: string, name_it: string
  }> = new BehaviorSubject<{
    id: string, name_de: string, name_en: string, name_fr: string, name_it: string
  }>({
    id: null,
    name_de: null,
    name_en: null,
    name_fr: null,
    name_it: null,
  });

  get positionObs(): BehaviorSubject<{ id: string; name_de: string; name_en: string; name_fr: string; name_it: string }> {
    return this._positionObs;
  }

  /**
   * First name entity
   */
  private _first_name: string;

  get first_name(): string {
    return this._first_name;
  }

  set first_name(value: string) {
    this._first_nameObs.next(value);
    this._first_name = value;
  }

  private _first_nameObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get first_nameObs(): BehaviorSubject<string> {
    return this._first_nameObs;
  }

  /**
   * Last name entity
   */
  private _last_name: string;

  get last_name(): string {
    return this._last_name;
  }

  set last_name(value: string) {
    this._last_nameObs.next(value);
    this._last_name = value;
  }

  private _last_nameObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get last_nameObs(): BehaviorSubject<string> {
    return this._last_nameObs;
  }

  /**
   * Cevi name entity
   */
  private _cevi_name: string;

  get cevi_name(): string {
    return this._cevi_name;
  }

  set cevi_name(value: string) {
    this._cevi_nameObs.next(value);
    this._cevi_name = value;
  }

  private _cevi_nameObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get cevi_nameObs(): BehaviorSubject<string> {
    return this._cevi_nameObs;
  }

  /**
   * Email entity
   */
  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._emailObs.next(value);
    this._email = value;
  }

  private _emailObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get emailObs(): BehaviorSubject<string> {
    return this._emailObs;
  }

  /**
   * Gender entity
   */
  private _gender: { id: string, name_de: string, name_en: string, name_fr: string, name_it: string };

  get gender(): { id: string; name_de: string; name_en: string; name_fr: string; name_it: string } {
    return this._gender;
  }

  set gender(value: { id: string; name_de: string; name_en: string; name_fr: string; name_it: string }) {
    this._genderObs.next(value);
    this._gender = value;
  }

  private _genderObs: BehaviorSubject<{
    id: string, name_de: string, name_en: string, name_fr: string, name_it: string
  }> = new BehaviorSubject<{
    id: string, name_de: string, name_en: string, name_fr: string, name_it: string
  }>({
    id: null,
    name_de: null,
    name_en: null,
    name_fr: null,
    name_it: null,
  });

  get genderObs(): BehaviorSubject<{ id: string; name_de: string; name_en: string; name_fr: string; name_it: string }> {
    return this._genderObs;
  }

  /**
   * Language entity
   */
  private _language: { full_name: string, abbreviation: string };

  get language(): { full_name: string; abbreviation: string } {
    return this._language;
  }

  set language(value: { full_name: string; abbreviation: string }) {
    this._languageObs.next(value);
    this._language = value;
  }

  private _languageObs: BehaviorSubject<{
    full_name: string, abbreviation: string
  }> = new BehaviorSubject<{
    full_name: string, abbreviation: string
  }>({
    full_name: null,
    abbreviation: null,
  });

  get languageObs(): BehaviorSubject<{ full_name: string; abbreviation: string }> {
    return this._languageObs;
  }

  /**
   * Username entity
   */
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._usernameObs.next(value);
    this._username = value;
  }

  private _usernameObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get usernameObs(): BehaviorSubject<string> {
    return this._usernameObs;
  }

  /**
   * Address entity
   */
  private _address: {
    city: { id: string, name_de: string, name_en: string, name_fr: string, name_it: string }, street: string
  };

  get address(): { city: { id: string; name_de: string; name_en: string; name_fr: string; name_it: string }; street: string } {
    return this._address;
  }

  set address(value: { city: { id: string; name_de: string; name_en: string; name_fr: string; name_it: string }; street: string }) {
    this._addressObs.next(value);
    this._address = value;
  }

  private _addressObs: BehaviorSubject<{
    city: { id: string, name_de: string, name_en: string, name_fr: string, name_it: string }, street: string
  }> = new BehaviorSubject<{
    city: { id: string, name_de: string, name_en: string, name_fr: string, name_it: string }, street: string
  }>({
    city: {
      id: null,
      name_de: null,
      name_en: null,
      name_fr: null,
      name_it: null,
    }, street: null,
  });

  get addressObs(): BehaviorSubject<{
    city: { id: string; name_de: string; name_en: string; name_fr: string; name_it: string };
    street: string
  }> {
    return this._addressObs;
  }

  /**
   * Birthdate entity
   */
  private _birthdate: Date;

  get birthdate(): Date {
    return this._birthdate;
  }

  set birthdate(value: Date) {
    this._birthdateObs.next(value);
    this._birthdate = value;
  }

  private _birthdateObs: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  get birthdateObs(): BehaviorSubject<Date> {
    return this._birthdateObs;
  }

  /**
   * JS certificate entity
   */
  private _js_certificate: boolean;

  get js_certificate(): boolean {
    return this._js_certificate;
  }

  set js_certificate(value: boolean) {
    this._js_certificateObs.next(value);
    this._js_certificate = value;
  }

  private _js_certificateObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get js_certificateObs(): BehaviorSubject<boolean> {
    return this._js_certificateObs;
  }

  private _js_certificate_until: number;

  get js_certificate_until(): number {
    return this._js_certificate_until;
  }

  set js_certificate_until(value: number) {
    this._js_certificate_untilObs.next(value);
    this._js_certificate_until = value;
  }

  private _js_certificate_untilObs: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  get js_certificate_untilObs(): BehaviorSubject<number> {
    return this._js_certificate_untilObs;
  }

  /**
   * Meta entities
   */
  private _signup_completed: boolean;

  get signup_completed(): boolean {
    return this._signup_completed;
  }

  set signup_completed(value: boolean) {
    this._signup_completedObs.next(value);
    this._signup_completed = value;
  }

  private _signup_completedObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get signup_completedObs(): BehaviorSubject<boolean> {
    return this._signup_completedObs;
  }

  private _created_at: Date;

  get created_at(): Date {
    return this._created_at;
  }

  set created_at(value: Date) {
    this._created_atObs.next(value);
    this._created_at = value;
  }

  private _created_atObs: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  get created_atObs(): BehaviorSubject<Date> {
    return this._created_atObs;
  }

  private _created_by: string;

  get created_by(): string {
    return this._created_by;
  }

  set created_by(value: string) {
    this._created_byObs.next(value);
    this._created_by = value;
  }

  private _created_byObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get created_byObs(): BehaviorSubject<string> {
    return this._created_byObs;
  }

  private _modified_at: Date;

  get modified_at(): Date {
    return this._modified_at;
  }

  set modified_at(value: Date) {
    this._modified_atObs.next(value);
    this._modified_at = value;
  }

  private _modified_atObs: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  get modified_atObs(): BehaviorSubject<Date> {
    return this._modified_atObs;
  }

  private _modified_by: string;

  get modified_by(): string {
    return this._modified_by;
  }

  set modified_by(value: string) {
    this._modified_byObs.next(value);
    this._modified_by = value;
  }

  private _modified_byObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get modified_byObs(): BehaviorSubject<string> {
    return this._modified_byObs;
  }

  private _archived_at: Date;

  get archived_at(): Date {
    return this._archived_at;
  }

  set archived_at(value: Date) {
    this._archived_atObs.next(value);
    this._archived_at = value;
  }

  private _archived_atObs: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  get archived_atObs(): BehaviorSubject<Date> {
    return this._archived_atObs;
  }

  private _archived_by: string;

  get archived_by(): string {
    return this._archived_by;
  }

  set archived_by(value: string) {
    this._archived_byObs.next(value);
    this._archived_by = value;
  }

  private _archived_byObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get archived_byObs(): BehaviorSubject<string> {
    return this._archived_byObs;
  }

  private _url: string;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._urlObs.next(value);
    this._url = value;
  }

  private _urlObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get urlObs(): BehaviorSubject<string> {
    return this._urlObs;
  }

  private _email_confirmed: boolean;

  get email_confirmed(): boolean {
    return this._email_confirmed;
  }

  set email_confirmed(value: boolean) {
    this._email_confirmed = value;
  }

  public fill(user) {
    if (!user) {
      return;
    }
    this.extractAddress(user);
    this.extractInfo(user);
    this.extractMetadata(user);
    this.extractDepartment(user);
    this.extractGender(user);
    this.extractLanguage(user);
    this.extractEssentials(user);
    this.extractPosition(user);
    this.save();
  }

  public save() {
    const data = {
      address: this.address,
      archived_at: this.archived_at,
      archived_by: this.archived_by,
      birthdate: this.birthdate,
      cevi_name: this.cevi_name,
      created_at: this.created_at,
      created_by: this.created_by,
      department: this.department,
      email: this.email,
      first_name: this.first_name,
      gender: this.gender,
      id: this.id,
      js_certificate: this.js_certificate,
      js_certificate_until: this.js_certificate_until,
      language: this.language,
      last_name: this.last_name,
      modified_at: this.modified_by,
      modified_by: this.modified_at,
      position: this.position,
      signup_completed: this.signup_completed,
      email_confirmed: this.email_confirmed,
      url: this.url,
      username: this.username,
    };
    this.localStorage.setItem(config.keys.user, data);
  }

  public clear() {
    this.id = null;
    this.address = null;
    this.archived_at = null;
    this.archived_by = null;
    this.birthdate = null;
    this.cevi_name = null;
    this.created_at = null;
    this.created_by = null;
    this.department = null;
    this.email = null;
    this.first_name = null;
    this.gender = null;
    this.js_certificate = null;
    this.js_certificate_until = null;
    this.language = null;
    this.last_name = null;
    this.modified_at = null;
    this.modified_by = null;
    this.position = null;
    this.signup_completed = null;
    this.url = null;
    this.username = null;
  }

  private extractEssentials(user) {
    if ('email' in user) {
      this.email = user.email;
    }

    if ('id' in user) {
      this.id = user.id;
    }

    if ('last_name' in user) {
      this.last_name = user.last_name;
    }

    if ('first_name' in user) {
      this.first_name = user.first_name;
    }

    if ('username' in user) {
      this.username = user.username;
    }
  }

  private extractInfo(user) {
    if ('birthdate' in user) {
      this.birthdate = toDate(user.birthdate);
    }

    if ('cevi_name' in user) {
      this.cevi_name = user.cevi_name;
    }

    if ('js_certificate' in user) {
      this.js_certificate = user.js_certificate;
    }

    if ('js_certificate_until' in user) {
      this.js_certificate_until = user.js_certificate_until;
    }
    if ('signup_completed' in user) {
      this.signup_completed = user.signup_completed;
    }

    if ('email_confirmed' in user) {
      this.email_confirmed = user.email_confirmed;
    }

    if ('url' in user) {
      this.url = user.url;
    }
  }

  private extractPosition(user) {
    const position = {id: null, name_de: null, name_en: null, name_fr: null, name_it: null};
    if ('position' in user) {
      const userPosition = user.position;
      if ('id' in userPosition) {
        position.id = userPosition.id;
      }
      if ('name_de' in userPosition) {
        position.name_de = userPosition.name_de;
      }
      if ('name_en' in userPosition) {
        position.name_en = userPosition.name_en;
      }
      if ('name_fr' in userPosition) {
        position.name_fr = userPosition.name_fr;
      }
      if ('name_it' in userPosition) {
        position.name_it = userPosition.name_it;
      }
    }
    this.position = position;
  }

  private extractLanguage(user) {
    const language = {abbreviation: null, full_name: null};
    if ('language' in user) {
      const userLanguage = user.language;
      if ('abbreviation' in userLanguage) {
        language.abbreviation = userLanguage.abbreviation;
      }
      if ('full_name' in userLanguage) {
        language.full_name = userLanguage.full_name;
      }
    }
    this.language = language;
  }

  private extractGender(user) {
    const gender = {id: null, name_de: null, name_en: null, name_fr: null, name_it: null};
    if ('gender' in user) {
      const userGender = user.gender;
      if ('id' in userGender) {
        gender.id = userGender.id;
      }
      if ('name_de' in userGender) {
        gender.name_de = userGender.name_de;
      }
      if ('name_en' in userGender) {
        gender.name_en = userGender.name_en;
      }
      if ('name_fr' in userGender) {
        gender.name_fr = userGender.name_fr;
      }
      if ('name_it' in userGender) {
        gender.name_it = userGender.name_it;
      }
    }
    this.gender = gender;
  }

  private extractDepartment(user) {
    const department = {id: null, name: null};
    if ('department' in user) {
      const userDepartment = user.department;
      if ('id' in userDepartment) {
        department.id = userDepartment.id;
      }
      if ('name' in userDepartment) {
        department.name = userDepartment.name;
      }
    }
    this.department = department;
  }

  private extractMetadata(user) {
    if (!!user.created_at) {
      this.created_at = toDate(user.created_at);
    }

    if (!!user.created_by) {
      this.created_by = user.created_by;
    }

    if (!!user.modified_at) {
      this.modified_at = toDate(user.modified_at);
    }

    if (!!user.modified_by) {
      this.modified_by = user.modified_by;
    }

    if (!!user.archived_at) {
      this.archived_at = toDate(user.archived_at);
    }

    if (!!user.archchived_by) {
      this.archived_by = user.a_rchived_by;
    }
  }

  /**
   * Extract the users address object
   * @param user
   */
  private extractAddress(user) {
    const address = {city: {id: null, name_de: null, name_en: null, name_fr: null, name_it: null}, street: null};

    if ('address' in user) {
      const userAdress = user.address;
      if ('street' in userAdress) {
        address.street = userAdress.street;
      }
      if ('city' in address) {
        const userCity = user.address.city;
        if ('id' in userCity) {
          address.city.id = userCity.id;
        }
        if ('name_de' in userCity) {
          address.city.name_de = userCity.name_de;
        }
        if ('name_en' in userCity) {
          address.city.name_en = userCity.name_en;
        }
        if ('name_fr' in userCity) {
          address.city.name_fr = userCity.name_fr;
        }
        if ('name_it' in userCity) {
          address.city.name_it = userCity.name_it;
        }
      }
    }
    this.address = address;
  }
}
