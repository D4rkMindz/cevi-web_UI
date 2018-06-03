import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../shared/services/article/Article';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../../../config/config';

@Component({
  selector: 'cevi-web-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss']
})
export class ArticleTableComponent implements OnInit, AfterViewInit {
  @Input() articles: BehaviorSubject<Article[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentLang: string = config.defaults.language.default;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'title', 'quality', 'quantity'];
  private _data: Article[] = null;

  /**
   * ArticleTableComponent constructor
   * @param {TranslateService} translate
   */
  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
      console.log('Current Lang:', this.currentLang);
      this.dataSource = new MatTableDataSource(this._data);
    });
  }

  /**
   * Apply a filter to the data
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // TODO LEVEL 2 make filter more accurate
    this.dataSource.filter = filterValue;
  }

  /**
   * On Init Life Cycle Hook
   * @returns {Promise<void>}
   */
  async ngOnInit() {
    this.dataSource = null;
    this.articles.subscribe((articles) => {
      this._data = articles;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * After View Init Life Cycle Hook
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
