import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { WeekRoutingModule } from './week-routing.module';
import { WeekComponent } from './week.component';


@NgModule({
  declarations: [WeekComponent],
  imports: [
    WeekRoutingModule,
    SharedModule
  ]
})
export class WeekModule { }
