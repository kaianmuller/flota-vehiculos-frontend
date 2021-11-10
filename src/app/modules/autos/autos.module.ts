import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AutosComponent } from './autos.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AutoCardComponent } from './components/auto-card/auto-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    AutosComponent,
    AutoCardComponent
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
    SharedModule
  ],
})
export class AutosModule { }
