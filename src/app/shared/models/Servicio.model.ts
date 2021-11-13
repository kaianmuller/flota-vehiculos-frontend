import { EstadoServicio } from "../enums/estado-servicio.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";
import { Auto } from "./Auto.model";
import { TipoServicio } from "./TipoServicio.model";
import { Usuario } from "./Usuario.model";


export class Servicio  extends ModelGeneric{

    fecha_inicio!:Date;
    fecha_fin!:Date;
    km_inicial!:number;
    km_final!:number;
    valor_servicio!:number;
    estado!:EstadoServicio;
    tipo_servicio!:TipoServicio;
    auto!:Auto;
    usuario!:Usuario;


}