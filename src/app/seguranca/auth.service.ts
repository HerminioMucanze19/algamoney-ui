import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';

import { Usuario } from '../core/model';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.carregarToken();
  }

  login(usuario: Usuario): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario.email}&password=${usuario.senha}&grant_type=password`;

    return this.http.post(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();
          if (responseJson.error = 'invalid_grant') {
            return Promise.reject('Usuario ou senha invalido');
          }
        }
        return Promise.reject(response);
      });
  }

  isAccessTokenInValid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Obtendo novo access Token');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('erro:', response);
        return Promise.resolve(null);
      });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermssao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  removerAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
