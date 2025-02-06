import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';

import { CadastroQuestaoComponent } from './cadastro-questao.component';
import { FormGerarQuestaoComponent } from './form-gerar-questao/form-gerar-questao.component';
import { CadastroQuestaoRoutingModule } from './cadastro-questao.routing';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [
    CadastroQuestaoComponent,
    FormGerarQuestaoComponent,
  ],
  imports: [
    CommonModule,
    PoModule,
    CadastroQuestaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ChatbotModule,
    PaginationModule
  ]
})
export class CadastroQuestaoModule { }
