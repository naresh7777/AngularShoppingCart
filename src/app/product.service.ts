import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }


create(product){

 return  this.db.list('/products').push(product);

}

getAll(): Observable<any[]>{

return this.db.list('/products')
.snapshotChanges().pipe(map(actions =>{
return actions.map(action=>
  {
  const $key =action.payload.key;
  const data ={$key,...action.payload.val()};
return data;
  }
)
}
))

}

get(productId){

return this.db.object('/products/'+productId).snapshotChanges();

}

update(productId,product){

  return this.db.object('/products/'+productId).update(product);
}

delete(productId){

return this.db.object('/products/'+productId).remove();
}


}
