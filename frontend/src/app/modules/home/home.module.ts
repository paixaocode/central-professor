// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { HomeComponent } from './home.component';
import { HomeComponentRoutingModule } from './home.routing';
import { ChatbotModule } from '../chatbot/chatbot.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PoModule,
    HomeComponentRoutingModule, 
    ChatbotModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {}
