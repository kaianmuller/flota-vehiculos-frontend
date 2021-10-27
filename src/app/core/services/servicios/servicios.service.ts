import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGenericService } from 'src/app/shared/generic/services/service-generic/service-generic.service';
import { Servicio } from 'src/app/shared/models/Servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService extends ServiceGenericService<Servicio>{

  constructor(private readonly http:HttpClient) {
    super('servicios',http);
   }
}
