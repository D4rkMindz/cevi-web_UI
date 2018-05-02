import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ReadableLanguageConverterService} from '../shared/services/translate/readble-language-converter.service';
import {CredentialsService} from '../shared/services/authentication/credentials.service';
import {UserDataService} from '../shared/services/user/user-data.service';
import {NavbarComponent} from './navbar/navbar.component';
import {MaterialModule} from '../../material.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule} from '@angular/router';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {SharedModule} from '../shared/shared.module';
import {AppModule} from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    NavbarComponent,
  ],
  providers: [
    TranslateService,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule {
}
