import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/shared/interfaces";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    return this.http.post('', user); //возвращаем RxJS стрим
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {  //не сеттер потому что с методом удобнее работать в RxJS стримах
                        //и в него мы будем передавать более широкие параметры
  }
};