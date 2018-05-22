import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ArticleTableComponent } from './article-table/article-table.component';

@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    NavbarModule,
    SharedModule,
  ],
  declarations: [ArticlesComponent, ArticleOverviewComponent, ArticleTableComponent]
})
export class ArticlesModule { }
