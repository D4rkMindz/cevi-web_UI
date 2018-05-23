import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/services/article/Article';
import { ArticleDataService } from '../../shared/services/article/article-data.service';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../functions/translation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../../../config/config';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'cevi-web-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {

  isLoaded = false;
  mobileQuery: MediaQueryList;
  article: Article;
  articleTitleObs: BehaviorSubject<string> = new BehaviorSubject<string>('');
  articleDescriptionPlainObs: BehaviorSubject<string> = new BehaviorSubject<string>('');
  articleDescriptionParsedObs: BehaviorSubject<string> = new BehaviorSubject<string>('');
  articleQualityObs: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private currentLang: string = config.defaults.language.default;
  private articleId;
  private _mobileQueryListener: () => void;

  /**
   * ArticleViewComponent constructor
   * @param {ActivatedRouteSnapshot} route
   * @param {ArticleDataService} articleData
   * @param {SnackbarService} snackbar
   * @param translate
   * @param {Router} router
   * @param changeDetectorRef
   * @param media
   */
  constructor(private route: ActivatedRoute,
              private articleData: ArticleDataService,
              private snackbar: SnackbarService,
              private translate: TranslateService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
    this.registerMobileQuery();
    this.articleId = route.snapshot.params['id'];
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((current) => {
      this.currentLang = current.lang;
      this.articleTitleObs.next(this.article.title['name_' + this.currentLang]);
      this.articleDescriptionPlainObs.next(this.article.description['name_' + this.currentLang].plain);
      this.articleDescriptionParsedObs.next(this.article.description['name_' + this.currentLang].parsed);
      this.articleQualityObs.next(this.article.quality.name['name_' + this.currentLang]);
    });
  }

  /**
   * On Init Life Cycle Hook
   */
  async ngOnInit() {
    const articles = await this.articleData.loadAndGetArticles();
    this.isLoaded = true;
    let isAvailable = false;
    for (const article of articles) {
      if (article.id === this.articleId) {
        this.article = article;
        isAvailable = true;
        break;
      }
    }
    if (!isAvailable) {
      const key = <string>_('Article not available');
      this.snackbar.error(await __(key));
      return this.router.navigate(['articles']);
    }
    this.articleTitleObs.next(this.article.title['name_' + this.currentLang]);
    this.articleDescriptionPlainObs.next(this.article.description['name_' + this.currentLang].plain);
    this.articleDescriptionParsedObs.next(this.article.description['name_' + this.currentLang].parsed);
    this.articleQualityObs.next(this.article.quality.name['name_' + this.currentLang]);
  }

  /**
   * Register mobile query
   */
  private registerMobileQuery() {
    this.mobileQuery = this.media.matchMedia('(max-width: 750px)');
    this._mobileQueryListener = () => {
      return this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
}
