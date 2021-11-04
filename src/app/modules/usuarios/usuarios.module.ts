import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UsuariosComponent } from './usuarios.component';
import {TableModule} from 'primeng/table';
import {ButtonModule } from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule
  ]
})
export class UsuariosModule { }
