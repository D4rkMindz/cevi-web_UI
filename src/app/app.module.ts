import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BootstrapService } from './services/bootstrap/bootstrap.service';
import { NgForageConfig } from 'ngforage';
import { config } from './config/config';
import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DepartmentGuard } from './guards/department.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    DepartmentGuard,
    BootstrapService,
    {
      provide: APP_INITIALIZER,
      useFactory: queryParamReaderFactory,
      deps: [BootstrapService],
      multi: true, // run many at the time
    },
    {
      provide: APP_INITIALIZER,
      useFactory: dataLoaderFactory,
      deps: [BootstrapService],
      multi: true, // run many at the time
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private ngForageConfig: NgForageConfig) {
    this.ngForageConfig.configure({
      name: config.appName,
      driver: [
        NgForageConfig.DRIVER_INDEXEDDB,
        NgForageConfig.DRIVER_LOCALSTORAGE,
      ],
    });
  }
}

/**
 * Translation String HTTP loader factory
 * @param {HttpClient} http
 * @return {TranslateHttpLoader}
 */
export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/locale/', '.json');
}

/**
 * Get query param reader factory
 * @param {BootstrapService} bootstrap
 * @return {() => undefined}
 */
export function queryParamReaderFactory(bootstrap: BootstrapService) {
  return () => bootstrap.readLanguageQueryParam();
}

/**
 * User credential loader factory to load them from the local storage
 * @param {BootstrapService} bootstrap
 * @return {() => Promise<undefined>}
 */
export function dataLoaderFactory(bootstrap: BootstrapService) {
  return () => bootstrap.loadDataFromStorage();
}
