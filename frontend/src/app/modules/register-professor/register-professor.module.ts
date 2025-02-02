import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterProfessorComponent } from './register-professor.component';
import { RegisterProfessorRoutingModule } from './register-professor.routing';
import { PoModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RegisterProfessorComponent],
  imports: [
    CommonModule,
    RegisterProfessorRoutingModule,
    PoModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RegisterProfessorComponent]
})
export class RegisterProfessorModule { }
