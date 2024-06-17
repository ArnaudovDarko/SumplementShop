import { HttpInterceptorFn } from '@angular/common/http';
import { AuthUserService } from 'src/app/core/_base/_layout/services/auth/auth-user.service';
import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
constructor(private auth:AuthUserService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    const myToken = this.auth.getToken();
    if(myToken){
      request =  request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }
 
    return next.handle(request)
  
  }
}


