import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TileComponent } from './tile.component';


const routes: Routes = [{
  path: '',
  component: TileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TileRoutingModule { }
