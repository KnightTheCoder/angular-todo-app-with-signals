import { Component, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  template: `
    @if (controlElement()?.hasError(errorType()) && controlElement()?.touched) {
    <span class="error">{{ errorMessage() }}</span>
    }
  `,
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  controlElement = input.required<AbstractControl | null>();
  errorType = input<string>('required');
  errorMessage = input<string>('Field is required!');
}
