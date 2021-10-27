import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceGenericService } from 'src/app/shared/generic/services/service-generic/service-generic.service';
import { Agendamiento } from 'src/app/shared/models/Agendamiento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamientosService extends ServiceGenericService<Agendamiento>{


  constructor(private readonly http:HttpClient) {
    super('agendamientos',http);
   }
}
