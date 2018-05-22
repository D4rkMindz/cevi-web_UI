import { Injectable } from '@angular/core';
import { config } from '../../../../config/config';
import { SecureHttpService } from '../http/secure-http.service';
import { UserDataService } from '../user/user-data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Article } from './Article';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable()
export class ArticleDataService {

  private _articles: Article[];
  private _articlesObs: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  /**
   * ArticleDataService constructor
   * @param {SecureHttpService} https
   * @param {UserDataService} user
   * @param localStorage
   */
  constructor(private https: SecureHttpService, private user: UserDataService, private localStorage: LocalStorageService) {
    this._articles = new Array<Article>();
  }

  /**
   * Load articles and return them
   * @return {Promise<Article[]>}
   */
  public async loadAndGetArticles() {
    await this.loadArticles();
    await this.saveArticles();
    return this.getArticles();
  }

  /**
   * Load all articles
   * @return {Promise<void>}
   */
  private async loadArticles() {
    this._articles = [];
    await this.loadArticlesFromStorage();
    if (this._articles.length >= 1) {
      console.log(`Loaded ${this._articles.length} articles from storage`, this._articles);
      return;
    }
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/departments/' + this.user.department.id + '/articles';
    const response = await this.https.get(url);
    response.articles.forEach((data) => {
      const article = new Article(data);
      this.addArticle(article);
    });
    console.log(`Loaded ${this._articles.length} articles`, this._articles);
  }

  /**
   * Load articles from storage
   * @return {Promise<void>}
   */
  private async loadArticlesFromStorage() {
    const articles = <any>await this.localStorage.getItem(config.keys.articles);
    if (articles) {
      articles.forEach((data) => {
        this.addArticle(new Article(data));
      });
    }
  }

  /**
   * Save all articles
   * @return {Promise<void>}
   */
  private async saveArticles() {
    const saveableArticles = [];
    this._articles.forEach((article: Article) => saveableArticles.push(article.toObject()));
    await this.localStorage.setItem(config.keys.articles, saveableArticles);
  }

  /**
   * Add article
   * @param {Article} article
   */
  public addArticle(article: Article) {
    this._articles.push(article);
    this._articlesObs.next(this._articles);
  }

  /**
   * Get articles
   * @return {Article[]} all Articles
   */
  public getArticles() {
    return this._articles;
  }
}
