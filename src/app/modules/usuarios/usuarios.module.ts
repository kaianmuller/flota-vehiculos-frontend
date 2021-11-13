import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UsuariosComponent } from './usuarios.component';
import {TableModule} from 'primeng/table';
import {ButtonModule } from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import { UsuarioCardComponent } from './components/usuario-card/usuario-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioCardComponent
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
    SharedModule
  ]
})
export class UsuariosModule { }
