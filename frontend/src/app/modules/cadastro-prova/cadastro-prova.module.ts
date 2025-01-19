import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProvaComponent } from './cadastro-prova.component';
import { PoModule } from '@po-ui/ng-components';
import { CadastroProvaRoutingModule } from './cadastro-prova.routing';

@NgModule({
  declarations: [CadastroProvaComponent],
  imports: [
    CommonModule,
    PoModule,
    CadastroProvaRoutingModule
  ]
})
export class CadastroProvaModule { }
