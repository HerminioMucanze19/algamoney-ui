import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from './../shared/shared.module';
import { PessoaRoutingModule } from './pessoa-routing.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

    ButtonModule,
    DataTableModule,
    InputTextModule,
    InputMaskModule,
    TooltipModule,

    PessoaRoutingModule,
    SharedModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
    PessoasGridComponent
  ],
  exports: []
})
export class PessoasModule { }
