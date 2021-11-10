import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { Auto } from 'src/app/shared/models/Auto.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-auto-card',
  templateUrl: './auto-card.component.html',
  styleUrls: ['./auto-card.component.css']
})
export class AutoCardComponent implements OnInit {

@Input() autoTarget!:Auto;
@Output() sendAuto:EventEmitter<Auto> = new EventEmitter<Auto>();

formAuto:FormGroup = new FormGroup({});
loadChapaIcon:boolean = false;

disponibilidades:any[] = [];

formErrors:{[k: string]: string} = {};


  constructor(private autoServ:AutosService,private sysMsg:SystemMessagesService) {
    this.disponibilidades = this.getDisponibilidadAuto();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.formAuto = new FormGroup({
      id: new FormControl(this.autoTarget.id),
      fecha_creacion: new FormControl(this.autoTarget.fecha_creacion),
      fecha_alteracion: new FormControl(this.autoTarget.fecha_alteracion),
      descripcion: new FormControl(this.autoTarget.descripcion,[Validators.maxLength(50)]),
      chapa: new FormControl(this.autoTarget.chapa,[Validators.required],[this.exist.bind(this)]),
      chassis: new FormControl(this.autoTarget.chassis,[Validators.required]),
      fabricante: new FormControl(this.autoTarget.fabricante,[Validators.required]),
      modelo: new FormControl(this.autoTarget.modelo,[Validators.required]),
      kilometraje: new FormControl(this.autoTarget.kilometraje,[Validators.required]),
      ano_modelo: new FormControl(this.autoTarget.ano_modelo,[Validators.required]),
      ano_fabricacion: new FormControl(this.autoTarget.ano_fabricacion,[Validators.required]),
      disponibilidad: new FormControl(!Utils.isEmpty(this.autoTarget)?this.autoTarget.disponibilidad:this.disponibilidades[0].value,[Validators.required])
    });

    this.resetValidate();

  }


  validate()
  {
    
    for(let c in this.formAuto.controls){
      this.formErrors[c] = this.sysMsg.getFormMessages(this.formAuto.get(c)?.errors);
    }  
      this.focusFieldError();
  }
  
  
  
  getDisponibilidadAuto(){
  
    let enumKeys = Object.keys(DisponibilidadAuto);
      
    let valores = [];
    
      for(let key of enumKeys){
        valores.push({name:key, value:key});
      }
    
      return valores;
    }
  
  
  
  submit(event:Event){
    event.preventDefault();

    if(this.formAuto.valid){
  
      let auto:Auto = new Auto();
      Object.assign(auto,Utils.convertUpperCase(this.formAuto.value));
     
      console.log(auto);

      this.sendAuto.emit(auto);
      
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
  
  
  
  async exist(control: AbstractControl) {
    this.loadChapaIcon = true;
    return this.autoServ.existAutoByChapa(control.value.toUpperCase()).then((value) => {
      this.loadChapaIcon = false;
      if(value && Utils.isEmpty(this.autoTarget)){
        return {'existe':true};
      }else{
        return null;
      }
     });
  }
  



}
