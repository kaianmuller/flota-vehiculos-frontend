import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGenericService } from 'src/app/shared/generic/services/service-generic/service-generic.service';
import { TipoServicio } from 'src/app/shared/models/TipoServicio.model';

@Injectable({
  providedIn: 'root'
})
export class TiposServicioService extends ServiceGenericService<TipoServicio>{

  constructor(private httpClient:HttpClient) {
    super('tipos_servicio',httpClient);
   }
}
