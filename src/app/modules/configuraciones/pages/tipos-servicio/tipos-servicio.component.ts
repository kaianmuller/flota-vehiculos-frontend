import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { TiposServicioService } from 'src/app/core/services/tipos-servicio/tipos-servicio.service';
import { TipoServicio } from 'src/app/shared/models/TipoServicio.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-tipos-servicio',
  templateUrl: './tipos-servicio.component.html',
  styleUrls: ['./tipos-servicio.component.css']
})
export class TiposServicioComponent implements OnInit {

  items:TipoServicio[] = new Array<TipoServicio>();

  itemTarget:TipoServicio = new TipoServicio();

  edit:any = null;
  
  formTS = new FormGroup({});
  formErrors:{[key:string]:string} = {};
  
  loadDescIcon = false;

  constructor(private tipServ:TiposServicioService,private confirmationService: ConfirmationService,private sysMsg:SystemMessagesService) { }

  ngOnInit(): void {
    this.getItems();
    this.resetValidate();
    this.buildForm();
  }


  buildForm(){
    this.formTS = new FormGroup({
      id: new FormControl(this.itemTarget.id),
      descripcion: new FormControl(this.itemTarget.descripcion,[Validators.required],[this.exist.bind(this)]),
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


      this.focusFieldError();
      
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
      this.tipServ.getAll().then((result)=>this.items = result);
    }


    
    selectItem(event:any){
      this.items.map((item)=>{
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



    confirm(type:string,ref:string,item:any) {
      this.confirmationService.confirm({
          message: this.sysMsg.getDialogMessages(type,item[ref]),
          accept: () => {
            this.deleteItem();   
          }
      });
    }


    deleteItem(){
      if(this.itemTarget.id){
      this.tipServ.deleteOne(this.itemTarget.id).then(()=>{this.getItems();this.resetValidate();});
      }else{
        this.validate();
      }
    }




    focusFieldError(){
      for(let e in this.formErrors){
        if(this.formErrors[e]!=''){
          if(this.edit == null){
          document.getElementById('select-input')?.focus();
          }else if(this.edit == true){
          document.getElementById('edit-input')?.focus();  
          }else if(this.edit == false){
            document.getElementById('new-input')?.focus();  
            }
            
          break;
        }
      }
    }


    async exist(control: AbstractControl) {
      this.loadDescIcon = true;
      return this.tipServ.existTipoByDescripcion(control.value).then((value) => {
        this.loadDescIcon = false;
        if(value && Utils.isEmpty(this.itemTarget)){
          return {'existe':true};
        }else{
          return null;
        }
       });
    }



}
