import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/Login.model';
import Utils from 'src/app/shared/Utils/Utils';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private router:Router,private http:HttpClient) { 

  }



  async login(login:Login){
    return await this.http.post(Utils.ip()+"/auth/login",login).toPromise().then(result=>this.storage(result));
  }

  storage(result:any){
  localStorage.setItem('access_token',result.access_token);
  this.verifyToken(result.access_token);
  }

async verifyToken(token:string){
  this.http.post(Utils.ip()+"/auth/check",{jwt:token}).subscribe(
    (result:any)=>{
      localStorage.setItem('expire_at',result.exp);
      this.router.navigate(['/']);
    }
    );
}



  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('expire_at');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  getExpire(){
    return localStorage.getItem('expire_at');
  }

isLogged():boolean{

  let fechaActual = new Date();
  let fechaExpireString = this.getExpire();

  let fechaExpireDate = null;

  if(fechaExpireString){
  fechaExpireDate = new Date();
  fechaExpireDate.setUTCMilliseconds(parseInt(fechaExpireString));
  }



return (!!this.getToken() && !!fechaExpireDate &&  fechaActual < fechaExpireDate);
}

  

}
