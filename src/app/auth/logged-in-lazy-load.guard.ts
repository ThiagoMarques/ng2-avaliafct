import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/auth.service';
import { navItems, userItems } from '../_nav';

@Injectable({
  providedIn: 'root'
})
export class LoggedInLazyLoadGuard implements CanActivate {
  navItems = navItems;

  constructor(private router: Router, private authService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (currentUser) {
        if (route.data.roles && route.data.roles.indexOf(currentUser.ds_perfil) === -1) {
            this.router.navigate(['/consultas']);
            return false;
        }
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
