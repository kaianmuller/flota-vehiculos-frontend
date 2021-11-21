import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Usuario } from 'src/app/shared/models/Usuario.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-usuario-card',
  templateUrl: './usuario-card.component.html',
  styleUrls: ['./usuario-card.component.css']
})
export class UsuarioCardComponent implements OnInit {

  @Input() usuarioTarget!:Usuario;
  @Output() sendUsuario:EventEmitter<Usuario> = new EventEmitter<Usuario>();
  

  formUsuario:FormGroup = new FormGroup({});
  tiposUsuario:any[] = [];
  loadUserIcon:boolean = false;
  
  
  formErrors:{[k: string]: string} = {};
  
  
    constructor(private readonly userServ:UsuariosService,private sysMsg:SystemMessagesService) {
  
      this.tiposUsuario = this.getTiposUsuario();
  
  
     }
  
    ngOnInit(): void {
      console.log(this.usuarioTarget);
      this.buildForm();
    }
  
  
  
  buildForm(){
  this.formUsuario = new FormGroup({
    id: new FormControl(this.usuarioTarget.id),
    fecha_creacion: new FormControl(this.usuarioTarget.fecha_creacion),
    fecha_alteracion: new FormControl(this.usuarioTarget.fecha_alteracion),
    descripcion: new FormControl(this.usuarioTarget.descripcion,[Validators.maxLength(150)]),
    nombre: new FormControl(this.usuarioTarget.nombre,[Validators.required]),
    login: new FormControl(this.usuarioTarget.login,[Validators.required],[this.exist.bind(this)]),
    tipo_usuario: new FormControl(!Utils.isEmpty(this.usuarioTarget)?this.usuarioTarget.tipo_usuario:this.tiposUsuario[0].value,[Validators.required]),
  });
  
  this.resetValidate();
  
  }
  
  
  
  validate()
  {
    
    for(let c in this.formUsuario.controls){
      this.formErrors[c] = this.sysMsg.getFormMessages(this.formUsuario.get(c)?.errors);
    }  
      this.focusFieldError();
  }
  
  
  
  getTiposUsuario(){
    
  let enumKeys = Object.keys(TipoUsuario);
    
  let valores = [];
  
    for(let key of enumKeys){
      valores.push({name:key, value:key});
    }
  
    return valores;
  }
  
  
  
  
  submit(event:Event){
    event.preventDefault();
  
    if(this.formUsuario.valid){
  
      let auto:Usuario = new Usuario();
      Object.assign(auto,this.formUsuario.value);
     
      console.log(auto);

      this.sendUsuario.emit(auto);
      
      this.resetForm();

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
      descripcion:''
    };
  }
  
  
  
  
  
  markField(name:string){
  return this.formErrors[name] != ''?{border: 'solid 2px red'}:{};
  }
  
  focusFieldError(){
    for(let e in this.formErrors){
      if(this.formErrors[e]!=''){
        document.getElementById(e)?.focus();
        break;
      }
    }
  }
  
  
  
  focusField(field:string){
  document.getElementById(field)?.focus();
  }
  


  isEmpty(item:any){
    return Utils.isEmpty(item);
  }
  
  
  async exist(control: AbstractControl) {
    this.loadUserIcon = true;
    return this.userServ.existUserByLogin(control.value).then((value) => {
      this.loadUserIcon = false;
      if(value && Utils.isEmpty(this.usuarioTarget)){
        return {'existe':true};
      }else{
        return null;
      }
     });
  }
  

}
