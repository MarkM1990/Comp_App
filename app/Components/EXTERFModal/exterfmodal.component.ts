import { Component, Injectable, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MMM-yyyy', this.locale);
    } else {
      return super.format(date, displayFormat);
    }
  }
}

@Component({
  selector: 'app-exterfmodal',
  templateUrl: './exterfmodal.component.html',
  styleUrls: ['./exterfmodal.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, MatToolbarModule, MatListModule, HttpClientModule, MatSnackBarModule]
})
export class EXTERFModalComponent implements OnInit {
  beanstandungForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthserviceService, public dialogRef: MatDialogRef<EXTERFModalComponent>, private snackBar: MatSnackBar) {
    this.beanstandungForm = this.fb.group({
      Datum: ['', Validators.required],
      Kunde: ['', Validators.required],
      Teilenummer: ['', Validators.required],
      Teilebezeichnung: ['', Validators.required],
      Beanstandungsgrund: ['', Validators.required],
      Details: ['', Validators.required],
      CQA: ['', Validators.required]
    });
  }

  Transfair(){
    if (this.beanstandungForm.valid) {
      const formData = this.beanstandungForm.value;
      const formattedDate = formatDate(formData.Datum, 'dd/MM/yyyy', 'en-US');
      const payload = {
        Date: formattedDate,
        Kunde: formData.Kunde,
        Teilenummer: formData.Teilenummer,
        Teilebezeichnung: formData.Teilebezeichnung,
        Beanstandungsgrund: formData.Beanstandungsgrund,
        Details: formData.Details,
        CQA: formData.CQA
      };
      this.authService.kundenbeanstandungErf(payload).subscribe({
        next: (response) => {console.log('Erfolgreich übermittelt', response);window.location.reload();},
        error: (error) => {console.error('Fehler bei der Übermittlung:', error);
        alert(`Fehler bei der Übermittlung: ${error.message}`);
      }});
        
      console.log(payload);
    } else {
      console.log('nicht alle Felder sind korrekt ausgefüllt');
      alert('Nicht alle Felder sind korrekt ausgefüllt')
    }
    
  }
  
  ngOnInit() {
  }
}
