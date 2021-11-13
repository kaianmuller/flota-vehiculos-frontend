import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/core/services/servicios/servicios.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { EstadoServicio } from 'src/app/shared/enums/estado-servicio.enum';
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
  
  formErrors:{[k: string]: string} = {};
  
  
    constructor(private servicioServ:ServiciosService,private sysMsg:SystemMessagesService) {
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
        estado: new FormControl(!Utils.isEmpty(this.servicioTarget)?this.servicioTarget.estado:this.estados[0].value,[Validators.required])
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
    
    
    
    submit(event:Event){
      event.preventDefault();
  
      if(this.formServicio.valid){
    
        let servicio:Servicio = new Servicio();
        Object.assign(servicio,Utils.convertUpperCase(this.formServicio.value));
       
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
        chapa: '',
        kilometraje: '',
        fabricante: '',
        ano_modelo: '',
        modelo: '',
        ano_fabricacion: '',
        chassis: '',
        descripcion: ''
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
    
  
    isEmpty(){
      return Utils.isEmpty(this.servicioTarget);
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
