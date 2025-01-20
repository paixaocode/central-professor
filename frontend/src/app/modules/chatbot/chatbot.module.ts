// chatbot.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [ChatbotComponent],
  imports: [
    CommonModule,
    PoModule
  ],
  exports: [ChatbotComponent]
})
export class ChatbotModule { }
