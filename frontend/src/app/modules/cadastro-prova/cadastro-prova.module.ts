import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProvaComponent } from './cadastro-prova.component';
import { PoModule } from '@po-ui/ng-components';
import { CadastroProvaRoutingModule } from './cadastro-prova.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGerarProvaIaComponent } from './form-gerar-prova-ia/form-gerar-prova-ia.component';
import { FormGerarProvaManualComponent } from './form-gerar-prova-manual/form-gerar-prova-manual.component';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { IncluirComponent } from './incluir/incluir.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { FormManualComponent } from './form-gerar-prova-manual/form-manual/form-manual.component';
import { FormIaComponent } from './form-gerar-prova-ia/form-ia/form-ia.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [CadastroProvaComponent, FormGerarProvaIaComponent, FormGerarProvaManualComponent, IncluirComponent, FormManualComponent, FormIaComponent],
  imports: [
    CommonModule,
    PoModule,
    CadastroProvaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChatbotModule,
    ToolbarModule,
    MatRadioModule
  ]
})
export class CadastroProvaModule { }
