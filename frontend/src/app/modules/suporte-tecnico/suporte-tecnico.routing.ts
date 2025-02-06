import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuporteTecnicoComponent } from './suporte-tecnico.component';


const routes: Routes = [
  { path: '', component: SuporteTecnicoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuporteTecnicoRoutingModule { }