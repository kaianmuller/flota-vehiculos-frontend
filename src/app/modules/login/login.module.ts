import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
    DialogModule,
    TooltipModule,
    SelectButtonModule,
    ReactiveFormsModule
    
  ],
  providers:[MessageService]
})
export class LoginModule { }
