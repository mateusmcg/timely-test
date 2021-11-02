import { NgModule } from '@angular/core';

import { TileRoutingModule } from './tile-routing.module';
import { TileComponent } from './tile.component';
import { MatCardModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TileComponent],
  imports: [
    TileRoutingModule,
    MatCardModule,
    SharedModule
  ]
})
export class TileModule { }
