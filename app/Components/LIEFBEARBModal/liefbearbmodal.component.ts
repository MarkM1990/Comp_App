import { Component, Injectable, OnInit, Inject } from '@angular/core';
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
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';

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
  selector: 'app-liefbearbmodal',
  templateUrl: './liefbearbmodal.component.html',
  styleUrls: ['./liefbearbmodal.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, MatToolbarModule, MatListModule, MatOptionModule, MatSelectModule]
})
export class LIEFBEARBModalComponent implements OnInit{
  beanstandungForm: FormGroup;
  

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,  private authService: AuthserviceService) {
    console.log('Received ID:', this.data);

    const receivedDate = this.parseApiDate(this.data.response[0].Date);

    this.beanstandungForm = this.fb.group({
      Datum: [receivedDate, Validators.required],
      Lieferant: [this.data.response[0].Lieferant || '', Validators.required],
      Teilenummer: [this.data.response[0].Teilenummer || '', Validators.required],
      Teilebezeichnung: [this.data.response[0].Teilebezeichnung || '', Validators.required],
      Beanstandungsgrund: [this.data.response[0].Beanstandungsgrund || '', Validators.required],
      Details: [this.data.response[0].Details || '', Validators.required],
      SQA: [this.data.response[0].SQA || '', Validators.required],
      Kosten: [this.data.response[0].Kosten || '', Validators.nullValidator],
      Abgeschlossen: [this.data.response[0].Abgeschlossen ? 'Ja' : 'Nein', Validators.nullValidator]
    });
  }

  Transfair(){
    if (this.beanstandungForm.valid) {
      const formData = this.beanstandungForm.value;
      const formattedDate = formatDate(formData.Datum, 'dd/MM/yyyy', 'en-US');
      const abgeschlossen = formData.Abgeschlossen === 'Ja';
      const payload = {
        ID: this.data.selectedID,
        Date: formattedDate,
        Lieferant: formData.Lieferant,
        Teilenummer: formData.Teilenummer,
        Teilebezeichnung: formData.Teilebezeichnung,
        Beanstandungsgrund: formData.Beanstandungsgrund,
        Details: formData.Details,
        SQA: formData.SQA,
        Kosten: formData.Kosten,
        Abgeschlossen: abgeschlossen
      };
      this.authService.lieferantenbeanstandungBearb(payload).subscribe({
        next: (response) => {console.log('Erfolgreich übermittelt', response);window.location.reload();},
        error: (error) => {console.error('Fehler bei der Übermittlung:', error);
        alert('Nicht alle Felder sind korrekt ausgefüllt')
      }});
  
      console.log(payload);
    } else {
      console.log('nicht alle Felder sind korrekt ausgefüllt')
    }
  }

  private parseApiDate(apiDate: string): Date {
    const parts = apiDate.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Monat ist nullbasiert
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  
  ngOnInit() {
  }

}
