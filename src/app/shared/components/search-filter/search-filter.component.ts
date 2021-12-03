import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Utils from '../../utils/Utils';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

@Input() config!:{[key:string]:any};
@Input() select!:boolean;
@Input() selectHeader!:Array<string>;
@Input() selectService!:any;
@Input() condition!:any;
@Output() query:EventEmitter<{}> = new EventEmitter<{}>();
@Output() item:EventEmitter<any> = new EventEmitter<any>();
@Input() validate:any = '';
@Input() setItemTarget!:any;
@Input() idSearch:string = '';

numbers:any = []
strings:any = [];
enums:any = [];
dates:any = [];

inputSearchText:string = '';



querySearch:{[key:string]:any} = {};
queryFilter:{[key:string]:any} = {};

queryFinal:{[key:string]:any} = {};

activeIcon:boolean = false;


showTable:boolean = false;
items:any = [];
maxWidthRow:string = "130px";
maxHeightRow:string = "40px";
rows = 10;
inTable:boolean = false;
itemTarget!:any;

  constructor() { }

  ngOnInit(): void {

    this.itemTarget = this.setItemTarget;

    this.separateItems();
    this.createInitialValuesSearch();
    this.createInitialValuesFilter();

  }


  separateItems(){
  for(let key in this.config){
    
    if(key != 'alias'){ //sin alias

      if(typeof this.config[key] != 'string'){
          this.enums.push({key:key,entries:{keys:Object.keys(this.config[key]),values:Object.values(this.config[key])}});
      }else{
        if(this.config[key] == 'number'){
          this.numbers.push({key:key});
        }else if(this.config[key] == 'string'){
          this.strings.push({key:key});
        }else if(this.config[key] == 'date'){
          this.dates.push({key:key});
        }
      }

      
    }else{  // con alias

      for(let alias of this.config[key])
        for(let key in alias){
          if(typeof alias[key].type != 'string'){
            this.enums.push({alias:alias[key].alias,target:key,entries:{keys:Object.keys(alias[key].type),values:Object.values(alias[key].type)}});
          }else{
            if(alias[key].type == 'number'){
                this.numbers.push({alias:alias[key].alias,target:key});
              }else if(alias[key].type == 'string'){
                this.strings.push({alias:alias[key].alias,target:key});
              }else if(alias[key].type == 'date'){
                this.dates.push({alias:alias[key].alias,target:key});
              }
          }
        }
    }
  }
  }

  createInitialValuesSearch(){
    this.querySearch.alias = {};
    for(let s of this.strings){
      if(!s.alias){
      this.querySearch[s.key] = '';
      }else{
        this.querySearch.alias[s.target] = {alias:s.alias,target:''};
      }
    }
  }



createInitialValuesFilter(){
  this.queryFilter.alias = {}; 
for(let e of this.enums){
  if(!e.alias){
    this.queryFilter[e.key] = {value:null};
    }else{
      this.queryFilter.alias[e.target] = {alias:e.alias,target:{value:null}};
    }
}

for(let n of this.numbers){
  if(!n.alias){
    this.queryFilter[n.key] = {min:null,max:null};
    }else{
      this.queryFilter.alias[n.target] = {alias:n.alias,target:{min:null,max:null}};
    }
}

for(let d of this.dates){
  if(!d.alias){
    this.queryFilter[d.key] = {from:null,to:null};
    }else{
      this.queryFilter.alias[d.target] = {alias:d.alias,target:{from:null,to:null}};
    }
}

  }



  setInputSearchText(event:any){
    if(event.key != 'Escape'){
    this.inputSearchText = event.target.value;
    this.setQuerySearch();
    this.sendQuery();
    this.item.emit(null);
    }
  }


  setQuerySearch(){
    for(let s in this.querySearch){
      if(s != 'alias'){
      this.querySearch[s] = this.inputSearchText;
      }else{
        for(let k in this.querySearch.alias){
          this.querySearch.alias[k].target = this.inputSearchText;
        }  
      }
    }
  }



  setQueryEnum(event:any,key:string,alias:string){
    if(!alias){
      this.queryFilter[key].value = event.target.value == ''? null :event.target.value;
    }else{
      for(let k in this.queryFilter.alias){
        if(k == alias){
          this.queryFilter.alias[k].target.value = event.target.value == ''? null :event.target.value;
        }
      }
    }
  }


  setQueryNumberMin(event:any,key:string,alias:string){
    if(!alias){
      this.queryFilter[key].min = event.target.value == '' || event.target.value < 0? null : event.target.value;
    }else{
      for(let k in this.queryFilter.alias){
        if(k == alias){
          this.queryFilter.alias[k].target.min = event.target.value == '' || event.target.value < 0? null : event.target.value;
        }
      }
    }
  }

  setQueryNumberMax(event:any,key:string,alias:string){
    if(!alias){
      this.queryFilter[key].max = event.target.value == '' || event.target.value < 0? null : event.target.value;
    }else{
      for(let k in this.queryFilter.alias){
        if(k == alias){
          this.queryFilter.alias[k].target.max = event.target.value == '' || event.target.value < 0? null : event.target.value;
        }
      }
    }
  }


