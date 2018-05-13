import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../../shared/services/authentication/credentials.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cevi-web-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  generalInformationForm: FormGroup;
  zip_code: FormControl = new FormControl('4313', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);


  constructor(private formBuilder: FormBuilder,
              private credentials: CredentialsService,
              private auth: AuthService,
              private snackbar: SnackbarService,
              private router: Router) {
  }

  ngOnInit() {
    this.generalInformationForm = this.formBuilder.group({
      first_name: ['Björn', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      last_name: ['Pfoster', [Validators.minLength(2), Validators.maxLength(255)]],
      cevi_name: ['Jupiter', [Validators.minLength(2), Validators.maxLength(255)]],
      email: ['bjoern.pfoster@gmail.com', [Validators.required, Validators.minLength(5)]],
      username: ['bjoern', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      password: ['Asdf1234', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]
      ],
      postcode: this.zip_code,
      city: ['Möhlin', [Validators.required, Validators.minLength(2)]],
    });
  }

  public async login() {
    let isAuthenticated = false;
    try {
      isAuthenticated = await this.auth.authenticate(
        this.generalInformationForm.controls['username'].value,
        this.generalInformationForm.controls['password'].value,
        false,
        true,
      );
      if (isAuthenticated) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status !== 200 && e.status !== 422) {
          this.snackbar.error('Authentication failed: ERROR ' + e.status);
        }
      }
      console.log(e);
    }
  }
}
