import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authServ:AuthService) {
   }

  ngOnInit(): void {
    this.items = [
      {label: 'Ajustes',
      items:[
        {
          label:"Tipos de Servicios",
          routerLink:'tipos_servicio',
          icon: 'fas fa-tools'
        },
        {
          label:"Integracion con api externo",
          routerLink:'integration_api',
          icon: 'fas fa-link'
        }
      ]},
  ];
  this.enableAdminOption();
  }




  enableAdminOption(){
    this.items.forEach((item)=>{

     if(item.items){
      item.items.map((i)=>{
        i.disabled = (!!(Utils.adminOptions(i.routerLink) && !this.authServ.isAdmin()))
      });
    }
    
    });
    }




}
