import { Injectable, computed, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productsService = inject(ProductsService);
  private internalProducts = signal<Product[]>([]);

  products = computed(() => this.internalProducts());

  totalPrice = computed(() => {
    let total = 0;

    this.internalProducts().forEach((product) => {
      total += product.price * product.quantity;
    });

    return total;
  });

  getProductById(id: number): Product | undefined {
    return this.internalProducts().find((product) => product.id === id);
  }

  updateProduct(product: Product) {
    const existingProduct = this.getProductById(product.id);
    const originalProduct = this.productsService.getProductById(product.id);

    if (!existingProduct || !originalProduct) return;

    const modifiedProduct = { ...product };

    if (originalProduct.quantity < existingProduct.quantity) {
      modifiedProduct.quantity = originalProduct.quantity;
    } else if (product.quantity <= 0) {
      this.deleteProductById(product.id);
      return;
    }

    this.internalProducts.update((products) =>
      products.map((item) => {
        if (item.id === product.id) {
          item = modifiedProduct;
        }
        return item;
      })
    );
  }

  deleteProductById(id: number) {
    if (!this.getProductById(id)) return;

    this.internalProducts.update((products) =>
      products.filter((product) => product.id !== id)
    );
  }

  addToCart(product: Product) {
    const existingProduct = this.getProductById(product.id);

    if (existingProduct) {
      if (product.quantity <= existingProduct.quantity) return;

      this.internalProducts.update((items) =>
        items.map((item) => {
          if (item.id === existingProduct.id) {
            item.quantity++;
          }
          return item;
        })
      );
    } else {
      const newProduct = { ...product, quantity: 1 };

      this.internalProducts.update((products) => [...products, newProduct]);
    }
  }

  removeFromCart(product: Product) {
    const existingProduct = this.getProductById(product.id);
    if (!existingProduct) return;

    if (product.quantity === 1) {
      this.deleteProductById(product.id);
    } else {
      const modifiedProduct = {
        ...product,
        quantity: existingProduct.quantity - 1
      };

      this.updateProduct(modifiedProduct);
    }
  }

  payCart() {
    if (!this.internalProducts().length) return;

    this.internalProducts().forEach((product) => {
      let foundProduct = this.productsService.getProductById(product.id);
      if (!foundProduct) return;

      const modifiedProduct = {
        ...product,
        quantity: (foundProduct.quantity -= product.quantity)
      };

      this.productsService.updateProduct(modifiedProduct);
    });

    this.internalProducts.set([]);
  }
}
