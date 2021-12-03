import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamientosComponent } from './agendamientos.component';
import { AgendamientoCardComponent } from './components/agendamiento-card/agendamiento-card.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    AgendamientosComponent,
    AgendamientoCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule,
    SharedModule,
    ConfirmDialogModule,
  ],
  providers:[ConfirmationService]
})
export class AgendamientosModule { }
