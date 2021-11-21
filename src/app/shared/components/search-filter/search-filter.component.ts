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

    this.separeItems();

    this.createInitialValuesSearch();
    this.createInitialValuesFilter();

  }


  separeItems(){
    for(let key in this.config){
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
    }
  }

  createInitialValuesSearch(){
    for(let s of this.strings){
      this.querySearch[s.key] = '';
}
  }



  createInitialValuesFilter(){
    
for(let e of this.enums){
  this.queryFilter[e.key] = {value:null};
}

for(let n of this.numbers){
  this.queryFilter[n.key] = {min:null,max:null};
}

for(let d of this.dates){
  this.queryFilter[d.key] = {from:null,to:null};
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
      this.querySearch[s] = this.inputSearchText;
    }
  }



  setQueryEnum(event:any,key:string){
    this.queryFilter[key].value = event.target.value == ''? null :event.target.value;
  }


  setQueryNumberMin(event:any,key:string){
    this.queryFilter[key].min = event.target.value == '' || event.target.value < 0? null : event.target.value;
  }

  setQueryNumberMax(event:any,key:string){
    this.queryFilter[key].max = event.target.value == '' || event.target.value < 0? null : event.target.value;
  }


setQueryDateFrom(event:any,key:string){
  this.queryFilter[key].from = event.target.value == ''? null : event.target.value;
}

setQueryDateTo(event:any,key:string){
  this.queryFilter[key].to = event.target.value == ''? null : event.target.value;
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
    this.setConditionQuery();
    Object.assign(this.queryFinal,this.queryFilter);
    Object.assign(this.queryFinal,this.querySearch);
    this.query.emit(this.queryFinal);
    this.activeIcon = true;
    this.getItems();
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
      if(typeof this.queryFinal[key] != 'string'){
        for(let k in this.queryFinal[key]){
          if(this.queryFinal[key][k]){flag = true};
        }
      }
    }

    return flag && this.activeIcon?{"color":"orange"}:{};
  }


  setBackgroundFirstItem(){
    return this.items.length == 1?{'background-color':'lightblue'}:{};
  }


  firstUpperCase(word:string) {
  return  Utils.firstUpperCase(word);
  }

}
