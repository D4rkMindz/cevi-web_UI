import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarModule } from '../navbar/navbar.module';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    UserInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule,
    UserRoutingModule,
  ],
  providers: [],
  entryComponents: [UserInfoDialogComponent],
})
export class UserModule {
}
