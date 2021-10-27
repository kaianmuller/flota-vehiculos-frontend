import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AgendamientosComponent } from './modules/agendamientos/agendamientos.component';
import { AutosComponent } from './modules/autos/autos.component';
import { ConfiguracionesComponent } from './modules/configuraciones/configuraciones.component';
import { ConfiguracionesModule } from './modules/configuraciones/configuraciones.module';
import { TiposServicioComponent } from './modules/configuraciones/pages/tipos-servicio/tipos-servicio.component';
import { CuentaComponent } from './modules/cuenta/cuenta.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ServiciosComponent } from './modules/servicios/servicios.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';

const routes: Routes = [
  { path: '',redirectTo:'home',pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'autos', component: AutosComponent,canActivate:[AuthGuard]},
  { path: 'servicios', component: ServiciosComponent ,canActivate:[AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent ,canActivate:[AuthGuard]},
  { path: 'agendamientos', component: AgendamientosComponent ,canActivate:[AuthGuard]},
  { path: 'cuenta', component: CuentaComponent ,canActivate:[AuthGuard]},
  { path: 'configuraciones', component: ConfiguracionesComponent ,canActivate:[AuthGuard],
      children:[
        { path: '',redirectTo:'tipos_servicio',pathMatch: 'full'},
        { path: 'tipos_servicio', component: TiposServicioComponent,canActivate:[AuthGuard]}
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
