import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileRoutingModule } from './tile-routing.module';
import { TileComponent } from './tile.component';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TileComponent],
  imports: [
    CommonModule,
    TileRoutingModule,
    MatCardModule,
    MatDialogModule,
    SharedModule
  ]
})
export class TileModule { }
