import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompListRoutingModule } from './comp-list-routing.module';
import { CompListComponent } from './comp-list.component';


import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    CompListComponent,
  ],
  imports: [
    CommonModule,
    CompListRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
    
  ]
})
export class CompListModule { }