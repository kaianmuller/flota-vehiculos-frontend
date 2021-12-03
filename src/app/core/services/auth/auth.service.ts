import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Login } from 'src/app/shared/models/Login.model';
import Utils from 'src/app/shared/utils/Utils';







@Injectable({
  providedIn: 'root'
})
export class AuthService{

userLogin:any = null;
userRole:any = null;

  constructor(private router:Router,private http:HttpClient) { 
  }


  async login(login:Login){
    return await this.http.post(Utils.ip()+"/auth/login",login).toPromise().then(result=>this.storage(result));
  }

  storage(result:any){
  localStorage.setItem('token',result.token);
  this.verifyTokenLogin(result.token);
  }

async verifyTokenLogin(token:string){
  this.http.post(Utils.ip()+"/auth/check",{jwt:token}).subscribe(
    (result:any)=>{
      localStorage.setItem('expire',result.exp);
      this.userLogin = result.login;
      this.userRole = result.rol;
      if(window.location.pathname == '/login') this.router.navigate(['/home']);
    }
    );
}


verifyToken(){
  if(this.getToken()){
    this.http.post(Utils.ip()+"/auth/check",{jwt:this.getToken()}).toPromise().then((result:any)=>{
    this.userLogin = result.login;
    this.userRole = result.rol;
    })
  }
}



  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    this.userLogin = null;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getExpire(){
    return localStorage.getItem('expire');
  }


isLogged():boolean{

  let fechaActual = new Date();
  let fechaExpireString = this.getExpire();

  let fechaExpireDate = null;
  if(fechaExpireString){
  fechaExpireDate = new Date(parseInt(fechaExpireString) * 1000);
  }

return (!!this.getToken() && !!fechaExpireDate &&  fechaActual < fechaExpireDate);
}



isAdmin():boolean{
  return this.userRole == TipoUsuario.ADMINISTRADOR;
}

  

}
