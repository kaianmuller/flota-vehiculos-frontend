import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Usuario } from 'src/app/shared/models/Usuario.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


formReg:FormGroup = new FormGroup({});
tiposUsuario:any[] = [];
loadUserIcon:boolean = false;


formErrors:{[k: string]: string} = {};


  constructor(private readonly userServ:UsuariosService,private sysMsg:SystemMessagesService) {

    this.tiposUsuario = this.getTiposUsuario();


   }

  ngOnInit(): void {
    this.resetValidate();
    this.buildForm();
  }



buildForm(){
this.formReg = new FormGroup({
  fecha_creacion: new FormControl(),
  nombre: new FormControl('',[Validators.required]),
  login: new FormControl('',[Validators.required],[this.exist.bind(this)]),
  contrasena: new FormControl('',[Validators.required]),
  rep_contrasena: new FormControl('',[Validators.required]),
  tipo_usuario: new FormControl(this.getTiposUsuario()[0].value,[Validators.required])
});

this.formReg.valueChanges.subscribe(()=>{
  this.validate();
});

}



validate()
{
  
  for(let c in this.formReg.controls){
    this.formErrors[c] = this.sysMsg.getFormMessages(this.formReg.get(c)?.errors);
  }
    this.formErrors.rep_contrasena = this.validRep()?this.sysMsg.getFormMessages(this.formReg.get('rep_contrasena')?.errors):"La contrasena repetida no es igual a la original!";

}



getTiposUsuario(){
  

let enumValues = Object.values(TipoUsuario);

let tipos = [];

  for(let tipo of enumValues){
    tipos.push({name:tipo.toString(),value:tipo});
  }

  return tipos;
}




submit(event:Event){
  event.preventDefault();


  const value = this.formReg.value;
  delete value.rep_contrasena;
  value.fecha_creacion = new Date();

  let user:Usuario = new Usuario();
  Object.assign(user,value);



  if(this.formReg.valid && this.validRep()){
    console.log(user);
    this.userServ.createOne(user).then((result)=>{
      this.resetForm();
    });
  }else{
    this.validate();
  }

}



resetForm(){
  this.buildForm();
  this.resetValidate();
}



resetValidate(){
  this.formErrors = {
    nombre:'',
    login: '',
    contrasena: '',
    rep_contrasena: '',
  };
}


validRep(){
  return (this.formReg.get('contrasena')?.value === this.formReg.get('rep_contrasena')?.value);
}




markField(name:string){

  for(let key in this.formErrors){
    if(key==name && this.formErrors[key]!=""){
      return {border: 'solid 2px red'};
    }
  }
  return {};
}





focusField(field:string){
document.getElementById(field)?.focus();
}



exist(control: AbstractControl) {
  this.loadUserIcon = true;
  return this.userServ.existUserByLogin(control.value).then((value) => {
    this.loadUserIcon = false;
    if(value){
      return {'existe':true};
    }else{
      return null;
    }
   });
}




}
