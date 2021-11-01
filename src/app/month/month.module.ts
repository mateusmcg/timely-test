import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';


@NgModule({
  declarations: [MonthComponent],
  imports: [
    MonthRoutingModule
  ]
})
export class MonthModule { }
