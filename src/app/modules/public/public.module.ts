import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {HelloComponent} from './hello/hello.component';
import {PublicComponent} from './public/public.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    // AppModule,
    CommonModule,
    // FlexLayoutModule,
    SharedModule,
    // MaterialModule,
    // HttpClientModule,
    // CommonModule,
    PublicRoutingModule,
    // TranslateModule,
  ],
  // providers: [
  //   TranslateService,
  // ],
  declarations: [
    HelloComponent,
    LoginComponent,
    LogoutComponent,
    PublicComponent,
  ]
})
export class PublicModule {
}
