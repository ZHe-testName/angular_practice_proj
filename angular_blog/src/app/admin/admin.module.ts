import { AuthGuard } from './shared/services/auth.guard';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
//модлуль для админки нужен для того чтобы можно было воспользоваться ленивой загрузкой еслии он не нужен
@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    SharedModule,
    FormsModule, //для возможности использования форм
    ReactiveFormsModule, //для их реактивности
    CommonModule, //для того чтобы у нас были доступны все фишечки по типу пайпов дирректив и т.п.
    RouterModule.forChild([ //тут маршруты которык пренадлежат админке
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            component: LoginPageComponent,
          },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard], //защищаем нужные роуты
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthGuard], //защищаем нужные роуты
          },
          {
            path: 'post/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard], //защищаем нужные роуты
          },
        ],
      }
    ]),
  ],
  providers: [
    AuthGuard, 
    AlertService,
  ],
  exports: [
    RouterModule, //экспортируем для того чтобы он работал в главном модуле
  ],
})
export class AdminModule {};