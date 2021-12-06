import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { ServiciosService } from 'src/app/core/services/servicios/servicios.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { TiposServicioService } from 'src/app/core/services/tipos-servicio/tipos-servicio.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { EstadoServicio } from 'src/app/shared/enums/estado-servicio.enum';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Servicio } from 'src/app/shared/models/Servicio.model';
import Utils from 'src/app/shared/utils/Utils';
import { formatDate } from '@angular/common';
import { SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';

@Component({
  selector: 'app-servicio-card',
  templateUrl: './servicio-card.component.html',
  styleUrls: ['./servicio-card.component.css']
})
export class ServicioCardComponent implements OnInit {

  @Input() servicioTarget!:Servicio;
  @Output() sendServicio:EventEmitter<Servicio> = new EventEmitter<Servicio>();
  @Input() finalizar:boolean = false;


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


  @ViewChild('usuario') userChild!:SearchFilterComponent;
  @ViewChild('auto') autoChild!:SearchFilterComponent;


    constructor(private servicioServ:ServiciosService,private tpServ:TiposServicioService,private sysMsg:SystemMessagesService,readonly usuarioServ:UsuariosService,readonly autoServ:AutosService) {
      this.estados = this.getEstadoServicio();
      this.getTiposServicio();

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
        estado: new FormControl(!Utils.isEmpty(this.servicioTarget)?this.servicioTarget.estado:this.estados[0].value),
        fecha_inicio:new FormControl(!Utils.isEmpty(this.servicioTarget)?formatDate(this.servicioTarget.fecha_inicio,'yyyy-MM-dd','en'):null),
        fecha_fin:new FormControl(!Utils.isEmpty(this.servicioTarget) && this.servicioTarget.fecha_fin?formatDate(this.servicioTarget.fecha_fin,'yyyy-MM-dd','en'):null),
        km_inicial:new FormControl(this.servicioTarget.km_inicial),
        km_final:new FormControl(this.servicioTarget.km_final,[this.requireFinalizacion.bind(this),this.min.bind(this)]),
        valor_servicio:new FormControl(this.servicioTarget.valor_servicio,[this.requireFinalizacion.bind(this),Validators.min(0)]),
        tipo_servicio: new FormControl(!Utils.isEmpty(this.servicioTarget)?this.servicioTarget.tipo_servicio.id:null,[this.requireNuevoServicio.bind(this)]),
        usuario: new FormControl(this.servicioTarget.usuario,[this.requireNuevoServicio.bind(this)]),
        auto: new FormControl(this.servicioTarget.auto,[this.requireNuevoServicio.bind(this)]),
      });


      this.formServicio.get('auto')?.valueChanges.subscribe((value: any)=>{
        if(value) this.getKmFinalAuto(value.id).then((r:any)=>{
                      if(r) this.formServicio.get('km_inicial')?.setValue(r.kilometraje);
                  });
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



      getTiposServicio(){
        this.tpServ.getAll().then((result)=>{this.tiposServicio = result});
      }
      
      getTipoServicio(id:number){
        return this.tiposServicio.find((v:any)=>v.id==id);
      }


    async  getKmFinalAuto(id:number){
      return await this.autoServ.getOne(id);
    }
    
    submit(event:Event){
      event.preventDefault();


      if(this.formServicio.valid){
        let valueServicio = this.formServicio.value;
      
        valueServicio.tipo_servicio = this.getTipoServicio(valueServicio.tipo_servicio);


        if(this.servicioTarget.id && this.finalizar){
          valueServicio.estado = EstadoServicio.FINALIZADO;
        }

        if(this.servicioTarget.id && !this.finalizar){
          valueServicio.estado = EstadoServicio.CANCELADO;
        }

        if(this.servicioTarget.id){
          valueServicio.fecha_fin = Utils.getDate();
        }

        if(!this.servicioTarget.id){
          valueServicio.fecha_inicio = Utils.getDate();
        }

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
      this.userChild.clearSelectInput();
      this.autoChild.clearSelectInput();
      this.buildForm();
      this.resetValidate();
    }
    
    
    
    resetValidate(){
      this.formErrors = {
        tipo_servicio:'',
        auto: '',
        usuario: '',
        km_final:'',
        valor_servicio:'',
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
      this.formServicio.get(field)?.setValue(value);
    }

  
    minDateFecha(control: AbstractControl){
      let dateRef = Utils.isEmpty(this.servicioTarget)?(Utils.getDate(control.value).getTime() <= Utils.getDate().getTime()):false;
        if(control.value && dateRef){
          return {'minDate':true};
        }else{
          return null;
        }
      
    }

    requireNuevoServicio(control: AbstractControl){
      if(!this.servicioTarget.id && control.value == null){
        return {'required':true};
      }else{
        return null;
      }
    }

    requireFinalizacion(control: AbstractControl){
      let evalueValor = this.finalizar?!(this.formServicio.get('valor_servicio')?.value):false;
      if(this.servicioTarget.id && evalueValor && control.value == null){
        return {'required':true};
      }else{
        return null;
      }
    }

    min(control: AbstractControl){
      if(this.servicioTarget.id && control.value <= this.formServicio.get('km_inicial')?.value){
        return {'min':true};
      }else{
        return null;
      }
    }
  

}
