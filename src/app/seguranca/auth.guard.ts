import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.auth.isAccessTokenInValid) {
        return this.auth.obterAccessToken()
          .then(() => {
            if (this.auth.isAccessTokenInValid()) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });
      } else if (next.data.roles && !this.auth.temQualquerPermssao(next.data.roles)) {
        this.router.navigate(['/nao-autorizado'])
        return false;
      }
    return true;
  }
}
