import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Lancamento } from './../../core/model';
import { LancamentoService } from '../lancamento.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos= [
    {label: 'Receita', value: 'RECEITA' },
    {label: 'Despesa', value: 'DESPESA'}
  ];

  pessoas = [];

  categorias = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) {}

  ngOnInit() {
    this.buscarCategorias();
    this.buscarPessoas();
    const idLancamento = this.route.snapshot.params['id'];

    this.title.setTitle('Cadastro de Lançamento');

    if (idLancamento) {
      this.buscarPorId(idLancamento);
    }
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  buscarPorId(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(response => {
        this.lancamento = response;
        this.actualizarTituloEdicao();
      });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.actualizarLancamento(form);
    }else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.salvar(this.lancamento)
      .then(lancamentoNovo => {
        this.toastyService.success('Lancamento Salvo com Sucesso');

        this.router.navigate(['/lancamentos', lancamentoNovo.id]);
        // form.reset();
        // this.lancamento = new Lancamento();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  actualizarLancamento(form: NgForm) {
    this.lancamentoService.actualizar(this.lancamento)
      .then(response => {
        this.lancamento = response;

        this.toastyService.success('Lancamento actualizado com sucesso');
        this.actualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['lancamentos/novo']);
  }

  buscarCategorias() {
    this.categoriaService.pesquisar()
    .then(response => {
      this.categorias = response.map(categoria => {
        return { label: categoria.nome, value: categoria.id };
      })
    });
  }

  buscarPessoas() {
    this.pessoaService.buscarTodas()
      .then(response => {
        this.pessoas = response.filter(pessoa => pessoa.activo).map(pessoa => {
          return {label: pessoa.nome, value: pessoa.id}
        })
      });
  }

  actualizarTituloEdicao() {
    this.title.setTitle(`Editando lançamento: ${this.lancamento.descricao}`);
  }

}
