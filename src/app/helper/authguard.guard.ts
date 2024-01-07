import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router, private autheticatedService: AuthenticationServiceService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUser = this.autheticatedService.currentUserValue;

    if (currentUser) {

      //this.router.navigate(['/account']);
      return true;

    } else {

      // this.router.navigate(['/login']);
      return false;

    }
  }
}
