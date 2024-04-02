import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LIFERFModalComponent } from '../LIFERFModal/liferfmodal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LIEFBEARBModalComponent } from '../LIEFBEARBModal/liefbearbmodal.component';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';
import * as XLSX from 'xlsx'; 

export interface CompData {
  ID: number;
  Date: string;
  Lieferant: string;
  Teilenummer: string;
  Teilebezeichnung: string;
  Beanstandungsgrund: string;
  SQA: string;
  Abgeschlossen: boolean;
}


@Component({
  selector: 'app-liefer-list',
  templateUrl: './liefer-list.component.html',
  styleUrls: ['./liefer-list.component.css']
})
export class LieferListComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['ID', 'Date', 'Lieferant', 'Teilenummer', 'Teilebezeichnung', 'Beanstandungsgrund', 'SQA', 'Abgeschlossen'];
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
    this.authService.Lieferantenbeanstandungabf().subscribe(data => {
      this.Comp = data;
      console.log(data)
      this.dataSource = new MatTableDataSource(this.Comp);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  //Lieferantenbeanstandung erfassen
  openLieferListModal(){
    this.matDialog.open(LIFERFModalComponent,{
      width: '800px',
      height: '600px'
    });
  }

  //Beanstandung bearbeiten Modal öffnen
  openLIEFBEARBModal(event: any) {
    if (event.target.tagName === 'TD') {
      this.selectedID = event.target.parentElement.querySelector('.td').innerText;
      this.authService.LieferantenbeanstandungBearb(this.selectedID).subscribe({
        next: (response) => {
          this.response = response;

          this.matDialog.open(LIEFBEARBModalComponent, {
            width: '800px',
            height: '700px',
            data: { selectedID: this.selectedID, response },
          });
        }
      });
    }
  }


   //Tabelle Paginator
   ngAfterViewInit() {
  }

  //Filter
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
    XLSX.writeFile(workbook, 'Lieferantenbeanstandungen.xlsx');
  }

}
