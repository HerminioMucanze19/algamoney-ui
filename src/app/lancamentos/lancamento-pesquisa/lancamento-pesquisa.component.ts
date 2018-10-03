import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  lancamentos = [];
  totalRegistro = 0;
  @ViewChild('lancamentoTable') lancamentoTable;
  filtro = new LancamentoFiltro();

  constructor(
    private auth: AuthService,
    private errorHandlerServce: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService) {}

  ngOnInit() {
   // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistro = resultado.total;
    })
    .catch(error => this.errorHandlerServce.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.pesquisar(pagina);
  }

  confirmarRemocao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover o registro',
      accept: () => {
        this.remover(lancamento);
      }
    });
  }

  remover(lancamnto: any) {
    this.lancamentoService.remover(lancamnto.id)
    .then(() => {
      if (this.lancamentoTable.first === 0) {
        this.pesquisar();
      } else {
        this.lancamentoTable.first = 0;
      }
      this.toastyService.success('Lancamento removido com sucesso');
    })
    .catch(error => this.errorHandlerServce.handle(error));
  }
}
