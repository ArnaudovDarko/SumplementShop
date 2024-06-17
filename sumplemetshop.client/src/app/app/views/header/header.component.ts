import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/_base/_layout/services/cart.service';
import { AuthUserService } from 'src/app/core/_base/_layout/services/auth/auth-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private auth : AuthUserService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  logout(){
this.auth.signOut();
  }
}
