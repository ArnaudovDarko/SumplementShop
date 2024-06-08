import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadCart();
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(p => p.proteinId === item.proteinId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.updateCart();
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(p => p.proteinId === item.proteinId);
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    }
  }

  private updateCart() {
    sessionStorage.setItem('cart_items2', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  private loadCart() {
    const storedItems = sessionStorage.getItem('cart_items2');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
}
