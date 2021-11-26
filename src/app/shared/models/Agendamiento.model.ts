import { TipoAgendamiento } from "../enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "../enums/tipo-periodo-agendamiento.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";
import { Auto } from "./Auto.model";
import { TipoServicio } from "./TipoServicio.model";
import { Usuario } from "./Usuario.model";



export class Agendamiento extends ModelGeneric{

tipo!:TipoAgendamiento;
fecha_objetivo!: Date;
tipo_periodo!:TipoPeriodoAgendamiento;
periodo!:number;
tipo_servicio!:TipoServicio;
auto!:Auto;
usuario!:Usuario;

}