import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers=request.headers.set('Authorization',`Bearer ${localStorage.getItem('userToken')}`)
                              .append('Content-Type','application/json')
                              .append('Accept','application/json')
    const req=request.clone({headers})
    return next.handle(req);
  }
}
