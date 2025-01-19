import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProvaComponent } from './cadastro-prova.component';

const routes: Routes = [
  { path: '', component: CadastroProvaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProvaRoutingModule { }
