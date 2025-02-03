import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PoModule } from '@po-ui/ng-components';
import { PerfilRoutingModule } from './perfil.routing';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PoModule,
    PerfilRoutingModule,
    ChatbotModule,
    ToolbarModule,
    ReactiveFormsModule,
    CloudinaryModule
  ]
})
export class PerfilModule { }
