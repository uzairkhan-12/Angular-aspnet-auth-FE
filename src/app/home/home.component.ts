import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-content">
      <h2>Home Page</h2>
      <p>Welcome to the home page! Use the buttons above to navigate.</p>
    </div>
  `,
  styles: [`
    .home-content {
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class HomeComponent { }