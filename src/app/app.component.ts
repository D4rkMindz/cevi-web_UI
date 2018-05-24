import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from './config/config';
import { injector } from './services/injector';
import * as moment from 'moment';

@Component({
  selector: 'cevi-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * AppComponent constructor
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {ActivatedRoute} activatedRoute
   * @param injectr
   */
  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute, private injectr: Injector) {
    injector(this.injectr);
    this.registerQueryParamChanges();
  }

  /**
   * Register language change via url query param
   */
  private registerQueryParamChanges() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let lang = params['lang'];
      const current = this.translate.currentLang;

      // check if language query param is not set and the current language was already defined in Bootstrap service
      if (!lang && current) {
        return;
      }
      if (lang === current && !!current) {
        return;
      }

      if (!lang) {
        lang = this.translate.getBrowserLang().slice(0, 2);
      }

      if (config.defaults.language.availableLanguages.includes(lang)) {
        // use browser language
        this.translate.use(lang);
        console.log(`setting language to ${lang}`);
      } else {
        // use default language
        this.translate.use(config.defaults.language.default);
        console.log(`setting language to ${config.defaults.language.default}`);
      }
    });
  }
}
