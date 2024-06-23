import { Component, input } from '@angular/core';

@Component({
  selector: 'app-required-field',
  standalone: true,
  imports: [],
  templateUrl: './required-field.component.html',
  styleUrl: './required-field.component.css'
})
export class RequiredFieldComponent {
  for = input('');
}
