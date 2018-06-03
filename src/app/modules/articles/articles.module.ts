import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ArticleTableComponent } from './article-table/article-table.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticleEditDialogComponent } from './article-edit-dialog/article-edit-dialog.component';
import { StoragePlaceSelectionDialogComponent } from './storage-place-selection-dialog/storage-place-selection-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    NavbarModule,
    SharedModule,
  ],
  declarations: [
    ArticlesComponent,
    ArticleOverviewComponent,
    ArticleTableComponent,
    ArticleViewComponent,
    ArticleEditDialogComponent,
    StoragePlaceSelectionDialogComponent,
  ],
  entryComponents: [
    ArticleEditDialogComponent,
    StoragePlaceSelectionDialogComponent,
  ],
})
export class ArticlesModule {
}
