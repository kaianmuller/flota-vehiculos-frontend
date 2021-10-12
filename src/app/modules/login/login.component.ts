import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Login } from 'src/app/shared/models/Login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
login:Login = new Login();
  
dispReg:boolean = false;

  constructor(private authServ:AuthService,private router:Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.checkToken();
    this.focusUserInput();
  }

getValue(event:any){
return event.target.value;
}

  entrar(){
    this.authServ.login(this.login).catch((error)=>{this.showFailLoginMessage(error)});
  }


  showFailLoginMessage(error:any){
    console.log(error.status);
    if(error.status == 401)
    this.messageService.add({severity:'error', summary:'No se pudo acceder al sistema.', detail:'Credenciales equivocadas!'});
  }


async checkToken(){
if(this.authServ.isLogged())
      this.router.navigate(['']);
}



focusUserInput(){
document.getElementById('user-input')?.focus();
}

focusPassInput(){
  document.getElementById('pass-input')?.focus();
  }

}
