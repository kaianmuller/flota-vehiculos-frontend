import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CalendarModule} from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    SearchFilterComponent,
    MainMenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    OverlayPanelModule,
    CalendarModule,
    TooltipModule,
    TableModule,
  ],
  exports:[
    MainMenuComponent,
    SearchFilterComponent
  ]
})
export class SharedModule { }
