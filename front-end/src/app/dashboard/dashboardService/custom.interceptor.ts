import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const allowRequest1="http://localhost:8080/api/v1/auth/signup";
    const allowRequest2="http://localhost:8080/api/v1/auth/signin";
    
    if(request.url==allowRequest1 || request.url==allowRequest2){
      return next.handle(request);
    }
    else{
    let loggedUserData:any;
    let localdata=sessionStorage.getItem('authToken');

    // if(localdata!=null){
    //   loggedUserData=JSON.parse(localdata);
    // }

    const cloneRequest=request.clone({
      setHeaders:{
        Authorization:`Bearer ${localdata}`
      }
    })
    return next.handle(cloneRequest);
  }
    }
}
