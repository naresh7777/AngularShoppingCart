import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth.service';
import {AuthGuard} from  './auth-guard.service'
import {UserService} from './user.service';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartsComponent } from './shopping-carts/shopping-carts.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {LoginComponent} from './login/login.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AppUser } from './models/app-user';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import {  FormsModule } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    BsNavbarComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
   FormsModule,
  
    CustomFormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartsComponent},
      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuard]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuard]},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},


      {path:'login',component:LoginComponent}
    ])  

  ],
  providers: [AuthService,AuthGuard,UserService,AdminAuthGuard,CategoryService,ProductService,ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
