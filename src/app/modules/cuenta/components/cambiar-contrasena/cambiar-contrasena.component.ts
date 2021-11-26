import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  formCC = new FormGroup({});
  formErrors:{[key:string]:string} = {};

  constructor(private authServ:AuthService,private userServ:UsuariosService,private sysMsg:SystemMessagesService) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(){
    this.formCC = new FormGroup({
      act_pass: new FormControl('',[Validators.required]),
      new_pass: new FormControl('',[Validators.required]),
      rep_new_pass: new FormControl('',[Validators.required]),
    });

    }
    
    
    
    validate(){
      
      for(let c in this.formCC.controls){
        this.formErrors[c] = this.sysMsg.getFormMessages(this.formCC.get(c)?.errors);
      }
        this.formErrors.rep_new_pass = this.validRep()?this.sysMsg.getFormMessages(this.formCC.get('rep_new_pass')?.errors):"La contrasena repetida no es igual a la original!";
    
        this.focusFieldError();
    }


    validRep(){
      return (this.formCC.get('new_pass')?.value === this.formCC.get('rep_new_pass')?.value);
    }

    submit(event:Event){
      event.preventDefault();
    
    
      const value = this.formCC.value;
      delete value.rep_new_pass;
      value.login = this.authServ.userLogin;
      value.fecha_alteracion = new Date();
    
      if(this.formCC.valid && this.validRep()){
        this.userServ.changePassword(value).then(
            (result)=>console.log("Contrasena cambiada con suceso!")
          ).catch(
            (error)=> console.log("No se pudo cambiar la contrasena!")
          ).finally(
            ()=>this.resetForm()
          );
        
      }else{
        this.validate();
      }
    
    }
    
    
    
    resetForm(){
      this.buildForm();
      this.formErrors = this.resetValidate();
    }
    
    
    
    resetValidate(){
      return {
        act_pass:'',
        new_pass:'',
        rep_new_pass:''
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

}
