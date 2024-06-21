import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  register() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    this.apiService.register(data).subscribe(response => {
      console.log(response);
      this.authService.login();
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
      this.errorMessage = 'Error de registro: problema del servidor o datos incorrectos 😱';
    });
  }

  getImagePath(imageName: string): string {
    return `assets/${imageName}`;
  }
}

