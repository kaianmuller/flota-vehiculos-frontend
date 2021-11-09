import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { Auto } from 'src/app/shared/models/Auto.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  items: Auto[] = [];
  itemTarget:Auto = new Auto();

  edit:boolean = false;

    first = 0;
    rows = 5;
    totalRecords = 0;
    
    @ViewChild('pag') pag!:Paginator;

    dispForm: boolean = false;
    dispInfo:boolean = false;

    constructor(private autoServ:AutosService) {
     
    }

    ngOnInit() {
        this.getItems();
    }


    ngAfterViewInit(){
      this.autoServ.getCount().then(result=>this.totalRecords = result);
    }


    getItems(){
      this.autoServ.getAll({skip:this.first,take:this.rows}).then((result)=>this.items = result);  
    }

    paginate(event:any) {
      this.first = event.first;
      this.rows = event.rows;
      this.getItems();
  }


    getEnumKey(value:any){
     return Utils.getEnumKey(DisponibilidadAuto,value);
    }


    getEnumValue(name:string){
      return Utils.getEnumValue(DisponibilidadAuto,name);
    }

    showInfo(item:Auto){
    this.itemTarget = item;
    this.dispInfo = true;
    console.log(item);
    }


    editItem(item:Auto){
      this.itemTarget = item;
      this.edit=true;
      this.dispForm=true;
    }


    sendItem(item:Auto){

      if(item.id)
      {
      item.fecha_alteracion = new Date();
      this.autoServ.editOne(item,item.id).then(result=>{console.log("item Editado!");this.dispForm = false;this.getItems()});
      }else
      {
      item.fecha_creacion = new Date();
      this.autoServ.createOne(item).then(result=>{console.log("item Creado!");this.getItems()});
      }

    }

    deleteItem(id:number){
      this.autoServ.deleteOne(id).then(result=>{console.log("Auto Deletado!");this.getItems()});
    }

    resetTarget(){
      this.itemTarget = new Auto();
    }


}
