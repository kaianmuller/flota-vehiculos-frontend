import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGenericService } from 'src/app/shared/generic/services/service-generic/service-generic.service';
import { Auto } from 'src/app/shared/models/Auto.model';
import Utils from 'src/app/shared/utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class AutosService extends ServiceGenericService<Auto>{

  constructor(private readonly http:HttpClient) {
    super('autos',http);
   }



   async existAutoByChapa(chapa:string){
    return this.http.get<boolean>(Utils.ip()+"/autos/existAutoByChapa/"+chapa).toPromise();
   }
}
