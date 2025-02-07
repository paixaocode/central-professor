import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoIconModule, PoModule } from '@po-ui/ng-components';
import { PoImageModule } from '@po-ui/ng-components';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { SuporteTecnicoComponent } from './suporte-tecnico.component';
import { SuporteTecnicoRoutingModule } from './suporte-tecnico.routing';
import { ChatbotModule } from '../chatbot/chatbot.module';

@NgModule({
  declarations: [
    SuporteTecnicoComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoImageModule,
    PoIconModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    SuporteTecnicoRoutingModule,
    ChatbotModule
  ],
  exports: [
    SuporteTecnicoComponent
  ],
})
export class SuporteTecnicoModule { }
