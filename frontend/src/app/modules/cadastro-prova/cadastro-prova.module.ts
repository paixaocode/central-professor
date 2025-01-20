import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProvaComponent } from './cadastro-prova.component';
import { PoModule } from '@po-ui/ng-components';
import { CadastroProvaRoutingModule } from './cadastro-prova.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGerarProvaIaComponent } from './form-gerar-prova-ia/form-gerar-prova-ia.component';
import { FormGerarProvaManualComponent } from './form-gerar-prova-manual/form-gerar-prova-manual.component';
import { ChatbotModule } from '../chatbot/chatbot.module';

@NgModule({
  declarations: [CadastroProvaComponent, FormGerarProvaIaComponent, FormGerarProvaManualComponent],
  imports: [
    CommonModule,
    PoModule,
    CadastroProvaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChatbotModule
  ]
})
export class CadastroProvaModule { }
