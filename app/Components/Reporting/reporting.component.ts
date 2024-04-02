import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';
import { Chart } from 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatButtonModule } from '@angular/material/button';



export interface CompData1 {
  ID: number;
  Date: string;
  Kunde: string;
  Teilenummer: string;
  Teilebezeichnung: string;
  Beanstandungsgrund: string;
  CQA: string;
  Abgeschlossen: boolean;
  Kosten: number;
}


export interface CompData2 {
  ID: number;
  Date: string;
  Lieferant: string;
  Teilenummer: string;
  Teilebezeichnung: string;
  Beanstandungsgrund: string;
  SQA: string;
  Abgeschlossen: boolean;
  Kosten: number;
}

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  Comp1!: CompData1[];
  Comp2!: CompData2[];
  chart1: any = [];
  chart2: any = [];
  donutChart1: any = [];
  donutChart2: any = [];
  

  constructor(private authservice: AuthserviceService) {}

  LoadCompData1() {
    this.authservice.Kundenbeanstandungabf().subscribe(data1 => {
      this.Comp1 = data1;
      console.log(this.Comp1);
      this.initializeChart1();
      this.initializeDonutChart1();
      this.LoadCompData2();
    });
  }

  LoadCompData2() {
    this.authservice.Lieferantenbeanstandungabf().subscribe(data2 => {
      this.Comp2 = data2;
      console.log(this.Comp2);
      this.initializeDonutChart2();
      this.initializeChart2();
    });
  }
  

  initializeChart1() {
    let delayed = false;
    const counts = this.getCountsByDate1();
    const labels = Object.keys(counts);
    const data = Object.values(counts);
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Anzahl Kundenbeanstandungen',
            data: data,
            borderWidth: 1,
            tension: 0.5
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
        responsive: false,
      },
    });
  }

  getCountsByDate1() {
    const counts: { [date: string]: number } = {};
    this.Comp1.forEach(item => {
      counts[item.Date] = (counts[item.Date] || 0) + 1;
    });
    return counts;
  }

  initializeChart2() {
    let delayed = false;
    const counts = this.getCountsByDate2();
    const labels = Object.keys(counts);
    const data = Object.values(counts);
    this.chart2 = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Anzahl Lieferantenbeanstandung',
            data: data,
            borderWidth: 1,
            tension: 0.5
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
        responsive: false,
      },
    });
  }

  getCountsByDate2() {
    const counts: { [date: string]: number } = {};
    this.Comp2.forEach(item => {
      counts[item.Date] = (counts[item.Date] || 0) + 1;
    });
    return counts;
  }

  ngOnInit(): void {
    this.LoadCompData1();
  }

  exportAsPDF() {
    const DATA1 = document.getElementById('canvas1');
    const DATA2 = document.getElementById('canvas2');

    if (!DATA1 || !DATA2) {
      console.error("Canvas elements not found.");
      return;
    }
  
    const doc = new jsPDF('p', 'pt', 'a4');
    let position = 0;
  
    html2canvas(DATA1).then((canvas) => {
      const imgData1 = canvas.toDataURL('image/PNG');
      doc.addImage(imgData1, 'PNG', 0, position, 595, 280);

      html2canvas(DATA2).then((canvas) => {
        const imgData2 = canvas.toDataURL('image/PNG');
        position += 300;
        doc.addImage(imgData2, 'PNG', 0, position, 595, 280);
  
        doc.save('report.pdf');
      });
    });
  }

  

  getComplaintReasonsCount(data: any[], field: string) {
    return data.reduce((acc, curr) => {
      const reason = curr[field];
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {});
  }

  initializeDonutChart1() {
    const reasonsCount = this.getComplaintReasonsCount(this.Comp1, 'Beanstandungsgrund');
    const data = {
      labels: Object.keys(reasonsCount),
      datasets: [{
        data: Object.values(reasonsCount),
        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(0, 0, 255, 0.5)',
          'rgba(0, 128, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(255, 165, 0, 0.5)',
          'rgba(128, 0, 128, 0.5)'
        ],
      }]
    };
    this.donutChart1 = new Chart('donutCanvas1', {
      type: 'doughnut',
      data: data,
      options: {
        animation: {
          onComplete: () => {
            console.log("Animation completed");
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Beanstandungsgrund Kunde'
          },
        },
        maintainAspectRatio: false,
        responsive: false,
      }
    });
  }
  
  
  initializeDonutChart2() {
    const reasonsCount = this.getComplaintReasonsCount(this.Comp2, 'Beanstandungsgrund');
    const data = {
      labels: Object.keys(reasonsCount),
      datasets: [{
        data: Object.values(reasonsCount),
        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(0, 0, 255, 0.5)',
          'rgba(0, 128, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(255, 165, 0, 0.5)',
          'rgba(128, 0, 128, 0.5)'
        ],
      }]
    };
    this.donutChart2 = new Chart('donutCanvas2', {
      type: 'doughnut',
      data: data,
      options: {
        animation: {
          onComplete: () => {
            console.log("Animation completed");
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Beanstandungsgrund Lieferant'
          },
        },
        maintainAspectRatio: false,
        responsive: false,
      }
    });
  }
  
  
  
}
