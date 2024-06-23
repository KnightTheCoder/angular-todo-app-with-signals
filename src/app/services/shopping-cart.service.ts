import { Injectable, computed, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private productsService = inject(ProductsService);
  private internalProducts = signal<Product[]>([]);

  products = computed(() => this.internalProducts());

  totalPrice = computed(() => {
    return this.internalProducts()
      .map((product) => product.quantity * product.price)
      .reduce((prev, curr) => prev + curr, 0);
  });

  private getProductById(id: number): Product | undefined {
    return this.internalProducts().find((product) => product.id === id);
  }

  private createProduct(product: Product) {
    const newProduct = { ...product, quantity: 1 };
    this.internalProducts.update((products) => [...products, newProduct]);
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

      const modifiedProduct = {
        ...product,
        quantity: existingProduct.quantity + 1
      };
      this.updateProduct(modifiedProduct);
    } else {
      this.createProduct(product);
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
