import { Component } from '@angular/core';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [],
  template: `
    <h2>Passed children:</h2>
    <ng-content></ng-content>
  `,
  styleUrl: './add-content.component.css'
})
export class AddContentComponent {}
