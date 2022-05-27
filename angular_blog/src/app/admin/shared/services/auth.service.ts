import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-life-time'));//получаем время жизни и превращаем в дату

    if(expDate < new Date()) {//если оно истекло то вылогиниваемся и возвращаем null
      this.logout();

      return null;
    };

    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user) //возвращаем RxJS стрим
      .pipe(
        tap(this.setToken),
        //catchError оператор нужен для отлова ошибок внашем случае ошибки авторизации
        catchError(this.handleError.bind(this))//чтобы не терять контекст
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {

  }

  private setToken(response: FbAuthResponse | null) {  //не сеттер потому что с методом удобнее работать в RxJS стримах и в него мы будем передавать более широкие параметры
    if(response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000); //создаем переменную для хранения жизни токена

      localStorage.setItem('fb-token', response.idToken); //сохраняем токен
      localStorage.setItem('fb-token-life-time', expData.toString());//и время жизни токена

      return;
    };

    localStorage.clear();
  }
};