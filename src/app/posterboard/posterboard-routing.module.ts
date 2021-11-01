import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosterboardComponent } from './posterboard.component';


const routes: Routes = [{
  path: '',
  component: PosterboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosterboardRoutingModule { }
