import { Component } from '@angular/core';
import { ProteinsService } from 'src/app/core/_base/_layout/services/proteins.service';
import { CartService } from 'src/app/core/_base/_layout/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  proteins: any[];
  proteinid: number;

  products: any[] = [];

  constructor(private ProteinsService: ProteinsService,private CartService: CartService,
  ) { }

ngOnInit() {
  this.getAllProteins();
  this.loadCart();

}
private loadCart() {
  const storedItems = sessionStorage.getItem('cart_items2');
  if (storedItems) {
    this.products = JSON.parse(storedItems);
  }
}


addtocart(addedProduct: any) {
  this.CartService.addToCart(addedProduct);
}

savecart()
{
  sessionStorage.setItem('cart_items', JSON.stringify(this.products))
}

getAllProteins()
  {
     this.ProteinsService.GetDiscountProducts().subscribe(
      res =>{
        if(res)
          {
           
             this.proteins = res; 
          }
      }
     );
  }
}
