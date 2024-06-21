import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  login() {
    const data = { email: this.email, password: this.password };
    this.apiService.login(data).subscribe(response => {
      console.log(response);
      this.authService.login();
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error(error);
      this.errorMessage = 'Error de inicio de sesión: credenciales incorrectas o problema del servidor 😱';
    });
  }

  getImagePath(imageName: string): string {
    return `assets/${imageName}`;
  }
}
