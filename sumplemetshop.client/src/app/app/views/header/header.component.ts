import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { CartService } from 'src/app/core/_base/_layout/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService,public accountService:AccountService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  logOut() {
   this.accountService.logOut();
  }
}
