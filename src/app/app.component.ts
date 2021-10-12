import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flota-vehiculos-frontend';


  constructor(private authServ:AuthService){

  }

  isLogged():boolean{
   return  this.authServ.isLogged();
  }
}
