import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { config } from './config/config';
import { DepartmentGuard } from './guards/department.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: './modules/public/public.module#PublicModule',
  },
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    loadChildren: './modules/articles/articles.module#ArticlesModule',
    canActivate: [AuthGuard, DepartmentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: config.defaults.routeTracing})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
