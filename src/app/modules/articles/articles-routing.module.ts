import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';

const ARTICLES_ROUTES: Routes =  [
  {path: '', component: ArticleOverviewComponent},
  // {path: ':id'},
];

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: ARTICLES_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
