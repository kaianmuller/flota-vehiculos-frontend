import { EstadoServicio } from "../enums/estado-servicio.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";


export class Servicio  extends ModelGeneric{

    fecha_inicio!:Date;
    fecha_fin!:Date;
    km_inicial!:number;
    km_final!:number;
    valor_servicio!:number;
    estado!:EstadoServicio;


}