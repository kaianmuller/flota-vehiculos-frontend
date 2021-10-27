import { DisponibilidadAuto } from "../enums/disponibilidad-auto.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";




export class Auto extends ModelGeneric{

    chapa!:string;
    chassis!:string;
    fabricante!:string;
    modelo!:string;
    kilometraje!:number;
    ano_modelo!:number;
    ano_fabricacion!:number;
    disponibilidad!:DisponibilidadAuto;

}