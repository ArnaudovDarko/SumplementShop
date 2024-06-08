import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/_base/_layout/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  proteins: any[] = [];
  total: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.proteins = items;
      this.calculateTotal();
    });
  }

  removeFromCart(protein: any) {
    this.cartService.removeFromCart(protein);
    this.calculateTotal(); 
  }

  calculateTotal() {
    this.total = this.proteins.reduce((acc, item) => {
      const price = item.onDiscount ? item.discountPrice : item.price;
      return acc + (price * item.quantity || 0);
    }, 0);
  }

  getPrice(protein: any) {
    return protein.onDiscount ? protein.discountPrice : protein.price;
  }
}
