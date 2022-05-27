import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private auth: AuthService,//для авторизации
    private router: Router,//для редиректа
  ) { }

  ngOnInit(): void {
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
    });
  }
}
