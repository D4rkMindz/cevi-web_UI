import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user/user.component';
import {ProfileComponent} from './profile/profile.component';
import {NavbarModule} from '../navbar/navbar.module';
import {UserInfoDialogComponent} from './user-info-dialog/user-info-dialog.component';
import {AppModule} from '../../app.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    UserInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    // MaterialModule,
    SharedModule,
    NavbarModule,
    // AppModule,
    UserRoutingModule,
  ],
  providers: [],
  entryComponents: [UserInfoDialogComponent],
})
export class UserModule {
}
