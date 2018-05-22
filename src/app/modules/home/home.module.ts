import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    FeedComponent,
  ]
})
export class HomeModule {
}
