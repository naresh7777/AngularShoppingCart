import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-carts',
  templateUrl: './shopping-carts.component.html',
  styleUrls: ['./shopping-carts.component.css']
})
export class ShoppingCartsComponent implements OnInit {

  cart$;

  constructor(private cartService:ShoppingCartService) { }

async ngOnInit() {

    this.cart$=await this.cartService.getCart();
  }

  clearCart(){
this.cartService.clearCart();

  }


}
