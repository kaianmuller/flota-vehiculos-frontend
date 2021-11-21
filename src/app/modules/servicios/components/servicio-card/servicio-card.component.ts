import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { ServiciosService } from 'src/app/core/services/servicios/servicios.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { EstadoServicio } from 'src/app/shared/enums/estado-servicio.enum';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Servicio } from 'src/app/shared/models/Servicio.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-servicio-card',
  templateUrl: './servicio-card.component.html',
  styleUrls: ['./servicio-card.component.css']
})
export class ServicioCardComponent implements OnInit {

  @Input() servicioTarget!:Servicio;
  @Output() sendServicio:EventEmitter<Servicio> = new EventEmitter<Servicio>();
  
  formServicio:FormGroup = new FormGroup({});
  loadChapaIcon:boolean = false;
  
  estados:any[] = [];
  tiposServicio:any[] = [];
  
  formErrors:{[k: string]: string} = {};
  

  usuarioSearchConfig:{[key:string]:any} = {
    login: 'string',
    nombre: 'string',
    descripcion: 'string',
    tipo_usuario: TipoUsuario,
    fecha_alteracion:'date',
    fecha_creacion: 'date',
  };

  autoSearchConfig:{[key:string]:any} = {
    disponibilidad:DisponibilidadAuto,
    chapa: 'string',
    kilometraje: 'number',
    fabricante: 'string',
    ano_modelo: 'number',
    modelo: 'string',
    ano_fabricacion: 'number',
    chassis: 'string',
    descripcion: 'string',
    fecha_alteracion:'date',
    fecha_creacion: 'date',
  };


    constructor(private servicioServ:ServiciosService,private sysMsg:SystemMessagesService,readonly usuarioServ:UsuariosService,readonly autoServ:AutosService) {
      this.estados = this.getEstadoServicio();
    }
  
    ngOnInit(): void {
      this.buildForm();
    }
  
    buildForm(){
      this.formServicio = new FormGroup({
        id: new FormControl(this.servicioTarget.id),
        fecha_creacion: new FormControl(this.servicioTarget.fecha_creacion),
        fecha_alteracion: new FormControl(this.servicioTarget.fecha_alteracion),
        descripcion: new FormControl(this.servicioTarget.descripcion,[Validators.maxLength(150)]),
        estado: new FormControl(!Utils.isEmpty(this.servicioTarget)?this.servicioTarget.estado:this.estados[0].value,[Validators.required]),
        fecha_inicio:new FormControl(this.servicioTarget.fecha_inicio,[Validators.required]),
        fecha_fin:new FormControl(this.servicioTarget.fecha_fin,this.verificarEstado('EN_PROCESO')),
        km_inicial:new FormControl(this.servicioTarget.km_inicial,[Validators.required]),
        km_final:new FormControl(this.servicioTarget.km_final,this.verificarEstado('EN_PROCESO')),
        valor_servicio:new FormControl(this.servicioTarget.valor_servicio,this.verificarEstado('EN_PROCESO')),
        usuario: new FormControl(this.servicioTarget.usuario,[Validators.required]),
        auto: new FormControl(this.servicioTarget.auto,[Validators.required]),
      });
  
      this.resetValidate();
  
    }
  

  
  
    validate()
    {
      
      for(let c in this.formServicio.controls){
        this.formErrors[c] = this.sysMsg.getFormMessages(this.formServicio.get(c)?.errors);
      }  
        this.focusFieldError();
    }
    
    
    
    getEstadoServicio(){
    
      let enumKeys = Object.keys(EstadoServicio);
        
      let valores = [];
      
        for(let key of enumKeys){
          valores.push({name:key, value:key});
        }
      
        return valores;
      }
    


      verificarEstado(estado:string){
      if(!Utils.isEmpty(this.servicioTarget)){
        return this.servicioTarget.estado.toString() == estado?[Validators.required]:[];
      }
       return [];
      }
    
    
    submit(event:Event){
      event.preventDefault();
  
      if(this.formServicio.valid){
    
        let servicio:Servicio = new Servicio();
        Object.assign(servicio,this.formServicio.value);
       
        console.log(servicio);
  
        this.sendServicio.emit(servicio);
        
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
        estado: '',
        fecha_inicio:'',
        fecha_fin:'',
        km_inicial:'',
        km_final:'',
        valor_servicio:'',
        usuario: '',
        auto: '',
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
    
    setFormControlValue(field:string,value:any){
      this.formServicio.get(field)?.setValue(value);
    }


    /*
    async exist(control: AbstractControl) {
      this.loadChapaIcon = true;
      return this.servicioServ.existServicioByChapa(control.value.toUpperCase()).then((value) => {
        this.loadChapaIcon = false;
        if(value && Utils.isEmpty(this.servicioTarget)){
          return {'existe':true};
        }else{
          return null;
        }
       });
    }
    */
  
  

}
