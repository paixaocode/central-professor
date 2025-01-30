import { RouterModule, Routes } from "@angular/router";
import { CadastroQuestaoComponent } from "./cadastro-questao.component";
import { IncluirComponent } from './incluir-questao/incluir.component';
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: CadastroQuestaoComponent },
  { path: 'incluir-questao', component: IncluirComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroQuestaoRoutingModule { }