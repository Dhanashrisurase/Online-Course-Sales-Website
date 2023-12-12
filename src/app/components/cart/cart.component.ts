import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../interface/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCartItems();
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: Product): void {
    item.quantity++;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }
  checkOut(): void {
    const totalPrice = this.calculateTotalPrice();
    this.router.navigate(['/'], {
      queryParams: { totalPrice: totalPrice },
    });
  }
}
