import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRouting');
  }
}
