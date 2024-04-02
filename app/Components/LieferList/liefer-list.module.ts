import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LieferListRoutingModule } from './liefer-list-routing.module';
import { LieferListComponent } from './liefer-list.component';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [LieferListComponent],
  imports: [
    CommonModule,
    LieferListRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ]
})
export class LieferListModule { }
