import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http : HttpClient, private router: Router) { }

signOut(){
  localStorage.clear();
  this.router.navigate(['LogIn'])
}

  signUp(userObj:any){
    return this.http.post<any[]>(
      environment.apiURL + "Users/register", userObj
    )
  }

  login(loginObj:any){
    return this.http.post<any>(
      environment.apiURL + "Users/authenticate", loginObj
    )
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
}
