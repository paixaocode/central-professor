import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeradorBoletimComponent } from './gerador-boletim.component';

const routes: Routes = [
  { path: '', component: GeradorBoletimComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeradorBoletimRoutingModule { }