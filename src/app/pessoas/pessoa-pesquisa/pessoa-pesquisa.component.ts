import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas = [];
  totalRegistro: number;
  @ViewChild('pessoaTable') pessoaTable;
  filtro = new PessoaFiltro();

  constructor(
    private confirmatioService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
  ) {}

  ngOnInit() {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
     this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistro = resultado.total;
        this.toastyService.success('Pessoas Carregada com sucesso!');
     })
  }

  activarPessoa(pessoa: Pessoa) {
    pessoa.activo = !pessoa.activo;
    this.pessoaService.editarParcial(pessoa)
      .then(() => this.toastyService.success(`Pessoa ${pessoa.activo ? 'Activa' : 'Inactiva'} com Sucesso!`))
      .catch(error => this.errorHandlerService.handle(error))
  }

  confirmarRemocao(pessoa: Pessoa) {
    this.confirmatioService.confirm({
      message: 'Tem Certeza que pretende remover o registro?',
      accept: () => {
        this.remover(pessoa)
      }
    });
  }

  remover(pessoa: Pessoa) {
    this.pessoaService.remover(pessoa.id)
    .then(() => {
      if (this.pessoaTable.first === 0) {
        this.pesquisar();
      } else {
        this.pessoaTable.first = 0;
      }
      this.toastyService.success('Pessoa removido com sucesso');
    })
    .catch(error => this.errorHandlerService.handle(error));
  }
}
