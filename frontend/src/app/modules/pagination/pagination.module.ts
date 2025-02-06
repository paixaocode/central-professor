import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoIconModule, PoModule } from '@po-ui/ng-components';
import { PaginationComponent } from './pagination.component';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoIconModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
