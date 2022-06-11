import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [
    AuthService,
  ],
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false
  message: string

  constructor(
    public auth: AuthService,//для авторизации//public для доступа в шаблоне
    private router: Router,//для редиректа
    private route: ActivatedRoute, //для чтения строки запроса
  ) { }

  ngOnInit(): void {
    //обработка умышленного перехода по защищенным роутам
    this.route.queryParams.subscribe((params: Params) => { //так как this.route.queryParams это стрим
      if (params['loginAgain']) {
        this.message = 'Please, enter into system';
      }else if(params['authFailed']) {
        this.message = 'Session is over. Enter your data again';
      };
    });

    this.form = new FormGroup({ //инициализируем форму и поля
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if(this.form.invalid) {
      return;
    };

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();

      this.router.navigate(['/admin', 'dashboard']);

      this.submitted = false;
    }, () => { //второй колбек вызывается в случае ошибки
      this.submitted = false; //тут розблокируем кнопочку
    });
  }
}
