import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGenericService } from 'src/app/shared/generic/services/service-generic/service-generic.service';
import { Usuario } from 'src/app/shared/models/Usuario.model';
import Utils from 'src/app/shared/utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends ServiceGenericService<Usuario>{

  
  constructor(private readonly http:HttpClient) {
    super('usuarios',http);
   }

   async existUserByLogin(login:string){
    return await this.http.get<Boolean>(Utils.ip()+"/usuarios/existUserByLogin/"+login).toPromise();
    }

  async changePassword(obj:any){
    return await this.http.post<Boolean>(Utils.ip()+"/usuarios/change_password",obj).toPromise();
  }


}
