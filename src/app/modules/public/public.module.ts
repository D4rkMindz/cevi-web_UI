import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HelloComponent } from './hello/hello.component';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { GeneralInformationFormComponent } from './registration/general-information-form/general-information-form.component';
import { VerifyComponent } from './registration/verify/verify.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule,
  ],
  declarations: [
    HelloComponent,
    LoginComponent,
    LogoutComponent,
    PublicComponent,
    RegistrationComponent,
    GeneralInformationFormComponent,
    VerifyComponent,
  ]
})
export class PublicModule {
}
