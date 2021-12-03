import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth/auth.service';
import { SystemMessagesService } from './core/services/system-messages/system-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flota-vehiculos-frontend';


  dispLogin:boolean = false;

  constructor(private authServ:AuthService,private router:Router,private messageService: MessageService,private sysMsg:SystemMessagesService){
    this.authServ.verifyToken();
  }


  ngOnInit(){
  }

  isLogged():boolean{
  this.dispLogin = (!this.authServ.isLogged() && window.location.pathname != '/login');
   return this.authServ.isLogged();
  }




  showLoginFailMessage(error:any){
    this.messageService.add(this.sysMsg.getSystemMessage(error.status));
  }
}
