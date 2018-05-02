import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {ProfileComponent} from './profile/profile.component';

const USER_ROUTES: Routes = [
  {path: 'profile', component: ProfileComponent},
];

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: USER_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
