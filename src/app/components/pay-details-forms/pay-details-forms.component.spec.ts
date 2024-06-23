import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDetailsFormsComponent } from './pay-details-forms.component';

describe('PayDetailsFormsComponent', () => {
  let component: PayDetailsFormsComponent;
  let fixture: ComponentFixture<PayDetailsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayDetailsFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayDetailsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
