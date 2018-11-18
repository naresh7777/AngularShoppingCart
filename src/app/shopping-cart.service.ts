import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map, switchMap } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){

   console.log("nmnmn");
  return this.db.list('/shopping-carts').push({
dateCreated:new Date().getTime()

  });
 }

 async getCart():Promise<Observable<ShoppingCart>>{
  // let p ={};
  //localStorage.removeItem('cartId');
    let cartId=await this.getOrCreateCart();
    console.log(cartId);
return this.db.object('/shopping-carts/'+cartId)
.snapshotChanges()
.pipe(map(x=> {
return new ShoppingCart(x.payload.exportVal().items)
}
));
 }

 getItem(cartId:string,productId:string){
   
   console.log(productId);
return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);

 }

 
 private async getOrCreateCart():Promise<string>{

  console.log('bkbbkb');

  let cartId=localStorage.getItem('cardId');
  if(cartId) {return cartId}
  else{
let result=await this.create();
localStorage.setItem('cardId',result.key);
return result.key;
  }
}

  addToCart(product:Product){
  this.updateItemQuantity(product,1);
 }

 removeFromCart(product:Product){
  this.updateItemQuantity(product,-1);
}

async clearCart(){
  let cartId= await this.getOrCreateCart();
this.db.object('/shopping-carts/'+cartId+'/items').remove();
}

private async updateItemQuantity(product:Product,change:number){
  let cartId= await this.getOrCreateCart();
  let items$=this.getItem(cartId,product.$key);
  items$.snapshotChanges().pipe(take(1)).subscribe( actions=>{
    if (!actions.payload.exists()){
      items$.update({title:product.title,
            price:product.price,
           imageUrl:product.imageUrl,
           quantity:change
       });
 }

else{
items$.update({quantity:actions.payload.exportVal().quantity+change}); 
  }
});


 }
}
