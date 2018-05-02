import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/shared/services/authentication/auth.service';
import { config } from '../config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      const requestedRoute = state.url;
      if (!requestedRoute) {
        this.router.navigate(['login']);
        return false;
      }

      let routeSmells = false;
      config.defaults.routes.excluded_in_redirect_to.forEach((route) => {
        if (requestedRoute.toLocaleLowerCase().indexOf(route) >= 0) {
          routeSmells = true;
        }
      });

      if (!routeSmells) {
        const redirectTo = encodeURIComponent(requestedRoute);
        this.router.navigate(['login'], {queryParams: {redirect_to: redirectTo}});
      } else {
        this.router.navigate(['login']);
      }
    }

    return true;
  }
}
