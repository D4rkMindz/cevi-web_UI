import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    NavbarComponent,
  ],
  providers: [
    TranslateService,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule {
}
