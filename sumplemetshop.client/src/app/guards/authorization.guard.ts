import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,Router,RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AccountService } from "../account/account.service";
import { User } from "../account/models/user";
import { SharedService } from "../core/_base/_layout/services/shared.service";

@Injectable({
  providedIn:"root"
})

export class AuthorizationGuard{
  constructor(private accountService:AccountService,
    private sharedService:SharedService,
    private router:Router
   ) {}

   canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user:User | null) =>{
        if(user){
          return true;
        }
        else{
          this.sharedService.showNotification(false, 'Restricted Area', 'Leave immediately');
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
          false;
        }
      })
    );
   }
}