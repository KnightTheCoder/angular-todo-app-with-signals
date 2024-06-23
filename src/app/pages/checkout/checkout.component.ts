import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PayDetailsFormsComponent } from '../../components/pay-details-forms/pay-details-forms.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterModule, PayDetailsFormsComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  productsService = inject(ProductsService);
  shoppingCartService = inject(ShoppingCartService);
  router = inject(Router);

  shoppingCart = this.shoppingCartService.products;
  products = this.productsService.products;

  isPaymentVisible = signal(false);
  areDetailsValid = signal(false);

  removeFromCart(id: number) {
    this.shoppingCartService.deleteProductById(id);
  }

  updateProductInCart(product: Product) {
    this.shoppingCartService.updateProduct({
      ...product,
      quantity: product.quantity
    });
  }

  getOriginalProductQuantity(product: Product) {
    let foundProduct = this.productsService.getProductById(product.id);
    return foundProduct?.quantity ?? 1;
  }

  payCart() {
    this.shoppingCartService.payCart();
    this.router.navigate(['/shop']);
  }

  handleDetailsValidityChange(newValue: boolean) {
    this.areDetailsValid.set(newValue);
  }

  togglePaymentVisible(newState?: boolean) {
    if (newState) {
      this.isPaymentVisible.set(newState);
    } else {
      this.isPaymentVisible.update((current) => !current);
    }
  }
}
