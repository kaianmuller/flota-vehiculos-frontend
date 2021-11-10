import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';



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
    ButtonModule
  ],
  exports:[
    MainMenuComponent
  ]
})
export class SharedModule { }
