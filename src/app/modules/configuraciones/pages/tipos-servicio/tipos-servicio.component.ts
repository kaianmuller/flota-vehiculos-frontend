import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { TiposServicioService } from 'src/app/core/services/tipos-servicio/tipos-servicio.service';
import { TipoServicio } from 'src/app/shared/models/TipoServicio.model';

@Component({
  selector: 'app-tipos-servicio',
  templateUrl: './tipos-servicio.component.html',
  styleUrls: ['./tipos-servicio.component.css']
})
export class TiposServicioComponent implements OnInit {

  itemsList:Array<TipoServicio> = new Array<TipoServicio>();

  itemTarget:TipoServicio = new TipoServicio();

  edit:any = null;
  
  formTS = new FormGroup({});
  formErrors:{[key:string]:string} = {};
  

  constructor(private tipServ:TiposServicioService,private sysMsg:SystemMessagesService) { }

  ngOnInit(): void {
    this.getItems();
    this.resetValidate();
    this.buildForm();
  }


  buildForm(){
    this.formTS = new FormGroup({
      id: new FormControl(this.itemTarget.id),
      descripcion: new FormControl(this.itemTarget.descripcion,[Validators.required]),
    });



    this.formTS.valueChanges.subscribe(()=>{
      this.validate();
    });

    }
    
    
    
    validate(){
      
      for(let c in this.formTS.controls){
        this.formErrors[c] = this.sysMsg.getFormMessages(this.formTS.get(c)?.errors);
      }

      if((this.edit == null || this.edit == true) && !this.itemTarget.id){
        this.formErrors['descripcion'] = "- Debes seleccionar un elemento!";
      }
      
    }
  
    
    resetForm(){
      this.itemTarget = new TipoServicio();
      this.buildForm();
      this.resetValidate();
      this.getItems();
    }
    
    
    
    resetValidate(){
      this.formErrors =  {
        descripcion:''
      };
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





    getItems(){
      this.tipServ.getAll().then((result)=>this.itemsList = result);
    }


    
    selectItem(event:any){
      this.itemsList.map((item)=>{
        if(item.id==event.target.value){
          this.itemTarget = item;
        }
      });

      if(!event.target.value){
        this.resetForm();
      }

    }

    editItem(){
      if(this.itemTarget.id){
        this.edit = true;
        this.buildForm();
      }else{
        this.validate();
      }
    }





    submit(event:Event){
      event.preventDefault();
    
    
      const value = this.formTS.value;
      
      
      Object.assign(this.itemTarget,value);
     
      this.itemTarget.fecha_creacion = new Date();
    
      if(this.formTS.valid){

          if(this.edit == true){
            this.tipServ.editOne(this.itemTarget,this.itemTarget.id).then(
              ()=> {this.resetForm();this.getItems();this.edit=null}
            );
          }else if(this.edit == false){
            this.tipServ.createOne(this.itemTarget).then(
              ()=> {this.resetForm();this.getItems();this.edit=null;}
            );
      }
      
      }else{
        this.validate();
      }
    
    }






    deleteItem(){
      if(this.itemTarget.id){
      this.tipServ.deleteOne(this.itemTarget.id).then(()=>{this.getItems();this.resetValidate();});
      }else{
        this.validate();
      }
    }






}
