import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Table, TableBody } from 'primeng/table';
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
  
  
      searchConfig:{[key:string]:any} = {
        login: 'string',
        nombre: 'string',
        descripcion: 'string',
        tipo_usuario: TipoUsuario,
        fecha_alteracion:'date',
        fecha_creacion: 'date',
      };
  
      queryItems:{[key:string]:any} = {};
  
      constructor(private usuarioServ:UsuariosService) {
       
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
  
  
  
      editItem(item:Usuario){
        this.itemTarget = item;
        this.dispForm=true;
      }
  
  
      sendItem(item:Usuario){
  
        if(item.id)
        {
        item.fecha_alteracion = new Date();
        this.usuarioServ.editOne(item,item.id).then(result=>{console.log("item Editado!");this.dispForm = false;this.getItems()});
        }else
        {
        item.fecha_creacion = new Date();
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
  
  

}
