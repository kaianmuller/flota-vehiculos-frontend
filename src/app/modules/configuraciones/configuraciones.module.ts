import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TiposServicioComponent } from './pages/tipos-servicio/tipos-servicio.component';

import { RouterModule } from '@angular/router';
import { ConfiguracionesComponent } from './configuraciones.component';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    TiposServicioComponent,
    ConfiguracionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TooltipModule
    
  ]
})
export class ConfiguracionesModule { }
