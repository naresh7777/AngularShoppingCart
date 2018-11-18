import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  shipping ={

  name:null,
addressLine2:null,
  addressLine1:null,
  city:null

  };

  cart:Observable<ShoppingCart>;
  
  constructor(private cartService:ShoppingCartService) { 
   
     }

  async ngOnInit() {

   
    this.cart=await this.cartService.getCart();
    //cart$.subscribe(cart=>this.cart=cart);
  }

  placeOrder(){



  }

}
