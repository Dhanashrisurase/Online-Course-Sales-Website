import { Injectable } from '@angular/core';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  constructor() {}
  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(product: Product): void {
    console.log('Product received:', product);
    const existingProductIndex = this.cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      console.log('Product already in cart. Incrementing quantity.');
      this.cartItems[existingProductIndex].quantity++;
    } else {
      console.log('Adding new product to cart.');
      this.cartItems.push({ ...product, quantity: 1 });
    }

    console.log('Updated cart items:', this.cartItems);
  }

  removeFromCart(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
