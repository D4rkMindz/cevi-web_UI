import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'cevi-web-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  generalInformationForm: FormGroup;
  zip_code: FormControl = new FormControl('4313', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);


  constructor(private formBuilder: FormBuilder) {
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
}
