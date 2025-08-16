import { Component } from '@angular/core';
import { RegisterationComponent } from './registeration/registeration.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegisterationComponent, LoginComponent, CommonModule],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  showLogin = false;

  switchToLogin() {
    this.showLogin = true;
  }

  switchToRegister() {
    this.showLogin = false;
  }
}