import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Lancamento } from './../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    // const headers = new Headers();

    // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { /*headers: headers,*/ search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const lancamentos = responseJson.content

      const resultado = {
        lancamentos,
        total: responseJson.totalElements
      };
      return resultado;
    });
  }

  buscarPorId(id: number): Promise<Lancamento> {
    /* const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    return this.http.get(`${this.lancamentoUrl}/${id}` /*, { headers }*/)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converteStringParaDate(lancamento);

        return lancamento;
      });
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');*/

    return this.http.post(`${this.lancamentoUrl}`, JSON.stringify(lancamento) /*, { headers }*/)
      .toPromise()
      .then(response => response.json());
  }

  actualizar(lancamento: Lancamento): Promise<Lancamento> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');*/

    return this.http.put(`${this.lancamentoUrl}/${lancamento.id}`, JSON.stringify(lancamento) /*, { headers }*/)
      .toPromise()
      .then(response => {
        const lancamentoActualizado = response.json();

        this.converteStringParaDate(lancamentoActualizado);

        return lancamentoActualizado;
      });
  }

  remover(id: number): Promise<void> {
    /*const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');*/

    return this.http.delete(`${this.lancamentoUrl}/${id}` /*, { headers }*/)
    .toPromise()
    .then(() => null);
  }

  converteStringParaDate(lancamento: Lancamento) {
    lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
    }
  }

}
