import { Component, computed, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input.required<Product>();
  onAddToCart = output<number>();

  imageSource = computed(() => `images/${this.product().image}`);

  isSoldOut = computed(() => this.product().quantity <= 0);

  addToCart() {
    this.onAddToCart.emit(this.product().id);
  }
}
