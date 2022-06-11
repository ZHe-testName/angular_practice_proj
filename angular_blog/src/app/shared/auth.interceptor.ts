import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../admin/shared/services/auth.service";
//нужен для организации редиректа не авторизированых пользователей
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      //добавляем токен авторизации
      req = req.clone({
        setParams: {
          auth: this.auth.token,
        },
      });
    };

    return next.handle(req) //возвращаем стрим
              .pipe(
                catchError((error: HttpErrorResponse) => {//ловим потенциальные ошибки с сервера
                console.error('[Interceptor Error]', error);

                if(error.status === 401) {
                  this.auth.logout();//очищаем фронтенд от данных авторизации

                  this.router.navigate(['/admin', 'login'], {//радиректим на страницу логина
                    queryParams: {
                      authFailed: true,
                    },
                  })
                };

                return throwError(() => error);//возвращаем стрим с ошибкой для дальнейшей обработки
              }));
  }
};