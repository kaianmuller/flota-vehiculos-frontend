import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutosRoutingModule } from './autos-routing.module';
import { AutosComponent } from './autos.component';


@NgModule({
  declarations: [
    AutosComponent
  ],
  imports: [
    CommonModule,
    AutosRoutingModule
  ]
})
export class AutosModule { }
