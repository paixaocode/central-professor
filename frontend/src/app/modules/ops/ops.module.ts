import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsComponent } from './ops.component';
import { PoModule } from '@po-ui/ng-components';
import { OpsRoutingModule } from './ops.routing';


@NgModule({
  declarations: [OpsComponent],
  imports: [
    CommonModule,
    PoModule,
    OpsRoutingModule
  ]
})
export class OpsModule { }
