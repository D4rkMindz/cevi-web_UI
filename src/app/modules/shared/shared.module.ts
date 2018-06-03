import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { CredentialsService } from './services/authentication/credentials.service';
import { TokenAuthService } from './services/authentication/token-auth.service';
import { HttpService } from './services/http/http.service';
import { SecureHttpService } from './services/http/secure-http.service';
import { UserLoaderService } from './services/loaders/user/user-loader.service';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { LocalStorageService } from './services/storage/local-storage.service';
import { ReadableLanguageConverterService } from './services/translate/readble-language-converter.service';
import { UserDataService } from './services/user/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgForageModule } from 'ngforage';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleDataService } from './services/article/article-data.service';
import { CdkTableModule } from '@angular/cdk/table';
import { MomentModule } from 'ngx-moment';
import { MomentPipe } from './pipes/moment/moment.pipe';
import { GenderService } from './services/gender/gender.service';
import { MatEditorComponent } from './components/mat-editor/mat-editor.component';
import { TrumbowygNgxModule } from 'trumbowyg-ngx';
import { QualityLevelService } from './services/quality/quality-level.service';
import { StorageLocationService } from './services/storage-location/storage-location.service';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    HttpClientModule,
    NgForageModule.forRoot(),
    TranslateModule,
    NgProgressHttpModule,
    NgProgressModule.forRoot({
      spinner: false,
      thick: true,
      meteor: true,
      color: '#E3002D',
    }),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MomentModule,
    TrumbowygNgxModule.withConfig({
      svgPath: 'assets/ui/icons.svg',
      autogrow: false,
      autogrowOnEnter: false,
      removeformatPasted: false,
      resetCss: true,
      btns: [
        ['undo', 'redo'],
        ['formatting'],
        ['strong', 'em', 'del'],
        ['link'],
        ['insertImage'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
      ],
    }),
  ],
  exports: [
    CdkTableModule,
    HttpClientModule,
    FlexLayoutModule,
    NgForageModule,
    NgProgressModule,
    NgProgressHttpModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MomentModule,
    MomentPipe,
    MatEditorComponent,
    TrumbowygNgxModule,
  ],
  declarations: [
    MomentPipe,
    MatEditorComponent,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ArticleDataService,
        AuthService,
        CredentialsService,
        TokenAuthService,
        HttpService,
        SecureHttpService,
        UserLoaderService,
        SnackbarService,
        LocalStorageService,
        ReadableLanguageConverterService,
        UserDataService,
        GenderService,
        QualityLevelService,
        StorageLocationService,
      ],
    };
  }
}
