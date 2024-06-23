import { Component, computed, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-pay-details-forms',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './pay-details-forms.component.html',
  styleUrl: './pay-details-forms.component.css'
})
export class PayDetailsFormsComponent {
  fb = inject(FormBuilder);
  countries = [
    'Hungary',
    'Great Britain',
    'United States of America',
    'Poland',
    'Russia',
    'Romania',
    'Serbia',
    'Spain'
  ];
  paymentMethods = ['cash', 'credit card', 'paypal'];

  areDetailsValid = input.required<boolean>();
  onDetailsValidityChange = output<boolean>();

  payDetailsGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    age: ['', [Validators.required, Validators.min(18)]],
    email: ['', [Validators.required, Validators.pattern('.+@.+')]],
    country: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.minLength(4)]],
    street: ['', [Validators.required, Validators.minLength(4)]],
    paymentMethod: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  });

  firstName = computed(() => this.payDetailsGroup.get('firstName'));
  lastName = computed(() => this.payDetailsGroup.get('lastName'));
  age = computed(() => this.payDetailsGroup.get('age'));
  email = computed(() => this.payDetailsGroup.get('email'));
  country = computed(() => this.payDetailsGroup.get('country'));
  postalCode = computed(() => this.payDetailsGroup.get('postalCode'));
  street = computed(() => this.payDetailsGroup.get('street'));
  paymentMethod = computed(() => this.payDetailsGroup.get('paymentMethod'));
  acceptTerms = computed(() => this.payDetailsGroup.get('acceptTerms'));

  submitPayDetails() {
    this.onDetailsValidityChange.emit(this.payDetailsGroup.valid);
  }
}
