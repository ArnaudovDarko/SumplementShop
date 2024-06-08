import { Component, OnInit } from '@angular/core';
import { ProteinsService } from 'src/app/core/_base/_layout/services/proteins.service';
import { CartService } from 'src/app/core/_base/_layout/services/cart.service';

@Component({
  selector: 'app-whey-proteins',
  templateUrl: './whey-proteins.component.html',
  styleUrls: ['./whey-proteins.component.css']
})
export class WheyProteinsComponent implements OnInit {
  proteins: any[];
  products: any[] = [];
  openPopup: boolean;
  constructor(private proteinsService: ProteinsService, private cartservice: CartService) { }

  ngOnInit() {
    this.getAllProteins();
    this.loadCart();
  }

  addtocart(addedProduct: any) {
    this.cartservice.addToCart(addedProduct);
    this.showPopup();
  }


  showPopup(): void {
    this.openPopup = true;
    setTimeout(() => {
      this.openPopup = false;
    }, 2000); // 2 seconds
  }

  getAllProteins() {
    this.proteinsService.getAllProteins().subscribe(res => {
      if (res) {
        this.proteins = res;
      }
    });
  }

  private loadCart() {
    const storedItems = sessionStorage.getItem('cart_items2');
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    }
  }
}
