import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterationComponent } from './user/registeration/registeration.component';
import { HomeComponent } from './home/home.component'; // You'll need to create this

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Main route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterationComponent },
];