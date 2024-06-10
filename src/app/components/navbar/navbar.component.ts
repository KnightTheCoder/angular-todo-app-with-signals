import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav>
        <a
          routerLink="/"
          routerLinkActive="active-link"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Home
        </a>

        <a
          routerLink="todos"
          routerLinkActive="active-link"
        >
          Todos
        </a>

        <a
          routerLink="todos-with-component"
          routerLinkActive="active-link"
        >
          Todos with component
        </a>
      </nav>
    </header>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {}