import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { config } from '../../../config/config';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {HttpService} from '../../shared/services/http/http.service';
import {SecureHttpService} from '../../shared/services/http/secure-http.service';
import {UserDataService} from '../../shared/services/user/user-data.service';
import {UserLoaderService} from '../../shared/services/loaders/user/user-loader.service';
import {SnackbarService} from '../../shared/services/snackbar/snackbar.service';
import {__} from '../../../functions/translation';

@Component({
  selector: 'cevi-web-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {
  public form: FormGroup;

  public genders;
  public lang: string;
  public selectedGender: string;

  /**
   * On init life cicle hook
   */
  ngOnInit() {
    this.prepareForm();
  }

  /**
   * UserInfoDialogComponent constructor
   * @param {FormBuilder} formBuilder
   * @param {MatDialogRef<UserInfoDialogComponent>} dialog
   * @param {HttpService} http
   * @param shttp
   * @param {TranslateService} translate
   * @param {UserDataService} user
   * @param userLoader
   * @param snackbar
   */
  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialogRef<UserInfoDialogComponent>,
              private http: HttpService,
              private shttp: SecureHttpService,
              private translate: TranslateService,
              private user: UserDataService,
              private userLoader: UserLoaderService,
              private snackbar: SnackbarService) {
    this.lang = this.translate.currentLang.slice(0, 2);
  }

  /**
   * Submit the form
   * @param form
   */
  async submit(form) {
    const data = form.value;
    const changes = this.getChanges(data);
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/' + this.user.id;
    const response = <any>await this.shttp.put(url, changes);
    if (response.code === 422) {
      response.info.errors.forEach((error) => {
        this.form.controls[error.field].setErrors({'specific': error.message});
      });
      return;
    }
    await this.userLoader.loadUserData();
    const key = <string>_('User updated successfully');
    this.snackbar.success(await __(key));
    this.dialog.close(true);
  }

  /**
   * Get all changes
   * @param data
   * @returns {{}}
   */
  private getChanges(data) {
    const changes = {};
    if (data.username !== this.user.username) {
      changes['username'] = data.username;
    }

    if (data.cevi_name !== this.user.cevi_name) {
      changes['cevi_name'] = data.cevi_name;
    }

    if (data.first_name !== this.user.first_name) {
      changes['first_name'] = data.first_name;
    }

    if (data.last_name !== this.user.first_name) {
      changes['last_name'] = data.last_name;
    }

    if (this.selectedGender !== this.user.gender.id) {
      changes['gender_id'] = this.selectedGender;
    }
    return changes;
  }

  /**
   * Prepare the form to display
   * @returns {Promise<void>}
   */
  private prepareForm() {
    this.form = this.formBuilder.group({
      username: [this.user.username, [Validators.minLength(3), Validators.maxLength(255), Validators.required]],
      cevi_name: [this.user.cevi_name, [Validators.minLength(3), Validators.maxLength(255)]],
      first_name: [this.user.first_name, [Validators.minLength(3), Validators.maxLength(255), Validators.required]],
      last_name: [this.user.last_name, [Validators.minLength(3), Validators.maxLength(255)]],
      gender: [this.user.gender.id, [Validators.required]],
    });
    this.loadGenders();
  }

  /**
   * Load all genders from server
   * @returns {Promise<void>}
   */
  private async loadGenders() {
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/genders';
    const response = <any>await this.http.get(url);
    if (!response) {
      return;
    }
    const data = [];
    response.genders.forEach(gender => {
      data.push({id: gender.id, name: gender['name_' + this.lang]});
    });
    this.genders = data;
    this.selectedGender = this.user.gender.id;
  }
}
