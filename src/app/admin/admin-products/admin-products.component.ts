import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
//import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit ,OnDestroy{

  products :Product[];
  filteredProducts:Product[];
  subscription:Subscription;
  //tableResource:DataTableResource<any>;
  items :any[];
  itemCount :number;

  constructor(private productService:ProductService) { 

   this.subscription= this.productService.getAll()
   .subscribe(p=>{
    this.filteredProducts=this.products=p;
 // this.initializeTable(p);
  });
  }

 // private initializeTable(products:any[]){
//this.tableResource=new DataTableResource(products);
//this.tableResource.query({offset:0})
//.then(items=>this.items=items);
//this.tableResource.count()
//.then(count=>this.itemCount=count);

  //}

  //reloadItems(params){

   // if(!this.tableResource) return

    //this.tableResource.query(params)
//.then(items=>this.items=items);


 // }


  filter(query:string){

    //this.filteredProducts=this.filteredProducts.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()));
this.filteredProducts =(query) ?
this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
this.products;


  }

  ngOnDestroy(){

this.subscription.unsubscribe();

  }

  ngOnInit() {
  }

}