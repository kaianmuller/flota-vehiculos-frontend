import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { AgendamientosService } from 'src/app/core/services/agendamientos/agendamientos.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { TipoAgendamiento } from 'src/app/shared/enums/tipo-agendamiento.enum';
import { TipoPeriodoAgendamiento } from 'src/app/shared/enums/tipo-periodo-agendamiento.enum';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
import { Agendamiento } from 'src/app/shared/models/Agendamiento.model';
import { Auto } from 'src/app/shared/models/Auto.model';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-agendamientos',
  templateUrl: './agendamientos.component.html',
  styleUrls: ['./agendamientos.component.css']
})
export class AgendamientosComponent implements OnInit {

  items: Agendamiento[] = [];
  itemTarget:Agendamiento = new Agendamiento();


    first = 0;
    rows = 5;
    totalRecords = 0;
    
    @ViewChild('pag') pag!:Paginator;

    dispForm: boolean = false;
    dispInfo:boolean = false;

    formatN = new Intl.NumberFormat('es-ES');


    searchConfig:{[key:string]:any} = {
      descripcion: 'string',
      tipo:TipoAgendamiento,
      fecha_objetivo: 'date',
      tipo_periodo:TipoPeriodoAgendamiento,
      periodo:'number',
      fecha_alteracion:'date',
      fecha_creacion: 'date',
      alias:[{tipo_usuario:{alias:'usuario',type:TipoUsuario}},{login:{alias:'usuario',type:'string'}},{descripcion:{alias:'tipo_servicio',type:'string'}},{chapa:{alias:'auto',type:'string'}},{modelo:{alias:'auto',type:'string'}}],
    };

    queryItems:{[key:string]:any} = {};

    constructor(private agendamientoServ:AgendamientosService,private authServ:AuthService,private confirmationService: ConfirmationService,private sysMsg:SystemMessagesService) {
     
    }

    ngOnInit() {
        this.getItems();
    }


    ngAfterViewInit(){
      this.agendamientoServ.getCount().then(result=>this.totalRecords = result);
    }


    getItems(){
        this.agendamientoServ.getAll({join:['tipo_servicio','auto','usuario'],skip:this.first,take:this.rows,search:JSON.stringify(this.queryItems)}).then((result)=>{this.items = result;console.log(result)});
        this.agendamientoServ.getCount({join:['tipo_servicio','auto','usuario'],search:JSON.stringify(this.queryItems)}).then(result=>this.totalRecords = result);
    }

    paginate(event:any) {
      this.first = event.first;
      this.rows = event.rows;
      this.getItems();
  }



    showInfo(item:Agendamiento){
    this.itemTarget = item;
    this.dispInfo = true;
    }


    editItem(item:Agendamiento){
      this.itemTarget = item;
      this.dispForm=true;
    }


    sendItem(item:Agendamiento){
      if(item.id)
      {
      this.agendamientoServ.editOne(item,item.id).then(result=>{console.log("item Editado!");this.dispForm = false;this.getItems()});
      }else
      {
      this.agendamientoServ.createOne(item).then(result=>{console.log("item Creado!");this.getItems()});
      }

    }



    confirm(type:string,ref:string,item:any) {
      this.confirmationService.confirm({
          message: this.sysMsg.getDialogMessages(type,"Agendamiento: "+item.auto.chapa+" > "+item.tipo_servicio.descripcion),
          accept: () => {
            this.deleteItem(item.id);   
          }
      });
    }


    deleteItem(id:number){
      this.agendamientoServ.deleteOne(id).then(result=>{console.log("item Deletado!");this.getItems()});
    }

    resetTarget(){
      this.itemTarget = new Agendamiento();
    }


    isEmpty(agendamiento:Agendamiento){
      return Utils.isEmpty(agendamiento);
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
