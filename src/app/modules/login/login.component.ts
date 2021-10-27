import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { Login } from 'src/app/shared/models/Login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
login:Login = new Login();
  
dispReg:boolean = false;


  constructor(private readonly authServ:AuthService,private router:Router,private messageService: MessageService,private sysMsg:SystemMessagesService) { }

  ngOnInit(): void {
    this.isLogged();
    this.focusUserInput();

  }

getValue(event:any){
return event.target.value;
}

  entrar(){
    this.authServ.login(this.login).catch((error)=>{this.showFailLoginMessage(error)});
  }


  showFailLoginMessage(error:any){
    this.login = new Login();
    this.messageService.add(this.sysMsg.getSystemMessage(error.status));
  }


  resetFields(){
    this.login = new Login();
  }

async isLogged(){
if(this.authServ.isLogged())
      this.router.navigate(['/']);
}



focusUserInput(){
document.getElementById('user-input')?.focus();
}

focusPassInput(){
  document.getElementById('pass-input')?.focus();
  }

}
