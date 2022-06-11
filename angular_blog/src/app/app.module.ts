import { AuthInterceptor } from './shared/auth.interceptor';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//объект для правильного подключения интерсептооров
const INTERCEPTOR_PROVIDE: Provider = {
  provide: HTTP_INTERCEPTORS,//указываем что работаем с интерсепторами
  multi: true,//для того чтобы нескольео интерсепторов не преретирались а добавлялись последовательно
  useClass: AuthInterceptor,
};
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    INTERCEPTOR_PROVIDE,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
