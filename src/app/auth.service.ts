import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {empty} from 'rxjs';

@Injectable()
export class AuthService {

  user$ :Observable<firebase.User>;

  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route:ActivatedRoute) {
    this.user$=afAuth.authState;
   }

  login (){
  let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
 // console.log(returnUrl);
  if (returnUrl==null){
  localStorage.setItem('returnUrl','/');
   console.log("login2");
  }
  else {
    localStorage.setItem('returnUrl',returnUrl);
    console.log("login3");

  }
   //  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((res) => this.router.navigate(['']));;

    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
   }

   logout(){

    console.log("test2");

    this.afAuth.auth.signOut();
 }

 get appUser$() :Observable<AppUser>{

  return this.user$
   .pipe(switchMap( 
    user =>{
    if(user) 
      return this.userService.get(user.uid).valueChanges();

      return of(null) ;
    }));
  }
}