setQueryDateFrom(event:any,key:string,alias:string){
  if(!alias){
    this.queryFilter[key].from = event.target.value == ''? null : event.target.value;
  }else{
    for(let k in this.queryFilter.alias){
      if(k == alias){
       this.queryFilter.alias[k].target.from = event.target.value == ''? null : event.target.value;
      }
    }
  }
}

setQueryDateTo(event:any,key:string,alias:string){
  if(!alias){
    this.queryFilter[key].to = event.target.value == ''? null : event.target.value;
  }else{
    for(let k in this.queryFilter.alias){
      if(k == alias){
        this.queryFilter.alias[k].target.to = event.target.value == ''? null : event.target.value;
      }
    }
  }
}


setConditionQuery(){
  if(this.condition){
    for(let k in this.condition){
    if(this.condition[k].value){
      this.queryFilter[k] = this.condition[k];
    }
    }
  }
}




getItems(){
  if(this.select && this.selectService && this.config){
    this.selectService.getAll({skip:0,take:this.rows,search:JSON.stringify(this.queryFinal)}).then((result:any)=>{this.items = result});
  }
  this.showTable=true;
}





  sendQuery(){

    let alias = {};
    Object.assign(alias,this.querySearch.alias);
    Object.assign(alias,this.queryFilter.alias);
    
    this.setConditionQuery();
    Object.assign(this.queryFinal,this.queryFilter);
    Object.assign(this.queryFinal,this.querySearch);

    this.queryFinal.alias = {};   //importante borrar el contenido de alias antes de asignarlo
    Object.assign(this.queryFinal.alias,alias);

    this.query.emit(this.queryFinal);
    this.activeIcon = true;
    this.getItems();
    //console.log(this.queryFinal);
  }


  sendItem(item:any){
    this.itemTarget = item;
    this.item.emit(item);
    this.inputSearchText = '';
    this.items = [];
  }



  resetFilters(){
    this.createInitialValuesFilter();
    this.sendQuery();
    this.activeIcon = false;
  }


  activeFiltersStyle(){
    let flag = false;
    for(let key in this.queryFinal){
      if(key != 'alias'){
        if(typeof this.queryFinal[key] != 'string'){
          for(let k in this.queryFinal[key]){
            if(this.queryFinal[key][k]){flag = true};
          }
        }
      }else{
        for(let ke in this.queryFinal[key]){
          if(typeof this.queryFinal[key][ke].target != 'string'){
            for(let k in this.queryFinal[key][ke].target){
              if(this.queryFinal[key][ke].target[k]){flag = true};
            }
          }
        }
      }
    }
    return flag && this.activeIcon?{"color":"orange"}:{};
  }


  setBackgroundFirstItem(){
    return this.items.length == 1?{'background-color':'lightblue'}:{};
  }


  convertLabel(word:string) {
  return  Utils.toLabel(Utils.firstUpperCase(word));
  }


  markField(){
    return this.validate != ''?{border: 'solid 2px red'}:{};
    }


  focusSearchInput(){
    document.getElementById('search-input-'+this.idSearch)?.focus();
  }

  clearSelectInput(){
    this.itemTarget = null;
    this.sendItem(null);
    this.inputSearchText=''
  }


}
