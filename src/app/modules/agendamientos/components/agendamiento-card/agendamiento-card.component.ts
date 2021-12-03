import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AgendamientosService } from 'src/app/core/services/agendamientos/agendamientos.service';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { TiposServicioService } from 'src/app/core/services/tipos-servicio/tipos-servicio.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { TipoAgendamiento } from 'src/app/shared/enums/tipo-agendamiento.enum';
import { TipoPeriodoAgendamiento } from 'src/app/shared/enums/tipo-periodo-agendamiento.enum';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Agendamiento } from 'src/app/shared/models/Agendamiento.model';
import { TipoServicio } from 'src/app/shared/models/TipoServicio.model';
import Utils from 'src/app/shared/utils/Utils';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agendamiento-card',
  templateUrl: './agendamiento-card.component.html',
  styleUrls: ['./agendamiento-card.component.css']
})
export class AgendamientoCardComponent implements OnInit {
  @Input() agendamientoTarget!:Agendamiento;
  @Output() sendAgendamiento:EventEmitter<Agendamiento> = new EventEmitter<Agendamiento>();
  

  formAgendamiento:FormGroup = new FormGroup({});
  tiposAgendamiento:any[] = [];
  tiposPeriodo:any[] = [];
  
  tiposServicio:any= [];
  
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


  @ViewChild('usuario') userChild!:SearchFilterComponent;
  @ViewChild('auto') autoChild!:SearchFilterComponent;
  

    constructor(private readonly agendServ:AgendamientosService,private sysMsg:SystemMessagesService,readonly usuarioServ:UsuariosService,readonly autoServ:AutosService,readonly tipServ:TiposServicioService) {
  
      this.tiposAgendamiento = this.getTiposAgendamiento();
      this.tiposPeriodo = this.getTiposPeriodo();
  
      this.getTiposDeServicio();
  
     }
  
    ngOnInit(): void {
      this.buildForm();
    }
  
  
  
  buildForm(){
  this.formAgendamiento = new FormGroup({
    id: new FormControl(this.agendamientoTarget.id),
    fecha_creacion: new FormControl(this.agendamientoTarget.fecha_creacion),
    fecha_alteracion: new FormControl(this.agendamientoTarget.fecha_alteracion),
    auto: new FormControl(this.agendamientoTarget.auto,[Validators.required]),
    tipo_servicio: new FormControl(!Utils.isEmpty(this.agendamientoTarget)?this.agendamientoTarget.tipo_servicio.id:null,[Validators.required]),
    usuario:new FormControl(this.agendamientoTarget.usuario,[Validators.required]),
    tipo: new FormControl(!Utils.isEmpty(this.agendamientoTarget)?this.agendamientoTarget.tipo:this.tiposAgendamiento[0].value,[Validators.required]),
    fecha_objetivo: new FormControl(!Utils.isEmpty(this.agendamientoTarget)?formatDate(this.agendamientoTarget.fecha_objetivo,'yyyy-MM-dd','en'):null,[this.requireFechaObjetivo.bind(this),this.minDateFechaObjetivo.bind(this)]),
    tipo_periodo: new FormControl(!Utils.isEmpty(this.agendamientoTarget)?this.agendamientoTarget.tipo_periodo:this.tiposPeriodo[0].value),
    periodo:new FormControl(this.agendamientoTarget.periodo,[this.requirePeriodo.bind(this),Validators.min(1)]),
    descripcion: new FormControl(this.agendamientoTarget.descripcion,[Validators.maxLength(150)]),
  });

  this.formAgendamiento.get('tipo')?.valueChanges.subscribe((control:AbstractControl)=>{
    this.formAgendamiento.get('fecha_objetivo')?.updateValueAndValidity();
    this.formAgendamiento.get('periodo')?.updateValueAndValidity();
  });
  
  this.resetValidate();
  
  }
  
  
  
  validate()
  {

    this.resetValidate();
    
    for(let c in this.formAgendamiento.controls){
      this.formErrors[c] = this.sysMsg.getFormMessages(this.formAgendamiento.get(c)?.errors);
    }  

      this.focusFieldError();
  }
  
  
  getTiposAgendamiento(){
    
  let enumKeys = Object.keys(TipoAgendamiento);
    
  let valores = [];
  
    for(let key of enumKeys){
      valores.push({name:key, value:key});
    }
  
    return valores;
  }
  

  getTiposPeriodo(){
    
    let enumKeys = Object.keys(TipoPeriodoAgendamiento);
      
    let valores = [];
    
      for(let key of enumKeys){
        valores.push({name:key, value:key});
      }
    
      return valores;
    }



    getTiposDeServicio(){
        this.tipServ.getAll().then((result)=>this.tiposServicio = result);
    }

    getTipoServicio(id:number){
      return this.tiposServicio.find((v:any)=>v.id==id);
    }

  
  
  
  submit(event:Event){
    event.preventDefault();
    

    if(this.formAgendamiento.valid){
  
      let valueAgendamiento = this.formAgendamiento.value;
      
      valueAgendamiento.tipo_servicio = this.getTipoServicio(valueAgendamiento.tipo_servicio);

      if( valueAgendamiento.fecha_objetivo){
        valueAgendamiento.fecha_objetivo = Utils.getDate(valueAgendamiento.fecha_objetivo);
      }

      let agendamiento:Agendamiento = new Agendamiento();
      Object.assign(agendamiento,this.formAgendamiento.value);
      console.log(agendamiento);

      this.sendAgendamiento.emit(agendamiento);
      
      this.resetForm();

    }else{
      this.validate();
    }
  
  }
  
  
  
  resetForm(){
    this.userChild.clearSelectInput();
    this.autoChild.clearSelectInput();
    this.buildForm();
    this.resetValidate();
  }
  
  
  
  resetValidate(){
    this.formErrors = {
      auto:'',
      usuario:'',
      tipo_servicio:'',
      descripcion:'',
      fecha_objetivo:'',
      periodo:'',
    };
  }
  
  
  
  
  
  markField(name:string){
  return this.formErrors[name] != ''?{border: 'solid 2px red'}:{};
  }
  
  focusFieldError(){
    for(let e in this.formErrors){
      if(this.formErrors[e]!=''){
        document.getElementById(e)?.focus();
        if(e == 'usuario'){this.userChild.focusSearchInput()}
        if(e == 'auto'){this.autoChild.focusSearchInput()}
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
    this.formAgendamiento.get(field)?.setValue(value);
  }




  minDateFechaObjetivo(control: AbstractControl){
    let dateRef = Utils.isEmpty(this.agendamientoTarget)?(Utils.getDate(control.value).getTime() <= Utils.getDate().getTime()):false;
      if(control.value && dateRef){
        return {'minDate':true};
      }else{
        return null;
      }
    
  }

 requireFechaObjetivo(control: AbstractControl){
    if(this.formAgendamiento.get('tipo')?.value == 'FIJO' && !control.value){
      return {'required':true};
    }else{
      return null;
    }
}

requirePeriodo(control: AbstractControl){
  if(this.formAgendamiento.get('tipo')?.value == 'PERIODICO' && control.value == null){
    return {'required':true};
  }else{
    return null;
  }
}



}
