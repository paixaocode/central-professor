import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProfessorComponent } from './register-professor.component';

const routes: Routes = [
  { path: '', component: RegisterProfessorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProfessorRoutingModule { }
