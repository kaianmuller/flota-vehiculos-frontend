import { TipoUsuario } from "../enums/tipo-usuario.enum";
import { ModelGeneric } from "../generic/models/ModelGeneric";




export class Usuario  extends ModelGeneric{

    nombre!:string;
    login!:string;
    contrasena!:string;
    tipo_usuario!:TipoUsuario;

}