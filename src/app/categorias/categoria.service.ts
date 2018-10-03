import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  private categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: AuthHttp) { }

  pesquisar(): Promise<any> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')*/

    return this.http.get(`${this.categoriaUrl}` /*, {headers}*/)
    .toPromise()
    .then(response => response.json());
  }

}
