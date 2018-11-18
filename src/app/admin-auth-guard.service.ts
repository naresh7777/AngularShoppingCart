import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap,map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate  {

  constructor(private auth:AuthService,private userService :UserService) { }


  canActivate():Observable<boolean>{

   return this.auth.appUser$ 
   .pipe(map(appUser=>appUser.isAdmin))
   
   }
}
