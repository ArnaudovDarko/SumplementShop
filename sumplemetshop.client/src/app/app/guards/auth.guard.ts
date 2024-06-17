
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthUserService } from 'src/app/core/_base/_layout/services/auth/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthUserService, private router: Router, private toast: NgToastService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }else{
       this.toast.danger('detail:"ERROR", summary:"Please Login First!"');
      this.router.navigate(['LogIn'])
      return false;
    }
  }

}