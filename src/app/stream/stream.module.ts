import { NgModule } from '@angular/core';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';


@NgModule({
  declarations: [StreamComponent],
  imports: [
    StreamRoutingModule
  ]
})
export class StreamModule { }
