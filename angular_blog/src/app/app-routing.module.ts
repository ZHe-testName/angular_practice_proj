import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {               //для ого чтобы нс при пустом пути редиректило на HomePage
        path: '',      //создаем данный роут
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'post/:id',
        component: PostPageComponent,
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
