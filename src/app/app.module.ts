import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { AutosModule } from './modules/autos/autos.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { InterceptorService } from './core/interceptors/interceptor.service';
import {RouterModule } from '@angular/router';
import { ConfiguracionesModule } from './modules/configuraciones/configuraciones.module';
import { CuentaModule } from './modules/cuenta/cuenta.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AgendamientosModule } from './modules/agendamientos/agendamientos.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    AutosModule,
    ServiciosModule,
    UsuariosModule,
    ConfiguracionesModule,
    CuentaModule,
    SharedModule,
    AgendamientosModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    HomeModule
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
