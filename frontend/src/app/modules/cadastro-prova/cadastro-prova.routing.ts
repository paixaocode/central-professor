import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProvaComponent } from './cadastro-prova.component';
import { IncluirComponent } from './incluir/incluir.component';

const routes: Routes = [
  { path: '', component: CadastroProvaComponent },
  { path: 'incluir', component: IncluirComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProvaRoutingModule { }
