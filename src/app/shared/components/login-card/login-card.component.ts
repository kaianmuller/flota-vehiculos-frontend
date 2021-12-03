import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { Login } from '../../models/Login.model';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

@Output() sendFailLoginError:EventEmitter<any> = new EventEmitter<any>();


  login:Login = new Login();
  dispReg:boolean = false;
  
  
    constructor(private readonly authServ:AuthService) { }
  
    ngOnInit(): void {
      this.resetFields();
      this.focusUserInput();
    }
  
  getValue(event:any){
  return event.target.value;
  }
  
    entrar(){
      this.authServ.login(this.login).catch((error)=>{this.sendFailLoginMessage(error)});
    }
  
  
    sendFailLoginMessage(error:any){
      this.sendFailLoginError.emit(error);
      this.login = new Login();
    }
  
  
    resetFields(){
      this.login = new Login();
    }

  
  
  
  focusUserInput(){
  document.getElementById('user-input')?.focus();
  }
  
  focusPassInput(){
    document.getElementById('pass-input')?.focus();
    }





  }