import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import Utils from '../../utils/Utils';

@Component({
  selector: 'app-more-info-card',
  templateUrl: './more-info-card.component.html',
  styleUrls: ['./more-info-card.component.css']
})
export class MoreInfoCardComponent implements OnInit {

@Input() showItems:Array<string> = [];
@Input() item:any = {};


  itemInfo:Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.pipeFields();
  }




  pipeFields(){
    for(let key in this.item){
      if(this.showItems.includes(key)){
        if(this.item[key]){
          if(typeof this.item[key] != 'number' && !isNaN(new Date(this.item[key].toString()).getTime())){ // verifica si es una fecha en formato string
            this.itemInfo.push({key:key,name:Utils.toLabel(Utils.firstUpperCase(key)),value:formatDate(this.item[key],'dd-MM-yyyy','en')});
          }else{
            this.itemInfo.push({key:key,name:Utils.toLabel(Utils.firstUpperCase(key)),value:this.item[key].toString()}); 
          }
        }
      }
    }
    this.itemInfo.reverse();
    

}



}
