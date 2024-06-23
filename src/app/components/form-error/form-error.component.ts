import { Component, computed, effect, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

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
  defaultMessage = 'Field is required';

  controlElement = input.required<AbstractControl | null>();
  errorType = input<string>('required');
  _errorMessage = input<string>(this.defaultMessage, {
    alias: 'errorMessage'
  });

  errorMessage = computed(() => {
    if (this._errorMessage() !== this.defaultMessage)
      return this._errorMessage();

    let newValue = this.defaultMessage;

    switch (this.errorType()) {
      case 'minlength':
      case 'min':
        newValue = 'Too short!';
        break;

      case 'pattern':
        newValue = 'Invalid field';
        break;
    }

    return newValue;
  });
}
