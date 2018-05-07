import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { config } from '../../../../config/config';
import { TranslateService } from '@ngx-translate/core';
import { City } from '../City';
import { MatStepper } from '@angular/material';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../../functions/translation';

@Component({
  selector: 'cevi-web-general-information-form',
  templateUrl: './general-information-form.component.html',
  styleUrls: ['./general-information-form.component.scss']
})
export class GeneralInformationFormComponent implements OnInit {

  filteredCities: BehaviorSubject<City[]>;
  @Input() generalInformationForm: FormGroup;
  @Input() stepper: MatStepper;

  private cities: City[] = [];

  /**
   * RegistrationComponent constructor
   * @param {FormBuilder} formBuilder
   * @param {HttpService} http
   * @param {TranslateService} translate
   * @param auth
   * @param snackbar
   */
  constructor(private formBuilder: FormBuilder,
              private http: HttpService,
              private translate: TranslateService,
              private auth: AuthService,
              private snackbar: SnackbarService) {
    this.getCities();
  }

  /**
   * On Init Life Cycle Hook
   */
  ngOnInit() {
    this.registerFilter();
  }

  /**
   * Display zip code in zip code input
   * @param {City} city
   * @return {number}
   */
  displayFn(city?: City) {
    return city ? city.zip : undefined;
  }

  /**
   * Set city name
   * @param city
   */
  setCity(city) {
    this.generalInformationForm.controls.city.setValue(city.name);
  }

  async continue() {
    if (!this.generalInformationForm.valid) {
      console.warn('form invalid');
      return;
    }

    const firstName = this.generalInformationForm.controls.first_name.value;
    const lastName = this.generalInformationForm.controls.last_name.value;
    let postCode = this.generalInformationForm.controls.postcode.value;
    const ceviName = this.generalInformationForm.controls.cevi_name.value;
    const username = this.generalInformationForm.controls.username.value;
    const password = this.generalInformationForm.controls.password.value;
    const email = this.generalInformationForm.controls.email.value;

    if (typeof postCode === 'object' && 'zip' in postCode) {
      postCode = postCode.zip;
    }

    const data = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      postcode: postCode,
      username: username,
      password: password,
      cevi_name: ceviName,
      language: this.translate.currentLang.slice(0, 2),
    };

    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/signup';
    const response = await <any>this.http.post(url, data);
    if (response.code === 422) {
      this.handleErrors(response.info.errors);
      return;
    }
    if (response.code === 200) {
      this.stepper.next();
      return;
    }
    const msg = <string>_('Loading failed. Please contact the Development team error@cevi-web.com');
    await this.snackbar.reportError(await __(msg), 'General Information Form Registration Z103', '1');
  }

  /**
   * Handle response errors
   * @param errors
   */
  private handleErrors(errors) {
    for (const error of errors) {
      this.generalInformationForm.controls[error.field].setErrors({'specific': error.message});
    }
  }

  /**
   * Get all cities from server
   * @return {Promise<void>}
   */
  private async getCities() {
    this.cities = [];
    const lang = this.translate.currentLang.slice(0, 2);
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/cities?limit=10000&reduced=true&lang=' + lang;
    const response = await this.http.get(url);
    if ('cities' in response) {
      response.cities.forEach((city) => {
        this.cities.push(new City(city.id, city.postcode, city.name));
      });
    }
  }

  /**
   * Register filter for zip codes
   */
  private registerFilter() {
    this.filteredCities = new BehaviorSubject<City[]>(this.cities.slice(0, 5));
    this.generalInformationForm.controls.postcode.valueChanges.subscribe((zip) => {
      const cities = zip ? this.filterCities(zip) : this.cities.slice(0, 5);
      this.filteredCities.next(cities);
    });
  }

  private filterCities(zipCode: number) {
    const zipCodeReadable = this.getReadableZip(zipCode);
    const zipCodeFactor = this.getZipCodeFactor(zipCode);
    const filteredCities = this.cities.filter(city => {
      return (city.zip <= zipCodeReadable + zipCodeFactor && city.zip >= zipCodeReadable - 2);
    });
    return filteredCities.slice(0, 5);
  }

  /**
   * Get zip code in filterable format (eg. 4300 or 4000 or 4310...)
   * @param zipCode
   * @return {any}
   */
  private getReadableZip(zipCode) {
    if (zipCode < 10) {
      return zipCode * 1000;
    }
    if (zipCode < 100) {
      return zipCode * 100;
    }
    if (zipCode < 1000) {
      return zipCode * 10;
    }
    return zipCode;
  }

  /**
   * Get zip code filter accuracy factor
   * @param zipCode
   * @return {number}
   */
  private getZipCodeFactor(zipCode) {

    if (zipCode < 10) {
      return 10000;
    }
    return 100;
  }
}
