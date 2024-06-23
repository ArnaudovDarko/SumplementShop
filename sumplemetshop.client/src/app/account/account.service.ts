import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Register } from './models/register';
import { Login } from './models/login';
import { User } from './models/user';
import { Observable, ReplaySubject,map, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();
  constructor(private http: HttpClient, private router:Router) { }


refreshUser(jwt:string | null){
   if(jwt === null){
    this.userSource.next(null);
    return of(undefined);
   }

   let headers = new HttpHeaders();
   headers = headers.set('Authorization', 'Bearer ' + jwt);

   return this.http.get<User>(environment.apiURL + "account/refresh-user-token",{headers}).pipe(
    map((user:User) =>{
      if(user){
        this.setUser(user);
      }
    })
   )
}

  login(model: Login){
   return this.http.post<User>(environment.apiURL + "account/login", model).pipe(
    map((user:User)=>{
      if(user){
        this.setUser(user);
        return user;
      }
    })
   )
  }

  logOut(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
   this.router.navigateByUrl('/')
  }
  register(model: Register){
    return this.http.post(environment.apiURL + "account/register", model)
   }

   getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user: User = JSON.parse(key);
      return user.jwt;
    } else{
      return null;
    }
   }

   private setUser(user: User){
   localStorage.setItem(environment.userKey, JSON.stringify(user));
   this.userSource.next(user);
   }
}
