import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoRoutingModule } from './lancamento-routing.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

    ButtonModule,
    CalendarModule,
    CurrencyMaskModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DataTableModule,
    SelectButtonModule,
    TooltipModule,

    LancamentoRoutingModule,
    SharedModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule { }
