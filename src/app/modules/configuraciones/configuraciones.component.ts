import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() {
   }

  ngOnInit(): void {
    this.items = [
      {label: 'Ajustes',
      items:[
        {
          label:"Tipos de Servicios",
          routerLink:'tipos_servicio',
        }
      ]},
  ];
  }





}
