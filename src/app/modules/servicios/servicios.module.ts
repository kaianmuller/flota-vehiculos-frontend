import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosComponent } from './servicios.component';
import { ServicioCardComponent } from './components/servicio-card/servicio-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    ServiciosComponent,
    ServicioCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    SharedModule,
    ConfirmDialogModule,
  ],
  providers:[ConfirmationService]
})
export class ServiciosModule { }
