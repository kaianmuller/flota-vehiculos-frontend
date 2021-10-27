import { TipoAgendamiento } from "../enums/tipo-agendamiento.enum";
import { TipoPeriodoAgendamiento } from "../enums/tipo-periodo-agendamiento.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";



export class Agendamiento extends ModelGeneric{

tipo!:TipoAgendamiento;
fecha_objetivo!: Date;
tipo_periodo!:TipoPeriodoAgendamiento;
periodo!:number;

}