import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicComponent} from './public/public.component';
import {HelloComponent} from './hello/hello.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

const PUBLIC_ROUTES: Routes = [
  {path: 'hello', component: HelloComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
];

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: PUBLIC_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
