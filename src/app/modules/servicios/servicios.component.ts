import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { ServiciosService } from 'src/app/core/services/servicios/servicios.service';
import { SystemMessagesService } from 'src/app/core/services/system-messages/system-messages.service';
import { DisponibilidadAuto } from 'src/app/shared/enums/disponibilidad-auto.enum';
import { EstadoServicio } from 'src/app/shared/enums/estado-servicio.enum';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario.enum';
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
      valor_servicio:'number',
      descripcion: 'string',
      estado:EstadoServicio,
      km_inicial:'number',
      km_final: 'number',
      fecha_inicio: 'date',
      fecha_fin:'date',
      fecha_alteracion:'date',
      fecha_creacion: 'date',
      alias:[{tipo_usuario:{alias:'usuario',type:TipoUsuario}},{login:{alias:'usuario',type:'string'}},{descripcion:{alias:'tipo_servicio',type:'string'}},{chapa:{alias:'auto',type:'string'}},{modelo:{alias:'auto',type:'string'}}],
    };

    queryItems:{[key:string]:any} = {};

    finalizarFlag:boolean = false;

    constructor(private servicioServ:ServiciosService,private autoServ:AutosService,private authServ:AuthService,private confirmationService: ConfirmationService,private sysMsg:SystemMessagesService) {
     
    }

    ngOnInit() {
        this.getItems();
    }


    ngAfterViewInit(){
      this.servicioServ.getCount().then(result=>this.totalRecords = result);
    }


    getItems(){
        this.servicioServ.getAll({join:['tipo_servicio','auto','usuario'],skip:this.first,take:this.rows,search:JSON.stringify(this.queryItems)}).then((result)=>{this.items = result});
        this.servicioServ.getCount({join:['tipo_servicio','auto','usuario'],search:JSON.stringify(this.queryItems)}).then(result=>this.totalRecords = result);
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
      this.servicioServ.editOne(item,item.id).then((result:any)=>{
        console.log("item Editado!");
        this.updateAuto(result);
        this.dispForm = false;
        this.getItems();
      });
      }else
      {
      this.servicioServ.createOne(item).then((result:any)=>{
        console.log("item Creado!");
        this.updateAuto(result);
        this.getItems();
      });
      }

    }

    confirm(type:string,ref:string,item:any) {
      this.confirmationService.confirm({
          message: item.auto?this.sysMsg.getDialogMessages(type,"Servicio: "+item.auto.chapa+" > "+item.tipo_servicio.descripcion):'',
          accept: () => {
            if(type == 'delete') this.deleteItem(item.id);
            if(type == 'finalize' || type == 'cancel') this.sendItem(item);
          },
          reject:() =>{
            this.dispForm = false;
            this.getItems();
          }

      });
    }


    updateAuto(item:any){
      let auto = item.auto;

      if(auto && item.estado != EstadoServicio.EN_PROCESO){
          auto.disponibilidad = DisponibilidadAuto.DISPONIBLE;
          auto.kilometraje= Number(item.km_final);
          console.log(auto);
          this.autoServ.editOne(auto,auto.id).then(()=>console.log("Auto actualizado!"));
      }

      if(auto && item.estado == EstadoServicio.EN_PROCESO){
        auto.disponibilidad = DisponibilidadAuto.OCUPADO;
        this.autoServ.editOne(auto,auto.id).then(()=>console.log("Auto actualizado!"));
      }

    }



    deleteItem(id:number){
      this.servicioServ.deleteOne(id).then(result=>{console.log("item Deletado!");this.getItems()});
    }

    resetTarget(){
      this.itemTarget = new Servicio();
    }




    finalizarServicio(item:Servicio){
      this.itemTarget = item;
      this.finalizarFlag = true;
      this.dispForm = true;
    }


    cancelarServicio(item:Servicio){
      this.itemTarget = item;
      this.finalizarFlag =false;
      this.dispForm = true;
    }

    isFinalizado(item:any){
     return item.estado && (item.estado == EstadoServicio.FINALIZADO ||item.estado == EstadoServicio.CANCELADO);
    }

    isEmpty(servicio:Servicio){
      return Utils.isEmpty(servicio);
    }


    setQueryItems(query:any){
      this.queryItems = query;
      this.first = 0;
      this.getItems();
    }



    setStyleBackgroundEstado(estado:any){
      if(estado && estado == EstadoServicio.FINALIZADO) return {'background-color':'lime','color':'white','font-weight':'bold'}
      if(estado && estado == EstadoServicio.CANCELADO) return {'background-color':'red','color':'white','font-weight':'bold'}

      return {'background-color':'slategray','color':'white'}
    }


    isAdmin(){
      return this.authServ.isAdmin();
    }


    convertWordEstado(word:string){
      return Utils.toLabel(word).toUpperCase();
    }

}
