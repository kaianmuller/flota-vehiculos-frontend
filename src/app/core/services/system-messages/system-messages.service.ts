import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SystemMessagesService {


systemMessages = Array<{[key:string]:any}>();
formMessages = Array<{[key:string]:any}>();


  constructor() {

    this.systemMessages = [
      {401:{severity:'error', summary:'No se puede acceder al sistema.', detail:'Credenciales invalidas!'}}
    ]



    this.formMessages = 
    [
      {required:'- Este campo es requerido!'},
      {existe:'- El elemento ingresado ya existe en el sistema!'},
      {select:'- Debes seleccionar un elemento!'},
      {maxlength:'- Excediste el numero maximo de caracteres permitido!'},
      {minDate:'- Debes elegir una fecha futura!'},
      {min:'- Este campo requiere un valor superior!'},
    ];

  }


getFormMessages(validator:any){
  
      let msgs = '';
  
  if(validator){
    this.formMessages.map((m)=>{
      let key = Object.keys(m)[0];
        if(validator.hasOwnProperty(key)){
          msgs += m[key] + "\n";
      }
    }
    );
  }

  return msgs;
  }


  getSystemMessage(error:string){
    if(error){
      return this.systemMessages.map(function(m) {
        return m[error];
    });
    }

return {};
}



}
