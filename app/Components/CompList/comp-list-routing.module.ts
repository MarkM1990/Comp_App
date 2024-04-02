import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompListComponent } from './comp-list.component';

const routes: Routes = [
  {path: '',component: CompListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompListRoutingModule { }
