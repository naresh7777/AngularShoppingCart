import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories(){

    console.log("chck");

    return this.db.list('/categories').snapshotChanges().pipe(map(actions =>{
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
}
