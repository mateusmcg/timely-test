import { NgModule } from '@angular/core';

import { PosterboardRoutingModule } from './posterboard-routing.module';
import { PosterboardComponent } from './posterboard.component';


@NgModule({
  declarations: [PosterboardComponent],
  imports: [
    PosterboardRoutingModule
  ]
})
export class PosterboardModule { }
