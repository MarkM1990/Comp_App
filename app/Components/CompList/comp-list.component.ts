import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EXTERFModalComponent } from '../EXTERFModal/exterfmodal.component';
import { EFTBEARBModalComponent } from '../EXTBEARBModal/eftbearbmodal.component';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';
import * as XLSX from 'xlsx'; 

export interface CompData {
  ID: number;
  Date: string;
  Kunde: string;
  Teilenummer: string;
  Teilebezeichnung: string;
  Beanstandungsgrund: string;
  CQA: string;
  Abgeschlossen: boolean;
}

@Component({
  selector: 'app-comp-list',
  templateUrl: './comp-list.component.html',
  styleUrls: ['./comp-list.component.css']
})
export class CompListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ID', 'Date', 'Kunde', 'Teilenummer', 'Teilebezeichnung', 'Beanstandungsgrund', 'CQA', 'Abgeschlossen'];
  selectedID: any;
  dataSource: any;
  Comp!: CompData[];
  response: any;
  fileName= 'Beanstandungsliste.xlsx';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public matDialog: MatDialog, private authService: AuthserviceService) {}

  ngOnInit(): void{
    this.Beanstandung();
  }

  Beanstandung(){
    this.authService.Kundenbeanstandungabf().subscribe(data => {
      this.Comp = data;
      console.log(data)
      this.dataSource = new MatTableDataSource(this.Comp);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openEXTERFModal(){
    this.matDialog.open(EXTERFModalComponent,{
      width: '800px',
      height: '600px'
    });
  }

  openEXTBEARBModal(event: any) {
    if (event.target.tagName === 'TD') {
      this.selectedID = event.target.parentElement.querySelector('.td').innerText;
      this.authService.KundenbeanstandungBearb(this.selectedID).subscribe({
        next: (response) => {
          this.response = response;

          this.matDialog.open(EFTBEARBModalComponent, {
            width: '800px',
            height: '700px',
            data: { selectedID: this.selectedID, response },
          });
        }
      });
    }
  }
  

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Export to Excel
  exportAsExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Comp);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Kundenbeanstandungen.xlsx');
  }
  
}
