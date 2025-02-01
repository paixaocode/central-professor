import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroQuestaoComponent } from './cadastro-questao.component';
import { IncluirComponent } from './incluir-questao/incluir.component';
import { FormGerarQuestaoComponent } from './form-gerar-questao/form-gerar-questao.component';
import { ExcluirComponent } from './excluir-questao/excluir.component';
import { PoModule } from '@po-ui/ng-components';
import { CadastroQuestaoRoutingModule } from './cadastro-questao.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from '../toolbar/toolbar.module';



@NgModule({
  declarations: [
    CadastroQuestaoComponent,
    IncluirComponent,
    FormGerarQuestaoComponent,
    ExcluirComponent,
  ],
  imports: [
    CommonModule,
    PoModule,
    CadastroQuestaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
  ]
})
export class CadastroQuestaoModule { }
