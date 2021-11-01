import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MonthComponent],
  imports: [
    MonthRoutingModule,
    SharedModule
  ]
})
export class MonthModule { }
