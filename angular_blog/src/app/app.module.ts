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
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//для применения локализации в дате
registerLocaleData(ruLocale, 'ru');

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    INTERCEPTOR_PROVIDE,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
