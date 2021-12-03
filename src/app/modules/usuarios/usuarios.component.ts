import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table, TableBody } from 'primeng/table';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Usuario } from 'src/app/shared/models/Usuario.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    items: Usuario[] = [];
    itemTarget:Usuario = new Usuario();
  
  
      first = 0;
      rows = 5;
      totalRecords = 0;
      
      @ViewChild('pag') pag!:Paginator;
  
      dispForm: boolean = false;
      dispInfo:boolean = false;
  
      searchConfig:{[key:string]:any} = {
        login: 'string',
        nombre: 'string',
        descripcion: 'string',
        tipo_usuario: TipoUsuario,
        fecha_alteracion:'date',
        fecha_creacion: 'date',
      };
  
      queryItems:{[key:string]:any} = {};
  
      constructor(private usuarioServ:UsuariosService,private authServ:AuthService,private confirmationService: ConfirmationService,private sysMsg:SystemMessagesService) {
      }
  
      ngOnInit() {
          this.getItems();
      }
  
  
      ngAfterViewInit(){
        this.usuarioServ.getCount().then(result=>this.totalRecords = result);
      }
  
  
      getItems(){
          this.usuarioServ.getAll({skip:this.first,take:this.rows,search:JSON.stringify(this.queryItems)}).then((result)=>{this.items = result});
          this.usuarioServ.getCount({search:JSON.stringify(this.queryItems)}).then(result=>this.totalRecords = result);
      }
  
      paginate(event:any) {
        this.first = event.first;
        this.rows = event.rows;
        this.getItems();
    }
  


    showInfo(item:Usuario){
      this.itemTarget = item;
      this.dispInfo = true;
      }
  
  
      editItem(item:Usuario){
        this.itemTarget = item;
        this.dispForm=true;
      }
  

      confirm(type:string,ref:string,item:any) {
        this.confirmationService.confirm({
            message: this.sysMsg.getDialogMessages(type,item[ref]),
            accept: () => {
              this.deleteItem(item.id);   
            }
        });
      }
    
  
      sendItem(item:Usuario){
  
        if(item.id)
        {
        this.usuarioServ.editOne(item,item.id).then(result=>{console.log("item Editado!");this.dispForm = false;this.getItems()});
        }else
        {
        this.usuarioServ.createOne(item).then(result=>{console.log("item Creado!");this.getItems()});
        }
  
      }
  
      deleteItem(id:number){
        this.usuarioServ.deleteOne(id).then(result=>{console.log("item Deletado!");this.getItems()});
      }
  
      resetTarget(){
        this.itemTarget = new Usuario();
      }
  
  
      isEmpty(usuario:Usuario){
        return Utils.isEmpty(usuario);
      }
  
  
      setQueryItems(query:any){
        this.queryItems = query;
        this.first = 0;
        this.getItems();
      }
  
  

      isAdmin(){
        return this.authServ.isAdmin();
      }


}
