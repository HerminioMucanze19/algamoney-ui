import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  logoutUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(`${this.logoutUrl}`, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.removerAccessToken();
      });
  }


}
