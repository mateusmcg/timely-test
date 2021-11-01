import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';


@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamRoutingModule,
    SharedModule
  ]
})
export class StreamModule { }
