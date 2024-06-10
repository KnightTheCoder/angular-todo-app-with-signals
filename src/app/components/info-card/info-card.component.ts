import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="#id"></ng-content>
    <ng-content select="#name"></ng-content>
    <ng-content select="#complete"></ng-content>
  `,
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {}
