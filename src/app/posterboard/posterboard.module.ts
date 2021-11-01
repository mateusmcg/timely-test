import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { PosterboardRoutingModule } from './posterboard-routing.module';
import { PosterboardComponent } from './posterboard.component';


@NgModule({
  declarations: [PosterboardComponent],
  imports: [
    CommonModule,
    PosterboardRoutingModule,
    MatCardModule,
    SharedModule
  ]
})
export class PosterboardModule { }
