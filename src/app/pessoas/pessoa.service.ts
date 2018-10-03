import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { Pessoa } from '../core/model';

export class PessoaFiltro {

  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';
  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, {/*headers,*/ search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content

      const resultado = {
        pessoas: pessoas,
        total: responseJson.totalElements
      };

      return resultado;
    });
  }

  buscarTodas(): Promise<any> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    return this.http.get(`${this.pessoaUrl}` /*, {headers}*/)
    .toPromise()
    .then(response => {
      return response.json().content;
    });
  }

  adicionar(pessoa: Pessoa): Promise<any> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');*/

    return this.http.post(`${this.pessoaUrl}`, JSON.stringify(pessoa) /*, {headers}*/)
    .toPromise()
    .then(() => null);
  }

  editarParcial(pessoa: Pessoa): Promise<void> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');*/

    return this.http.put(`${this.pessoaUrl}/${pessoa.id}/activo`, pessoa.activo /*, {headers}*/)
    .toPromise()
    .then(() => console.log(pessoa.activo));
  }

  remover(id: number): Promise<void> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    return this.http.delete(`${this.pessoaUrl}/${id}` /*, {headers}*/)
    .toPromise()
    .then(() => null);
  }

}
