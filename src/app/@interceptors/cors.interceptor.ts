import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modified = request;
    if (request.url.startsWith('https://gist.github.com/88e1565bea2dd1ff9180ff733617a565.git')) {
      const headersConfig: any = {
        'Accept': 'text/html; charset=utf-8',
        'Origin': 'https://gist.github.com/88e1565bea2dd1ff9180ff733617a565.git'
      };
      modified = request.clone({ setHeaders: headersConfig });
    }
    return next.handle(modified);
  }
}
