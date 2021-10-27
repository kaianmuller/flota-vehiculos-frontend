import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MenuComponent } from './shared/components/menu/menu.component';

import {MenubarModule} from 'primeng/menubar';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { AutosModule } from './modules/autos/autos.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ButtonModule } from 'primeng/button';
import { InterceptorService } from './core/interceptors/interceptor.service';
import {MenuModule} from 'primeng/menu';
import {SharedModule} from 'primeng/api';
import {RouterModule } from '@angular/router';
import { ConfiguracionesModule } from './modules/configuraciones/configuraciones.module';
import { CuentaModule } from './modules/cuenta/cuenta.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MenubarModule,
    LoginModule,
    HomeModule,
    AutosModule,
    ServiciosModule,
    UsuariosModule,
    ButtonModule,
    MenuModule,
    SharedModule,
    ConfiguracionesModule,
    CuentaModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
