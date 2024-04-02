import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'CompList',
        loadChildren: () => import('./Components/CompList/comp-list.module').then(m => m.CompListModule),
      },
      {
        path: 'LieferList',
        loadChildren: () => import('./Components/LieferList/liefer-list.module').then(m => m.LieferListModule),
      },
      {
        path: 'Reporting',
        loadChildren: () => import('./Components/Reporting/reporting.module').then(m => m.ReportingModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
