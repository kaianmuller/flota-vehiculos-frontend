import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AutosComponent } from './autos.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AutosComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule
  ]
})
export class AutosModule { }
