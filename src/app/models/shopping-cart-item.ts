import { Product } from "./product";

export class ShoppingCartItem {

 $key:string;
 title:string;
 imageUrl:string;
 quantity:number;
 price:number;   


//constructor(public product:Product,public quantity :number){}

get totalPrice() {

return this.price*this.quantity;

}



}