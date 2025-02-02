import { RouterModule, Routes } from "@angular/router";
import { CadastroQuestaoComponent } from "./cadastro-questao.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: CadastroQuestaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroQuestaoRoutingModule { }