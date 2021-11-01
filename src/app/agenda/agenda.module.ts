import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AgendaComponent],
  imports: [
    AgendaRoutingModule,
    SharedModule
  ]
})
export class AgendaModule { }
