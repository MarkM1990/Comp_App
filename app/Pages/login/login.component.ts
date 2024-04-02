import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/AuthService/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private authservice: AuthserviceService) {}

  login(): void {
    this.authservice.login(this.username, this.password).subscribe(response => {
      localStorage.setItem('jwtToken', response.token);
      this.navigateToHome();
    }, error => {
      console.error('Login failed:', error);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home/CompList']);
  }

}
