import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';

const HOME_ROUTES: Routes = [
  {path: '', component: FeedComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'overview', component: DashboardComponent},
];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: HOME_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
