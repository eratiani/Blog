import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../core/service/authentication.service';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private localStorageS: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return (
      this.localStorageS.getItem('isLoggedIn') ||
      this.authService.isAuthenticated().pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            return true;
          } else {
            return this.router.createUrlTree(['/Home']);
          }
        })
      )
    );
  }
}
