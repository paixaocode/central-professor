import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpsComponent } from './ops.component';

const routes: Routes = [
  { path: '', component: OpsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpsRoutingModule { }