import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
//этот модуль нужен чтобы не дyблировать код
//и в нем подключать нужный функционал который мы будем юзать как
//в админке так и в блоге 
@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
})
export class SharedModule{

};