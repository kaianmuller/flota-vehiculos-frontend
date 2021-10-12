import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


formReg!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    
  }


buildForm(){
this.formReg = new FormGroup({
  nombre: new FormControl('',[Validators.required]),
  login: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required]),
  tipo_usuario: new FormControl('',[Validators.required])
});

}






}
