import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private internalProducts = signal<Product[]>([
    {
      id: 1,
      name: 'Tea',
      description: 'Ordinary tea',
      image: 'tea.png',
      price: 2,
      quantity: 5
    },
    {
      id: 2,
      name: 'Super expensive shit',
      description: "So expensive you can't buy",
      image: 'diamond.png',
      price: 1000,
      quantity: 0
    }
  ]);
  private idCounter = computed(() => this.internalProducts().length + 1);

  readonly products = this.internalProducts.asReadonly();

  getAllProducts(): Product[] {
    return this.internalProducts();
  }

  getProductById(id: number): Product | undefined {
    return this.internalProducts().find((product) => product.id === id);
  }

  createProduct(product: Product) {
    if (product.name.trim() === '') return;

    this.internalProducts.update((products) => [
      ...products,
      { ...product, id: this.idCounter() }
    ]);
  }

  updateProduct(product: Product) {
    if (product.name.trim() === '') return;

    this.internalProducts.update((products) =>
      products.map((item) => {
        if (item.id === product.id) {
          return product;
        } else {
          return item;
        }
      })
    );
  }

  deleteProductById(id: number) {
    this.internalProducts.update((products) =>
      products.filter((product) => product.id !== id)
    );
  }
}