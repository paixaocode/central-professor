// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';  // Adicione esta importação
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PoModule  // Adicione o PoModule para usar os componentes PO UI
  ],
  exports: [HomeComponent]
})
export class HomeModule {}
