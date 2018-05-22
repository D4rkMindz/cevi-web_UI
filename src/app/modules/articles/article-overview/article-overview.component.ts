import { Component, OnInit } from '@angular/core';
import { ArticleDataService } from '../../shared/services/article/article-data.service';
import { Article } from '../../shared/services/article/Article';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'cevi-web-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent implements OnInit {

  articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  constructor(private dataService: ArticleDataService) {
    this.loadArticles();
  }

  ngOnInit() {
  }

  private async loadArticles() {
    const articles = await this.dataService.loadAndGetArticles();
    this.articles.next(articles);
  }
}
