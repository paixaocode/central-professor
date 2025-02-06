import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeradorBoletimComponent } from './gerador-boletim.component';
import { PoModule } from '@po-ui/ng-components';
import { GeradorBoletimRoutingModule } from './gerador-boletim.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GeradorBoletimComponent],
  imports: [
    CommonModule,
    PoModule,
    GeradorBoletimRoutingModule,
    FormsModule,
    ToolbarModule,
    ChatbotModule,
    ReactiveFormsModule,
    MatIconModule 
  ]
})
export class GeradorBoletimModule { }
