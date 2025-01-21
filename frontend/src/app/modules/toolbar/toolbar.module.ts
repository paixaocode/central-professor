import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    PoModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
