import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterProfessorComponent } from './register-professor.component';
import { RegisterProfessorRoutingModule } from './register-professor.routing';
import { PoModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterProfessorComponent],
  imports: [
    CommonModule,
    RegisterProfessorRoutingModule,
    PoModule,
    ReactiveFormsModule
  ],
  exports: [RegisterProfessorComponent]
})
export class RegisterProfessorModule { }
