import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Query, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  
  items: MenuItem[] = [];

  profile_items: MenuItem[] = [];

  constructor(private authServ:AuthService){
  }


  ngOnInit() {

    this.items = [
    {
        label: 'Home',
        icon:'fas fa-home',
        routerLink: 'home',
    },
    {
      label: 'Autos',
      icon:'fas fa-car',
      routerLink: 'autos',
    },
    {
    label: 'Servicios',
    icon:'fas fa-briefcase',
    routerLink: 'servicios',
    },
    {
    label: 'Usuarios',
    icon:'fas fa-users',
    routerLink: 'usuarios',
    },{ 
    label: 'Agendamientos',
    icon:'fas fa-calendar-alt',
    routerLink: 'agendamientos',
    }  
  ];

      this.profile_items = [
        {
            label: 'Cuenta',
            icon:'fas fa-key',
            routerLink: 'cuenta',
        },
        {
          label: 'Configuraciones',
          icon:'fas fa-cog',
          routerLink: 'configuraciones'
      },
        {
          label: 'Desconectar',
          icon:'fas fa-power-off',
          command:()=>{this.salir()}
      }
    ];

  }

    

  salir(){
    this.authServ.logout();
  }

}
