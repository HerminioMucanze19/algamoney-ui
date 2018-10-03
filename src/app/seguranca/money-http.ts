import { RequestOptions, Http, RequestOptionsArgs, Response } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';

export class MoneyHttp extends AuthHttp {

  constructor(
    private auth: AuthService,
    options: AuthConfig,
    http: Http,
    defOpts?: RequestOptions) {
    super(options, http, defOpts)
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.put(url, body, options));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.patch(url, body, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequiscao(() => super.options(url, options));
  }

  private fazerRequiscao(fn: Function) {
    if (this.auth.isAccessTokenInValid) {
      console.log('Obtendo novo access Token');

      const chamadaAccessToken = this.auth.obterAccessToken()
        .then(() => {
          fn().toPromise();
        });
      return Observable.fromPromise(chamadaAccessToken);
    } else {
      return fn();
    }
  }
}
