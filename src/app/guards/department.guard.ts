import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from '../modules/shared/services/user/user-data.service';
import { SnackbarService } from '../modules/shared/services/snackbar/snackbar.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../functions/translation';

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(private user: UserDataService, private router: Router, private snackbar: SnackbarService) {
  }

  async canActivate(next: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Promise<boolean> {
    // Ensure that the user is registered in any department
    if (this.user.department && this.user.department.id) {
      return true;
    }

    const messageKey = <string>_('Please register at a department first');
    this.snackbar.error(await __(messageKey));
    this.router.navigate(['home']);
    return false;
  }
}
