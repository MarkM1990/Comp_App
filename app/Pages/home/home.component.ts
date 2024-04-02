import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  CompList() {
    this.router.navigate(['home', 'CompList']);
  }

  LieferList() {
    this.router.navigate(['home', 'LieferList']);
  }

  Reporting() {
    this.router.navigate(['home','Reporting'])
  }

  navigateToLogin() {
    this.router.navigate(['']);
    localStorage.removeItem('jwtToken');
  }
}

