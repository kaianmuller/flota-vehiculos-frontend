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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { IntegrationApiComponent } from './pages/integration-api/integration-api.component';
import { ConfigOverviewComponent } from './pages/config-overview/config-overview.component';
@NgModule({
  declarations: [
    TiposServicioComponent,
    ConfiguracionesComponent,
    IntegrationApiComponent,
    ConfigOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
  ],
  providers:[ConfirmationService]
})
export class ConfiguracionesModule { }
