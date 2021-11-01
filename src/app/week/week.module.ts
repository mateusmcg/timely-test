import { NgModule } from '@angular/core';

import { WeekRoutingModule } from './week-routing.module';
import { WeekComponent } from './week.component';


@NgModule({
  declarations: [WeekComponent],
  imports: [
    WeekRoutingModule
  ]
})
export class WeekModule { }
