import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report/report.service';
import Utils from 'src/app/shared/utils/Utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


gastosMonth = new Array();
gastosTotales = new Array();

formatN = new Intl.NumberFormat('es-ES');


  constructor(private report:ReportService) {}

  ngOnInit(): void {
    this.getItems();
  }




  getItems(){
    this.report.getReportService({info:JSON.stringify({type:'G',ref:"valor_servicio",period:{year:2021}})}).then((result)=>{this.gastosMonth.push(this.processItemsPeriod('Gasto anual en servicios','G','Gastos / Mes',result)); this.testSpacePeriod();});
    this.report.getReportService({info:JSON.stringify({type:'G',ref:"valor_servicio"})}).then((result)=> {this.gastosTotales.push(this.processItemsNumber('Gastos totales en servicios','G',result)); this.testSpaceStatic();});
  }



processItemsPeriod(titulo:string,type:string,name:string,data:any){
  let plant = {
  titulo:titulo,
  type:type,
  labels: Utils.getMonthName(),
  datasets: [
      {
          label: name,
          data: data,
          fill: true,
          borderColor: '#4CAF50',
          tension: 0.000000000001
      }
    ]
    };
  return plant;
}


processItemsNumber(name:string,type:string,data:any){
  return {name:name,value:Number(data),type:type,}; 
}



printType(type:string){
  if(type=='G'){
    return ' GS.'
  }

  if(type=='KM'){
    return ' KM.'
  }

  return '';
}





testSpaceStatic(){   /// sirve solo para prueba
  //this.gastosTotales.push({});

}

testSpacePeriod(){   /// sirve solo para prueba
 // this.gastosMonth.push({});
}







}

