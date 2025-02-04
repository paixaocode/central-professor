import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroQuestaoComponent } from './cadastro-questao.component';
import { FormGerarQuestaoComponent } from './form-gerar-questao/form-gerar-questao.component';
import { ExcluirComponent } from './excluir-questao/excluir.component';
import { PoModule } from '@po-ui/ng-components';
import { CadastroQuestaoRoutingModule } from './cadastro-questao.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ChatbotModule } from '../chatbot/chatbot.module';



@NgModule({
  declarations: [
    CadastroQuestaoComponent,
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
    ChatbotModule
  ]
})
export class CadastroQuestaoModule { }
