import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authServ:AuthService,router:Router){}

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon:'pi pi-home',
          },
          {
            label: 'Autos',
            icon:'fas fa-car'
        },
        {
          label: 'Servicios',
          icon:'pi pi-briefcase'
      },
      {
        label: 'Usuarios',
        icon:'pi pi-users'
    },
        
      ];
  }




  salir(){
    this.authServ.logout();
  }
}
