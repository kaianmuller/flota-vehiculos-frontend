import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { ServiciosService } from 'src/app/core/services/servicios/servicios.service';
import { EstadoServicio } from 'src/app/shared/enums/estado-servicio.enum';
import { Servicio } from 'src/app/shared/models/Servicio.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  items: Servicio[] = [];
  itemTarget:Servicio = new Servicio();


    first = 0;
    rows = 5;
    totalRecords = 0;
    
    @ViewChild('pag') pag!:Paginator;

    dispForm: boolean = false;
    dispInfo:boolean = false;

    formatN = new Intl.NumberFormat('es-ES');


    searchConfig:{[key:string]:any} = {
      descripcion: 'string',
      estado:EstadoServicio,
      km_inicial:'number',
      km_final: 'number',
      fecha_inicio: 'date',
      fecha_fin:'date',
      fecha_alteracion:'date',
      fecha_creacion: 'date',
    };

    queryItems:{[key:string]:any} = {};

    constructor(private servicioServ:ServiciosService) {
     
    }

    ngOnInit() {
        this.getItems();
    }


    ngAfterViewInit(){
      this.servicioServ.getCount().then(result=>this.totalRecords = result);
    }


    getItems(){
        this.servicioServ.getAll({skip:this.first,take:this.rows,search:JSON.stringify(this.queryItems)}).then((result)=>{this.items = result});
        this.servicioServ.getCount({search:JSON.stringify(this.queryItems)}).then(result=>this.totalRecords = result);
    }

    paginate(event:any) {
      this.first = event.first;
      this.rows = event.rows;
      this.getItems();
  }



  showInfo(item:Servicio){
    this.itemTarget = item;
    this.dispInfo = true;
    }



    editItem(item:Servicio){
      this.itemTarget = item;
      this.dispForm=true;
    }


    sendItem(item:Servicio){

      if(item.id)
      {
      item.fecha_alteracion = new Date();
      this.servicioServ.editOne(item,item.id).then(result=>{console.log("item Editado!");this.dispForm = false;this.getItems()});
      }else
      {
      item.fecha_creacion = new Date();
      this.servicioServ.createOne(item).then(result=>{console.log("item Creado!");this.getItems()});
      }

    }

    deleteItem(id:number){
      this.servicioServ.deleteOne(id).then(result=>{console.log("item Deletado!");this.getItems()});
    }

    resetTarget(){
      this.itemTarget = new Servicio();
    }


    isEmpty(servicio:Servicio){
      return Utils.isEmpty(servicio);
    }


    setQueryItems(query:any){
      this.queryItems = query;
      this.first = 0;
      this.getItems();
    }

}
