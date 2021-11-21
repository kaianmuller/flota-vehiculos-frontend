import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flota-vehiculos-frontend';


  constructor(private authServ:AuthService,private router:Router){

  }

  isLogged():boolean{
   const stat = this.authServ.isLogged();

   if(!stat && this.router.url != '/login'){
    this.router.navigate(['/login']);
   }

   return stat;
  }
}
