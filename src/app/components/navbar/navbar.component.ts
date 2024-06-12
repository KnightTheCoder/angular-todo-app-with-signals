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
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Todos
        </a>

        <a
          routerLink="todos-with-component"
          routerLinkActive="active-link"
        >
          Todos with component
        </a>

        <a
          routerLink="search"
          routerLinkActive="active-link"
        >
          Search
        </a>

        <a
          routerLink="shop"
          routerLinkActive="active-link"
        >
          Shop
        </a>
      </nav>
    </header>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {}
