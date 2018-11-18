import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product :{title:null,
          price:0,
          imageUrl:null,
          category:null};
id;

  constructor(private route :ActivatedRoute, 
    private router:Router , 
    private categoryService:CategoryService,
    private productService:ProductService) { 

this.categories$=categoryService.getCategories();

this.id =this.route.snapshot.paramMap.get('id');
//console.log(id);

if(this.id){

  this.productService.get(this.id).pipe(take(1)).subscribe(p=>
    {
     // console.log(p.payload.exportVal());
      this.product=p.payload.exportVal();
      //console.log(this.product);
    
    });
}


  }

  save(product){

  //  console.log(product);

 if(this.id) 
this.productService.update(this.id,product);

else this.productService.create(product);


this.router.navigate(['admin/products']);


  }

  delete(){
  if(!confirm('Are you sure want to delete this product'))  return

this.productService.delete(this.id);
this.router.navigate(['admin/products']);
  }

  ngOnInit() {
  }

}
