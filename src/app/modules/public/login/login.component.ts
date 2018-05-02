import {Component} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {AuthService} from '../../shared/services/authentication/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackbarService} from '../../shared/services/snackbar/snackbar.service';
import {__} from '../../../functions/translation';
import {config} from '../../../config/config';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {CredentialsService} from '../../shared/services/authentication/credentials.service';
import {UserDataService} from '../../shared/services/user/user-data.service';
import {LocalStorageService} from '../../shared/services/storage/local-storage.service';
import {SecureHttpService} from '../../shared/services/http/secure-http.service';


export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isChecked = true;
  public username: FormControl;
  public password: FormControl;
  public staySignedIn;
  public loginFormControl;
  public matcher;
  private snapshot: ActivatedRouteSnapshot;

  /**
   * LoginComponent constructor
   * @param {AuthService} auth
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {SnackbarService} snackbar
   * @param https
   * @param credentials
   * @param user
   * @param localStorage
   */
  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private snackbar: SnackbarService,
              private https: SecureHttpService,
              private credentials: CredentialsService,
              private user: UserDataService,
              private localStorage: LocalStorageService) {
    this.snapshot = route.snapshot;
    this.loadFormComponents();
  }

  /**
   * Load form components
   */
  private loadFormComponents() {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.staySignedIn = new FormControl();

    this.loginFormControl = new FormGroup({
      username: this.username,
      password: this.password,
      staySignedIn: this.staySignedIn,
    });

    this.matcher = new LoginFormErrorStateMatcher();
  }

  /**
   * Sign user in
   * @return {Promise<void>}
   */
  public async signIn() {
    if (!this.loginFormControl.valid) {
      return;
    }

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const regex = new RegExp(emailRegex);
    const isEmail = regex.test(this.loginFormControl.controls.username.value);
    let isAuthenticated = false;
    try {
      isAuthenticated = await this.auth.authenticate(
        this.loginFormControl.controls.username.value,
        this.loginFormControl.controls.password.value,
        isEmail,
        this.loginFormControl.controls.staySignedIn.value,
      );
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.log(e);
        if (e.status === 422) {
          this.loginFormControl.controls['password'].setErrors({'incorrect': true});
          this.snackbar.error(e.error.info.message);
        }

        if (e.status !== 200 && e.status !== 422) {
          this.snackbar.error('Authentication failed: ERROR ' + e.status);
        }
      }
      console.log(e);
    }

    if (isAuthenticated) {
      await this.loadUserData();
      if (!!this.snapshot.queryParams['redirect_to']) {
        const path = decodeURIComponent(this.snapshot.queryParams['redirect_to']).split('/');
        this.router.navigate(path);
      } else {
        this.router.navigate(['home']);
      }
    }
  }

  /**
   * Load user data
   * @return {Promise<void>}
   */
  private async loadUserData() {
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/' + this.credentials.userId;
    try {
      const response = <any>await this.https.get(url);
      const user = response.user;
      this.user.fill(user);

      if (!this.credentials.username && 'username' in user) {
        this.credentials.username = user.username;
      }

      if (!this.credentials.email && 'email' in user) {
        this.credentials.email = user.email;
      }

      const data = {
        address: this.user.address,
        archived_at: this.user.archived_at,
        archived_by: this.user.archived_by,
        birthdate: this.user.birthdate,
        cevi_name: this.user.cevi_name,
        created_at: this.user.created_at,
        created_by: this.user.created_by,
        department: this.user.department,
        email: this.user.email,
        first_name: this.user.first_name,
        gender: this.user.gender,
        id: this.user.id,
        js_certificate: this.user.js_certificate,
        js_certificate_until: this.user.js_certificate_until,
        language: this.user.language,
        last_name: this.user.last_name,
        modified_at: this.user.modified_by,
        modified_by: this.user.modified_at,
        position: this.user.position,
        signup_completed: this.user.signup_completed,
        url: this.user.url,
        username: this.user.username,
      };

      await this.localStorage.setItem(config.keys.user, data);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        const key = <string>_('Loading userdata failed. Please try again later. ERROR 404');
        const message = await __(key);
        this.snackbar.error(message);
        return;
      }
    }
  }
}
