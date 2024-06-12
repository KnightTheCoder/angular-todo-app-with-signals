import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productsService = inject(ProductsService);

  products = this.productsService.products;

  addToCart(id: number) {
    console.log(id);
  }
}
