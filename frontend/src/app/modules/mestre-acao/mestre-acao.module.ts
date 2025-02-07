import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { PoModule } from "@po-ui/ng-components";
import { ToolbarModule } from "../toolbar/toolbar.module";

import { MestreAcaoComponent } from "./mestre-acao.component";
import { MestreAcaoRoutingModule } from "./mestre-acao.routing";
import { ChatbotModule } from "../chatbot/chatbot.module";


@NgModule({
  declarations: [MestreAcaoComponent],
  imports: [
    CommonModule,
    PoModule,
    ToolbarModule,
    MestreAcaoRoutingModule,
    ChatbotModule
  ],
  exports: [MestreAcaoComponent],
})
export class MestreAcaoModule {}