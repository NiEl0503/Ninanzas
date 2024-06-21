import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [LoginComponent, RegisterComponent, RouterModule]
})
export class AppComponent {
  title = 'ninanzasApp';
}
