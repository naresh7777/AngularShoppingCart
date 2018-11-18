import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products$;
  category :string;
  products :Product[]=[];
  filteredProducts:Product[]=[];
  cart:any;
  subscription:Subscription;

  constructor( productService:ProductService,route:ActivatedRoute,
  private cartService:ShoppingCartService) {
 productService.getAll().subscribe(p=>{
this.products=p;
route.queryParamMap.subscribe(params=>{
  this.category=params.get('category');
  console.log(this.category);
  this.filteredProducts=(this.category) ?
  this.products.filter(k=>
    k.category===this.category):
  this.products;
  });
 });
  
   }

async ngOnInit() {
  this.subscription= (await this.cartService.getCart()).subscribe(cart=>{
   console.log('fkfkfkfkh'+cart);
//   localStorage.removeItem('cartId');
    this.cart=cart});
  }

 ngOnDestroy(){
this.subscription.unsubscribe();

 } 

}
