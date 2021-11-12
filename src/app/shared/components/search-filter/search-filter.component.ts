import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

@Input() items!:any;
@Output() query:EventEmitter<{}> = new EventEmitter<{}>();
@Output() pagReload:EventEmitter<void> = new EventEmitter<void>();

numbers:any = []
strings:any = [];
enums:any = [];
dates:any = [];

inputSearchText:string = '';


querySearch:{[key:string]:any} = {};
queryFilter:{[key:string]:any} = {};

queryFinal:{[key:string]:any} = {};

  constructor() { }

  ngOnInit(): void {

    this.separeItems();

    this.createInitialValuesSearch();
    this.createInitialValuesFilter();

  }


  separeItems(){
    for(let key in this.items){
      if(typeof this.items[key] != 'string'){
          this.enums.push({key:key,entries:{keys:Object.keys(this.items[key]),values:Object.values(this.items[key])}});
      }else{
        if(this.items[key] == 'number'){
          this.numbers.push({key:key});
        }else if(this.items[key] == 'string'){
          this.strings.push({key:key});
        }else if(this.items[key] == 'date'){
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
    this.inputSearchText = event.target.value;
    this.setQuerySearch();
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
    this.queryFilter[key].min = event.target.value == ''? null : event.target.value;
  }

  setQueryNumberMax(event:any,key:string){
    this.queryFilter[key].max = event.target.value == ''? null : event.target.value;
  }


setQueryDateFrom(event:any,key:string){
  this.queryFilter[key].from = event.target.value == ''? null : event.target.value;
}

setQueryDateTo(event:any,key:string){
  this.queryFilter[key].to = event.target.value == ''? null : event.target.value;
}



  sendQuery(){
    Object.assign(this.queryFinal,this.queryFilter);
    Object.assign(this.queryFinal,this.querySearch);
    this.query.emit(this.queryFinal);
    this.pagReload.emit();
  }



  resetFilters(){
    this.createInitialValuesFilter();
    this.sendQuery();
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

    return flag?{"color":"orange"}:{};
  }


  firstUpperCase(word:string) {
    return (word.charAt(0).toUpperCase() + word.slice(1)).replace("_"," ");
  }

}
