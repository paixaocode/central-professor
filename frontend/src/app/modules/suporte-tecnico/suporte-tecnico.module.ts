import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';
import { PoImageModule } from '@po-ui/ng-components';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { SuporteTecnicoComponent } from './suporte-tecnico.component';
import { SuporteTecnicoRoutingModule } from './suporte-tecnico.routing';


@NgModule({
  declarations: [
    SuporteTecnicoComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoImageModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    SuporteTecnicoRoutingModule
  ],
  exports: [
    SuporteTecnicoComponent
  ],
})
export class SuporteTecnicoModule { }
