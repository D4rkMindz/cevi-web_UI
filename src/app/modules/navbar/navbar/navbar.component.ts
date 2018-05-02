import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { config } from '../../../config/config';
import { TranslateService } from '@ngx-translate/core';
import { ReadableLanguageConverterService } from '../../shared/services/translate/readble-language-converter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CredentialsService } from '../../shared/services/authentication/credentials.service';
import { UserDataService } from '../../shared/services/user/user-data.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public appName = config.appName;
  public mobileQuery: MediaQueryList;
  public lang = 'de';
  public readableLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('n/a');
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              protected router: Router,
              private translate: TranslateService,
              private readableLang: ReadableLanguageConverterService,
              public credentials: CredentialsService,
              public user: UserDataService) {
    this.registerMobileQuery();
    this.setReadableLanguage();
  }

  /**
   * Change language to specific one
   * @param {string} language
   */
  public changeLanguageTo(language: string) {
    this.router.navigate([], {queryParams: {lang: language}});
  }

  /**
   * Toggle sidenav
   */
  public toggle() {
    this.sidenav.toggle();
  }

  /**
   * Close sidenav
   */
  public close() {
    this.sidenav.close();
  }

  /**
   * Register mobile query for screen width
   */
  private registerMobileQuery() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      return this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private setReadableLanguage() {
    const currentLang = this.translate.currentLang;
    const langs = (<string>currentLang).slice(0, 2);
    this.readableLang.getReadbleLanguage(langs)
      .then(readableLang => this.readableLanguage.next(readableLang));
    this.translate.onLangChange.subscribe(translations => {
      const lang = translations.lang.slice(0, 2);

      if (!config.defaults.language.availableLanguages.includes(lang)) {
        return;
      }

      this.readableLang.getReadbleLanguage(lang).then(readableLang => this.readableLanguage.next(readableLang));
    });
  }
}
