import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {//это обычный сервис но гуардом его делает имплементация от CanActivate
  constructor(
    private auth: AuthService,
    private route: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthenticated()){
      return true;
    }else {
      this.auth.logout();

      this.route.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true,
        },
      });
    }
  }

};