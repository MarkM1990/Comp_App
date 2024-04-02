import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LieferListComponent } from './liefer-list.component';

const routes: Routes = [
  {path:'', component:LieferListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LieferListRoutingModule { }
