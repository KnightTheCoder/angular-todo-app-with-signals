import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productsService = inject(ProductsService);
  shoppingCartService = inject(ShoppingCartService);
  router = inject(Router);

  products = this.productsService.products;

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.router.navigate(['/checkout']);
  }
}
